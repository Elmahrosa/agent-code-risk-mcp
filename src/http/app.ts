import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import { config, printConfig } from "../config";
import { x402PaymentGate } from "./x402Verify";
import { analyzeCode } from "../tools/analyzeCode";
import { scanDependencies } from "../tools/scanDependencies";
import { stats, maybeReset24h } from "./stats";
import { trackStats } from "./trackStats";

const BUILD_FINGERPRINT = "2026-02-17T-live-ping-enabled";

const app = express();
app.use(express.json({ limit: "1mb" }));
app.set("trust proxy", 1);

//
// ─────────────────────────────────────────────
// Root Landing
// ─────────────────────────────────────────────
//
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
          <li>GET <code>/ping</code></li>
          <li>GET <code>/health</code></li>
          <li>GET <code>/pricing</code></li>
          <li>GET <code>/stats</code></li>
          <li>POST <code>/analyze</code></li>
          <li>POST <code>/scan-dependencies</code></li>
        </ul>
      </body>
    </html>
  `);
});

//
// ─────────────────────────────────────────────
// Ping (Used by Telegram Bot)
// ─────────────────────────────────────────────
//
app.get("/ping", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    build: BUILD_FINGERPRINT,
    network: config.networkId,
    mode: (config as any).teosMode,
    requirePayment: (config as any).requirePayment,
    prices: {
      basic: Number(config.priceBasic),
      premium: Number(config.pricePremium),
      pipeline: Number((config as any).pricePipeline),
    },
    timestamp: new Date().toISOString(),
  });
});

//
// ─────────────────────────────────────────────
// Health
// ─────────────────────────────────────────────
//
app.get("/health", (_req: Request
