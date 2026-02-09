
<div align="center">

# 🏺 Agent Code Risk MCP — TeosMcp  
### *Egyptian history reborn through blockchain sovereignty*

[![E2E Smoke Test](https://github.com/Elmahrosa/agent-code-risk-mcp/actions/workflows/e2e-smoke.yml/badge.svg?branch=main)](https://github.com/Elmahrosa/agent-code-risk-mcp/actions/workflows/e2e-smoke.yml)
[![Live API](https://img.shields.io/badge/Live%20API-Online-success?style=flat-square)](https://app.teosegypt.com/health)
![TeosMcp](https://img.shields.io/badge/TeosMcp-Elmahrosa%20Blockchain-gold?style=plastic)
[![TEOS](https://img.shields.io/badge/TEOS-Governance%20by%20Design-blue?style=flat-square)](https://github.com/Elmahrosa)
[![Elmahrosa](https://img.shields.io/badge/Elmahrosa-Civic%20Blockchain%20Ecosystem-gold?style=flat-square)](https://github.com/Elmahrosa)
[![Powered by Base](https://img.shields.io/badge/Powered%20by-Base%20Network-0052FF?style=flat-square&logo=ethereum&logoColor=white)](https://base.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-informational?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

🔗 [Live API](https://app.teosegypt.com) · [Pricing](https://app.teosegypt.com/pricing) · [GitHub](https://github.com/Elmahrosa/agent-code-risk-mcp)

</div>

---

### 📜 Inspired by Egypt’s timeless legacy  
From the **precision of the Pyramids** to the **papyrus scrolls of governance**, TeosMcp carries Egypt’s heritage into the blockchain era.  
We safeguard code the way scribes safeguarded history — ensuring **security, compliance, and trust** across civilizations.

---

**Prevent AI agents from shipping insecure, unsafe, or non-compliant code.**  
Built for **CI/CD pipelines** and **autonomous agents** · **x402 pay-per-decision** · **On-chain ready** · **Tiered enforcement**

---

## 🔴 Public Free Testing — Closing Soon

**Free testing of the TEOS Decision Firewall is currently enabled.**  
No wallet, no gas, no payment required during the public test window.

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"eval(userInput)","mode":"basic"}'
````

⏳ **Free testing closes soon.**
After that, pricing will apply per autonomous decision.

---

## ✅ Live Status

| Endpoint             | Method | Description                                     |
| -------------------- | ------ | ----------------------------------------------- |
| `/health`            | GET    | Status, mode, pricing, network                  |
| `/pricing`           | GET    | Public pricing & payment metadata               |
| `/analyze`           | POST   | Code risk analysis (basic / premium / pipeline) |
| `/scan-dependencies` | POST   | Dependency vulnerability scan                   |

---

## 🎯 What This Is

**Agent Code Risk MCP** is a production-grade **decision firewall** for autonomous AI systems.

It detects unsafe code patterns **before execution, merge, or deployment** using deterministic heuristics and enforces **pay-per-decision governance** via the x402 standard.

This is **not** a generic scanner — it is a **control layer** for systems that act without human review.

---

## 🔑 Key Capabilities (5)

1. **Decision-Level Enforcement**
   Security checks are priced and enforced per autonomous decision.

2. **Agent-Native Design**
   Built for AI agents, MCP clients, and CI/CD automation.

3. **Public Pricing Discovery**
   `/pricing` exposes live prices, network, and payment rules.

4. **Optional On-Chain Verification**
   USDC transfers on Base can be fully verified or disabled in test mode.

5. **Stateless & Deterministic**
   No storage, no training, no telemetry — pure execution safety.

---

## 🚀 Quick Start

### Health & Pricing

```bash
curl https://app.teosegypt.com/health
curl https://app.teosegypt.com/pricing
```

### Analyze Code

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"const x = eval(userInput);","mode":"basic"}'
```

### Dependency Scan

```bash
curl -X POST https://app.teosegypt.com/scan-dependencies \
  -H "Content-Type: application/json" \
  -d '{"manifest":"{\"dependencies\":{\"lodash\":\"4.17.0\"}}","lockfile":""}'
```

---

## 💰 Pricing Model

Pricing is **live and discoverable** via:

```bash
curl https://app.teosegypt.com/pricing
```

### Current Pricing

⚠️ **Free testing of the TEOS Decision Firewall closes soon.**

After the public test window:

* **$0.25** per **agent decision** (Basic)
* **$0.50** per **premium scan**
* **$1.00** per **pipeline gate (CI/CD)**

### Tiers

| Tier         | Use Case                     | Endpoint                                          |
| ------------ | ---------------------------- | ------------------------------------------------- |
| **Basic**    | Agent decisions, fast checks | `/analyze` (`mode=basic`)                         |
| **Premium**  | Higher assurance             | `/analyze` (`mode=premium`), `/scan-dependencies` |
| **Pipeline** | CI/CD gates                  | `/analyze` (`mode=pipeline`)                      |

Each response includes:

```json
{
  "tier": "basic",
  "price_preview": 0.25,
  "payment_required": false,
  "result": { "...": "..." }
}
```

---

## 🧪 Test Mode vs Live Mode

The server supports **full end-to-end test mode**.

Check current state:

```bash
curl https://app.teosegypt.com/health
```

### Test Mode

* `TEOS_MODE=test`
* `REQUIRE_PAYMENT=0`
* `X402_VERIFY_ONCHAIN=0`
* No gas, no USDC required

### Live Mode

* `TEOS_MODE=production`
* `REQUIRE_PAYMENT=1`
* `X402_VERIFY_ONCHAIN=1`
* USDC on Base required

---

## 🛡️ Risk Categories

### Critical

* Dynamic execution (`eval`, shell)
* Hardcoded secrets
* Injection primitives
* Unsafe deserialization

### High

* XSS vectors
* Prototype pollution
* SSRF
* Auth bypass patterns

### Medium / Low

* Weak crypto
* Risky configs
* Debug leftovers
* Suppressed linting

---

## 📦 Repository Structure

```text
agent-code-risk-mcp/
├── src/
│   ├── core/           # Risk engine
│   ├── http/           # Express API + x402 gate
│   ├── mcp/            # MCP stdio server
│   ├── tools/          # Analysis modules
│   └── config.ts
├── .env.example
├── package.json
├── tsconfig.json
└── README.md
```

---

## ⚙️ Environment Variables (Core)

```env
# Mode
TEOS_MODE=test
REQUIRE_PAYMENT=0

# Pricing (USDC)
PRICE_BASIC=0.25
PRICE_PREMIUM=0.50
PRICE_PIPELINE=1.00

# x402
X402_PAY_TO=0x6CB857A62f6a55239D67C6bD1A8ed5671605566D
X402_NETWORK=eip155:8453
X402_VERIFY_ONCHAIN=0
X402_CONFIRMATIONS=2

# RPC
RPC_URL_BASE=https://mainnet.base.org

# Server
HOST=0.0.0.0
PORT=3000
```

---

## 🔌 CI/CD Example (Pipeline Tier)

```yaml
- name: Agent Risk Gate
  run: |
    curl -s -X POST https://app.teosegypt.com/analyze \
      -H "Content-Type: application/json" \
      -d "{\"code\":\"$(git diff origin/main...HEAD)\",\"mode\":\"pipeline\"}"
```

---

## 📜 License

MIT License — free to use, modify, and deploy.

---

<div align="center">

**Built for autonomous systems.**
**Priced per decision.**
**Governed by design.** ⚡️

[Try it](https://app.teosegypt.com) · [Pricing](https://app.teosegypt.com/pricing)

</div>
