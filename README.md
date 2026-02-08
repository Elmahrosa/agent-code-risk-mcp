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

Built for **CI/CD pipelines** and **autonomous agents** | **x402 pay-per-decision** | **On-chain verification** | **Tiered rate limits**

[Live API](https://app.teosegypt.com) · [Pricing](https://app.teosegypt.com/pricing) · [Docs](#-installation--setup) · [Examples](#-integration-examples) · [GitHub](https://github.com/Elmahrosa/agent-code-risk-mcp)

</div>

---

## ✅ Live Status (Public)

- **Health:** `GET https://app.teosegypt.com/health`
- **Pricing:** `GET https://app.teosegypt.com/pricing`
- **Analyze:** `POST https://app.teosegypt.com/analyze`
- **Dependency scan:** `POST https://app.teosegypt.com/scan-dependencies`

---

## 🎯 What This Is

**Agent Code Risk MCP** is a production-grade **decision firewall** for AI agents and automated systems.  
It detects risky patterns **before merge or deployment** using deterministic heuristics, and supports **pay-per-request pricing** via x402 on Base.

### Key Features

✅ **Agent-Native Security** — Detects execution, secrets, injection, tool misuse  
✅ **Decision-Based Pricing** — Basic / Premium / Pipeline tiers  
✅ **/pricing Endpoint** — Public pricing + payment metadata for clients  
✅ **On-Chain Verification** — Optional real USDC transfer verification  
✅ **CI/CD Ready** — Designed for automation gates  
✅ **MCP Compatible** — Works with MCP clients (stdio server included)  
✅ **Tiered Rate Limiting** — Protects the API from abuse (429 JSON)  
✅ **Stateless** — No storage, in-memory only

---

## 🚀 Quick Start

### 1) Check Health & Pricing

```bash
curl https://app.teosegypt.com/health
curl https://app.teosegypt.com/pricing
````

### 2) Test a Scan

```bash
curl -s -X POST https://app.teosegypt.com/analyze \
  -H "Content-Type: application/json" \
  -d '{"code":"const x = eval(userInput);","mode":"basic"}'
```

> `mode` can be: `basic` | `premium` | `pipeline`

### 3) Dependency Scan

```bash
curl -s -X POST https://app.teosegypt.com/scan-dependencies \
  -H "Content-Type: application/json" \
  -d '{"manifest":"{\"dependencies\":{\"lodash\":\"4.17.0\"}}","lockfile":""}'
```

---

## 💰 Pricing (Live)

Pricing is discoverable in real-time from:

* `GET https://app.teosegypt.com/pricing`

### Tiers

| Tier         | When to use                        | Endpoint(s)                                       |
| ------------ | ---------------------------------- | ------------------------------------------------- |
| **Basic**    | agent decisions, quick code checks | `/analyze` (`mode=basic`)                         |
| **Premium**  | deeper analysis / higher assurance | `/analyze` (`mode=premium`), `/scan-dependencies` |
| **Pipeline** | CI/CD gate runs                    | `/analyze` (`mode=pipeline`)                      |

---

## 🧪 Test Mode vs Live Mode

The API can run in **test mode** (no payment required) to validate integrations before launch.

Check current mode here:

```bash
curl https://app.teosegypt.com/health
```

It returns:

* `mode`
* `requirePayment`
* `verifyOnChain`
* tier prices

---

## 🛡️ What We Detect

### 🔴 Critical

* Dynamic execution (`eval`, `new Function`, shell execution)
* Hardcoded secrets / private keys
* SQL / command injection patterns
* Unsafe deserialization (`pickle.loads`, `yaml.load`, `unserialize`)

### 🟠 High

* XSS primitives (`innerHTML`, `document.write`)
* Prototype pollution vectors
* SSRF / unvalidated outbound URLs
* Auth bypass patterns

### 🟡 Medium / 🔵 Low

* Weak crypto usage (MD5/SHA1/Math.random)
* Risky config patterns
* Debug leftovers, TODOs, linter suppressions

---

## 📦 Repository Structure

```text
agent-code-risk-mcp/
├── src/
│   ├── core/
│   │   └── review.ts
│   ├── http/
│   │   ├── app.ts
│   │   ├── x402Verify.ts
│   │   └── rateLimit.ts
│   ├── mcp/
│   │   └── server.ts
│   ├── tools/
│   │   ├── analyzeCode.ts
│   │   └── scanDependencies.ts
│   └── config.ts
├── .env.example
├── LICENSE
├── package.json
└── tsconfig.json
```

---

## 🔧 Installation & Setup

### 1) Install

```bash
npm install
```

### 2) Configure

```bash
cp .env.example .env
```

### 3) Run

```bash
npm run build
npm start
```

---

## ⚙️ Environment Variables (Core)

```env
# Payment routing
X402_PAY_TO=0x6CB857A62f6a55239D67C6bD1A8ed5671605566D
X402_NETWORK=eip155:8453

# On-chain verification (optional)
X402_VERIFY_ONCHAIN=0
X402_CONFIRMATIONS=2
RPC_URL_BASE=https://mainnet.base.org

# Pricing (USDC)
PRICE_BASIC=0.25
PRICE_PREMIUM=0.50
PRICE_PIPELINE=1.00

# Mode / payments
TEOS_MODE=test
REQUIRE_PAYMENT=0

# Server
PORT=3000
HOST=0.0.0.0
```

> Switch to live mode by setting `TEOS_MODE=live` and `REQUIRE_PAYMENT=1`, and (optionally) `X402_VERIFY_ONCHAIN=1`.

---

## 🧯 Rate Limiting (New)

The API enforces **tiered rate limits** and returns JSON on throttling:

* `429 { "error": "Too Many Requests" }`

You can tune limits:

```env
RATE_LIMIT_WINDOW_MS=60000
RATE_LIMIT_MAX_PUBLIC=600
RATE_LIMIT_MAX_BASIC=120
RATE_LIMIT_MAX_PREMIUM=60
RATE_LIMIT_MAX_PIPELINE=30
```

---

## 🔌 Integration Examples

### CI/CD (GitHub Actions) — Pipeline Tier

```yaml
name: Agent Risk Gate
on: [pull_request]

jobs:
  risk:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - name: Compute diff
        run: git diff origin/main...HEAD > diff.txt

      - name: Scan diff
        run: |
          curl -s -X POST https://app.teosegypt.com/analyze \
            -H "Content-Type: application/json" \
            -d "{\"code\":\"$(cat diff.txt | sed 's/\"/\\\"/g')\",\"mode\":\"pipeline\"}" \
            | tee result.json
```

### JavaScript

```ts
export async function scan(code: string, mode: "basic"|"premium"|"pipeline") {
  const res = await fetch("https://app.teosegypt.com/analyze", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ code, mode }),
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
```

---

## 📊 API Responses

### `/pricing` (200)

Returns:

* mode + requirePayment
* network info
* USDC contract + payTo
* tier prices

### `/analyze` (200)

Returns:

* `tier`
* `price_preview`
* `payment_required`
* `result` (findings + summary)

### `/scan-dependencies` (200)

Returns:

* `tier=premium`
* `price_preview`
* `payment_required`
* `result` (vulns + riskScore)

---

## 📜 License

MIT — see [LICENSE](LICENSE)

---

<div align="center">

**Built for the agent economy. Paid per decision. Secured by the chain.** ⚡️

[Try it now](https://app.teosegypt.com) · [Pricing](https://app.teosegypt.com/pricing) · [Star on GitHub](https://github.com/Elmahrosa/agent-code-risk-mcp)

</div>
```
