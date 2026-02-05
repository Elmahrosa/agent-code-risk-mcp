import { z } from "zod";

export const DiffSchema = z.string().min(1).max(2_000_000);

export type Finding = {
  id: string;
  severity: "LOW" | "MEDIUM" | "HIGH";
  title: string;
  suggestion: string;
};

export function reviewDiff(diff: string) {
  DiffSchema.parse(diff);
  const findings: Finding[] = [];

  if (/-----BEGIN .*PRIVATE KEY-----/.test(diff)) {
    findings.push({
      id: "private-key",
      severity: "HIGH",
      title: "Private key detected in diff",
      suggestion: "Remove immediately and rotate credentials."
    });
  }

  if (/\beval\s*\(/.test(diff)) {
    findings.push({
      id: "eval-usage",
      severity: "HIGH",
      title: "Use of eval detected",
      suggestion: "Avoid eval; refactor using safe parsing."
    });
  }

  return {
    findings,
    summary:
      findings.length === 0
        ? "No critical issues found (MVP heuristics)."
        : `Found ${findings.length} issue(s).`
  };
}

export function pipelineGuard(diff: string) {
  const { findings } = reviewDiff(diff);
  const high = findings.filter(f => f.severity === "HIGH");

  if (high.length) {
    return { decision: "BLOCK", reasons: high.map(f => f.title) };
  }

  return { decision: "ALLOW", reasons: ["No blocking issues detected."] };
}

export function generateFixPatch(diff: string) {
  const { findings } = reviewDiff(diff);
  return {
    patchPlan:
      findings.length === 0
        ? ["No changes needed."]
        : findings.map(f => `Fix ${f.id}: ${f.suggestion}`)
  };
}
