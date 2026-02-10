<div align="center">

# 🏺 Agent Code Risk MCP — TeosMcp

### *Decision Firewall for Autonomous Systems*

> **Fail-Fast is Key**  
> In autonomous systems, delayed detection equals damage.  
> Agent Code Risk MCP **blocks unsafe decisions immediately** — not after execution.
> 
**Agent Code Risk MCP prevents these failures BEFORE execution.**  
*Real-time enforcement — not retrospective scanning.*

![Governance Primitive](https://img.shields.io/badge/Category-Governance%20Primitive-gold?style=flat-square)
[![Live API](https://img.shields.io/badge/Live%20API-✅%20Online-brightgreen?style=flat-square)](https://app.teosegypt.com/health)
[![Pricing](https://img.shields.io/badge/Pricing-$0.25--$1.00-1E90FF?style=flat-square&logo=usdcoin&logoColor=white)](https://app.teosegypt.com/pricing)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square)](LICENSE)

🔗 [Live API](https://app.teosegypt.com) · [Pricing](https://app.teosegypt.com/pricing) · 🔐 [Security Model](SECURITY.md)

</div>

**Autonomous systems fail differently than humans.**

🔴 **Agent leaks API key** → $10K+ stolen compute  
🔴 **Agent breaks authentication** → $100K data breach  
🔴 **Agent violates compliance** → $1M+ regulatory fine  

*These are not bugs. These are autonomous decisions executed without governance.*


---

## 🔐 Deterministic Governance (Why This Is Different)

Agent Code Risk MCP is **not a scanner**.  
It is a **deterministic decision system**.

**Same input → same output → provable enforcement**

- 🔒 Deterministic results (no stochastic AI behavior)  
- 🧾 Machine-readable decisions: `ALLOW | WARN | BLOCK`  
- 🔏 Governance-ready, auditable outcomes  
- ⚡ Fail-fast by design — no execution on CRITICAL risk  

> Machine-enforceable first. Human-readable second.

---

## 🎯 What It Does

**Agent Code Risk MCP** is a **production-grade decision firewall** that:

- Blocks `eval()`, secrets, injections **before execution**
- Returns **machine-readable enforcement decisions**
- Enforces access via **x402 pay-per-decision** (USDC on Base)
- Integrates with AI agents, CI/CD, and autonomous systems

```

Agent generates code → MCP → BLOCK / ALLOW → Safe execution
↓
Governance enforced

````

---

## 👥 Who Uses This

| Role | Problem Solved | Integration |
|----|----|----|
| AI Builders | Unsafe agent code | Claude MCP |
| DevOps | Risky PRs | GitHub Actions |
| Security Teams | Enforcement vs reporting | /analyze API |
| Web3 / DeFi | Autonomous execution risk | Pre-deploy gate |
| Founders | Agent-caused outages | Zero-trust |

---

## 🛡️ Enforcement Model

| Severity | Triggers | Response |
|-------|---------|---------|
| 🔴 CRITICAL | `eval()`, secrets, injections | BLOCK |
| 🟠 HIGH | XSS, SSRF, prototype pollution | Premium BLOCK |
| 🟡 MEDIUM | Debug code, weak crypto | WARN |

See **SECURITY.md** for the full threat model.

---

## 💰 Pricing (Per Decision)

| Tier | Price (USDC) | Use Case |
|----|----|----|
| Basic | $0.25 | Agent runtime |
| Premium | $0.50 | High-assurance |
| Pipeline | $1.00 | CI/CD gates |

**We don’t price scans. We price decisions.**

---

## 🚀 Quick Start

### Without Payment (Expected 402)

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"eval(userInput)","mode":"pipeline"}'
````

### With Payment

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -H "x-payment: 0xTX_HASH" \
  -d '{"code":"eval(userInput)","mode":"pipeline"}'
```

Expected result: **BLOCK (critical)**.

---

## 🔌 CI/CD Integration

```yaml
- name: Agent Security Gate
  run: |
    DIFF=$(git diff origin/main...HEAD)
    RESPONSE=$(curl -s -X POST https://app.teosegypt.com/analyze \
      -H "Content-Type: application/json" \
      -H "x-payment: ${{ secrets.USDC_TX_HASH }}" \
      -d "{\"code\":\"$DIFF\",\"mode\":\"pipeline\"}")

    if [ "$(echo "$RESPONSE" | jq -r '.result.overallRisk')" = "critical" ]; then
      exit 1
    fi
```

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

**Critical:** eval, secrets, SQL/command injection
**High:** XSS, SSRF, prototype pollution
**Medium:** weak crypto, insecure config

---

## 🔒 Non-Goals

* Not a full static analysis replacement
* Not business-logic auditing
* No auto-fixing or rewriting

**Purpose:** block unsafe autonomous decisions **before damage**.

---

## 📄 License

MIT — free to use, modify, deploy, and monetize.

---

## 🔒 README-LOCK (Cryptographic Integrity)

**Purpose:** Prevent supply-chain tampering of governance instructions.

```
SHA256 (README.md): ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564b64849
TEOS-LOCK: v1::prod::8453::0x6CB857A62f6a55239D67C6bD1A8ed5671605566D
```

**Policy:**
If README hash ≠ expected → **BLOCK execution**.

---

## 🔐 CI Enforcement (REQUIRED)

Create `scripts/verify-readme-lock.sh`

```bash
#!/bin/bash
set -e

EXPECTED="ef2d127de37b942baad06145e54b0c619a1f22327b2ebbcfbec78f5564b64849"
ACTUAL=$(sha256sum README.md | cut -d' ' -f1)

if [ "$ACTUAL" != "$EXPECTED" ]; then
  echo "🚫 README-LOCK FAILED"
  exit 1
fi

echo "✅ README-LOCK VERIFIED"
```

**GitHub Actions:**

```yaml
- name: Verify README-LOCK
  run: ./scripts/verify-readme-lock.sh
```

---

<div align="center">

🏺 **Governance for the Autonomous Era**

*Block before damage. Execute with confidence.*

Live: [https://app.teosegypt.com](https://app.teosegypt.com)

</div>
