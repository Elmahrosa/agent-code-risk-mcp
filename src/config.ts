// src/config.ts
import dotenv from "dotenv";
dotenv.config();

// ── CAIP-2 network registry ─────────────────────────────────────────
export const NETWORKS = {
  "eip155:8453": {
    name: "Base Mainnet",
    chainId: 8453,
    rpcUrl: "https://mainnet.base.org",
    usdcAddress: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
  },
  "eip155:84532": {
    name: "Base Sepolia",
    chainId: 84532,
    rpcUrl: "https://sepolia.base.org",
    usdcAddress: "0x036CbD53842c5426634e7929541eC2318f3dCF7e",
  },
} as const;

export type NetworkId = keyof typeof NETWORKS;
export type TeosMode = "test" | "live";

function reqEnv(key: string): string {
  const val = process.env[key];
  if (!val || val.trim() === "") throw new Error(`Missing required env var: ${key}`);
  return val.trim();
}

function optEnv(key: string, fallback: string): string {
  const val = process.env[key];
  return val && val.trim() !== "" ? val.trim() : fallback;
}

function resolveNetwork(): NetworkId {
  const raw = optEnv("X402_NETWORK", "eip155:8453");
  if (!(raw in NETWORKS)) {
    throw new Error(
      `Unsupported X402_NETWORK="${raw}". Supported: ${Object.keys(NETWORKS).join(", ")}`
    );
  }
  return raw as NetworkId;
}

function resolveMode(): TeosMode {
  const raw = optEnv("TEOS_MODE", "live").toLowerCase();
  return raw === "test" ? "test" : "live";
}

function resolveBool01(key: string, fallback01: "0" | "1"): boolean {
  const raw = optEnv(key, fallback01).trim();
  return raw === "1" || raw.toLowerCase() === "true" || raw.toLowerCase() === "yes";
}

export const config = {
  // Server
  port: parseInt(optEnv("PORT", "8000"), 10),
  host: optEnv("HOST", "0.0.0.0"),

  // Mode / gating
  teosMode: resolveMode(), // "test" | "live"
  requirePayment: resolveBool01("TEOS_REQUIRE_PAYMENT", "1"),

  // Network
  networkId: resolveNetwork(),
  get network() {
    return NETWORKS[this.networkId];
  },

  // Payment settings
  payTo: reqEnv("X402_PAY_TO"),
  verifyOnChain: resolveBool01("X402_VERIFY_ONCHAIN", "0"),
  confirmations: parseInt(optEnv("X402_CONFIRMATIONS", "2"), 10),

  // Pricing
  priceBasic: optEnv("PRICE_BASIC", "0.25"),
  pricePremium: optEnv("PRICE_PREMIUM", "0.50"),
  pricePipeline: optEnv("PRICE_PIPELINE", "1.00"),

  // RPC / USDC overrides
  get rpcUrl(): string {
    return optEnv("RPC_URL_BASE", NETWORKS[this.networkId].rpcUrl);
  },

  get usdcAddress(): string {
    // allow override via USDC_ADDRESS; else network default
    return optEnv("USDC_ADDRESS", NETWORKS[this.networkId].usdcAddress);
  },
} as const;

export function printConfig(): void {
  console.log("┌─────────────────────────────────────────────┐");
  console.log("│  Agent Code Risk MCP — Config               │");
  console.log("├─────────────────────────────────────────────┤");
  console.log(`│  Mode         : ${config.teosMode}`);
  console.log(`│  Require Pay  : ${config.requirePayment ? "ON" : "OFF"}`);
  console.log(`│  Network      : ${config.network.name} (${config.networkId})`);
  console.log(`│  Chain ID     : ${config.network.chainId}`);
  console.log(`│  Pay-to       : ${config.payTo}`);
  console.log(`│  USDC         : ${config.usdcAddress}`);
  console.log(`│  Price basic  : $${config.priceBasic} USDC`);
  console.log(`│  Price premium: $${config.pricePremium} USDC`);
  console.log(`│  Price pipe   : $${config.pricePipeline} USDC`);
  console.log(`│  Verify chain : ${config.verifyOnChain ? "ON" : "OFF (dev/test)"}`);
  console.log(`│  Confirmations: ${config.confirmations}`);
  console.log(`│  RPC          : ${config.rpcUrl}`);
  console.log("└─────────────────────────────────────────────┘");
}
