import { Request, Response } from 'express';

export async function getProjectReport(req: Request, res: Response) {
  const { projectId } = req.params;
  return res.json({
    projectId,
    score: 82,
    issuesBySeverity: { critical: 1, high: 3, medium: 8, low: 14 },
    trend: [72, 75, 79, 82],
    topIssues: [
      { type: 'missing_meta_description', count: 14 },
      { type: 'broken_internal_links', count: 4 },
      { type: 'duplicate_title', count: 3 }
    ]
  });
}
