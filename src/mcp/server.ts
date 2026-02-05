cat > src/mcp/server.ts <<'TS'
import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { reviewDiff, pipelineGuard, generateFixPatch } from "../core/review.js";

export function buildMcpServer(premium = false) {
  const server = new McpServer({ name: "agent-code-risk", version: "0.1.0" });

  server.tool(
    "review_diff",
    "Scan a unified diff for risk signals (MVP heuristics).",
    { diff: z.string() },
    async ({ diff }) => ({
      content: [{ type: "text", text: JSON.stringify(reviewDiff(diff), null, 2) }]
    })
  );

  server.tool(
    "pipeline_guard",
    "Return ALLOW/BLOCK decision for CI/CD automation based on diff risk signals.",
    { diff: z.string() },
    async ({ diff }) => ({
      content: [{ type: "text", text: JSON.stringify(pipelineGuard(diff), null, 2) }]
    })
  );

  if (premium) {
    server.tool(
      "generate_fix_patch",
      "Generate structured fix steps (premium).",
      { diff: z.string() },
      async ({ diff }) => ({
        content: [{ type: "text", text: JSON.stringify(generateFixPatch(diff), null, 2) }]
      })
    );
  }

  return server;
}
TS
