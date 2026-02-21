<div align="center">

# 🏺 TeosMCP — Agent Code Risk Firewall

### The Decision Enforcement Layer for Autonomous Systems

> **Block before damage. Execute with confidence.**
>
> Autonomous agents don't ask for permission — they act.  
> TeosMCP enforces security decisions **before merge, deploy, or execution**.  
> Not after. Not retrospectively. **Before.**

![Category](https://img.shields.io/badge/Category-Agent%20Governance%20Primitive-gold?style=flat-square)
[![Live API](https://img.shields.io/badge/Live%20API-Online-brightgreen?style=flat-square)](https://app.teosegypt.com/health)
[![Pricing](https://img.shields.io/badge/Pricing-Usage--Based%20USDC-1E90FF?style=flat-square&logo=usdcoin&logoColor=white)](https://app.teosegypt.com/pricing)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square)](LICENSE)
[![E2E Smoke Test](https://github.com/Elmahrosa/agent-code-risk-mcp/actions/workflows/e2e-smoke.yml/badge.svg)](https://github.com/Elmahrosa/agent-code-risk-mcp/actions/workflows/e2e-smoke.yml)
[![Listed on MCP.so](https://img.shields.io/badge/Listed%20on-MCP.so-black?style=flat-square)](https://mcp.so/server/teos-mcp-%E2%80%94-agent-code-risk-firewall/Elmahrosa)

**[🔗 Live API](https://app.teosegypt.com) · [💳 Pricing](https://app.teosegypt.com/pricing) · [🔐 Security Model](SECURITY.md) · [📊 Live Stats](https://app.teosegypt.com/stats)**

</div>

---

## Why This Exists

Autonomous agents fail differently than humans.

When an agent leaks an API key, compute theft starts instantly. When an agent breaks authentication, data exposure is immediate. When an agent violates compliance, there is no undo. These are not bugs — they are machine-executed decisions made without governance.

Traditional security tools scan *after* the fact. TeosMCP enforces *before* execution, at the exact moment the agent produces code, making the decision to merge or deploy.

**Same input → same output → provable outcome. Every time.**

---

## What TeosMCP Does

TeosMCP is a production-grade **decision firewall** that integrates directly into your AI agent pipeline or CI/CD workflow. It analyzes code diffs and returns a single, machine-enforceable verdict:

```
Agent generates code → TeosMCP analyzes → ALLOW | WARN | BLOCK → Safe execution
```

It is deterministic by design. No stochastic AI behavior. No hallucinated verdicts. Every finding is evidence-backed, structured, and audit-ready.

---

## 🔐 Enforcement Model

| Severity | Triggers | Decision |
|---|---|---|
| 🔴 **CRITICAL** | `eval()`, hardcoded secrets, SQL/command injection | `BLOCK` |
| 🟠 **HIGH** | XSS, SSRF, prototype pollution, unsafe deserialization | `BLOCK` (Premium) |
| 🟡 **MEDIUM** | Weak crypto, insecure configs, debug code in production | `WARN` |

Every response is structured and machine-readable:

```json
{
  "decision": "BLOCK",
  "score": 91,
  "findings": [
    {
      "id": "INJECTION.EVAL",
      "severity": "CRITICAL",
      "evidence": "eval(userInput)",
      "recommendation": "Remove eval; use a safe parser or allowlist."
    }
  ]
}
```

See [SECURITY.md](SECURITY.md) for the full threat model and detection coverage.

---

## 🎯 Risk Coverage

**Critical (auto-BLOCK)**
- Dynamic code execution — `eval()`, `new Function()`, `exec()`
- Hardcoded secrets, API keys, private keys, high-entropy strings
- SQL injection, command injection, shell interpolation patterns

**High (BLOCK on Premium)**
- Cross-site scripting (XSS)
- Server-Side Request Forgery (SSRF)
- Prototype pollution
- Unsafe deserialization — `pickle.loads`, `yaml.load`, `unserialize`

**Medium (WARN)**
- Weak cryptography — MD5, SHA-1, `Math.random`, hardcoded salts
- Insecure configurations — permissive CORS, disabled TLS verification, weakened security headers
- Debug code and verbose logging in production paths

---

## 👥 Who Uses TeosMCP

| Role | Problem Solved | Integration Point |
|---|---|---|
| **AI Builders** | Unsafe agent-generated output | Claude MCP / Cursor |
| **DevOps Teams** | Risky pull requests merged by automation | GitHub Actions |
| **Security Teams** | Enforcement instead of reporting | `/analyze` API |
| **Web3 / DeFi** | Autonomous smart contract execution risk | Pre-deploy gate |
| **Founders** | Agent-caused outages and data incidents | Zero-trust pipeline |

---

## 💰 Pricing — Per Decision, Not Per Seat

| Tier | Price (USDC) | Best For |
|---|---|---|
| **Basic** | `0.25` | Agent runtime, rapid iteration |
| **Premium** | `0.50` | High-assurance enforcement + fix generation |
| **Pipeline** | `1.00` | CI/CD gates, compliance workflows |

We price **decisions** — not scans, not seats, not months.

One blocked decision can prevent $10,000–$1,000,000 in damages. $0.25 is execution-time insurance.

**Network:** Base Mainnet (Chain ID: `8453`) · **Token:** USDC

Payment follows the [x402 standard](https://x402.org) — no accounts, no subscriptions, fully agent-native.

---

## 🚀 Quick Start

**Step 1 — Send a request (returns 402 without payment):**

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code": "eval(userInput)", "mode": "basic"}'
```

**Step 2 — Pay 0.25 USDC on Base, then retry with your tx hash:**

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -H "x-payment: 0xYOUR_TX_HASH" \
  -d '{"code": "eval(userInput)", "mode": "basic"}'
```

**Response:**

```json
{
  "decision": "BLOCK",
  "score": 91,
  "findings": [
    {
      "id": "INJECTION.EVAL",
      "severity": "CRITICAL",
      "evidence": "eval(userInput)",
      "recommendation": "Remove eval; use a safe parser or allowlist."
    }
  ]
}
```

---

## 🔌 CI/CD Integration (GitHub Actions)

```yaml
name: TeosMCP Security Gate

on: [pull_request]

jobs:
  risk-scan:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3

      - name: Generate diff
        run: git diff origin/main...HEAD > changes.diff

      - name: Run TeosMCP Gate
        run: |
          RESULT=$(curl -s -X POST https://app.teosegypt.com/analyze \
            -H "Content-Type: application/json" \
            -H "x-payment: ${{ secrets.TEOS_PAYMENT_TX }}" \
            -d "{\"code\": \"$(cat changes.diff | jq -Rs .)\", \"mode\": \"pipeline\"}")
          echo "$RESULT"
          DECISION=$(echo "$RESULT" | jq -r '.decision')
          if [ "$DECISION" = "BLOCK" ]; then
            echo "❌ TeosMCP: BLOCKED — unsafe changes detected."
            exit 1
          fi
          echo "✅ TeosMCP: ALLOWED — changes passed security gate."
```

---

## 🤖 Claude MCP Integration

```json
{
  "mcpServers": {
    "teos-risk": {
      "command": "npx",
      "args": ["-y", "agent-code-risk-mcp"],
      "env": {
        "TEOS_API_URL": "https://app.teosegypt.com"
      }
    }
  }
}
```

Once configured, Claude can call `review_diff` or `pipeline_guard` directly as MCP tools during code generation, giving your agent a built-in security conscience.

---

## 📊 Live Stats

```bash
curl https://app.teosegypt.com/stats
```

Returns real-time enforcement metrics — total decisions processed, blocks issued, paid x402 requests, and last 24-hour activity. No accounts. No personal data. Enforcement metrics only.

---

## 🏗️ Repository Structure

```
.
├── src/
│   ├── core/
│   │   └── review.ts        # Heuristic risk engine
│   ├── http/
│   │   └── app.ts           # Express HTTP API with x402 gating
│   └── mcp/
│       └── server.ts        # MCP stdio JSON-RPC server
├── .env.example             # Config template
├── SECURITY.md              # Full threat model
├── tsconfig.json
├── package.json
└── README.md
```

---

## ⚙️ Self-Host Setup

```bash
# 1. Install
npm install

# 2. Configure
cp .env.example .env
```

Edit `.env`:

```env
X402_PAY_TO=0x3dbc6b72a69898a5ba0f1ec7312abf3c6272c86e
X402_NETWORK=eip155:8453
PRICE_BASIC=0.25
PRICE_PREMIUM=0.50
PRICE_PIPELINE=1.00
PORT=3000
HOST=0.0.0.0
```

```bash
# 3. Build and run
npm run build
npm start

# Run as MCP stdio server
npm run start:mcp
```

> Use `X402_NETWORK=eip155:84532` for Base Sepolia testnet.

---

## 🛡️ Security Design Principles

- `.env` is gitignored — no secrets in version control
- Wallet address is public-safe — only used to receive payment
- No private keys stored or used on the server
- No signing performed server-side
- Stateless by design — no sessions, no user data retained
- Deterministic outputs — same diff always produces the same verdict

---

## 📣 Share & Community

If TeosMCP blocked something that would have caused an incident, tell the world:

- ⭐ **[Star on GitHub](https://github.com/Elmahrosa/agent-code-risk-mcp)** — visibility is survival for open-source tools
- 🐦 **[Share on X](https://twitter.com/intent/tweet?text=Agent-native%20MCP%20code%20risk%20firewall%20%F0%9F%94%A5%20https://app.teosegypt.com%20%23MCP%20%23AIAgents%20%23DevSecOps)**
- 💬 **[Share on WhatsApp](https://wa.me/?text=Agent-native%20MCP%20diff%20security%20scanner%20https://app.teosegypt.com)**
- 📘 **[Share on Facebook](https://www.facebook.com/sharer/sharer.php?u=https://app.teosegypt.com)**
- 🌐 **[Listed on MCP.so](https://mcp.so/server/teos-mcp-%E2%80%94-agent-code-risk-firewall/Elmahrosa)**

---

## 📄 License

**MIT License** — open-source core, free to use, modify, and deploy.  
Hosted API access at [app.teosegypt.com](https://app.teosegypt.com) is provided as a commercial service.

---

<div align="center">

### 🏺 Governance for the Autonomous Era

*In autonomous systems, delayed detection equals irreversible damage.*  
*TeosMCP enforces early — so your agents execute with confidence.*

**[app.teosegypt.com](https://app.teosegypt.com)**

</div>
