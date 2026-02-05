import { z } from "zod";
import { McpServer } from "@modelcontextprotocol/server";
import { reviewDiff, pipelineGuard, generateFixPatch } from "../core/review";

export function buildMcpServer(premium = false) {
  const server = new McpServer({
    name: "agent-code-risk",
    version: "0.1.0"
  });

  server.tool(
    "review_diff",
    "Scan a diff for security and logic risks",
    { diff: z.string() },
    async ({ diff }) => ({
      content: [{ type: "text", text: JSON.stringify(reviewDiff(diff), null, 2) }]
    })
  );

  server.tool(
    "pipeline_guard",
    "Return ALLOW or BLOCK decision for automation",
    { diff: z.string() },
    async ({ diff }) => ({
      content: [{ type: "text", text: JSON.stringify(pipelineGuard(diff), null, 2) }]
    })
  );

  if (premium) {
    server.tool(
      "generate_fix_patch",
      "Generate fix suggestions (premium)",
      { diff: z.string() },
      async ({ diff }) => ({
        content: [{ type: "text", text: JSON.stringify(generateFixPatch(diff), null, 2) }]
      })
    );
  }

  return server;
}
