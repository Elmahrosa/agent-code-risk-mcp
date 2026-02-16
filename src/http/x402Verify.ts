// src/http/x402Verify.ts
import { Request, Response, NextFunction } from "express";
import { config } from "../config";
import { stats } from "./stats";

const usedTxHashes = new Set<string>();

export type PriceTier = "basic" | "premium" | "pipeline";

function tierForRequest(req: Request): PriceTier {
  if (req.path.includes("scan-dependencies")) return "premium";

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

function verifyHeaderOnly(header: string): boolean {
  return /^0x[a-fA-F0-9]{64}$/.test(header);
}

export async function x402PaymentGate(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  // ✅ TRUSTED TELEGRAM BOT BYPASS (SAFE)
  // Bot must send: x-teos-bot-key: <TEOS_BOT_KEY>
  const expectedBotKey = process.env.TEOS_BOT_KEY || "";
  const receivedBotKey = String(req.headers["x-teos-bot-key"] || "");

  if (expectedBotKey && receivedBotKey && receivedBotKey === expectedBotKey) {
    const tier = tierForRequest(req);

    (req as any).x402 = {
      tier,
      verified: true,
      source: "telegram-bot",
      bypass: true,
    };

    // Keep some stats consistent
    stats.totalRequests++;
    next();
    return;
  }

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
      const txHash = paymentHeader;

      if (!/^0x[a-fA-F0-9]{64}$/.test(txHash)) {
        res.status(402).json({ error: "Invalid transaction hash format." });
        return;
      }

      const txHashLower = txHash.toLowerCase();

      if (usedTxHashes.has(txHashLower)) {
        res.status(402).json({
          error: "Payment Required",
          reason: "Transaction already used.",
        });
        return;
      }

      // TODO: add real on-chain verification later
      verified = true;

      if (verified) usedTxHashes.add(txHashLower);
    } else {
      verified = verifyHeaderOnly(paymentHeader);
    }

    if (!verified) {
      res.status(402).json({ error: "Payment verification failed" });
      return;
    }

    (req as any).x402 = { tier, verified: true };
    stats.paidRequests++;
    next();
  } catch (err) {
    console.error("[x402] Verification error:", err);
    res.status(500).json({ error: "Internal payment verification error" });
  }
}
