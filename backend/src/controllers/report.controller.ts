import { Request, Response } from 'express';

const sample = {
  score: 82,
  issuesBySeverity: { critical: 1, high: 3, medium: 8, low: 14 },
  trend: [72, 75, 79, 82]
};

export async function getProjectReport(_req: Request, res: Response) {
  return res.json(sample);
}
