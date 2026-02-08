// src/http/x402Verify.ts
import { type Request, type Response, type NextFunction } from "express";
import { config } from "../config";

const usedTxHashes = new Set<string>();

export type PriceTier = "basic" | "premium" | "pipeline";

function tierForRequest(req: Request): PriceTier {
  // scan-dependencies always premium
  if (req.path.includes("scan-dependencies")) return "premium";

  // analyze: choose tier by body.mode
  const mode = String((req.body as any)?.mode || "basic").toLowerCase();
  if (mode === "premium") return "premium";
  if (mode === "pipeline") return "pipeline";
  return "basic";
}

function priceForTier(tier: PriceTier): string {
  if (tier === "premium") return config.pricePremium;
  if (tier === "pipeline") return config.pricePipeline;
  return config.priceBasic;
}

function send402(res: Response, tier: PriceTier): void {
  const price = priceForTier(tier);
  res.status(402).json({
    error: "Payment Required",
    "x402-version": 1,
    accepts: [
      {
        scheme: "exact",
        network: config.networkId,
        maxAmountRequired: price,
        resource: `usdc:${config.usdcAddress}`,
        payTo: config.payTo,
        maxTimeoutSeconds: 60,
        extra: { name: "USDC", decimals: 6 },
      },
    ],
    description: `Pay $${price} USDC on ${config.network.name} to access this endpoint (${tier} tier).`,
  });
}

async function rpcFetch(body: any, timeoutMs = 10000) {
  const ac = new AbortController();
  const t = setTimeout(() => ac.abort(), timeoutMs);
  try {
    const res = await fetch(config.rpcUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ac.signal,
    });
    return res;
  } finally {
    clearTimeout(t);
  }
}

async function verifyOnChain(txHash: string, requiredAmount: number): Promise<boolean> {
  const receiptRes = await rpcFetch({
    jsonrpc: "2.0",
    id: 1,
    method: "eth_getTransactionReceipt",
    params: [txHash],
  });

  const receiptJson = (await receiptRes.json()) as {
    result: {
      status: string;
      blockNumber: string;
      logs: Array<{ address: string; topics: string[]; data: string }>;
    } | null;
  };

  const receipt = receiptJson.result;
  if (!receipt) return false;
  if (receipt.status !== "0x1") return false;

  const blockNumRes = await rpcFetch({
    jsonrpc: "2.0",
    id: 2,
    method: "eth_blockNumber",
    params: [],
  });

  const blockNumJson = (await blockNumRes.json()) as { result: string };
  const currentBlock = parseInt(blockNumJson.result, 16);
  const txBlock = parseInt(receipt.blockNumber, 16);

  if (currentBlock - txBlock < config.confirmations) return false;

  const TRANSFER_TOPIC =
    "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef";

  const payToNormalized = config.payTo.toLowerCase();
  const usdcNormalized = config.usdcAddress.toLowerCase();

  const transferLog = receipt.logs.find((log) => {
    if (log.address.toLowerCase() !== usdcNormalized) return false;
    if (log.topics[0] !== TRANSFER_TOPIC) return false;
    const toAddress = "0x" + (log.topics[2] || "").slice(26).toLowerCase();
    return toAddress === payToNormalized;
  });

  if (!transferLog) return false;

  const rawAmount = BigInt(transferLog.data);
  const amountFloat = Number(rawAmount) / 10 ** 6;

  if (!Number.isFinite(requiredAmount) || requiredAmount <= 0) return false;
  if (amountFloat + 1e-9 < requiredAmount) return false;

  return true;
}

function verifyHeaderOnly(header: string): boolean {
  // header-only verification (dev only): must look like tx hash
  return /^0x[a-fA-F0-9]{64}$/.test(header);
}

export async function x402PaymentGate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // ✅ HARD BYPASS: test mode or payment disabled
  if (config.teosMode === "test" || config.requirePayment === false) {
    (req as any).x402 = { tier: tierForRequest(req), verified: false, bypass: true };
    next();
    return;
  }

  const paymentHeader = req.headers["x-payment"] as string | undefined;
  const tier = tierForRequest(req);

  if (!paymentHeader) {
    send402(res, tier);
    return;
  }

  try {
    let verified = false;

    if (config.verifyOnChain) {
      let txHash = paymentHeader;

      if (paymentHeader.startsWith("{")) {
        try {
          const parsed = JSON.parse(paymentHeader);
          txHash = parsed.txHash || parsed.transaction || parsed.hash || "";
        } catch {
          res.status(402).json({ error: "Malformed payment header JSON" });
          return;
        }
      }

      if (!/^0x[a-fA-F0-9]{64}$/.test(txHash)) {
        res.status(402).json({ error: "Invalid transaction hash format." });
        return;
      }

      const txHashLower = txHash.toLowerCase();

      if (usedTxHashes.has(txHashLower)) {
        res.status(402).json({
          error: "Payment Required",
          reason: "Transaction already used. Each payment can only be used once.",
        });
        return;
      }

      const requiredAmount = Number(priceForTier(tier));
      verified = await verifyOnChain(txHash, requiredAmount);
      if (verified) usedTxHashes.add(txHashLower);
    } else {
      verified = verifyHeaderOnly(paymentHeader);
    }

    if (!verified) {
      res.status(402).json({ error: "Payment verification failed" });
      return;
    }

    (req as any).x402 = { tier, verified: true };
    next();
  } catch (err) {
    console.error("[x402] Verification error:", err);
    res.status(500).json({ error: "Payment verification internal error" });
  }
}
