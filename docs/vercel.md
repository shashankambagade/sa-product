# Vercel Compatibility

## Short answer
You can host the **frontend** on Vercel, but this project will **not fully work on Vercel alone** in its current architecture.

## Why
This platform needs long-running/background infrastructure that serverless-only hosting does not provide reliably:

- Express API server (stateful runtime expectations)
- BullMQ workers (continuous consumers)
- Redis queue backend
- PostgreSQL database
- Scheduled/repeatable jobs
- Playwright crawling jobs (heavier runtime and browser dependencies)

Vercel is ideal for the UI and lightweight API routes, but not as a single home for queue workers + crawler + scheduler.

## Recommended deployment split

1. **Vercel**: deploy `frontend/`
2. **Container host (Railway/Render/Fly.io/AWS/DigitalOcean)**: deploy `backend/api` and `backend/worker`
3. **Managed services**:
   - PostgreSQL (Neon/RDS/Supabase/DO Managed)
   - Redis (Upstash/Redis Cloud/ElastiCache)

Then set frontend env:
- `VITE_API_BASE_URL=https://<your-api-domain>/api`

## If you want 100% Vercel-native
You would need a redesign:
- Replace BullMQ workers with external job runner or managed queues + worker services outside Vercel
- Move crawler/scheduler to dedicated compute platform
- Potentially migrate API to Vercel functions with strict time limits in mind
