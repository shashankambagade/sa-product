import { Request, Response } from 'express';
import { Queue } from 'bullmq';
import { redis } from '../config/queue.js';

const crawlQueue = new Queue('crawl', { connection: redis });

export async function createAuditRun(req: Request, res: Response) {
  const { projectId, seedUrl } = req.body;

  if (!projectId || !seedUrl) {
    return res.status(400).json({ message: 'projectId and seedUrl are required' });
  }

  const job = await crawlQueue.add('crawl-domain', { projectId, seedUrl });
  return res.status(202).json({ jobId: job.id, status: 'queued' });
}
