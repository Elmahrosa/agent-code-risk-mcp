import { verifyX402PaymentOnchain } from "./x402Verify";

// ─────────────────────────────────────────────────────────────
//  src/http/app.ts — HTTP API server with manual x402 payment gating
// ─────────────────────────────────────────────────────────────

import express, { Request, Response } from "express";
import dotenv from "dotenv";
import {
  reviewDiff,
  pipelineGuard,
  generateFixSuggestions,
} from "../core/review";

dotenv.config();

const app = express();
app.use(express.json());

// ── Config ───────────────────────────────────────────────────

const PORT = parseInt(process.env.PORT || "3000", 10);
const HOST = process.env.HOST || "0.0.0.0";

const PAY_TO = process.env.X402_PAY_TO || "0x0000000000000000000000000000000000000000";
const NETWORK = process.env.X402_NETWORK || "eip155:8453";
const PRICE_BASIC = process.env.PRICE_BASIC || "0.002";
const PRICE_PREMIUM = process.env.PRICE_PREMIUM || "0.05";

const PAYMENT_HEADER = "x-402-payment-tx";

// ── Helpers ──────────────────────────────────────────────────

function hasPaymentProof(req: Request): boolean {
  const proof = req.headers[PAYMENT_HEADER] as string | undefined;
  return !!proof && proof.length > 0;
}

function send402(res: Response, amount: string): void {
  res.status(402).json({
    status: 402,
    payment: {
      amount,
      currency: "USDC",
      network: NETWORK,
      payTo: PAY_TO,
      hint: `Pay then retry with ${PAYMENT_HEADER} header containing your tx hash.`,
    },
  });
}

// ── Health check ─────────────────────────────────────────────

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    version: "1.0.0",
    tools: ["review_diff", "pipeline_guard", "generate_fix_patch"],
  });
});

// ── POST /mcp/basic ──────────────────────────────────────────
//    Tools: review_diff, pipeline_guard

app.post("/mcp/basic", (req: Request, res: Response) => {
  // ─ x402 gate ─
  if (!hasPaymentProof(req)) {
    return send402(res, PRICE_BASIC);
  }

  const { tool, diff, threshold } = req.body;

  if (!tool || !diff) {
    return res.status(400).json({
      error: "Missing required fields: tool, diff",
    });
  }

  switch (tool) {
    case "review_diff": {
      const result = reviewDiff(diff);
      return res.json({
        tool: "review_diff",
        tier: "basic",
        ...result,
      });
    }
    case "pipeline_guard": {
      const result = pipelineGuard(diff, threshold ?? 50);
      return res.json({
        tool: "pipeline_guard",
        tier: "basic",
        ...result,
      });
    }
    default:
      return res.status(400).json({
        error: `Unknown basic tool: ${tool}. Available: review_diff, pipeline_guard`,
      });
  }
});

// ── POST /mcp/premium ────────────────────────────────────────
//    Tools: generate_fix_patch (+ all basic tools)

app.post("/mcp/premium", (req: Request, res: Response) => {
  // ─ x402 gate ─
  if (!hasPaymentProof(req)) {
    return send402(res, PRICE_PREMIUM);
  }

  const { tool, diff, threshold } = req.body;

  if (!tool || !diff) {
    return res.status(400).json({
      error: "Missing required fields: tool, diff",
    });
  }

  switch (tool) {
    case "review_diff": {
      const result = reviewDiff(diff);
      return res.json({
        tool: "review_diff",
        tier: "premium",
        ...result,
      });
    }
    case "pipeline_guard": {
      const result = pipelineGuard(diff, threshold ?? 50);
      return res.json({
        tool: "pipeline_guard",
        tier: "premium",
        ...result,
      });
    }
    case "generate_fix_patch": {
      const fixes = generateFixSuggestions(diff);
      const review = reviewDiff(diff);
      return res.json({
        tool: "generate_fix_patch",
        tier: "premium",
        decision: review.decision,
        score: review.score,
        fixes,
      });
    }
    default:
      return res.status(400).json({
        error: `Unknown premium tool: ${tool}. Available: review_diff, pipeline_guard, generate_fix_patch`,
      });
  }
});

// ── Start ────────────────────────────────────────────────────

app.listen(PORT, HOST, () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║       Agent Code Risk MCP — HTTP Server          ║
╠══════════════════════════════════════════════════╣
║  Listening:  http://${HOST}:${PORT}                  ║
║  Basic:      POST /mcp/basic   (${PRICE_BASIC} USDC)     ║
║  Premium:    POST /mcp/premium (${PRICE_PREMIUM} USDC)      ║
║  Pay-to:     ${PAY_TO.slice(0, 10)}...  ║
║  Network:    ${NETWORK}                        ║
║  x402 mode:  manual (deterministic)              ║
╚══════════════════════════════════════════════════╝
  `);
});

export default app;
