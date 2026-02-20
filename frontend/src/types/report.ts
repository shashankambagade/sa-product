export type ReportPayload = {
  projectId: string;
  score: number;
  issuesBySeverity: Record<string, number>;
  trend: number[];
  topIssues: Array<{ type: string; count: number }>;
};
