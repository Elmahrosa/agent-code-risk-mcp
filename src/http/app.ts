// src/http/app.ts
import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import { config, printConfig } from "../config";
import { x402PaymentGate } from "./x402Verify";
import { analyzeCode } from "../tools/analyzeCode";
import { scanDependencies } from "../tools/scanDependencies";

const app = express();
app.use(express.json({ limit: "1mb" }));

// ─────────────────────────────────────────────
// Root landing page
// ─────────────────────────────────────────────
app.get("/", (_req: Request, res: Response) => {
  res.type("html").send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Agent Code Risk MCP</title>
        <style>
          body { font-family: system-ui, Arial; max-width: 900px; margin: 40px auto; }
          code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>Agent Code Risk MCP</h1>
        <p>Status: <b>Online ✅</b></p>
        <ul>
          <li>GET <code>/health</code></li>
          <li>GET <code>/pricing</code></li>
          <li>POST <code>/analyze</code>  (body.mode: basic|premium|pipeline)</li>
          <li>POST <code>/scan-dependencies</code></li>
        </ul>
      </body>
    </html>
  `);
});

// ─────────────────────────────────────────────
// Health check
// ─────────────────────────────────────────────
app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    version: "1.0.0",
    network: config.networkId,
    verifyOnChain: config.verifyOnChain,
    mode: config.teosMode,
    requirePayment: config.requirePayment,
    prices: {
      basic: Number(config.priceBasic),
      premium: Number(config.pricePremium),
      pipeline: Number(config.pricePipeline),
    },
    timestamp: new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────
// Pricing endpoint (so users can see pricing)
// ─────────────────────────────────────────────
app.get("/pricing", (_req: Request, res: Response) => {
  res.json({
    mode: config.teosMode,
    requirePayment: config.requirePayment,
    network: {
      id: config.networkId,
      name: config.network.name,
      chainId: config.network.chainId,
    },
    payment: {
      token: "USDC",
      decimals: 6,
      contract: config.usdcAddress,
      payTo: config.payTo,
      confirmations: config.confirmations,
      verifyOnChain: config.verifyOnChain,
    },
    prices: {
      basic: Number(config.priceBasic),
      premium: Number(config.pricePremium),
      pipeline: Number(config.pricePipeline),
    },
  });
});

// ─────────────────────────────────────────────
// Analyze code (paid via x402 unless test mode)
// ─────────────────────────────────────────────
app.post(
  "/analyze",
  x402PaymentGate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, language, context, mode } = req.body;
      if (!code || typeof code !== "string") {
        res.status(400).json({ error: "Missing `code` string in request body" });
        return;
      }

      const tier =
        String(mode || "basic").toLowerCase() === "premium"
          ? "premium"
          : String(mode || "basic").toLowerCase() === "pipeline"
          ? "pipeline"
          : "basic";

      const price_preview =
        tier === "premium"
          ? Number(config.pricePremium)
          : tier === "pipeline"
          ? Number(config.pricePipeline)
          : Number(config.priceBasic);

      const result = await analyzeCode(code, language, context);

      // ✅ Always include tier + pricing preview (useful in test mode and even live mode)
      res.json({
        tier,
        price_preview,
        payment_required: config.requirePayment && config.teosMode !== "test",
        result,
      });
    } catch (err) {
      next(err);
    }
  }
);

// ─────────────────────────────────────────────
// Scan dependencies (paid via x402 unless test mode)
// ─────────────────────────────────────────────
app.post(
  "/scan-dependencies",
  x402PaymentGate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { manifest, lockfile } = req.body;
      if (!manifest || typeof manifest !== "string") {
        res.status(400).json({ error: "Missing `manifest` string in request body" });
        return;
      }

      const tier = "premium";
      const price_preview = Number(config.pricePremium);

      const result = await scanDependencies(manifest, lockfile);

      res.json({
        tier,
        price_preview,
        payment_required: config.requirePayment && config.teosMode !== "test",
        result,
      });
    } catch (err) {
      next(err);
    }
  }
);

// ─────────────────────────────────────────────
// 404 JSON (no HTML)
// ─────────────────────────────────────────────
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: "Not Found", path: req.path });
});

// ─────────────────────────────────────────────
// Error handler
// ─────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[ERROR]", err.message, err.stack);
  res.status(500).json({ error: "Internal server error", message: err.message });
});

// ─────────────────────────────────────────────
// Start server (Koyeb-compatible)
// ─────────────────────────────────────────────
app.listen(config.port, config.host, () => {
  printConfig();
  console.log(`\n🚀  HTTP server listening on ${config.host}:${config.port}\n`);
});

export { app };
