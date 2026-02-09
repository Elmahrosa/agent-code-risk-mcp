<div align="center">

# 🏺 Agent Code Risk MCP — TeosMcp

### *Decision Firewall for Autonomous Systems*

> **Fail-Fast is Key**  
> In autonomous systems, delayed detection equals damage.  
> Agent Code Risk MCP is designed to **block unsafe decisions immediately**, not report them after execution.

**Agent Code Risk MCP prevents these failures BEFORE execution.**  
*Real-time prevention — not retrospective scanning.*

*Traditional scanners report risk. Agent Code Risk MCP **enforces decisions**.*

![Governance Primitive](https://img.shields.io/badge/Category-Governance%20Primitive-gold?style=flat-square)
[![Live API](https://img.shields.io/badge/Live%20API-✅%20Online-brightgreen?style=flat-square)](https://app.teosegypt.com/health)
[![Pricing](https://img.shields.io/badge/Pricing-Live-1E90FF?style=flat-square&logo=usdcoin&logoColor=white)](https://app.teosegypt.com/pricing)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square)](LICENSE)

🔗 [Live API](https://app.teosegypt.com) · [Pricing](https://app.teosegypt.com/pricing) · [GitHub](https://github.com/Elmahrosa/agent-code-risk-mcp) · 🔐 [Security Model](SECURITY.md)

</div>

---

## 🔐 Deterministic Governance (Why This Is Different)

Agent Code Risk MCP is **not a scanner**.  
It is a **deterministic decision system**.

**Same input → same output → provable enforcement**

- 🔒 **Deterministic results** — no stochastic AI decisions  
- 🧾 **Machine-readable outcomes** — `ALLOW | WARN | BLOCK`  
- 🔏 **Governance-ready** — decisions are logged and auditable  
- ⚡ **Fail-fast by design** — no runtime execution on CRITICAL risk  

**Machine-enforceable first. Human-readable second.**

> Suitable for **regulated AI**, **enterprise DevSecOps**, and **sovereign digital infrastructure**.

---

## 🚨 Why This Exists

**Autonomous systems fail differently than humans.**

🔴 **Agent leaks API key** → $10K+ stolen compute  
🔴 **Agent breaks authentication** → $100K data breach  
🔴 **Agent violates compliance** → $1M+ regulatory fine  

*These are not bugs. These are autonomous decisions executed without governance.*

---

## 🎯 What It Does

**Agent Code Risk MCP** is a **production-grade decision firewall** that:

✅ **Blocks** `eval()`, secrets, injections **before execution**  
✅ **Enforces** via **machine-readable BLOCK decisions** (not reports)  
✅ **Optionally enforces** decisions via **x402 pay-per-decision** on Base  
✅ **Integrates** with AI agents, CI/CD pipelines, and autonomous systems  

```text
Agent generates code → MCP → BLOCK / ALLOW → Safe execution
                      ↓
                   Governance enforced
````

**Key difference:** deterministic rules → **immediate blocking**, not probabilistic advice.

---

## 👥 Who Needs This

| Role               | Problem Solved             | Integration          |
| ------------------ | -------------------------- | -------------------- |
| **AI Builders**    | Agents writing unsafe code | Claude Desktop MCP   |
| **DevOps**         | Risky diffs entering CI    | GitHub Actions       |
| **Security Teams** | Enforcement vs reporting   | `/analyze` API       |
| **Web3 / DeFi**    | Autonomous execution risk  | Pre-deploy gate      |
| **Founders**       | Agent-caused outages       | Zero-trust execution |

---

## 🛡️ Fail-Fast Enforcement

> 🚫 **Critical risks → IMMEDIATE BLOCK**
> No execution. No merge. No deployment.

| Severity        | Triggers                       | Response               |
| --------------- | ------------------------------ | ---------------------- |
| 🔴 **CRITICAL** | `eval()`, secrets, injections  | `{"decision":"BLOCK"}` |
| 🟠 **HIGH**     | XSS, SSRF, prototype pollution | Premium BLOCK          |
| 🟡 **MEDIUM**   | Debug code, weak crypto        | Pipeline warning       |

🔐 **Security model:** see [SECURITY.md](SECURITY.md)

### Live Example

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"eval(userInput)","mode":"basic"}'
```

```json
{
  "tier": "basic",
  "price_preview": 0.25,
  "payment_required": false,
  "result": {
    "decision": "BLOCK",
    "overallRisk": "critical",
    "findings": [{
      "rule": "no-eval",
      "severity": "critical",
      "message": "eval() allows arbitrary code execution"
    }]
  }
}
```

---

## 🔴 Public Beta — Live

Free during beta. No wallet required.

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"eval(userInput)","mode":"basic"}'
```

⏳ **Beta pricing subject to change → $0.25–$1.00 per decision**

---

## 💰 Pricing

| Tier         | Price (USDC) | Use Case                  |
| ------------ | ------------ | ------------------------- |
| **Basic**    | $0.25        | Agent decisions           |
| **Premium**  | $0.50        | High assurance + AI fixes |
| **Pipeline** | $1.00        | CI/CD enforcement         |

**We don’t price scans. We price decisions.**

One blocked decision can save **$10K–$1M**.
$0.25 is not a cost — it’s execution-time insurance.

**Network:** Base (Chain ID: 8453)

---

## 🚀 5-Minute Integration

### API

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"const x = eval(input);","mode":"pipeline"}'
```

### GitHub Actions

```yaml
name: Agent Security Gate
on: [pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Risk Gate
        run: |
          DIFF=$(git diff origin/main...HEAD)
          RESPONSE=$(curl -s -X POST https://app.teosegypt.com/analyze \
            -H "Content-Type: application/json" \
            -d "{\"code\":\"$DIFF\",\"mode\":\"pipeline\"}")

          RISK=$(echo $RESPONSE | jq -r '.result.overallRisk')
          if [ "$RISK" = "critical" ]; then
            echo "🚫 BLOCKED"
            exit 1
          fi
```

### Claude Desktop (MCP)

```bash
npm run start:mcp
```

---

## 💳 x402 Payment Flow (Production)

1. Call `/analyze`
2. Receive `402 Payment Required`
3. Pay USDC on Base
4. Retry with `x-payment` header
5. Receive result

---

## 🧪 Test vs Production

| Mode     | Cost | Verification                     | Use                |
| -------- | ---- | -------------------------------- | ------------------ |
| **TEST** | Free | Off                              | Development / Beta |
| **PROD** | USDC | Header-based (optional on-chain) | Production         |

```bash
curl https://app.teosegypt.com/health
curl https://app.teosegypt.com/pricing
```

---

## ⚙️ Environment Configuration

```env
TEOS_MODE=production
TEOS_REQUIRE_PAYMENT=1

X402_NETWORK=eip155:8453
X402_PAY_TO=0x6CB857A62f6a55239D67C6bD1A8ed5671605566D
X402_VERIFY_ONCHAIN=0

PRICE_BASIC=0.25
PRICE_PREMIUM=0.50
PRICE_PIPELINE=1.00

HOST=0.0.0.0
PORT=3000
```

---

## 🔍 Risk Coverage

### Critical

* `eval`, `new Function`
* Secret leaks
* SQL / command injection

### High

* XSS, SSRF
* Prototype pollution
* Unsafe deserialization

### Medium

* Weak crypto
* Insecure configs
* Path traversal

---

## 🔒 Non-Goals

* ❌ Full static analysis replacement
* ❌ Business logic auditing
* ❌ Legal compliance guarantees
* ❌ Probabilistic AI guessing

**Purpose:** block unsafe autonomous decisions **before damage occurs**.

---
## 🤝 Contributing & Support

🛡️ **Fail‑Fast is Key** — stop damage before it happens.

**Live API:**  
🔗 https://app.teosegypt.com

⭐ **Star the project on GitHub**

**GitHub Repository:**  
🔗 https://github.com/Elmahrosa/agent-code-risk-mcp

**License:** MIT — free to use, modify, deploy, and monetize.

<div align="center">

🏺 **Governance for the Autonomous Era**  
*Built for agents that execute decisions*

</div>
