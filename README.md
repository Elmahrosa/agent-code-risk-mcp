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
```

---

## 🚀 What This Does

### MCP Tools

* **review_diff**
  Scans a unified diff and flags risky patterns.

* **pipeline_guard**
  Returns `ALLOW` or `BLOCK` for CI/CD automation.

* **generate_fix_patch** *(premium)*
  Suggests structured remediation steps.

### HTTP Endpoints

* `POST /mcp/basic` → basic tools (cheap, high-volume)
* `POST /mcp/premium` → includes fix generation

---

## 💰 Pricing (x402)

| Tier                   | Price          |
| ---------------------- | -------------- |
| Basic scan             | **0.002 USDC** |
| Premium fix generation | **0.05 USDC**  |

Payments follow the **x402 protocol**:

* Server returns `402 Payment Required`
* Client pays
* Request is retried with proof

No subscriptions. No accounts. Fully agent-native.

---

## 🧠 Why Manual x402 (by design)

This project intentionally uses **manual x402 responses** instead of heavy middleware:

* ✅ Deterministic
* ✅ Stateless
* ✅ CI/CD friendly
* ✅ No SDK version traps
* ✅ Easy for agents to reason about

Agents **expect** to handle `402` — this is not a workaround, it’s a feature.

---

## 🔧 Setup

### 1️⃣ Install

```bash
npm install
```

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

Response:

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

---
