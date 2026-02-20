import { Router } from 'express';
import { createAuditRun } from '../controllers/audit.controller.js';
import { login } from '../controllers/auth.controller.js';
import { createProject, listProjects } from '../controllers/project.controller.js';
import { getProjectReport } from '../controllers/report.controller.js';
import { scheduleAudit } from '../controllers/schedule.controller.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

router.get('/health', (_req, res) => res.json({ ok: true }));
router.post('/auth/login', login);

router.get('/projects', requireAuth, listProjects);
router.post('/projects', requireAuth, createProject);

router.post('/audits', requireAuth, createAuditRun);
router.post('/schedules', requireAuth, scheduleAudit);
router.get('/reports/:projectId', requireAuth, getProjectReport);

export default router;
