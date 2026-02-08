import express from "express";

const app = express();
app.use(express.json({ limit: "1mb" }));

// --- Health ---
app.get("/health", (req, res) => res.status(200).json({ ok: true }));

// --- Docs UI ---
app.get("/", (req, res) => {
  res
    .status(200)
    .type("html")
    .send(`<!doctype html>
<html>
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>Agent Code Risk MCP</title>
  <style>
    body{font-family:system-ui,-apple-system,Segoe UI,Roboto,Arial;max-width:920px;margin:40px auto;padding:0 16px;line-height:1.5}
    code,pre{background:#f5f5f5;padding:2px 6px;border-radius:6px}
    pre{padding:12px;overflow:auto}
    .card{border:1px solid #ddd;border-radius:12px;padding:16px;margin:14px 0}
    a{color:#0b57d0;text-decoration:none}
    a:hover{text-decoration:underline}
  </style>
</head>
<body>
  <h1>Agent Code Risk MCP</h1>
  <p>Status: <b>Online ✅</b></p>

  <div class="card">
    <h2>Endpoints</h2>
    <ul>
      <li><a href="/health">GET /health</a> → service health</li>
      <li><a href="/docs">GET /docs</a> → API & usage</li>
    </ul>
    <p>If you already have API routes (e.g. <code>/api/...</code>) in your app, they remain available.</p>
  </div>

  <div class="card">
    <h2>Quick test</h2>
    <pre>curl -s https://app.teosegypt.com/health</pre>
  </div>

  <p style="opacity:.7">Elmahrosa / TEOS Labs</p>
</body>
</html>`);
});

app.get("/docs", (req, res) => {
  res.status(200).type("html").send(`<!doctype html>
<html><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Docs | Agent Code Risk MCP</title>
<style>
body{font-family:system-ui;max-width:920px;margin:40px auto;padding:0 16px;line-height:1.5}
code,pre{background:#f5f5f5;padding:2px 6px;border-radius:6px}
pre{padding:12px;overflow:auto}
</style></head>
<body>
<h1>API Docs</h1>
<p>Health:</p>
<pre>GET /health</pre>

<p>If your repo exposes HTTP APIs (example):</p>
<pre>POST /api/v1/query
Content-Type: application/json

{"contract_address":"0x123","chain_id":"1"}</pre>

<p>If you want me to wire real endpoints here (not just docs), tell me the exact routes you want live.</p>
</body></html>`);
});

const port = Number(process.env.PORT || 8000);
app.listen(port, "0.0.0.0", () => console.log("HTTP on", port));
