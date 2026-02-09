
<div align="center">

# 🏺 Agent Code Risk MCP — TeosMcp  

### *Decision Firewall for Autonomous Systems*

> **Fail‑Fast is Key**  
> In autonomous systems, delayed detection equals damage.  
> Agent Code Risk MCP is designed to **block unsafe decisions immediately**, not report them after execution.

**Autonomous systems fail differently than humans.**

🔴 **Agent leaks API key** → $10K+ stolen compute  
🔴 **Agent breaks authentication** → $100K data breach  
🔴 **Agent violates compliance** → $1M+ regulatory fine  

*These are not bugs. These are autonomous decisions executed without governance.*

**Agent Code Risk MCP prevents these failures BEFORE execution.**  
*Real-time prevention — not retrospective scanning.*

*Traditional scanners report risk. Agent Code Risk MCP **enforces decisions**.*

[![Live API](https://img.shields.io/badge/Live%20API-✅%20Online-brightgreen?style=flat-square)](https://app.teosegypt.com/health)
[![Pricing](https://img.shields.io/badge/Pricing-Live-1E90FF?style=flat-square&logo=usdcoin&logoColor=white)](https://app.teosegypt.com/pricing)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square)](LICENSE)

🔗 [Live API](https://app.teosegypt.com) · [Pricing](https://app.teosegypt.com/pricing) · [GitHub](https://github.com/Elmahrosa/agent-code-risk-mcp)

</div>

---

## 🎯 **What It Does**

**Agent Code Risk MCP** is a **production-grade decision firewall** that:

✅ **Blocks** `eval()`, secrets, injection **before execution**  
✅ **Enforces** via **machine-readable BLOCK decisions** (not reports)  
✅ **Optionally enforces** decisions via **x402 pay-per-decision** on Base ($0.25-$1.00)  
✅ **Integrates** with AI agents, CI/CD, autonomous systems  

```
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

**Live Example:**

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"eval(userInput)","mode":"basic"}'
```

```json
{
  "decision": "BLOCK",
  "risk_level": "CRITICAL",
  "blocked": true,
  "reason": "eval detected"
}
```

🔴 **Public Beta → Live Now**  
Free during beta. No wallet required.

```bash
# Test critical risk
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"eval(userInput)","mode":"basic"}'

# Scan dependencies
curl -X POST https://app.teosegypt.com/scan-dependencies \
  -H "Content-Type: application/json" \
  -d '{"manifest":"{\"lodash\":\"4.17.15\"}"}'
```

⏳ **Beta ends soon → $0.25−$1.00 per decision**

| Tier | Price | Use Case |
|------|-------|----------|
| Basic | $0.25 | Agent decisions |
| Premium | $0.50 | High assurance |
| Pipeline | $1.00 | CI/CD gates |

---

## 🚀 **5-Minute Integration**

1. **API (Instant)**

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"const x = eval(input);","mode":"pipeline"}'
```

2. **GitHub Actions**

```yaml
- name: Risk Gate
  run: |
    curl -s -X POST https://app.teosegypt.com/analyze \
      -H "Content-Type: application/json" \
      -d "{\"code\":\"$(git diff HEAD~1)\",\"mode\":\"pipeline\"}" \
      | jq -e '.blocked == false' || exit 1
```

3. **Claude Desktop (MCP)**

```bash
npm run start:mcp
```

```json
{
  "mcpServers": {
    "agent-code-risk": {
      "command": "node",
      "args": ["dist/index.js"]
    }
  }
}
```

---

## 💳 **x402 Payment Flow**

1. Agent calls `/analyze` → Risk analysis
2. Returns `{"decision":"BLOCK","price_usd":0.25}`
3. x402 header → USDC payment on Base  
4. Verified → Clean response

```bash
X402_PAY_TO=0x6CB857A62f6a55239D67C6bD1A8ed5671605566D
X402_NETWORK=eip155:8453
PRICE_PIPELINE=1.00
```

## 🧪 **Test → Production**

| Mode | Cost | Verification | Use |
|------|------|--------------|-----|
| TEST | Free | Disabled | Development |
| PROD | USDC | On-chain | Production |

```bash
# Health check
curl https://app.teosegypt.com/health

# Pricing
curl https://app.teosegypt.com/pricing
```

---

## 📁 **Self-Hosted**

```bash
git clone https://github.com/Elmahrosa/agent-code-risk-mcp
cd agent-code-risk-mcp
npm install && npm run build
npm run start:api  # HTTP server
npm run start:mcp  # Claude Desktop
```

```bash
TEOS_MODE=production
RPC_URL=https://mainnet.base.org
PORT=3000
```

---

## 🏗️ **Architecture**

```
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

```
src/
├── core/          # Risk patterns (eval, secrets, injection)
├── http/          # Express + x402 middleware
├── mcp/           # Claude Desktop protocol
└── tools/         # Dependency scanner
```

---

## 🧱 **Security Model & Non-Goals**

### **Security Model**
Agent Code Risk MCP operates under a **Fail-Fast, Zero-Trust model**:

- All autonomous code is treated as untrusted by default
- Deterministic rules are applied before execution, merge, or deployment
- Critical risks result in an immediate BLOCK decision
- Responses are machine-readable and designed for automated enforcement
- Payment (x402) serves as an optional economic enforcement layer, not authentication
- Provides a hosted reference deployment; enforcement logic is fully self-hostable

The system prioritizes **prevention over observability**.

### **Non-Goals**
Agent Code Risk MCP is not designed to:

- Replace full static analysis platforms (e.g., SonarQube, Semgrep)
- Detect business-logic vulnerabilities
- Provide legal, regulatory, or compliance guarantees
- Act as an AI-based probabilistic guessing system
- Automatically fix or rewrite code

**Its sole purpose is to block unsafe autonomous decisions before damage occurs.**

---

## 🔍 **Security Review Note**

Agent Code Risk MCP is a **security enforcement system**, not a vulnerability scanner library.

Before production use, organizations are expected to:

- Review the deterministic rules and heuristics used for enforcement
- Run the system in Test Mode to validate behavior against internal policies
- Self-host or fork the project if required by internal security or compliance standards

This project is intentionally **transparent and open-source** to enable independent verification and controlled adoption.

---

## 📜 **Legal Notice**

**Technical enforcement only.** This tool provides automated code risk detection and blocking. It does not constitute legal advice, compliance certification, or security guarantees. Organizations are responsible for their own security policies and regulatory compliance. **Use at your own risk.**

---

<div align="center">
🏺 **Governance for the autonomous era**  
*Built for agents that execute decisions*  
**Live now:** https://app.teosegypt.com  

⭐ **Star on GitHub** → github.com/Elmahrosa/agent-code-risk-mcp

🛡️ **Fail-Fast is Key: Stop damage before it happens**
</div>
```
