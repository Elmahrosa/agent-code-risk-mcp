<div align="center">

# 🏺 Agent Code Risk MCP — TeosMcp

### *Decision Firewall for Autonomous Systems*

> **Fail-Fast is Key**  
> In autonomous systems, delayed detection equals damage.  
> Agent Code Risk MCP is designed to **block unsafe decisions immediately**, not report them after execution.
**Agent Code Risk MCP prevents these failures BEFORE execution.**  
*Real-time prevention — not retrospective scanning.*

*Traditional scanners report risk. Agent Code Risk MCP **enforces decisions**.*

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
- 🔏 **Governance-ready** — decisions can be logged, signed, audited  
- ⚡ **Fail-fast by design** — no runtime execution on CRITICAL risk  

> Suitable for **regulated AI, enterprise DevSecOps, and sovereign digital infrastructure**.

---




**Autonomous systems fail differently than humans.**

🔴 **Agent leaks API key** → $10K+ stolen compute  
🔴 **Agent breaks authentication** → $100K data breach  
🔴 **Agent violates compliance** → $1M+ regulatory fine

*These are not bugs. These are autonomous decisions executed without governance.*

---

## 🎯 **What It Does**

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

## 👥 **Who Needs This**

| Role | Problem Solved | Integration |
|------|----------------|-------------|
| **AI Builders** | Agents writing `eval()` exploits | Claude Desktop MCP |
| **DevOps** | Unsafe code in pipelines | GitHub Actions gate |
| **Web3/DeFi** | Autonomous smart contract risks | Pre-deploy scan |
| **Security** | Enforcement vs reporting | `/analyze` API |
| **Founders** | Agent-caused outages | Zero-trust execution |

---

## 🛡️ **Fail-Fast Enforcement**

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

## 🔴 **Public Beta — Live Now**

Free during beta. No wallet required.

```bash
# Test critical risk detection
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"eval(userInput)","mode":"basic"}'

# Scan dependencies for vulnerabilities
curl -X POST https://app.teosegypt.com/scan-dependencies \
  -H "Content-Type: application/json" \
  -d '{"manifest":"{\"dependencies\":{\"lodash\":\"4.17.15\"}}"}'
```

⏳ **Beta ends soon → $0.25–$1.00 per decision**

---

## 💰 **Pricing (Post-Beta)**

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

---

## 🚀 **5-Minute Integration**

### 1. **API (Instant)**

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"const x = eval(input);","mode":"pipeline"}'
```

### 2. **GitHub Actions**

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

### 3. **Claude Desktop (MCP)**

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

## 💳 **x402 Payment Flow (Production)**

1. Agent calls `/analyze` → Returns `402 Payment Required`
2. Response includes payment details: `{"payTo":"0x6CB...","amount":"0.25"}`
3. Send USDC on Base Network
4. Retry with `x-payment: <tx_hash>` header
5. Receive analysis results

**Configuration:**
```env
X402_PAY_TO=0x6CB857A62f6a55239D67C6bD1A8ed5671605566D
X402_NETWORK=eip155:8453
X402_VERIFY_ONCHAIN=1
PRICE_BASIC=0.25
PRICE_PREMIUM=0.50
PRICE_PIPELINE=1.00
```

---

## 🧪 **Test Mode vs Production**

| Mode | Cost | Verification | Use |
|------|------|--------------|-----|
| **TEST** | Free | Disabled | Development/Beta |
| **PROD** | USDC | On-chain | Production |

```bash
# Check current mode
curl https://app.teosegypt.com/health

# View pricing
curl https://app.teosegypt.com/pricing
```

**Switch modes:**
```env
# Test mode (current beta)
TEOS_MODE=test
REQUIRE_PAYMENT=0

# Production mode (after beta)
TEOS_MODE=production
REQUIRE_PAYMENT=1
```

---

## 📁 **Self-Hosted Deployment**

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

## 🏗️ **Architecture**

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

**Repository structure:**
```text
src/
├── core/          # Risk detection patterns
│   └── review.ts  # Heuristic rules (eval, secrets, injection)
├── http/          # Express API + x402 middleware
│   ├── app.ts
│   └── x402Verify.ts
├── mcp/           # Claude Desktop protocol
│   └── server.ts
├── tools/         # Analysis modules
│   ├── analyzeCode.ts
│   └── scanDependencies.ts
└── config.ts      # Centralized configuration
```

---

## 🔍 **What We Detect**

### 🔴 **Critical Risks**
- **Code Execution:** `eval()`, `new Function()`, shell commands
- **Secret Leaks:** API keys, private keys, AWS credentials (AKIA...)
- **SQL Injection:** String concatenation in queries
- **Command Injection:** Unsafe shell execution patterns

### 🟠 **High Risks**
- **XSS Vectors:** `innerHTML`, `document.write`
- **Prototype Pollution:** `__proto__` manipulation
- **SSRF:** Unvalidated external URLs
- **Auth Bypass:** Disabled authentication checks
- **Unsafe Deserialization:** pickle.loads, yaml.load

### 🟡 **Medium Risks**
- **Weak Crypto:** MD5, SHA-1, Math.random() for security
- **CORS Wildcards:** Allow-Origin: *
- **Path Traversal:** `../` patterns
- **Insecure Configs:** TLS disabled, debug mode in prod

### 🔵 **Low/Info**
- **Console Logging:** Debug statements in production
- **TODOs:** Unresolved FIXME/HACK comments
- **Linter Suppressions:** eslint-disable, @ts-ignore

---

## 🧱 **Security Model & Non-Goals**

### **Security Model**

🔐 **Full details:** [SECURITY.md](SECURITY.md)

Agent Code Risk MCP operates under a **Fail-Fast, Zero-Trust model**:

- All autonomous code is treated as untrusted by default
- Deterministic rules are applied **before** execution, merge, or deployment
- Critical risks result in an **immediate BLOCK decision**
- Responses are machine-readable and designed for automated enforcement
- Payment (x402) serves as an optional economic enforcement layer, not authentication
- Provides a hosted reference deployment; enforcement logic is fully self-hostable

**The system prioritizes prevention over observability.**

### **Non-Goals**

Agent Code Risk MCP is **not** designed to:

- ❌ Replace full static analysis platforms (e.g., SonarQube, Semgrep)
- ❌ Detect business-logic vulnerabilities
- ❌ Provide legal, regulatory, or compliance guarantees
- ❌ Act as an AI-based probabilistic guessing system
- ❌ Automatically fix or rewrite code

**Its sole purpose is to block unsafe autonomous decisions before damage occurs.**

---

## 🔒 **Security Review Note**

Agent Code Risk MCP is a **security enforcement system**, not a vulnerability scanner library.

Before production use, organizations are expected to:

✅ Review the deterministic rules and heuristics used for enforcement  
✅ Run the system in Test Mode to validate behavior against internal policies  
✅ Self-host or fork the project if required by internal security/compliance standards

This project is intentionally **transparent and open-source** to enable independent verification and controlled adoption.

---

## 🤝 **Contributing**

Contributions welcome! Areas of interest:

- Additional risk detection patterns
- Language-specific rules (Python, Go, Rust)
- Performance optimizations
- Integration examples
- Security enhancements

**Process:**
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

---

## 📞 **Support & Resources**

**Live API:** https://app.teosegypt.com  
**Health Check:** https://app.teosegypt.com/health  
**Pricing Info:** https://app.teosegypt.com/pricing  
**GitHub:** https://github.com/Elmahrosa/agent-code-risk-mcp  
**Issues:** https://github.com/Elmahrosa/agent-code-risk-mcp/issues

**Payment Wallet:** `0x6CB857A62f6a55239D67C6bD1A8ed5671605566D`  
**Network:** Base Mainnet (Chain ID: 8453)  
**USDC Contract:** `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

**Security Issues:** See [SECURITY.md](SECURITY.md) for disclosure policy

---

## 📜 **Legal Notice**

**Technical enforcement only.** This tool provides automated code risk detection and blocking. It does **not** constitute legal advice, compliance certification, or security guarantees. Organizations are responsible for their own security policies and regulatory compliance.

**Use at your own risk.**

---

## 📄 **License**

**MIT License** — Free to use, modify, deploy, and monetize.

See [LICENSE](LICENSE) file for full details.

---

<div align="center">

🏺 **Governance for the autonomous era**  
*Built for agents that execute decisions*

**Live now:** https://app.teosegypt.com

⭐ **Star on GitHub** → [github.com/Elmahrosa/agent-code-risk-mcp](https://github.com/Elmahrosa/agent-code-risk-mcp)

🛡️ **Fail-Fast is Key: Stop damage before it happens**

---

**Built with:**
- TypeScript — Type-safe code
- Express — HTTP API framework
- Base Network — On-chain payment settlement
- MCP SDK — Agent integration protocol
- USDC — Stable cryptocurrency payments

**Powered by TEOS Labs** | **Egyptian heritage meets blockchain governance**

</div>
