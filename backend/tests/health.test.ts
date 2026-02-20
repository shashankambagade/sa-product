import request from 'supertest';
import { buildApp } from '../src/app.js';

describe('GET /api/health', () => {
  it('returns ok=true', async () => {
    const app = buildApp();
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.ok).toBe(true);
  });
});
