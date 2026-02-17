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
    description: `Pay $${price} USDC on ${config.network.name} to access this endpoint.`,
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

  const tier = tierForRequest(req);

  // ==============================
  // TELEGRAM BOT TRUSTED BYPASS
  // ==============================

  const expectedBotKey = process.env.TEOS_BOT_KEY || "";
  const receivedBotKey = String(req.headers["x-teos-bot-key"] || "");

  if (expectedBotKey && receivedBotKey === expectedBotKey) {
    (req as any).x402 = {
      tier,
      verified: true,
      source: "telegram-bot",
      bypass: true,
    };

    stats.totalRequests++;
    next();
    return;
  }

  // ==============================
  // TEST MODE BYPASS
  // ==============================

  if (config.teosMode === "test" || config.requirePayment === false) {
    (req as any).x402 = { tier, verified: false };
    next();
    return;
  }

  // ==============================
  // STANDARD PAYMENT FLOW
  // ==============================

  const paymentHeader = req.headers["x-payment"] as string | undefined;

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
        res.status(402).json({ error: "Transaction already used." });
        return;
      }

      verified = true;
      usedTxHashes.add(txHashLower);

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
    return;

  } catch (err) {
    console.error("[x402] Verification error:", err);
    res.status(500).json({ error: "Internal payment verification error" });
    return;
  }
}
