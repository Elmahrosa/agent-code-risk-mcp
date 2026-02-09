# 🛡️ Agent Code Risk MCP — Security Model

Agent Code Risk MCP enforces a **Fail‑Fast, Zero‑Trust security framework** for autonomous and AI‑generated code.

---

## Core Principles

- **Untrusted by default**: All autonomous code is treated as hostile until proven safe  
- **Deterministic enforcement**: Rules are applied *before* execution, merge, or deployment  
- **Critical risks → Immediate BLOCK** → `{"decision":"BLOCK"}`  
- **Machine‑readable outputs**: Designed for automated governance with no human bottlenecks  
- **x402 payments**: Optional economic layer (not authentication or trust)  

---

## Enforcement vs. Scanning

```text
Traditional scanners:
REPORT → Human review → Possible fix

Agent Code Risk MCP:
BLOCK → Zero damage → Governance guaranteed
```

---

## Enforcement Flow

```mermaid
graph TD
    A[AI Agent Generates Code] --> B[/analyze API]
    B --> C{Risk Engine}

    C -->|CRITICAL<br/>eval(), secrets, RCE| D[🔴 IMMEDIATE BLOCK<br/>{"decision":"BLOCK"}]
    C -->|HIGH<br/>XSS, SSRF, SQLi| E[🟠 Premium BLOCK]
    C -->|MEDIUM<br/>Debug code, verbose logs| F[🟡 Pipeline Warning]
    C -->|PASS| G[✅ ALLOW Execution]

    D --> H[No Execution]
    E --> H
    F --> I[Human Review Required]
    G --> J[Safe Autonomous Execution]

    style D fill:#ff4444,color:#fff
    style E fill:#ff8800,color:#fff
    style F fill:#ffcc00,color:#000
    style G fill:#44ff44,color:#000
```

---

## Threat Model

| Risk Level   | Examples                                                    | Enforcement                                       |
| ------------ | ----------------------------------------------------------- | ------------------------------------------------- |
| **CRITICAL** | `eval()`, hardcoded secrets, credential leaks, RCE payloads | 🔴 Immediate BLOCK (`{"decision":"BLOCK"}`)       |
| **HIGH**     | XSS, SSRF, SQL injection, unsafe deserialization            | 🟠 Premium BLOCK (override + governance required) |
| **MEDIUM**   | Debug code, verbose logging, unsafe defaults                | 🟡 Pipeline Warning (human review)                |
| **PASS**     | Safe, policy‑compliant code                                 | ✅ Allow autonomous execution                      |

---

## Production Hardening

| Phase       | Action                     | Purpose                                     |
| ----------- | -------------------------- | ------------------------------------------- |
| **Test**    | `TEOS_MODE=test`           | Validate rules against internal policies    |
| **Review**  | Audit `src/core/` patterns | Customize thresholds per organization       |
| **Deploy**  | Self‑host behind firewall  | Ensure residency & air‑gap compliance       |
| **Monitor** | Log BLOCK decisions        | Maintain audit trail & tune false positives |

---

## Self‑Hosting (Enterprise Recommended)

```bash
git clone https://github.com/Elmahrosa/agent-code-risk-mcp
npm install
npm run build

export TEOS_MODE=production
npm run start:api
```

**Self‑hosting eliminates external dependencies and third‑party risk.**

---

## Support & Disclosure

- **Security issues**: [security@teosegypt.com](mailto:security@teosegypt.com)  
- **Rule customization**: Fork and adapt `src/core/` patterns  
- **Enterprise deployments**: Contact for private, hardened installations  

---

## Legal Notice

🏺 *Governance for the Autonomous Era*  

Agent Code Risk MCP provides **technical enforcement only**.  
It does **not** guarantee regulatory or legal compliance.  
Always review source code and policies before production use.  
