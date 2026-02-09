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

## 🔐 Deterministic Governance (Why This Is Different)

Agent Code Risk MCP is **not a scanner**.  
It is a **deterministic decision system**.

**Same input → same output → provable enforcement**

- 🔒 **Deterministic results** — no stochastic AI decisions  
- 🧾 **Machine-readable outcomes** — `ALLOW | WARN | BLOCK`  
- 🔏 **Governance-ready** — decisions can be logged and audited  
- ⚡ **Fail-fast by design** — no runtime execution on CRITICAL risk  

**Agent Code Risk MCP is designed to be machine-enforceable first, human-readable second.**

> Suitable for **regulated AI, enterprise DevSecOps, and sovereign digital infrastructure**.

---

**Autonomous systems fail differently than humans.**

🔴 **Agent leaks API key** → $10K+ stolen compute  
🔴 **Agent breaks authentication** → $100K data breach  
🔴 **Agent violates compliance** → $1M+ regulatory fine

*These are not bugs. These are autonomous decisions executed without governance.*

---

## 🎯 What It Does

**Agent Code Risk MCP** is a **production-grade decision firewall** that:

✅ **Blocks** `eval()`, secrets, injection **before execution**  
✅ **Enforces** via **machine-readable BLOCK decisions** (not reports)  
✅ **Optionally enforces** decisions via **x402 pay-per-decision** on Base ($0.25–$1.00)  
✅ **Integrates** with AI agents, CI/CD, autonomous systems

```text
Agent generates code → MCP → BLOCK/ALLOW → Safe execution
                      ↓
                   Governance enforced
```

**Key difference:** Deterministic rules → **immediate blocking**, not probabilistic advice.

---

## 👥 Who Needs This

| Role | Problem Solved | Integration |
|------|----------------|-------------|
| **AI Builders** | Agents writing `eval()` exploits | Claude Desktop MCP |
| **DevOps** | Unsafe code in pipelines | GitHub Actions gate |
| **Web3/DeFi** | Autonomous smart contract risks | Pre-deploy scan |
| **Security** | Enforcement vs reporting | `/analyze` API |
| **Founders** | Agent-caused outages | Zero-trust execution |

---

## 🛡️ Fail-Fast Enforcement

> 🚫 **Critical risks → IMMEDIATE BLOCK**  
> No execution. No merge. No deployment.

| Severity | Triggers | Response |
|----------|----------|----------|
| 🔴 **CRITICAL** | `eval()`, secrets, injection | `{"decision":"BLOCK"}` |
| 🟠 **HIGH** | XSS, SSRF, prototype pollution | Premium BLOCK |
| 🟡 **MEDIUM** | Debug code, weak crypto | Pipeline warning |

🔐 **Security Model:** See [SECURITY.md](SECURITY.md) for full threat model and enforcement flow.

**Live Example:**

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"eval(userInput)","mode":"basic"}'
```

**Response:**
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

## 🔴 Public Beta — Live Now

Free during beta. No wallet required.

```bash
# Test critical risk detection
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"eval(userInput)","mode":"basic"}'
```

⏳ **Beta pricing subject to change → $0.25–$1.00 per decision**

---

## 💰 Pricing (Post-Beta)

| Tier | Price | Use Case |
|------|-------|----------|
| **Basic** | $0.25 | Agent decisions, fast checks |
| **Premium** | $0.50 | High assurance + AI fixes |
| **Pipeline** | $1.00 | CI/CD gates, full enforcement |


**Why this price?**

Because the cost of ONE bad autonomous decision is never $0.25.

- Leaked API key → $10K+ in stolen compute
- Broken auth → $100K breach response
- Compliance violation → $1M+ fines

**We don't price scans. We price decisions.**

One blocked decision can save $10K–$1M.  
$0.25 is not a cost — it's insurance at execution time.

**Payment:** USDC on Base Network (Chain ID: 8453)


## 🚀 5-Minute Integration

### 1. API (Instant)

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"const x = eval(input);","mode":"pipeline"}'
```

### 2. GitHub Actions

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
            echo "🚫 BLOCKED: Critical security risk"
            echo $RESPONSE | jq '.result.findings'
            exit 1
          fi
```

### 3. Claude Desktop (MCP)

```bash
# Start MCP server
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

## 💳 x402 Payment Flow (Production)

1. Agent calls `/analyze` → Returns `402 Payment Required`
2. Response includes payment details: `{"payTo":"0x6CB...","amount":"0.25"}`
3. Send USDC on Base Network
4. Retry with `x-payment: <tx_hash>` header
5. Receive analysis results

**Configuration:**
```env
X402_PAY_TO=0x6CB857A62f6a55239D67C6bD1A8ed5671605566D
X402_NETWORK=eip155:8453
X402_VERIFY_ONCHAIN=0  # set to 1 to enable on-chain verification
PRICE_BASIC=0.25
PRICE_PREMIUM=0.50
PRICE_PIPELINE=1.00
```

---

## 🧪 Test Mode vs Production

| Mode | Cost | Verification | Use |
|------|------|--------------|-----|
| **TEST** | Free | Off | Development/Beta |
| **PROD** | USDC | Configurable (header / on-chain) | Production |

```bash
# Check current mode
curl https://app.teosegypt.com/health

# View pricing
curl https://app.teosegypt.com/pricing
```

---

## 🚧 Product Development & Feature Updates

The current release focuses on **deterministic, fail-fast enforcement** for JavaScript/TypeScript agent code.  
Upcoming updates are focused on **accuracy, coverage, and enterprise adoption**.

### 1. Multi-Language Risk Detection
- Extend analysis beyond JS/TS to **Python, Java, and Go**
- Introduce **language-aware parsing (AST-based)** instead of regex-only detection
- Improve precision and reduce false positives for production agents

### 2. Advanced Fix Suggestions (Premium)
- Upgrade basic patch hints to **context-aware AI-generated fixes**
- Safer alternatives suggested per language and risk type
- Designed for autonomous agents and CI pipelines

### 3. Agent Framework Integrations
- Expand beyond Claude Desktop MCP
- Native integrations planned for:
  - **LangChain**
  - **LlamaIndex**
  - **AutoGen**
- Enable seamless guardrails inside agent orchestration flows

### 4. Customizable Rule Sets
- Allow organizations to define **custom security rules and policies**
- Config-based rules (`rules.json` / policy files)
- Organization-specific thresholds and enforcement modes

### 5. Reporting & Risk Analytics
- Visibility into:
  - BLOCK vs ALLOW decisions
  - Risk trends over time
  - False-positive feedback
- Designed for DevSecOps and security leadership

### 6. Expanded CI/CD Integrations
- Pre-built support planned for:
  - **GitLab CI**
  - **Jenkins**
  - **Azure DevOps**
  - **Bitbucket**
- Consistent fail-fast enforcement across pipelines

---

## 📁 Self-Hosted Deployment

```bash
git clone https://github.com/Elmahrosa/agent-code-risk-mcp
cd agent-code-risk-mcp
npm install
npm run build

# Start HTTP API
npm run start

# Or start MCP server
npm run start:mcp
```

**Environment variables:**
```env
# Mode
TEOS_MODE=production
REQUIRE_PAYMENT=1

# Pricing
PRICE_BASIC=0.25
PRICE_PREMIUM=0.50
PRICE_PIPELINE=1.00

# Network
X402_NETWORK=eip155:8453
RPC_URL_BASE=https://mainnet.base.org

# Server
HOST=0.0.0.0
PORT=3000
```

---

## 🔍 What We Detect

### 🔴 Critical Risks
- **Code Execution:** `eval()`, `new Function()`, shell commands
- **Secret Leaks:** API keys, private keys, AWS credentials (AKIA...)
- **SQL Injection:** String concatenation in queries
- **Command Injection:** Unsafe shell execution patterns

### 🟠 High Risks
- **XSS Vectors:** `innerHTML`, `document.write`
- **Prototype Pollution:** `__proto__` manipulation
- **SSRF:** Unvalidated external URLs
- **Auth Bypass:** Disabled authentication checks
- **Unsafe Deserialization:** pickle.loads, yaml.load

### 🟡 Medium Risks
- **Weak Crypto:** MD5, SHA-1, Math.random() for security
- **CORS Wildcards:** Allow-Origin: *
- **Path Traversal:** `../` patterns
- **Insecure Configs:** TLS disabled, debug mode in prod

---

## 🏗️ Architecture

```text
┌─────────────────┐    x402    ┌──────────────────┐
│   AI Agent      │───$0.25───▶│  TeosMcp API     │
│                 │             │  /analyze        │
└─────────────────┘             │  Risk Engine     │
                                └──────────────────┘
                                        │
                                ┌──────────────────┐
                                │ Base L2 (USDC)   │
                                │ 0x6CB... payment │
                                └──────────────────┘
```

---

## 🔒 Security Model & Non-Goals

🔐 **Full details:** [SECURITY.md](SECURITY.md)

**The system prioritizes prevention over observability.**

### Non-Goals
- ❌ Replace full static analysis platforms
- ❌ Detect business-logic vulnerabilities  
- ❌ Provide legal/compliance guarantees
- ❌ Act as probabilistic AI guessing system

**Purpose:** Block unsafe autonomous decisions before damage occurs.

---

## 🤝 Contributing & Support

**Live API:** https://app.teosegypt.com  
**GitHub:** https://github.com/Elmahrosa/agent-code-risk-mcp  

**MIT License** — Free to use, modify, deploy, monetize.

<div align="center">

🏺 **Governance for the autonomous era**  
*Built for agents that execute decisions*

**Live now:** https://app.teosegypt.com

⭐ **Star on GitHub**

🛡️ **Fail-Fast is Key**

</div>
