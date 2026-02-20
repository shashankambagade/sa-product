import { Request, Response } from 'express';
import { Queue } from 'bullmq';
import { z } from 'zod';
import { redis } from '../config/queue.js';

const crawlQueue = new Queue('crawl', { connection: redis });

const createAuditSchema = z.object({
  projectId: z.string().uuid(),
  seedUrl: z.string().url()
});

export async function createAuditRun(req: Request, res: Response) {
  const parsed = createAuditSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid request', errors: parsed.error.flatten() });
  }

  const { projectId, seedUrl } = parsed.data;
  const job = await crawlQueue.add('crawl-domain', { projectId, seedUrl });
  return res.status(202).json({ jobId: job.id, status: 'queued' });
}
