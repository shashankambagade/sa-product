export type ReportPayload = {
  score: number;
  issuesBySeverity: Record<string, number>;
  trend: number[];
};
