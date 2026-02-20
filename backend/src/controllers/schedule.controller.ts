import { Request, Response } from 'express';
import { Queue } from 'bullmq';
import { z } from 'zod';
import { redis } from '../config/queue.js';

const schedulerQueue = new Queue('scheduler', { connection: redis });

const scheduleSchema = z.object({
  projectId: z.string().uuid(),
  cron: z.string().min(5)
});

export async function scheduleAudit(req: Request, res: Response) {
  const parsed = scheduleSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid request', errors: parsed.error.flatten() });
  }

  const { projectId, cron } = parsed.data;
  const job = await schedulerQueue.add(
    `schedule-${projectId}`,
    { projectId },
    {
      repeat: { pattern: cron }
    }
  );

  return res.status(201).json({ repeatJobId: job.repeatJobKey });
}
