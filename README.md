<div align="center">

# Agent Code Risk MCP #TeosMcp

![TeosMcp](https://img.shields.io/badge/TeosMcp-Elmahrosa%20Blockchain-gold?style=plastic&logo=appveyor)
[![TEOS](https://img.shields.io/badge/TEOS-Governance%20by%20Design-blue?style=flat-square)](https://github.com/Elmahrosa)
[![Elmahrosa](https://img.shields.io/badge/Elmahrosa-Blockchain%20Ecosystem-gold?style=flat-square)](https://github.com/Elmahrosa)
[![Base](https://img.shields.io/badge/Powered%20by-Base%20Network-0052FF?style=flat-square&logo=ethereum&logoColor=white)](https://base.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-green?style=flat-square)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Live API](https://img.shields.io/badge/Live%20API-Online-success?style=flat-square)](https://app.teosegypt.com/health)

**Prevent AI agents from shipping insecure, unsafe, or non-compliant code.**

Built for **CI/CD pipelines** and **autonomous agents** | **x402 pay-per-scan** | **On-chain verification**

[Live API](https://app.teosegypt.com) · [Documentation](#-setup) · [Examples](#-integration-examples) · [GitHub](https://github.com/Elmahrosa/agent-code-risk-mcp)

</div>

---

## 🎯 What This Is

**Agent Code Risk MCP** is a production-grade **security scanner** specifically designed for AI agents and automated systems. It detects risky code patterns **before merge or deployment** using deterministic heuristics and **pay-per-request pricing** via x402 payments on Base.

### Key Features

✅ **Agent-Native Security** — Detects prompt injection, tool misuse, and agent-specific risks  
✅ **Pay-Per-Scan** — $0.002 USDC per scan, no subscriptions or accounts required  
✅ **On-Chain Verification** — Real USDC payment validation on Base Network  
✅ **CI/CD Ready** — <100ms analysis, designed for pipeline integration  
✅ **MCP Compatible** — Works with Claude Desktop, Cline, and custom agents  
✅ **Stateless & Private** — No data retention, all processing in-memory

---

## 🚀 Quick Start

### Test the API

```bash
# Check API health
curl https://app.teosegypt.com/health

# Try a scan (returns 402 Payment Required)
curl -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code": "const x = eval(userInput);"}'
```

### Payment Flow

1. **Request** → API returns `402 Payment Required` with payment details
2. **Pay** → Send 0.002 USDC on Base to provided address
3. **Retry** → Include transaction hash in `x-payment` header
4. **Results** → Receive security analysis

---

## 💰 Pricing

| Service | Price | Description |
|---------|-------|-------------|
| **Code Analysis** | **0.002 USDC** | Scan source code for security risks, prompt injection, secrets |
| **Dependency Scan** | **0.05 USDC** | Check package.json/requirements.txt for vulnerabilities |

**Payment Details:**
- Network: Base Mainnet (Chain ID: 8453)
- Token: USDC (`0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`)
- Wallet: `0x6CB857A62f6a55239D67C6bD1A8ed5671605566D`
- Confirmations: 2 blocks (~4 seconds)

**Economics:**
- 1,000 scans = $2.00/day = $60/month
- vs. Snyk Pro: $50-200/month (flat rate regardless of usage)

---

## 🛡️ What We Detect

### 🔴 Critical Risks
- **Code Execution** — `eval()`, `new Function()`, shell commands
- **Secret Leaks** — API keys, private keys, AWS credentials (AKIA...)
- **SQL Injection** — String concatenation in queries
- **Command Injection** — Unsafe shell execution patterns

### 🟠 High Risks
- **Prompt Injection** — Unsanitized user input in LLM prompts
- **Tool Misuse** — Agent tool calls without validation
- **Prototype Pollution** — `__proto__` manipulation
- **SSRF** — Unvalidated external URLs
- **Auth Bypass** — Disabled authentication checks

### 🟡 Medium Risks
- **Weak Crypto** — MD5, SHA-1, Math.random() for security
- **CORS Wildcards** — Allow-Origin: *
- **Insecure Deserialization** — pickle.loads, yaml.load
- **Path Traversal** — `../` patterns

### 🔵 Low/Info
- **Console Logging** — Debug statements in production
- **TODOs** — Unresolved FIXME/HACK comments
- **Linter Suppressions** — eslint-disable, @ts-ignore

---

## 📦 Repository Structure

```text
agent-code-risk-mcp/
├── src/
│   ├── core/
│   │   └── review.ts           # Heuristic risk detection engine
│   ├── http/
│   │   ├── app.ts              # Express HTTP API
│   │   └── x402Verify.ts       # On-chain payment verification
│   ├── mcp/
│   │   └── server.ts           # MCP stdio JSON-RPC server
│   ├── tools/
│   │   ├── analyzeCode.ts      # Code analysis engine
│   │   └── scanDependencies.ts # Dependency vulnerability scanner
│   └── config.ts               # Centralized configuration
├── .env.example                # Configuration template
├── Dockerfile                  # Production container
├── LICENSE                     # MIT License
├── package.json                # Dependencies & scripts
├── tsconfig.json               # TypeScript configuration
└── README.md                   # This file
```

---

## 🔧 Installation & Setup

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env`:

```env
# Payment Configuration
X402_PAY_TO=0x6CB857A62f6a55239D67C6bD1A8ed5671605566D
X402_NETWORK=eip155:8453

# On-chain Verification
X402_VERIFY_ONCHAIN=1
X402_CONFIRMATIONS=2

# RPC & Contract
RPC_URL_BASE=https://mainnet.base.org
USDC_ADDRESS=0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913

# Pricing
PRICE_BASIC=0.002
PRICE_PREMIUM=0.05

# Server
PORT=3000
HOST=0.0.0.0
```

> **For Testing:** Use `X402_NETWORK=eip155:84532` for Base Sepolia testnet

### 3. Build & Run

```bash
# Build TypeScript
npm run build

# Start HTTP server
npm start

# Or start MCP server (stdio)
npm run start:mcp
```

---

## 🔌 Integration Examples

### CI/CD Pipeline (GitHub Actions)

```yaml
name: Agent Security Check
on: [pull_request]

jobs:
  security:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      
      - name: Get code diff
        id: diff
        run: |
          git diff origin/main...HEAD > diff.txt
      
      - name: Security scan
        run: |
          RESPONSE=$(curl -s -X POST https://app.teosegypt.com/analyze \
            -H "Content-Type: application/json" \
            -H "x-payment: ${{ secrets.USDC_TX_HASH }}" \
            -d "{\"code\":\"$(cat diff.txt)\"}")
          
          RISK=$(echo $RESPONSE | jq -r '.overallRisk')
          
          if [ "$RISK" = "critical" ]; then
            echo "🚫 BLOCKED: Critical security risk detected"
            echo $RESPONSE | jq '.findings'
            exit 1
          fi
          
          echo "✅ Security check passed"
```

### JavaScript/TypeScript

```typescript
async function scanCode(code: string, txHash: string) {
  const response = await fetch('https://app.teosegypt.com/analyze', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-payment': txHash
    },
    body: JSON.stringify({ code })
  });
  
  if (!response.ok) {
    throw new Error(`Scan failed: ${response.statusText}`);
  }
  
  return await response.json();
}

// Usage
const result = await scanCode('const x = eval(userInput);', '0xYOUR_TX_HASH');
console.log('Risk Level:', result.overallRisk);
console.log('Findings:', result.findings);
```

### Python

```python
import requests

def scan_code(code: str, tx_hash: str):
    response = requests.post(
        'https://app.teosegypt.com/analyze',
        headers={
            'Content-Type': 'application/json',
            'x-payment': tx_hash
        },
        json={'code': code}
    )
    
    response.raise_for_status()
    return response.json()

# Usage
result = scan_code('password = "hardcoded123"', '0xYOUR_TX_HASH')
print(f"Risk: {result['overallRisk']}")
for finding in result['findings']:
    print(f"  [{finding['severity']}] {finding['message']}")
```

### Pre-commit Hook

```bash
#!/bin/bash
# .git/hooks/pre-commit

DIFF=$(git diff --cached)
[ -z "$DIFF" ] && exit 0

RESULT=$(curl -s -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -H "x-payment: $USDC_TX_HASH" \
  -d "{\"code\":\"$DIFF\"}")

RISK=$(echo $RESULT | jq -r '.overallRisk')

if [ "$RISK" = "critical" ]; then
  echo "❌ Commit blocked: Critical security risk detected"
  echo $RESULT | jq '.findings'
  exit 1
fi

echo "✅ Security check passed"
```

---

## 🤖 MCP Integration

**Compatible with:** Claude Desktop, Cline, AutoGPT, and any MCP-compatible client.

### Claude Desktop Configuration

Add to `~/Library/Application Support/Claude/claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "agent-code-risk": {
      "command": "node",
      "args": ["/path/to/agent-code-risk-mcp/dist/mcp/server.js"],
      "env": {
        "X402_VERIFY_ONCHAIN": "0"
      }
    }
  }
}
```

### MCP Tools Available

| Tool | Description |
|------|-------------|
| `analyze_code` | Scan source code for security risks |
| `scan_dependencies` | Check package manifests for vulnerabilities |
| `check_permissions` | Detect dangerous permission requests |
| `get_pricing` | Get current pricing and payment info |

---

## 🔐 Security & Verification

### On-Chain Payment Verification

Our production system verifies every payment with:

1. ✅ **Transaction Receipt** — Fetched from Base via JSON-RPC
2. ✅ **Block Confirmations** — Minimum 2 blocks required (~4 seconds)
3. ✅ **USDC Transfer Event** — Validates ERC-20 Transfer log entry
4. ✅ **Recipient Match** — Checksums payTo address
5. ✅ **Amount Validation** — Paid ≥ required (6 decimal precision)
6. ✅ **Status Check** — Reverted transactions rejected
7. ✅ **Replay Protection** — Each tx hash can only be used once

**Development Mode:** Set `X402_VERIFY_ONCHAIN=0` for header-only validation (testing only).

### Privacy & Data Handling

- ✅ No data retention or storage
- ✅ All code processing in-memory only
- ✅ No telemetry or tracking
- ✅ Stateless architecture
- ✅ No PII collection
- ✅ Open source (audit the code)

---

## 🎯 Use Cases

### For AI Agent Builders
- Scan agent-generated code before execution
- Detect prompt injection vulnerabilities
- Catch unsafe tool usage patterns
- Prevent credential leaks

### For DevOps Teams
- CI/CD pipeline security gates
- Pre-merge risk assessment
- Automated code review
- Compliance enforcement

### For Security Teams
- Agent safety validation
- Governance policy enforcement
- Audit trail generation
- Risk scoring and reporting

### For Autonomous Systems
- Self-auditing agents
- Pay-per-scan economics
- No human intervention required
- Transparent on-chain payments

---

## 📊 API Response Format

### Successful Scan (200 OK)

```json
{
  "language": "javascript",
  "linesAnalyzed": 15,
  "findings": [
    {
      "rule": "no-eval",
      "severity": "critical",
      "line": 8,
      "message": "eval() allows arbitrary code execution",
      "snippet": "const result = eval(userInput);"
    },
    {
      "rule": "hardcoded-secret",
      "severity": "high",
      "line": 12,
      "message": "Possible hardcoded secret",
      "snippet": "const apiKey = 'sk-1234567890abcdef';"
    }
  ],
  "overallRisk": "critical",
  "summary": "Found 2 issue(s): 1 critical, 1 high. Overall risk: critical."
}
```

### Payment Required (402)

```json
{
  "error": "Payment Required",
  "x402-version": 1,
  "accepts": [{
    "scheme": "exact",
    "network": "eip155:8453",
    "maxAmountRequired": "0.002",
    "resource": "usdc:0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    "payTo": "0x6CB857A62f6a55239D67C6bD1A8ed5671605566D",
    "maxTimeoutSeconds": 60,
    "extra": {
      "name": "USDC",
      "decimals": 6
    }
  }],
  "description": "Pay $0.002 USDC on Base Mainnet to access this endpoint (basic tier)."
}
```

### Payment Verification Failed (402)

```json
{
  "error": "Payment Required",
  "reason": "Transaction already used. Each payment can only be used once."
}
```

---

## 🚀 Roadmap

### ✅ Phase 1: Live Now (February 2026)
- [x] Core code analysis API
- [x] USDC payment integration on Base
- [x] On-chain verification with replay protection
- [x] MCP stdio server
- [x] Dependency vulnerability scanning
- [x] Production deployment

### 🔄 Phase 2: Next 30 Days
- [ ] Python language-specific rules
- [ ] Go language support
- [ ] GitHub Action (official)
- [ ] JavaScript/TypeScript SDK
- [ ] Custom rule API
- [ ] Webhook notifications
- [ ] Batch scanning endpoint

### 🔮 Phase 3: Q2 2026
- [ ] Dashboard for tracking scans
- [ ] Team collaboration features
- [ ] Enterprise policy engine
- [ ] Compliance reporting (SOC2, GDPR)
- [ ] Python/Go SDKs
- [ ] CLI tool
- [ ] IDE extensions (VSCode)

---

## 💡 Why x402?

**Traditional APIs:**
- Require signup and API keys
- Monthly subscriptions ($50-200/mo)
- Complex billing and auth
- Not agent-native

**x402 Payment Standard:**
- ✅ Pay per request (no subscriptions)
- ✅ No signup or accounts
- ✅ Agent-friendly (machines can pay)
- ✅ Transparent on-chain verification
- ✅ Instant settlement
- ✅ No vendor lock-in

**Perfect for:**
- Autonomous agents
- CI/CD pipelines
- Microservices
- Pay-as-you-go usage
- Cross-organization integrations

---

## 🧪 Testing

```bash
# Run tests
npm test

# Test health endpoint
curl https://app.teosegypt.com/health

# Test payment flow (dev mode)
X402_VERIFY_ONCHAIN=0 npm start

# Manual test with curl
curl -X POST http://localhost:3000/analyze \
  -H "x-payment: test" \
  -d '{"code":"eval(x)"}'
```

---

## 🤝 Contributing

Contributions welcome! Areas of interest:

- Additional risk detection patterns
- Language-specific rules (Python, Go, Rust)
- Performance optimizations
- Documentation improvements
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
**GitHub:** https://github.com/Elmahrosa/agent-code-risk-mcp  
**Issues:** https://github.com/Elmahrosa/agent-code-risk-mcp/issues

**Payment Wallet:** `0x6CB857A62f6a55239D67C6bD1A8ed5671605566D`  
**Network:** Base Mainnet (Chain ID: 8453)  
**USDC Contract:** `0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913`

---

## 📜 License

**MIT License** — Free to use, modify, deploy, and monetize.

See [LICENSE](LICENSE) file for full details.

---

## 🏆 Built With

- **TypeScript** — Type-safe code
- **Express** — HTTP API framework
- **Base Network** — On-chain payment settlement
- **MCP SDK** — Agent integration protocol
- **USDC** — Stable cryptocurrency payments

---

## 🙏 Acknowledgments

- **TEOS Labs** — Governance by design
- **Elmahrosa** — Blockchain ecosystem
- **Base** — L2 network infrastructure
- **Anthropic** — MCP protocol
- **Circle** — USDC stablecoin

---

<div align="center">

**Built for the agent economy. Paid per call. Secured by the chain.** 🚀

[Try it now](https://app.teosegypt.com) | [Read the docs](#-installation--setup) | [Star on GitHub](https://github.com/Elmahrosa/agent-code-risk-mcp)

</div>
