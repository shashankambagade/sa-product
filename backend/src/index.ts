import { buildApp } from './app.js';
import { env } from './config/env.js';
import { logger } from './utils/logger.js';

const app = buildApp();

app.listen(env.API_PORT, () => {
  logger.info(`API listening on port ${env.API_PORT}`);
});
