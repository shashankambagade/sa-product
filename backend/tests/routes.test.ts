import request from 'supertest';
import { buildApp } from '../src/app.js';

describe('API routes', () => {
  const app = buildApp();

  it('GET /api/health should return ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });

  it('POST /api/auth/login should validate payload', async () => {
    const res = await request(app).post('/api/auth/login').send({ email: 'bad' });
    expect(res.status).toBe(400);
  });
});
