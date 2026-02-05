import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { reviewDiff, pipelineGuard, generateFixPatch } from "../core/review";

export function buildMcpServer(premium = false) {
  const server = new McpServer({ name: "agent-code-risk", version: "0.1.0" });

  server.tool("review_diff", "Scan diff for risks", { diff: z.string() }, async ({ diff }) => ({
    content: [{ type: "text", text: JSON.stringify(reviewDiff(diff), null, 2) }]
  }));

  server.tool("pipeline_guard", "ALLOW/WARN/BLOCK", { diff: z.string() }, async ({ diff }) => ({
    content: [{ type: "text", text: JSON.stringify(pipelineGuard(diff), null, 2) }]
  }));

  if (premium) {
    server.tool("generate_fix_patch", "Premium fix plan", { diff: z.string() }, async ({ diff }) => ({
      content: [{ type: "text", text: JSON.stringify(generateFixPatch(diff), null, 2) }]
    }));
  }

  return server;
}
