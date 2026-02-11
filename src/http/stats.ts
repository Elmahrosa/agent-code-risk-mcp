// src/http/stats.ts
export interface StatsData {
  totalRequests: number;
  uniqueIps: Set<string>;
  paidRequests: number;
  blockedDecisions: number;
  last24h: {
    requests: number;
    blocked: number;
    windowStartMs: number;
  };
}

export const stats: StatsData = {
  totalRequests: 0,
  uniqueIps: new Set<string>(),
  paidRequests: 0,
  blockedDecisions: 0,
  last24h: {
    requests: number;
    blocked: number;
    windowStartMs: Date.now(),
  },
};

export function maybeReset24h() {
  const now = Date.now();
  const dayMs = 24 * 60 * 60 * 1000;

  if (now - stats.last24h.windowStartMs >= dayMs) {
    stats.last24h.requests = 0;
    stats.last24h.blocked = 0;
    stats.last24h.windowStartMs = now;
  }
}
