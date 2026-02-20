export function buildAuditSummary(issues: Array<{ severity: string }>) {
  const counts = issues.reduce(
    (acc, issue) => {
      acc[issue.severity] = (acc[issue.severity] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>
  );

  return {
    generatedAt: new Date().toISOString(),
    totals: counts
  };
}
