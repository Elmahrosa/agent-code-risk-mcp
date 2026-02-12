cat > src/http/stats.ts <<'EOF'
export type Last24hWindow = {
  requests: number;
  blocked: number;
  windowStart: string;
};

export type StatsStore = {
  // Lifetime counters (per instance)
  totalRequests: number;
  paidRequests: number;
  blockedDecisions: number;

  // Unique IPs (per instance)
  uniqueIps: Set<string>;

  // Rolling 24h window (per instance)
  last24h: Last24hWindow;
};

export const stats: StatsStore = {
  totalRequests: 0,
  paidRequests: 0,
  blockedDecisions: 0,
  uniqueIps: new Set<string>(),
  last24h: {
    requests: 0,
    blocked: 0,
    windowStart: new Date().toISOString(),
  },
};

// Reset rolling window every 24 hours (per instance)
export function maybeReset24h(): void {
  const now = Date.now();
  const start = Date.parse(stats.last24h.windowStart);
  const HOURS_24 = 24 * 60 * 60 * 1000;

  if (Number.isFinite(start) && now - start < HOURS_24) return;

  stats.last24h = {
    requests: 0,
    blocked: 0,
    windowStart: new Date().toISOString(),
  };
}
EOF
