import { Request, Response } from 'express';
import { z } from 'zod';
import { db } from '../config/db.js';

const createProjectSchema = z.object({
  organizationId: z.string().uuid(),
  name: z.string().min(2),
  domain: z.string().min(3)
});

export async function listProjects(req: Request, res: Response) {
  const organizationId = req.query.organizationId as string | undefined;
  if (!organizationId) {
    return res.status(400).json({ message: 'organizationId is required' });
  }

  const result = await db.query(
    'SELECT id, organization_id, name, domain, created_at FROM projects WHERE organization_id = $1 ORDER BY created_at DESC',
    [organizationId]
  );
  return res.json({ data: result.rows });
}

export async function createProject(req: Request, res: Response) {
  const parsed = createProjectSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid request', errors: parsed.error.flatten() });
  }

  const { organizationId, name, domain } = parsed.data;
  const result = await db.query(
    `INSERT INTO projects (organization_id, name, domain)
     VALUES ($1, $2, $3)
     RETURNING id, organization_id, name, domain, created_at`,
    [organizationId, name, domain]
  );

  return res.status(201).json(result.rows[0]);
}
