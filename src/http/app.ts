import "dotenv/config";
import express from "express";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { buildMcpServer } from "../mcp/server";
import { paymentMiddleware } from "@x402/express";

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

async function handleMcp(req: any, res: any, premium: boolean) {
  const server = buildMcpServer(premium);
  const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });

  res.on("close", () => {
    transport.close();
    server.close();
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
}

app.post("/mcp/basic", (req, res) => handleMcp(req, res, false).catch(err => {
  console.error(err);
  if (!res.headersSent) res.status(500).json({ error: "Internal error" });
}));

app.post("/mcp/premium", (req, res) => handleMcp(req, res, true).catch(err => {
  console.error(err);
  if (!res.headersSent) res.status(500).json({ error: "Internal error" });
}));

app.get("/", (_req, res) => res.send("Agent Code Risk MCP Server (x402 enabled)"));

app.listen(8787, () => console.log("Running on http://localhost:8787"));
