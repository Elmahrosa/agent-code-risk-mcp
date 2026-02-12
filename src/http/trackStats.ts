import type { NextFunction, Request, Response } from "express";
import { maybeReset24h, stats } from "./stats";

export function trackStats(req: Request, _res: Response, next: NextFunction) {
  maybeReset24h();
<<<<<<< HEAD

  // Count every request (including 402 responses from x402 gate)
=======
>>>>>>> 4de7caf (chore: finalize stats tracking implementation)
  stats.totalRequests++;
  stats.last24h.requests++;

  const ip =
    (req.headers["cf-connecting-ip"] as string) ||
    (req.headers["x-forwarded-for"] as string)?.split(",")[0]?.trim() ||
    req.ip ||
    "unknown";

  stats.uniqueIps.add(ip);
<<<<<<< HEAD

=======
>>>>>>> 4de7caf (chore: finalize stats tracking implementation)
  next();
}
