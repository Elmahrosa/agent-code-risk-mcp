#!/usr/bin/env bash
set -e

BASE_URL="${BASE_URL:-http://localhost:8000}"

echo "▶ Running E2E tests against: $BASE_URL"

echo "• Health check"
curl -sf "$BASE_URL/health" | jq .

echo "• Pricing check"
curl -sf "$BASE_URL/pricing" | jq .

echo "• Analyze (basic)"
curl -sf -X POST "$BASE_URL/analyze" \
  -H "Content-Type: application/json" \
  -d '{"code":"const x = eval(userInput);","mode":"basic"}' | jq .

echo "• Dependency scan"
curl -sf -X POST "$BASE_URL/scan-dependencies" \
  -H "Content-Type: application/json" \
  -d '{"manifest":"{\"dependencies\":{\"lodash\":\"4.17.0\"}}"}' | jq .

echo "✅ E2E tests passed"
