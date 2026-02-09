#!/usr/bin/env bash
set -e

BASE_URL="${BASE_URL:-https://app.teosegypt.com}"

echo "======================================="
echo "🧪 Agent Code Risk MCP — E2E Test"
echo "Target: $BASE_URL"
echo "Timestamp: $(date -u)"
echo "======================================="

echo
echo "1️⃣ Health check"
curl -s "$BASE_URL/health" | jq .

echo
echo "2️⃣ Pricing discovery"
curl -s "$BASE_URL/pricing" | jq .

echo
echo "3️⃣ Basic analysis (eval)"
curl -s -X POST "$BASE_URL/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "const x = eval(userInput);",
    "mode": "basic"
  }' | jq .

echo
echo "4️⃣ Premium analysis"
curl -s -X POST "$BASE_URL/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "const pwd = \"hardcoded123\";",
    "mode": "premium"
  }' | jq .

echo
echo "5️⃣ Pipeline analysis"
curl -s -X POST "$BASE_URL/analyze" \
  -H "Content-Type: application/json" \
  -d '{
    "code": "child_process.exec(userCmd);",
    "mode": "pipeline"
  }' | jq .

echo
echo "6️⃣ Dependency scan"
curl -s -X POST "$BASE_URL/scan-dependencies" \
  -H "Content-Type: application/json" \
  -d '{
    "manifest": "{\"dependencies\":{\"lodash\":\"4.17.0\"}}",
    "lockfile": ""
  }' | jq .

echo
echo "7️⃣ 404 JSON check"
curl -s -i "$BASE_URL/this-does-not-exist"

echo
echo "======================================="
echo "✅ E2E TEST COMPLETED SUCCESSFULLY"
echo "======================================="
