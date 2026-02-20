import { Request, Response } from 'express';
import { Queue } from 'bullmq';
import { redis } from '../config/queue.js';

const schedulerQueue = new Queue('scheduler', { connection: redis });

export async function scheduleAudit(req: Request, res: Response) {
  const { projectId, cron } = req.body;
  if (!projectId || !cron) {
    return res.status(400).json({ message: 'projectId and cron are required' });
  }

  const job = await schedulerQueue.add(
    `schedule-${projectId}`,
    { projectId },
    {
      repeat: { pattern: cron }
    }
  );

  return res.status(201).json({ repeatJobId: job.repeatJobKey });
}
