# Agent Code Risk MCP

**Agent Code Risk MCP** is a lightweight **MCP-compatible server** that helps AI agents and CI/CD pipelines detect risky code changes **before merge or deployment**.

Designed for **AI agent builders**, **DevOps pipelines**, and **automated reviewers** who need **fast, deterministic risk signals** with **pay-per-request (x402)** pricing.

---

## 📦 Repository Structure

```text
.
├── src/
│   ├── core/
│   │   └── review.ts       # Heuristic risk engine
│   ├── http/
│   │   └── app.ts          # Express HTTP API with manual x402 gating
│   └── mcp/
│       └── server.ts       # MCP stdio JSON-RPC server
├── .env.example            # Config template
├── .gitignore              # Git safety
├── tsconfig.json           # TypeScript config
├── package.json            # Dependencies & scripts
└── README.md               # Documentation
````

---

## 🚀 What This Does

### MCP Tools

* **review_diff** — scans a unified diff and flags risky patterns.
* **pipeline_guard** — CI/CD gate that returns `ALLOW` or `BLOCK`.
* **generate_fix_patch** *(premium)* — generates structured remediation suggestions.

---

## 🧭 What `review_diff` Detects

`review_diff` scans **unified diffs** and flags common high-risk patterns. It is intentionally fast and deterministic (heuristic-based), optimized for CI/CD loops.

### Detection categories (MVP)

* **Injection & dynamic execution** — `eval`, `Function(...)`, `exec`, shell injection patterns, unsafe SQL/command interpolation.
* **Secrets & credential leakage** — API keys, tokens, private keys, `.env` exposures, high-entropy strings, key prefixes (e.g., AWS `AKIA...`).
* **Unsafe deserialization** — `pickle.loads`, `yaml.load` without safe loader, `unserialize`.
* **Insecure crypto usage** — MD5/SHA-1, `Math.random`, hardcoded salts.
* **Authentication/authorization risk** — bypass patterns, disabling auth checks, permissive ACL changes.
* **Network & SSRF risk** — URLs from variables, raw forwarding, open redirects.
* **Dangerous dependency or config changes** — weakened security headers, permissive CORS, TLS verification disabled, risky CI patterns.

### Outputs

* `decision`: `ALLOW | WARN | BLOCK`
* `score`: `0–100` risk score
* `findings[]`: structured items with `severity`, `evidence`, `recommendation`

### Limitations

* Not a full static analyzer or formal security audit.
* Diff-text inspection only (no AST/runtime tracing).
* Best used as a pipeline guardrail and triage signal.

---

## 🌐 HTTP Endpoints

* `POST /mcp/basic` → `review_diff`, `pipeline_guard`
* `POST /mcp/premium` → all basic tools + `generate_fix_patch`

---

## 💰 Pricing (x402)

| Tier                   | Price          |
| ---------------------- | -------------- |
| Basic scan             | **0.002 USDC** |
| Premium fix generation | **0.05 USDC**  |

### x402 flow

1. Server returns `402 Payment Required`
2. Client pays
3. Client retries with payment proof

No subscriptions. No accounts. Fully agent-native.

---

## 🧠 Why Manual x402 (by design)

This project uses **manual x402 responses** instead of heavy middleware:

* ✅ Deterministic
* ✅ Stateless
* ✅ CI/CD friendly
* ✅ No SDK version traps
* ✅ Easy for agents to reason about

> Manual x402 is ideal for CI/CD: no sessions, no keys, deterministic
> **request → 402 → pay → retry**
> 
**Payment Verification:** Production mode verifies USDC payments on-chain via JSON-RPC (checks transaction receipt, confirmations, Transfer events, and payment amount). Set `X402_VERIFY_ONCHAIN=0` for local development/testing.
---

## 🔧 Setup

### 1) Install

```bash
npm install
```

### 2) Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
X402_PAY_TO=0x3dbc6b72a69898a5ba0f1ec7312abf3c6272c86e
X402_NETWORK=eip155:8453
PRICE_BASIC=0.002
PRICE_PREMIUM=0.05
PORT=3000
HOST=0.0.0.0
```

> Use `eip155:84532` for Base Sepolia testing.

### 3) Build

```bash
npm run build
```

---

## ▶️ Run

### HTTP server (prod)

```bash
npm start
```

### HTTP server (dev)

```bash
npm run dev
```

### MCP server (stdio, prod)

```bash
npm run start:mcp
```

### MCP server (stdio, dev)

```bash
npm run dev:mcp
```

---

## 🔌 Example: Basic Scan

### Request (first call returns 402)

```bash
curl -i -X POST http://localhost:3000/mcp/basic \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "review_diff",
    "diff": "+ eval(userInput)"
  }'
```

### Typical 402 response

```http
HTTP/1.1 402 Payment Required
Content-Type: application/json

{
  "status": 402,
  "payment": {
    "amount": "0.002",
    "currency": "USDC",
    "network": "eip155:8453",
    "payTo": "0x3dbc6b72a69898a5ba0f1ec7312abf3c6272c86e",
    "hint": "Pay then retry with x-402-payment-tx header containing your tx hash."
  }
}
```

### Retry with proof header

```bash
curl -i -X POST http://localhost:3000/mcp/basic \
  -H "Content-Type: application/json" \
  -H "x-402-payment-tx: 0xYOUR_TX_HASH" \
  -d '{
    "tool": "review_diff",
    "diff": "+ eval(userInput)"
  }'
```

### Successful response (200)

```json
{
  "tool": "review_diff",
  "tier": "basic",
  "decision": "WARN",
  "score": 25,
  "findings": [
    {
      "id": "INJECTION.EVAL",
      "severity": "HIGH",
      "title": "Dynamic code execution detected",
      "evidence": "eval(userInput)",
      "recommendation": "Remove eval; use a safe parser or allowlist."
    }
  ]
}
```

---

## 🤖 MCP Integration (stdio)

Supports:

* `tools/list` for discovery
* `tools/call` for execution

Startup logs go to **stderr** so stdout remains clean JSON-RPC.

---

## 🛡️ Security Notes

* `.env` is gitignored
* Wallet address is public-safe
* No private keys stored
* No signing performed on server
* MVP does not verify payment proof on-chain (header presence only)

---

## 📈 Use Cases

* CI/CD pipeline gates
* AI code review agents
* Pre-merge security checks
* Autonomous DevOps bots
* Agent marketplaces

---

## 📜 License

MIT — use freely, modify, deploy, monetize.
