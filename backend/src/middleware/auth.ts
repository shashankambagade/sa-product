import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';

export type AuthRequest = Request & { user?: { sub: string; role: string } };

export function requireAuth(req: AuthRequest, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  try {
    req.user = jwt.verify(auth.replace('Bearer ', ''), env.JWT_SECRET) as { sub: string; role: string };
    next();
  } catch {
    return res.status(401).json({ message: 'Invalid token' });
  }
}
