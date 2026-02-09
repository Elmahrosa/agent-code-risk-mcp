
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

[![Live API](https://img.shields.io/badge/Live%20API-✅%20Online-brightgreen?style=flat-square&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUiIGhlaWdodD0iMTUiIHZpZXdCb3g9IjAgMCAxNSAxNSIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBmaWxsLXJ1bGU9ImV2ZW5vZGQiIGNsaXAtcnVsZT0iZXZlbm9kZCIgZD0iTTExLjI1IDMuNzVMNy41IDcuNSAyLjI1IDMuNzVMMCA1LjI1TDcuNSA5TDExLjI1IDUuMjVaIiBmaWxsPSIjMDBBOTAwIi8+PC9zdmc+)](https://app.teosegypt.com/health)
[![Pricing](https://img.shields.io/badge/Pricing-Live-1E90FF?style=flat-square&logo=usdcoin&logoColor=white)](https://app.teosegypt.com/pricing)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-007ACC?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-brightgreen?style=flat-square&logo=mit)](LICENSE)

🔗 [Live API](https://app.teosegypt.com) · [Pricing](https://app.teosegypt.com/pricing) · [GitHub](https://github.com/Elmahrosa/agent-code-risk-mcp)

</div>

---

## 🎯 **Agent Code Risk MCP**

**A production-grade decision firewall for autonomous code execution.**

Agent Code Risk MCP is a **deterministic security and governance engine** built for:
- **AI agents**
- **CI/CD pipelines**
- **Autonomous DevOps systems**

It **analyzes and enforces decisions** on code and dependencies **before execution, merge, or deployment**, using **x402 pay-per-decision verification** on Base.

```
Agent writes code → MCP analyzes → Risk blocked → Safe execution
```

**Not a linter. Not AI guessing. Deterministic enforcement.**

---

## 👥 **Who This Is For**

- **AI Agent Builders** — running autonomous coding or fixing agents  
- **DevOps / Platform Teams** — enforcing CI/CD safety gates  
- **Web3 & DeFi Teams** — preventing autonomous exploits  
- **Security Engineers** — who need enforcement, not reports  
- **Founders** — who don't want agents to break production  

---

## 🛡️ **Enforcement Policy**

> 🚫 **When a Critical risk is detected, execution MUST stop.**  
> Agent Code Risk MCP returns a machine-readable **BLOCK decision** — not advice.

| Severity | Examples | Action |
|----------|----------|--------|
| 🔴 **Critical** | `eval()`, dynamic exec, secrets, injection | **Auto-BLOCK** |
| 🟠 **High** | XSS, SSRF, prototype pollution | Premium enforcement |
| 🟡 **Medium** | Weak crypto, debug code | Pipeline gate |

---

## 🔴 **Public Beta — Free Testing (Limited)**

**No wallet. No gas. No payment required during beta.**

```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"eval(userInput)","mode":"basic"}'
```

**⏳ Beta closes soon → Paid per decision**

## 💰 **x402 Pricing (Pay-Per-Decision)**

**Live pricing always available at `/pricing`.**

| Tier | Use Case | Price |
|------|----------|-------|
| **Basic** | Agent decisions | **$0.25** |
| **Premium** | High-assurance checks | **$0.50** |
| **Pipeline** | CI/CD enforcement | **$1.00** |

**Example Response:**
```json
{
  "decision": "BLOCK",
  "tier": "pipeline",
  "price_usd": 1.0,
  "risk_level": "CRITICAL",
  "blocked": true,
  "reason": "Dynamic code execution (eval) detected",
  "patterns": ["eval()"]
}
```

---

## 🚀 **Quick Start**

### **Analyze Code**
```bash
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "code": "const x = eval(userInput);",
    "mode": "basic"
  }'
```

### **Scan Dependencies**
```bash
curl -X POST https://app.teosegypt.com/scan-dependencies \
  -H "Content-Type: application/json" \
  -d '{"manifest":"{\"dependencies\":{\"lodash\":\"4.17.15\"}}"}'
```

### **CI/CD Gate**
```yaml
- name: Agent Risk Gate
  run: |
    RESPONSE=$(curl -s -X POST https://app.teosegypt.com/analyze \
      -d "{\"code\":\"$(git diff origin/main)\",\"mode\":\"pipeline\"}")
    echo "$RESPONSE" | jq -e '.blocked == false' || exit 1
```

---

## 🔌 **Local Development**

```bash
git clone https://github.com/Elmahrosa/agent-code-risk-mcp.git
cd agent-code-risk-mcp
npm install
npm run build

# MCP server (Claude Desktop)
npm run start:mcp

# HTTP API
npm run start:api
```

### **Claude Desktop Configuration**
```json
{
  "mcpServers": {
    "agent-code-risk": {
      "command": "node",
      "args": ["dist/index.js"],
      "env": {
        "X402_VERIFY_ONCHAIN": "0"
      }
    }
  }
}
```

---

## ⚙️ **Environment Variables**

```env
# Mode
TEOS_MODE=production
REQUIRE_PAYMENT=1

# Pricing
PRICE_BASIC=0.25
PRICE_PREMIUM=0.50
PRICE_PIPELINE=1.00

# x402 / Base
X402_PAY_TO=0x6CB857A62f6a55239D67C6bD1A8ed5671605566D
X402_NETWORK=eip155:8453
X402_VERIFY_ONCHAIN=1

# RPC
RPC_URL=https://mainnet.base.org
PORT=3000
```

---

## 🧪 **Test vs Production**

| Mode | Payments | On-Chain | Use Case |
|------|----------|----------|----------|
| **Test** | Free | Disabled | E2E testing |
| **Production** | USDC | Verified | Real enforcement |

```bash
curl https://app.teosegypt.com/health
```

---

## 📦 **Architecture**

```
agent-code-risk-mcp/
├── src/
│   ├── core/        # Risk detection engine
│   ├── http/        # Express + x402
│   ├── mcp/         # MCP stdio server
│   └── tools/       # Analyzers
├── tests/
├── package.json
└── README.md
```

---

## 📜 **Disclaimer**

> This system enforces technical risk policies only.  
> It does not provide legal, financial, or compliance guarantees.

<div align="center">

**🏺 Governance for autonomous agents**  
**💰 Pay-per-decision security**  
**⚡ On-chain enforcement**

[🔴 Live API](https://app.teosegypt.com) · [💰 Pricing](https://app.teosegypt.com/pricing)

</div>
