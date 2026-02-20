import { Router } from 'express';
import { createAuditRun } from '../controllers/audit.controller.js';
import { getProjectReport } from '../controllers/report.controller.js';
import { scheduleAudit } from '../controllers/schedule.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ ok: true }));
router.post('/audits', requireAuth, createAuditRun);
router.post('/schedules', requireAuth, scheduleAudit);
router.get('/reports/:projectId', requireAuth, getProjectReport);

export default router;
