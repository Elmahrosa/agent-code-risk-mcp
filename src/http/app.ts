import "dotenv/config";
import express from "express";
import { buildMcpServer } from "../mcp/server";

// ✅ Official MCP SDK Streamable HTTP transport
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";

// ✅ x402 middleware
import { paymentMiddleware } from "@x402/express";

const app = express();
app.use(express.json({ limit: "2mb" }));

const PAY_TO = process.env.X402_PAY_TO!;
const NETWORK = process.env.X402_NETWORK!;

if (!PAY_TO || !NETWORK) {
  throw new Error("Missing X402_PAY_TO or X402_NETWORK in env");
}

// x402 paywall: protects these routes
app.use(
  paymentMiddleware({
    "POST /mcp/basic": {
      description: "Agent Code Risk – Basic",
      accepts: [
        {
          scheme: "x402-evm",
          network: NETWORK,
          payTo: PAY_TO,
          amount: "0.002",
          currency: "USDC"
        }
      ]
    },
    "POST /mcp/premium": {
      description: "Agent Code Risk – Premium",
      accepts: [
        {
          scheme: "x402-evm",
          network: NETWORK,
          payTo: PAY_TO,
          amount: "0.05",
          currency: "USDC"
        }
      ]
    }
  })
);

async function handleMcp(req: any, res: any, premium: boolean) {
  const server = buildMcpServer(premium);

  // Create a fresh transport per request
  const transport = new StreamableHTTPServerTransport({
    // Let SDK handle sessions; simplest for MVP
    sessionIdGenerator: undefined
  });

  res.on("close", () => {
    try {
      transport.close();
    } catch {}
    try {
      server.close();
    } catch {}
  });

  await server.connect(transport);
  await transport.handleRequest(req, res, req.body);
}

app.post("/mcp/basic", (req, res) =>
  handleMcp(req, res, false).catch((err) => {
    console.error(err);
    if (!res.headersSent) res.status(500).json({ error: "Internal error" });
  })
);

app.post("/mcp/premium", (req, res) =>
  handleMcp(req, res, true).catch((err) => {
    console.error(err);
    if (!res.headersSent) res.status(500).json({ error: "Internal error" });
  })
);

app.get("/", (_req, res) => {
  res.type("text/plain").send(
    "Agent Code Risk MCP Server (x402 enabled)\n\nPOST /mcp/basic\nPOST /mcp/premium\n"
  );
});

const port = Number(process.env.PORT || 8787);
app.listen(port, () => console.log(`Running on http://localhost:${port}`));
