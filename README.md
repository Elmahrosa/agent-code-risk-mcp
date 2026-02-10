<div align="center">

# 🏺 Agent Code Risk MCP — TeosMcp

### *Decision Firewall for Autonomous Systems*

> **Fail-Fast is Key**  
> In autonomous systems, delayed detection equals damage.  
> Agent Code Risk MCP **blocks unsafe decisions immediately** — not after execution.

**Autonomous systems fail differently than humans.**

🔴 **Agent leaks API key** → $10K+ stolen compute  
🔴 **Agent breaks authentication** → $100K data breach  
🔴 **Agent violates compliance** → $1M+ regulatory fine  

*These are not bugs. These are autonomous decisions executed without governance.*

**Agent Code Risk MCP prevents these failures BEFORE execution.**  
*Real-time enforcement — not retrospective scanning.*

![Governance Primitive](https://img.shields.io/badge/Category-Governance%20Primitive-gold?style=flat-square)
[![Live API](https://img.shields.io/badge/Live%20API-✅%20Online-brightgreen?style=flat-square)](https://app.teosegypt.com/health)
[![Pricing](https://img.shields.io/badge/Pricing-Live-1E90FF?style=flat-square&logo=usdcoin&logoColor=white)](https://app.teosegypt.com/pricing)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square)](LICENSE)

🔗 [Live API](https://app.teosegypt.com) · [Pricing](https://app.teosegypt.com/pricing) · 🔐 [Security Model](SECURITY.md)

</div>

---

## 🔐 Deterministic Governance (Why This Is Different)

Agent Code Risk MCP is **not a scanner**.  
It is a **deterministic decision system**.

**Same input → same output → provable enforcement**

- 🔒 **Deterministic results** — no stochastic AI behavior  
- 🧾 **Machine-readable decisions** — `ALLOW | WARN | BLOCK`  
- 🔏 **Governance-ready** — auditable, automatable outcomes  
- ⚡ **Fail-fast by design** — no execution on CRITICAL risk  

**Machine-enforceable first. Human-readable second.**

> Suitable for **regulated AI**, **enterprise DevSecOps**, and **sovereign digital infrastructure**.

---

## 🎯 What It Does

**Agent Code Risk MCP** is a **production-grade decision firewall** that:

✅ **Blocks** `eval()`, secrets, and injections **before execution**  
✅ **Returns machine-readable enforcement decisions**  
✅ **Enforces access via x402 pay-per-decision (USDC on Base)**  
✅ **Integrates** with AI agents, CI/CD pipelines, and autonomous systems  

```text
Agent generates code → MCP → BLOCK / ALLOW → Safe execution
                      ↓
                   Governance enforced
````

**Key difference:** deterministic rules → **immediate blocking**, not probabilistic advice.

---

## 👥 Who Uses This

| Role               | Problem Solved              | Integration          |
| ------------------ | --------------------------- | -------------------- |
| **AI Builders**    | Unsafe agent-generated code | Claude Desktop MCP   |
| **DevOps**         | Risky diffs entering CI     | GitHub Actions       |
| **Security Teams** | Enforcement vs reporting    | `/analyze` API       |
| **Web3 / DeFi**    | Autonomous execution risk   | Pre-deploy gate      |
| **Founders**       | Agent-caused outages        | Zero-trust execution |

---

## 🛡️ Enforcement Model

> 🚫 **Critical risk → IMMEDIATE BLOCK**
> No execution. No merge. No deployment.

| Severity        | Triggers                       | Response               |
| --------------- | ------------------------------ | ---------------------- |
| 🔴 **CRITICAL** | `eval()`, secrets, injections  | `{"decision":"BLOCK"}` |
| 🟠 **HIGH**     | XSS, SSRF, prototype pollution | Premium BLOCK          |
| 🟡 **MEDIUM**   | Debug code, weak crypto        | Pipeline WARN          |

🔐 Full threat model: see [SECURITY.md](SECURITY.md)

---

## 💰 Pricing (Per Decision)

| Tier         | Price (USDC) | Use Case                   |
| ------------ | ------------ | -------------------------- |
| **Basic**    | $0.25        | Agent runtime decisions    |
| **Premium**  | $0.50        | High-assurance enforcement |
| **Pipeline** | $1.00        | CI/CD gates                |

**We don’t price scans. We price decisions.**

One blocked decision can save **$10K–$1M**.
$0.25 is execution-time insurance.

**Network:** Base Mainnet (Chain ID: 8453)
**Payment Token:** USDC
**Protocol:** x402 (pay-per-request)

---

## 🚀 Quick Start

### Without Payment (Returns 402)

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"eval(userInput)","mode":"pipeline"}'
```

**Response (402):**

```json
{
  "error": "Payment Required",
  "x402-version": 1,
  "accepts": [{
    "network": "eip155:8453",
    "maxAmountRequired": "1.00",
    "resource": "usdc:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "payTo": "0x6CB857A62f6a55239D67C6bD1A8ed5671605566D"
  }]
}
```

### With Payment (Retry with tx hash)

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -H "x-payment: 0xYOUR_TX_HASH" \
  -d '{"code":"eval(userInput)","mode":"pipeline"}'
```

> Expected: `decision: "BLOCK"` and `overallRisk: "critical"` for `eval(...)`.

**Example response:**

```json
{
  "tier": "pipeline",
  "price_preview": 1.0,
  "payment_required": true,
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

## 🔌 CI/CD Integration (GitHub Actions)

```yaml
- name: Agent Security Gate
  run: |
    DIFF=$(git diff origin/main...HEAD)
    RESPONSE=$(curl -s -X POST https://app.teosegypt.com/analyze \
      -H "Content-Type: application/json" \
      -H "x-payment: ${{ secrets.USDC_TX_HASH }}" \
      -d "{\"code\":\"$DIFF\",\"mode\":\"pipeline\"}")

    RISK=$(echo "$RESPONSE" | jq -r '.result.overallRisk')
    if [ "$RISK" = "critical" ]; then
      echo "🚫 BLOCKED"
      exit 1
    fi
```

---

## 💳 x402 Payment Verification

When enabled, the system verifies that:

* Transaction hash format is valid
* Transfer is **USDC**
* Network is **Base (8453)**
* Recipient equals `X402_PAY_TO`
* Amount ≥ tier price
* Required confirmations are met
* Transaction is not replayed

---

## ⚙️ Runtime Configuration

```env
TEOS_MODE=production
TEOS_REQUIRE_PAYMENT=1

PRICE_BASIC=0.25
PRICE_PREMIUM=0.50
PRICE_PIPELINE=1.00

X402_NETWORK=eip155:8453
X402_PAY_TO=0x6CB857A62f6a55239D67C6bD1A8ed5671605566D
X402_VERIFY_ONCHAIN=1
X402_CONFIRMATIONS=2
USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

HOST=0.0.0.0
PORT=8000
```

---

## 🔍 Risk Coverage

**Critical**

* `eval`, `new Function`
* Secret leaks
* SQL / command injection

**High**

* XSS, SSRF
* Prototype pollution
* Unsafe deserialization

**Medium**

* Weak crypto
* Insecure configs
* Path traversal

---

## 🔒 Non-Goals

Agent Code Risk MCP does **not**:

* Replace full static analysis platforms
* Detect business-logic flaws
* Provide legal or compliance guarantees
* Automatically rewrite code

**Purpose:** block unsafe autonomous decisions **before damage occurs**.

---

## 📄 License

MIT — free to use, modify, deploy, and monetize.

---

<div align="center">

🏺 **Governance for the Autonomous Era**

*Block before damage. Execute with confidence.*

**Live:** [https://app.teosegypt.com](https://app.teosegypt.com)

⭐ **Star on GitHub:** [https://github.com/Elmahrosa/agent-code-risk-mcp](https://github.com/Elmahrosa/agent-code-risk-mcp)

Powered by TEOS Labs | Egyptian heritage meets blockchain governance

</div>
