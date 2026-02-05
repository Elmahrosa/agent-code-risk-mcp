import "dotenv/config";
import express from "express";

import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { buildMcpServer } from "../mcp/server.js";

import { createHTTPResourceServer } from "@x402/core";
import { evmPaymentProcessor } from "@x402/evm";
import { paymentMiddleware } from "@x402/express";

async function main() {
  const app = express();
  app.use(express.json({ limit: "2mb" }));

  const PAY_TO = process.env.X402_PAY_TO!;
  const NETWORK = process.env.X402_NETWORK!;

  if (!PAY_TO || !NETWORK) {
    throw new Error("Missing X402_PAY_TO or X402_NETWORK");
  }

  // 🔹 Convert CAIP → numeric chainId
  const chainId =
    NETWORK.includes(":") ? Number(NETWORK.split(":")[1]) : Number(NETWORK);

  // 🔹 Create & initialize x402 resource server
  const resourceServer = createHTTPResourceServer({
    processor: evmPaymentProcessor({
      chainId,
      payTo: PAY_TO
    })
  });

  await resourceServer.initialize();

  // 🔹 x402-protected routes
  const routes = {
    "POST /mcp/basic": {
      description: "Agent Code Risk – Basic",
      price: "0.002",
      currency: "USDC"
    },
    "POST /mcp/premium": {
      description: "Agent Code Risk – Premium",
      price: "0.05",
      currency: "USDC"
    }
  };

  // ✅ CORRECT middleware call (4 args)
  app.use(
    paymentMiddleware(
      routes,
      resourceServer,
      {}, // options (required placeholder)
      {}  // express options (required placeholder)
    )
  );

  async function handleMcp(req: any, res: any, premium: boolean) {
    const server = buildMcpServer(premium);
    const transport = new StreamableHTTPServerTransport({});

    res.on("close", () => {
      try { transport.close(); } catch {}
      try { server.close(); } catch {}
    });

    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  }

  app.post("/mcp/basic", (req, res) =>
    handleMcp(req, res, false).catch(err => {
      console.error(err);
      if (!res.headersSent) res.status(500).json({ error: "Internal error" });
    })
  );

  app.post("/mcp/premium", (req, res) =>
    handleMcp(req, res, true).catch(err => {
      console.error(err);
      if (!res.headersSent) res.status(500).json({ error: "Internal error" });
    })
  );

  app.get("/", (_req, res) => {
    res.type("text/plain").send("Agent Code Risk MCP Server (x402 enabled)");
  });

  const port = Number(process.env.PORT || 8787);
  app.listen(port, () => {
    console.log(`Running on http://localhost:${port}`);
  });
}

main().catch(err => {
  console.error("Fatal startup error:", err);
});
