
# Agent Code Risk MCP

**Agent Code Risk MCP** is a lightweight **MCP-compatible server** that helps AI agents and CI/CD pipelines detect risky code changes **before merge or deployment**.

It is designed for **AI agent builders**, **DevOps pipelines**, and **automated reviewers** who need **fast, deterministic risk signals** with **pay-per-request (x402)** pricing.

---

## 📦 Repository Structure

```

.
├── index.js            # MCP server (stdio)
├── http-server.js      # HTTP API with /mcp/basic and /mcp/premium
├── test.js             # Complete test suite
├── package.json        # Dependencies & scripts
├── launch.sh           # One-command launcher
├── README.md           # Documentation
├── .env.example        # Config template
└── .gitignore          # Git safety

````

---

## 🚀 What This Does

### MCP Tools

- **review_diff**  
  Scans a unified diff and flags risky patterns.

- **pipeline_guard**  
  Returns `ALLOW` or `BLOCK` for CI/CD automation.

- **generate_fix_patch** *(premium)*  
  Suggests structured remediation steps.

---

## 🧭 What `review_diff` Detects

`review_diff` scans **unified diffs** and flags common high-risk patterns.  
It is intentionally fast and deterministic (heuristic-based), optimized for CI/CD loops.

### Detection categories (MVP)

- **Injection & dynamic execution**  
  `eval`, `Function(...)`, `exec`, shell injection patterns, unsafe SQL/command interpolation.

- **Secrets & credential leakage**  
  API keys, tokens, private keys, `.env` exposures, high-entropy strings, known key prefixes.

- **Unsafe deserialization**  
  `pickle.loads`, `yaml.load` without safe loader, similar constructs.

- **Insecure crypto usage**  
  Weak hashes (e.g. MD5), insecure random, hardcoded salts.

- **Authentication / authorization risk**  
  Auth bypasses, disabled checks, permissive ACL changes.

- **Network & SSRF risk**  
  Untrusted URLs, raw request forwarding, open redirects.

- **Dangerous dependency or config changes**  
  Disabled security headers, relaxed CORS, TLS verification off, risky CI changes.

### Outputs

- `decision`: `ALLOW | WARN | BLOCK`
- `score`: `0–100` risk score
- `findings[]`: structured items with `severity`, `evidence`, and `recommendation`

### Limitations

- Not a full static analyzer or formal audit
- Diff-only inspection (no AST or runtime tracing)
- Best used as a **pipeline guardrail**, not a replacement for audits

---

## 🌐 HTTP Endpoints

- `POST /mcp/basic` → basic tools (cheap, high-volume)
- `POST /mcp/premium` → includes fix generation

---

## 💰 Pricing (x402)

| Tier | Price |
|----|----|
| Basic scan | **0.002 USDC** |
| Premium fix generation | **0.05 USDC** |

**x402 flow:**

1. Server returns `402 Payment Required`
2. Client pays
3. Request is retried with payment proof

No subscriptions. No accounts. Fully agent-native.

---

## 🧠 Why Manual x402 (by design)

This project intentionally uses **manual x402 responses** instead of heavy middleware:

- ✅ Deterministic
- ✅ Stateless
- ✅ CI/CD friendly
- ✅ No SDK version traps
- ✅ Easy for agents to reason about

> Manual x402 is ideal for CI/CD: no sessions, no keys, deterministic  
> **request → 402 → pay → retry**

Agents **expect** to handle `402`. This is not a workaround — it’s a feature.

---

## 🔧 Setup

### 1️⃣ Install

```bash
npm install
````

### 2️⃣ Configure environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
X402_PAY_TO=0xYOUR_WALLET_ADDRESS
X402_NETWORK=eip155:8453
```

> Use `eip155:84532` for Base Sepolia testing.

---

## ▶️ Run

### MCP (stdio)

```bash
node index.js
```

### HTTP server

```bash
node http-server.js
```

or

```bash
./launch.sh
```

---

## 🧪 Testing

```bash
node test.js
```

Covers:

* Free path
* 402 response
* Paid retry simulation
* Tool correctness

---

## 🔌 Example: Basic Scan

```bash
curl -X POST http://localhost:3000/mcp/basic \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "review_diff",
    "diff": "+ eval(userInput)"
  }'
```

**Response (402):**

```json
{
  "status": 402,
  "payment": {
    "amount": "0.002",
    "currency": "USDC",
    "network": "eip155:8453",
    "payTo": "0x..."
  }
}
```

---

## ✅ Example: Full x402 Round-Trip

### Step 1 — Initial request (expected 402)

```bash
curl -i -X POST http://localhost:3000/mcp/basic \
  -H "Content-Type: application/json" \
  -d '{
    "tool": "review_diff",
    "diff": "+ eval(userInput)"
  }'
```

### Step 2 — Pay

Agent pays **0.002 USDC** to `payTo` on the specified network.

### Step 3 — Retry with payment proof

```bash
curl -i -X POST http://localhost:3000/mcp/basic \
  -H "Content-Type: application/json" \
  -H "X402-PAYMENT-TX: 0xYOUR_TX_HASH_OR_PROOF" \
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
  "score": 72,
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

> Header name may vary (`X402-PAYMENT-TX` or similar).
> Requirement: **retry with valid payment proof**.

---

## 🤖 MCP Integration

Agents can:

* Use `tools/list`
* Call tools directly
* Handle `402` automatically
* Retry after payment

Works with:

* Custom agents
* MCP-compatible frameworks
* CI/CD bots

---

## 🛡️ Security Notes

* `.env` is gitignored
* Wallet address is public-safe
* No private keys stored
* No signing on server

---

## 📈 Use Cases

* CI/CD pipeline guards
* AI code review agents
* Pre-merge security checks
* Autonomous DevOps bots
* Agent marketplaces

---

## 📜 License

MIT — use freely, modify, deploy, monetize.

```
