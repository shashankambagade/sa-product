import { Worker } from 'bullmq';
import { redis } from '../config/queue.js';
import { crawlPage } from '../services/crawl.service.js';
import { fetchPageSpeed } from '../services/performance.service.js';
import { logger } from '../utils/logger.js';

new Worker(
  'crawl',
  async (job) => {
    const { seedUrl } = job.data as { projectId: string; seedUrl: string };
    const page = await crawlPage(seedUrl);
    logger.info({ page }, 'crawl completed');
  },
  { connection: redis }
);

new Worker(
  'performance',
  async (job) => {
    const { url } = job.data as { url: string };
    const metrics = await fetchPageSpeed(url);
    logger.info({ metrics }, 'pagespeed completed');
  },
  { connection: redis }
);

logger.info('Workers started');
