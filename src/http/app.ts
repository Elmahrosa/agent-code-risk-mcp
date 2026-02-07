import dotenv from "dotenv";
dotenv.config();

import express, { Request, Response, NextFunction } from "express";
import { config, printConfig } from "../config";
import { x402PaymentGate } from "./x402Verify";
import { analyzeCode } from "../tools/analyzeCode";
import { scanDependencies } from "../tools/scanDependencies";

const app = express();
app.use(express.json({ limit: "1mb" }));

app.get("/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    version: "1.0.0",
    network: config.networkId,
    verifyOnChain: config.verifyOnChain,
    timestamp: new Date().toISOString(),
  });
});

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

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("[ERROR]", err.message, err.stack);
  res.status(500).json({ error: "Internal server error" });
});

app.listen(config.port, config.host, () => {
  printConfig();
  console.log(`\n🚀  HTTP server listening on ${config.host}:${config.port}\n`);
});

export { app };
