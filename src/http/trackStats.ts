cat > src/http/trackStats.ts <<'EOF'
import type { NextFunction, Request, Response } from "express";
import { maybeReset24h, stats } from "./stats";

// Runs BEFORE x402PaymentGate so it counts even when 402 happens.
export function trackStats(req: Request, _res: Response, next: NextFunction) {
  maybeReset24h();

  // Count request (including 402)
  stats.totalRequests++;
  stats.last24h.requests++;

  // Determine best client IP (Cloudflare > XFF > req.ip)
  const ip =
    (req.headers["cf-connecting-ip"] as string) ||
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.ip ||
    "unknown";

  stats.uniqueIps.add(ip);

  next();
}
EOF
