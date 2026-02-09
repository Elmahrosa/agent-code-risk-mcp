
<div align="center">

# 🏺 Agent Code Risk MCP — TeosMcp  
### *Decision Firewall for Autonomous Systems*

**Autonomous systems fail differently than humans.**

🔴 **Agent leaks API key** → $10K+ stolen compute  
🔴 **Agent breaks authentication** → $100K data breach  
🔴 **Agent violates compliance** → $1M+ regulatory fine  

*These are not bugs. These are autonomous decisions executed without governance.*

**Agent Code Risk MCP prevents these failures BEFORE execution.**  
*Real-time prevention — not retrospective scanning.*

[![E2E Smoke Test](https://github.com/Elmahrosa/agent-code-risk-mcp/actions/workflows/e2e-smoke.yml/badge.svg?branch=main)](https://github.com/Elmahrosa/agent-code-risk-mcp/actions/workflows/e2e-smoke.yml)
[![Live API](https://img.shields.io/badge/Live%20API-Online-success?style=flat-square)](https://app.teosegypt.com/health)
[![TeosMcp](https://img.shields.io/badge/TeosMcp-Elmahrosa%20Blockchain-gold?style=flat-square)](https://github.com/Elmahrosa)
[![Powered by Base](https://img.shields.io/badge/Powered%20by-Base%20Network-0052FF?style=flat-square&logo=ethereum&logoColor=white)](https://base.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

🔗 [Live API](https://app.teosegypt.com) · [Pricing](https://app.teosegypt.com/pricing) · [GitHub](https://github.com/Elmahrosa/agent-code-risk-mcp)

</div>

---

## 📜 From Governance History to Agent Governance

From the **engineering precision of ancient Egypt** to modern cryptographic systems,  
TeosMcp applies one principle across millennia:

> **Critical actions require governance before execution.**

AI agents now write code, deploy systems, and move assets.  
**Agent Code Risk MCP** exists to ensure those decisions are safe *before they run*.

---

## 🎯 What This Is (and What It Is Not)

**Agent Code Risk MCP** is a **decision firewall** for autonomous systems.

- ❌ Not a static code scanner  
- ❌ Not a post-incident security report  
- ❌ Not a monthly SaaS subscription  

✅ **Real-time enforcement** at decision time  
✅ **Deterministic rules**, no ML hallucinations  
✅ **Built for agents, CI/CD, and MCP clients**

---

## 🔴 Public Free Testing — Closing Soon

**Free end-to-end testing is currently enabled.**  
No wallet. No gas. No USDC required.

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"eval(userInput)","mode":"basic"}'
````

⏳ **Free testing of the TEOS Decision Firewall closes soon.**

After launch:

* **$0.25** per agent decision
* **$0.50** per premium scan
* **$1.00** per pipeline gate

See live pricing anytime:

```bash
curl https://app.teosegypt.com/pricing
```

---

## 💰 Why This Pricing Exists

**Because the cost of ONE bad autonomous decision is never $0.25.**

* Leaked API key → thousands in stolen compute
* Broken auth → six-figure incident response
* Compliance violation → seven-figure fines

We price **governance per decision**, not per seat, repo, or month.

**Agents don’t subscribe. They decide.**
You only pay when the system acts.

---

## ✅ Live API Endpoints

| Endpoint             | Method | Purpose                       | Tier                       |
| -------------------- | ------ | ----------------------------- | -------------------------- |
| `/health`            | GET    | Status, mode, pricing         | Free                       |
| `/pricing`           | GET    | Live pricing & payment rules  | Free                       |
| `/analyze`           | POST   | Code risk analysis            | Basic / Premium / Pipeline |
| `/scan-dependencies` | POST   | Dependency vulnerability scan | Premium                    |

---

## 🛡️ Decision-Level Risk Categories

### 🔴 Critical (Auto-Blocked)

* Dynamic execution (`eval`, shell execution)
* Hardcoded secrets / private keys
* Injection primitives
* Unsafe deserialization

### 🟠 High

* XSS vectors
* Prototype pollution
* SSRF
* Authentication bypass patterns

### 🟡 Medium

* Weak cryptography
* Risky configuration
* Debug leftovers
* Deprecated dependencies

---

## 🚀 5-Minute Quickstart

### 1️⃣ Health & Mode

```bash
curl https://app.teosegypt.com/health
```

### 2️⃣ Analyze Code

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "code": "const x = eval(userInput);",
    "mode": "basic"
  }'
```

### 3️⃣ Dependency Scan

```bash
curl -X POST https://app.teosegypt.com/scan-dependencies \
  -H "Content-Type: application/json" \
  -d '{"manifest":"{\"dependencies\":{\"lodash\":\"4.17.15\"}}"}'
```

---

## 🔌 CI/CD Integration (Pipeline Gate)

```yaml
- name: Agent Code Risk Gate
  run: |
    RESPONSE=$(curl -s -X POST https://app.teosegypt.com/analyze \
      -H "Content-Type: application/json" \
      -d "{\"code\":\"$(git diff origin/main)\",\"mode\":\"pipeline\"}")

    echo "$RESPONSE" | jq -e '.blocked == false'
```

If a critical risk is detected → **the pipeline fails immediately**.

---

## ⚙️ Environment Configuration

```env
TEOS_MODE=production
REQUIRE_PAYMENT=1

PRICE_BASIC=0.25
PRICE_PREMIUM=0.50
PRICE_PIPELINE=1.00

X402_PAY_TO=0x6CB857A62f6a55239D67C6bD1A8ed5671605566D
X402_NETWORK=eip155:8453
X402_VERIFY_ONCHAIN=1
X402_CONFIRMATIONS=2

RPC_URL_BASE=https://mainnet.base.org
HOST=0.0.0.0
PORT=3000
```

---

## 📦 Repository Architecture

```
agent-code-risk-mcp/
├── src/
│   ├── core/        # Deterministic risk engine
│   ├── http/        # Express API + x402 gate
│   ├── mcp/         # MCP stdio server
│   ├── tools/       # Specialized analyzers
│   └── config.ts
├── scripts/         # E2E tests
├── .env.example
├── package.json
└── README.md
```

---

## 🧪 Test vs Production

| Feature               | Test             | Production             |
| --------------------- | ---------------- | ---------------------- |
| Payment               | Free             | USDC required          |
| On-chain verification | Disabled         | Enabled                |
| Rate limits           | None             | Tiered                 |
| Mode                  | `TEOS_MODE=test` | `TEOS_MODE=production` |

---

<div align="center">

**Built for autonomous systems that ship code.**
**Priced per decision — not per scan.**
**Governance before execution.** ⚡️

[🔴 Live API](https://app.teosegypt.com) · [💰 Pricing](https://app.teosegypt.com/pricing)

</div>

🚀
