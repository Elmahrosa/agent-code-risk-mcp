<div align="center">

# 🏺 Agent Code Risk MCP — TeosMcp

### *Decision Firewall for Autonomous Systems*

> **Fail-Fast is Key**  
> In autonomous systems, delayed detection equals damage.  
> Agent Code Risk MCP is designed to **block unsafe decisions immediately**, not report them after execution.

**Autonomous systems fail differently than humans.**

🔴 **Agent leaks API key** → $10K+ stolen compute  
🔴 **Agent breaks authentication** → $100K data breach  
🔴 **Agent violates compliance** → $1M+ regulatory fine

*These are not bugs. These are autonomous decisions executed without governance.*

**Agent Code Risk MCP prevents these failures BEFORE execution.**  
*Real-time prevention — not retrospective scanning.*

![Governance Primitive](https://img.shields.io/badge/Category-Governance%20Primitive-gold?style=flat-square)
[![Live API](https://img.shields.io/badge/Live%20API-✅%20Online-brightgreen?style=flat-square)](https://app.teosegypt.com/health)
[![Pricing](https://img.shields.io/badge/Pricing-$0.25--1.00-1E90FF?style=flat-square&logo=usdcoin&logoColor=white)](https://app.teosegypt.com/pricing)
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

## 🎯 What It Does

**Agent Code Risk MCP** is a **production-grade decision firewall** that:

✅ **Blocks** `eval()`, secrets, injections **before execution**  
✅ **Enforces** via **machine-readable BLOCK decisions** (not reports)  
✅ **Enforces payment** via **x402 protocol** on Base Network  
✅ **Integrates** with AI agents, CI/CD pipelines, autonomous systems

```text
Agent generates code → MCP → BLOCK/ALLOW → Safe execution
                      ↓
                   Governance enforced
```

**Key difference:** Deterministic rules → **immediate blocking**, not probabilistic advice.

---

## 👥 Who Needs This

| Role               | Problem Solved             | Integration          |
| ------------------ | -------------------------- | -------------------- |
| **AI Builders**    | Agents writing unsafe code | Claude Desktop MCP   |
| **DevOps**         | Risky diffs entering CI    | GitHub Actions       |
| **Security Teams** | Enforcement vs reporting   | `/analyze` API       |
| **Web3/DeFi**      | Autonomous execution risk  | Pre-deploy gate      |
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

🔐 **Security model:** See [SECURITY.md](SECURITY.md) for full threat model and enforcement flow.

---

## 💰 Pricing

| Tier         | Price   | Use Case                  |
| ------------ | ------- | ------------------------- |
| **Basic**    | $0.25   | Agent decisions           |
| **Premium**  | $0.50   | High assurance + AI fixes |
| **Pipeline** | $1.00   | CI/CD enforcement         |

**We don't price scans. We price decisions.**

One blocked decision can save **$10K–$1M**.  
$0.25 is not a cost — it's execution-time insurance.

**Payment:** USDC on Base Network (Chain ID: 8453)  
**Protocol:** x402 (pay-per-request)

---

## 🚀 Quick Start

### Test Without Payment (Returns 402)

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

### With Payment (After Sending USDC)

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
  "price_preview": 0.25,
  "payment_required": true,
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

## 🔌 Integration Examples

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
          
          RISK=$(echo $RESPONSE | jq -r '.result.overallRisk')
          
          if [ "$RISK" = "critical" ]; then
            echo "🚫 BLOCKED: Critical security risk"
            echo $RESPONSE | jq '.result.findings'
            exit 1
          fi
```

### Claude Desktop (MCP)

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

### API Integration

```typescript
async function analyzeCode(code: string) {
  // Step 1: Request analysis (returns 402)
  const response = await fetch('https://app.teosegypt.com/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code, mode: 'basic' })
  });

  if (response.status === 402) {
    const payment = await response.json();
    // Step 2: Pay USDC on Base to payment.accepts[0].payTo
    const txHash = await sendUSDC(payment.accepts[0]);
    
    // Step 3: Retry with payment proof
    return fetch('https://app.teosegypt.com/analyze', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-payment': txHash
      },
      body: JSON.stringify({ code, mode: 'basic' })
    });
  }
}
```

---

## 💳 x402 Payment Flow

1. **Request:** Call `/analyze` → Receive `402 Payment Required`
2. **Pay:** Send USDC on Base Network to wallet address
3. **Retry:** Include `x-payment: <tx_hash>` header
4. **Verify:** System validates transaction on-chain (2 confirmations)
5. **Result:** Receive risk analysis

**Configuration:**
```env
X402_PAY_TO=0x6CB857A62f6a55239D67C6bD1A8ed5671605566D
X402_NETWORK=eip155:8453
X402_VERIFY_ONCHAIN=1
X402_CONFIRMATIONS=2
USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913
```

---

## 🧪 Test vs Production Mode

| Mode         | Cost | Payment Verification | Use              |
| ------------ | ---- | -------------------- | ---------------- |
| **TEST**     | Free | Disabled             | Development      |
| **PROD**     | USDC | On-chain (2 blocks)  | Production       |

```bash
# Check current mode
curl https://app.teosegypt.com/health | jq '.mode, .requirePayment'

# View pricing
curl https://app.teosegypt.com/pricing | jq
```

**Switch modes via environment:**
```env
# Test mode (free, no verification)
TEOS_MODE=test
REQUIRE_PAYMENT=0
X402_VERIFY_ONCHAIN=0

# Production mode (paid, on-chain verification)
TEOS_MODE=production
REQUIRE_PAYMENT=1
X402_VERIFY_ONCHAIN=1
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

### 🔵 Low/Info
- **Console Logging:** Debug statements in production
- **TODOs:** Unresolved FIXME/HACK comments
- **Linter Suppressions:** eslint-disable, @ts-ignore

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

# Payment
X402_PAY_TO=0xYOUR_WALLET_ADDRESS
X402_VERIFY_ONCHAIN=1
X402_CONFIRMATIONS=2

# Server
HOST=0.0.0.0
PORT=8000
```

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
                                │ On-chain verify  │
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

## 🧱 Security Model

🔐 **Full details:** [SECURITY.md](SECURITY.md)

Agent Code Risk MCP operates under a **Fail-Fast, Zero-Trust model**:

- All autonomous code is treated as untrusted by default
- Deterministic rules are applied **before** execution, merge, or deployment
- Critical risks result in an **immediate BLOCK decision**
- Responses are machine-readable and designed for automated enforcement
- Payment (x402) serves as an economic enforcement layer
- On-chain verification prevents payment replay attacks

**The system prioritizes prevention over observability.**

### Non-Goals

Agent Code Risk MCP is **not** designed to:

- ❌ Replace full static analysis platforms (e.g., SonarQube, Semgrep)
- ❌ Detect business-logic vulnerabilities
- ❌ Provide legal, regulatory, or compliance guarantees
- ❌ Act as an AI-based probabilistic guessing system
- ❌ Automatically fix or rewrite code

**Its sole purpose is to block unsafe autonomous decisions before damage occurs.**

---

## 🔒 Security Review Note

Agent Code Risk MCP is a **security enforcement system**, not a vulnerability scanner library.

Before production use, organizations are expected to:

✅ Review the deterministic rules and heuristics used for enforcement  
✅ Run the system in Test Mode to validate behavior against internal policies  
✅ Self-host or fork the project if required by internal security/compliance standards

This project is intentionally **transparent and open-source** to enable independent verification and controlled adoption.

---

## 🤝 Contributing

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

## 📞 Support & Resources

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

## 📜 Legal Notice

**Technical enforcement only.** This tool provides automated code risk detection and blocking. It does **not** constitute legal advice, compliance certification, or security guarantees. Organizations are responsible for their own security policies and regulatory compliance.

**Use at your own risk.**

---

## 📄 License

**MIT License** — Free to use, modify, deploy, and monetize.

See [LICENSE](LICENSE) file for full details.

---

<div align="center">

🏺 **Governance for the Autonomous Era**  
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
