// src/http/x402Verify.ts
import { createPublicClient, http, parseAbiItem, getAddress } from "viem";
import { base } from "viem/chains";

const TRANSFER_EVENT = parseAbiItem(
  "event Transfer(address indexed from, address indexed to, uint256 value)"
);

function reqEnv(name: string): string {
  const v = process.env[name];
  if (!v) throw new Error(`Missing env: ${name}`);
  return v;
}

function getClientForNetwork(network: string) {
  // Only implementing Base mainnet (8453) right now
  if (network !== "eip155:8453") {
    throw new Error(`Unsupported network for on-chain verify: ${network}`);
  }
  const rpc = reqEnv("RPC_URL_BASE");
  return createPublicClient({ chain: base, transport: http(rpc) });
}

function getUsdcForNetwork(network: string): `0x${string}` {
  if (network === "eip155:8453") return getAddress(reqEnv("USDC_ADDRESS_8453"));
  throw new Error(`Unsupported network for USDC address: ${network}`);
}

/**
 * Verifies that txHash contains a USDC Transfer(to=PAY_TO, value>=requiredUnits)
 * and has at least N confirmations and succeeded.
 */
export async function verifyX402PaymentOnchain(opts: {
  txHash: string;
  payTo: string;
  network: string;
  requiredUnits: bigint; // USDC has 6 decimals (0.002 => 2000n)
  minConfirmations: number;
}): Promise<{ ok: true; paidUnits: bigint; from?: string } | { ok: false; reason: string }> {
  try {
    const { txHash, payTo, network, requiredUnits, minConfirmations } = opts;

    if (!/^0x([A-Fa-f0-9]{64})$/.test(txHash)) {
      return { ok: false, reason: "Invalid tx hash format" };
    }

    const client = getClientForNetwork(network);
    const usdc = getUsdcForNetwork(network);
    const payToChecksum = getAddress(payTo);

    const receipt = await client.getTransactionReceipt({ hash: txHash as `0x${string}` });

    if (!receipt) return { ok: false, reason: "Transaction receipt not found" };
    if (receipt.status !== "success") return { ok: false, reason: "Transaction failed/reverted" };

    // confirmations
    const latest = await client.getBlockNumber();
    const conf = latest - receipt.blockNumber + 1n;
    if (Number(conf) < minConfirmations) {
      return { ok: false, reason: `Not enough confirmations: have ${conf.toString()}, need ${minConfirmations}` };
    }

    // parse USDC Transfer logs
    const transfers = receipt.logs
      .filter((l) => getAddress(l.address) === usdc)
      .map((l) => {
        try {
          return {
            ...l,
            decoded: client.chain?.id
              ? (null as any)
              : null,
          };
        } catch {
          return null;
        }
      });

    // decode safely using viem helper
    // (do it in a loop to avoid a single bad log breaking everything)
    let paid = 0n;
    let payer: string | undefined;

    for (const log of receipt.logs) {
      if (getAddress(log.address) !== usdc) continue;

      try {
        const decoded = (await import("viem")).decodeEventLog({
          abi: [TRANSFER_EVENT],
          data: log.data,
          topics: log.topics,
        });

        if (decoded.eventName !== "Transfer") continue;

        const from = getAddress(decoded.args.from as string);
        const to = getAddress(decoded.args.to as string);
        const value = BigInt(decoded.args.value as any);

        if (to === payToChecksum) {
          paid += value;
          if (!payer) payer = from;
        }
      } catch {
        // ignore non-matching logs
      }
    }

    if (paid < requiredUnits) {
      return { ok: false, reason: `Insufficient USDC paid: got ${paid.toString()} units, need ${requiredUnits.toString()} units` };
    }

    return { ok: true, paidUnits: paid, from: payer };
  } catch (e: any) {
    return { ok: false, reason: e?.message || "Verification error" };
  }
}
