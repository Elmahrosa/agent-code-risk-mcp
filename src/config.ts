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
    throw new Error(`Unsupported X402_NETWORK="${raw}". Supported: ${Object.keys(NETWORKS).join(", ")}`);
  }
  return raw as NetworkId;
}

export const config = {
  port: parseInt(optEnv("PORT", "3000"), 10),
  host: optEnv("HOST", "0.0.0.0"),

  networkId: resolveNetwork(),
  get network() {
    return NETWORKS[this.networkId];
  },

  payTo: reqEnv("X402_PAY_TO"),
  priceBasic: optEnv("PRICE_BASIC", "0.002"),
  pricePremium: optEnv("PRICE_PREMIUM", "0.05"),

  verifyOnChain: optEnv("X402_VERIFY_ONCHAIN", "0") === "1",
  confirmations: parseInt(optEnv("X402_CONFIRMATIONS", "2"), 10),

  get rpcUrl(): string {
    return optEnv("RPC_URL_BASE", NETWORKS[this.networkId].rpcUrl);
  },

  get usdcAddress(): string {
    return optEnv("USDC_ADDRESS", NETWORKS[this.networkId].usdcAddress);
  },
} as const;

export function printConfig(): void {
  console.log("┌─────────────────────────────────────────────┐");
  console.log("│  Agent Code Risk MCP — Config               │");
  console.log("├─────────────────────────────────────────────┤");
  console.log(`│  Network      : ${config.network.name} (${config.networkId})`);
  console.log(`│  Chain ID     : ${config.network.chainId}`);
  console.log(`│  Pay-to       : ${config.payTo}`);
  console.log(`│  USDC         : ${config.usdcAddress}`);
  console.log(`│  Price basic  : $${config.priceBasic} USDC`);
  console.log(`│  Price premium: $${config.pricePremium} USDC`);
  console.log(`│  Verify chain : ${config.verifyOnChain ? "ON" : "OFF (dev mode)"}`);
  console.log(`│  Confirmations: ${config.confirmations}`);
  console.log(`│  RPC          : ${config.rpcUrl}`);
  console.log("└─────────────────────────────────────────────┘");
}
