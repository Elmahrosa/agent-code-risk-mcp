<div align="center">

# 🏺 Agent Code Risk MCP — TeosMcp

### *Decision Firewall for Autonomous Systems*

> **Fail-Fast is Key**  
> In autonomous systems, delayed detection equals damage.  
> Agent Code Risk MCP **blocks unsafe decisions before execution**.

**Real-time enforcement — not retrospective scanning.**

![Governance Primitive](https://img.shields.io/badge/Category-Governance%20Primitive-gold?style=flat-square)
[![Live API](https://img.shields.io/badge/Live%20API-Online-brightgreen?style=flat-square)](https://app.teosegypt.com/health)
[![Pricing](https://img.shields.io/badge/Pricing-0.25--1.00%20USDC-1E90FF?style=flat-square&logo=usdcoin&logoColor=white)](https://app.teosegypt.com/pricing)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square)](LICENSE)

🔗 [Live API](https://app.teosegypt.com) · [Pricing](https://app.teosegypt.com/pricing) · 🔐 [Security Model](SECURITY.md) · 📊 [Live Stats](https://app.teosegypt.com/stats)

</div>

---

## Why This Exists

Autonomous systems fail differently than humans.

* Agent leaks API key → compute theft
* Agent breaks authentication → data exposure
* Agent violates compliance → regulatory risk

These are not bugs.  
They are machine-executed decisions without governance.

TeosMcp enforces deterministic decision control.

---

## 🔐 Deterministic Governance

Agent Code Risk MCP is **not a scanner**.  
It is a **deterministic enforcement layer**.

**Same input → same output → provable outcome**

* Deterministic results (no stochastic AI behavior)
* Machine-readable decisions: `ALLOW | WARN | BLOCK`
* Audit-ready structured responses
* Fail-fast on CRITICAL risk

Machine-enforceable first. Human-readable second.

---

## 🎯 What It Does

TeosMcp is a production-grade decision firewall that:

* Blocks `eval()`, secret exposure, injection patterns **before execution**
* Returns structured enforcement decisions
* Enforces access via **x402 pay-per-decision (USDC on Base)**
* Integrates with AI agents, CI/CD, and autonomous systems

```text
Agent generates code → MCP analyzes → ALLOW | WARN | BLOCK → Safe execution
```

---

## 👥 Who Uses This

| Role           | Problem Solved            | Integration     |
| -------------- | ------------------------- | --------------- |
| AI Builders    | Unsafe agent output       | Claude MCP      |
| DevOps         | Risky pull requests       | GitHub Actions  |
| Security Teams | Enforcement vs reporting  | `/analyze` API  |
| Web3/DeFi      | Autonomous execution risk | Pre-deploy gate |
| Founders       | Agent-caused outages      | Zero-trust      |

---

## 🛡 Enforcement Model

| Severity    | Triggers                       | Response        |
| ----------- | ------------------------------ | --------------- |
| 🔴 CRITICAL | `eval()`, secrets, injections  | BLOCK           |
| 🟠 HIGH     | XSS, SSRF, prototype pollution | BLOCK (Premium) |
| 🟡 MEDIUM   | Weak crypto, debug code        | WARN            |

See [SECURITY.md](SECURITY.md) for the full threat model.

---

## 💰 Pricing (Per Decision)

| Tier     | Price (USDC) | Use Case       |
| -------- | ------------ | -------------- |
| Basic    | 0.25         | Agent runtime  |
| Premium  | 0.50         | High-assurance |
| Pipeline | 1.00         | CI/CD gates    |

**We price decisions — not scans.**

One blocked decision can save $10K–$1M in damages.  
$0.25 is execution-time insurance.

**Network:** Base Mainnet (Chain ID: 8453)  
**Token:** USDC

---

## 🚀 Quick Start

### Without Payment (Returns 402)

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"eval(userInput)","mode":"basic"}'
```

**Response:**
```json
{
  "error": "Payment Required",
  "x402-version": 1,
  "accepts": [{
    "network": "eip155:8453",
    "maxAmountRequired": "0.25",
    "payTo": "0x6CB857A62f6a55239D67C6bD1A8ed5671605566D"
  }]
}
```

### With Payment

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -H "x-payment: 0xYOUR_TX_HASH" \
  -d '{"code":"eval(userInput)","mode":"basic"}'
```

**Response:**
```json
{
  "tier": "basic",
  "result": {
    "decision": "WARN",
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

## 📊 Live Usage Stats

Public, read-only enforcement metrics:

```bash
curl https://app.teosegypt.com/stats
```

**Shows:**
* Total requests processed
* Blocked decisions
* Paid x402 requests
* Last 24-hour activity

**No accounts. No user data. Enforcement metrics only.**

This endpoint verifies the system is actively enforcing decisions in production.

**Current activity:** Already tracking requests from multiple unique IPs.

---

## 🔌 CI/CD Integration

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
            -H "x-payment: ${{ secrets.USDC_TX_HASH }}" \
            -d "{\"code\":\"$DIFF\",\"mode\":\"pipeline\"}")
          
          RISK=$(echo "$RESPONSE" | jq -r '.result.overallRisk')
          
          if [ "$RISK" = "critical" ]; then
            echo "🚫 BLOCKED: Critical security risk"
            exit 1
          fi
```

### Claude Desktop (MCP)

```bash
npm run start:mcp
```

Add to `claude_desktop_config.json`:
```json
{
  "mcpServers": {
    "agent-code-risk": {
      "command": "node",
      "args": ["/path/to/agent-code-risk-mcp/dist/mcp/server.js"]
    }
  }
}
```

---

## ⚙️ Runtime Configuration

```env
# Mode
TEOS_MODE=production
TEOS_REQUIRE_PAYMENT=1

# Pricing (USDC)
PRICE_BASIC=0.25
PRICE_PREMIUM=0.50
PRICE_PIPELINE=1.00

# Network
X402_NETWORK=eip155:8453
X402_PAY_TO=0x6CB857A62f6a55239D67C6bD1A8ed5671605566D
X402_VERIFY_ONCHAIN=1
X402_CONFIRMATIONS=2

# USDC Contract
USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

# Server
HOST=0.0.0.0
PORT=8000
```

---

## 🔍 Risk Coverage

### 🔴 Critical
- `eval()`, `new Function()`
- Hardcoded secrets (API keys, private keys)
- SQL/Command injection

### 🟠 High
- XSS (innerHTML, document.write)
- SSRF (unvalidated URLs)
- Prototype pollution
- Unsafe deserialization

### 🟡 Medium
- Weak cryptography (MD5, SHA-1)
- Insecure configurations
- Debug code in production

---

## 🔒 Non-Goals

Agent Code Risk MCP does **not**:

* ❌ Replace full static analysis platforms
* ❌ Detect business-logic vulnerabilities
* ❌ Provide legal/compliance guarantees
* ❌ Automatically rewrite code

**Purpose:** Block unsafe autonomous decisions **before damage occurs**.

---

## 📞 Support & Resources

**Live API:** https://app.teosegypt.com  
**Health Check:** https://app.teosegypt.com/health  
**Stats:** https://app.teosegypt.com/stats  
**GitHub:** https://github.com/Elmahrosa/agent-code-risk-mcp

**Payment Address:** `0x6CB857A62f6a55239D67C6bD1A8ed5671605566D`  
**Network:** Base Mainnet (Chain ID: 8453)  
**USDC Contract:** `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

**Security Issues:** See [SECURITY.md](SECURITY.md)

---

## 📄 License

MIT License — Free to use, modify, deploy, and monetize.

See [LICENSE](LICENSE) for details.

---

<div align="center">

🏺 **Governance for the Autonomous Era**  
*Block before damage. Execute with confidence.*

**Live:** https://app.teosegypt.com

⭐ [Star on GitHub](https://github.com/Elmahrosa/agent-code-risk-mcp)

---

**Built with:**  
TypeScript · Express · Base Network · MCP Protocol · USDC

**Powered by TEOS Labs**  
Egyptian heritage meets blockchain governance

</div>
