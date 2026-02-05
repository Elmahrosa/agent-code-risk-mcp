import "dotenv/config";
import express from "express";
import { mcpExpressHandler } from "@modelcontextprotocol/express";
import { paymentMiddleware } from "@x402/express";
import { buildMcpServer } from "../mcp/server";

const app = express();
app.use(express.json({ limit: "2mb" }));

const PAY_TO = process.env.X402_PAY_TO!;
const NETWORK = process.env.X402_NETWORK!;

app.use(
  paymentMiddleware({
    "POST /mcp/basic": {
      description: "Agent Code Risk – Basic",
      accepts: [{ scheme: "x402-evm", network: NETWORK, payTo: PAY_TO, amount: "0.002", currency: "USDC" }]
    },
    "POST /mcp/premium": {
      description: "Agent Code Risk – Premium",
      accepts: [{ scheme: "x402-evm", network: NETWORK, payTo: PAY_TO, amount: "0.05", currency: "USDC" }]
    }
  })
);

app.post("/mcp/basic", mcpExpressHandler(buildMcpServer(false)));
app.post("/mcp/premium", mcpExpressHandler(buildMcpServer(true)));

app.get("/", (_, res) => {
  res.send("Agent Code Risk MCP Server (x402 enabled)");
});

app.listen(8787, () => console.log("Running on http://localhost:8787"));
