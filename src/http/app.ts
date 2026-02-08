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
// Root landing page (fixes "Cannot GET /")
// ─────────────────────────────────────────────
app.get("/", (_req: Request, res: Response) => {
  res.type("html").send(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8" />
        <title>Agent Code Risk MCP</title>
        <style>
          body { font-family: system-ui, Arial; max-width: 800px; margin: 40px auto; }
          code { background: #f5f5f5; padding: 2px 6px; border-radius: 4px; }
        </style>
      </head>
      <body>
        <h1>Agent Code Risk MCP</h1>
        <p>Status: <b>Online ✅</b></p>
        <ul>
          <li>GET <code>/health</code></li>
          <li>POST <code>/analyze</code></li>
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
    timestamp: new Date().toISOString(),
  });
});

// ─────────────────────────────────────────────
// Analyze code (paid via x402)
// ─────────────────────────────────────────────
app.post(
  "/analyze",
  x402PaymentGate,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { code, language, context } = req.body;
      if (!code || typeof code !== "string") {
        res.status(400).json({ error: "Missing `code` string in request body" });
        return;
      }
      const result = await analyzeCode(code, language, context);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

// ─────────────────────────────────────────────
// Scan dependencies (paid via x402)
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
      const result = await scanDependencies(manifest, lockfile);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }
);

// ─────────────────────────────────────────────
// Error handler
// ─────────────────────────────────────────────
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[ERROR]", err.message, err.stack);
  res.status(500).json({ error: "Internal server error" });
});

// ─────────────────────────────────────────────
// Start server (Koyeb-compatible)
// ─────────────────────────────────────────────
app.listen(config.port, config.host, () => {
  printConfig();
  console.log(`\n🚀  HTTP server listening on ${config.host}:${config.port}\n`);
});

export { app };
