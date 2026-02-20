# InternalSEOAuditTool

Internal SEO audit platform for automated crawling, technical SEO checks, performance tracking, keyword rank history, and report generation for internal client operations.

## What is production-ready in this baseline

- Modular backend API, worker, and queue architecture
- PostgreSQL schema with constraints and indexes
- Auth + protected routes + request validation
- Queue-based crawling/scheduling flow
- Frontend dashboard with modern glassmorphism UI foundation
- Dockerized local stack + CI workflow

## Architecture Summary

- **Frontend**: React + Vite + TypeScript + Recharts
- **Backend API**: Node.js + Express + TypeScript + PostgreSQL + BullMQ
- **Workers**: BullMQ workers for crawl and performance jobs
- **Database**: PostgreSQL schema in `database/schema.sql`
- **Scheduler**: repeatable jobs managed by BullMQ
- **Observability**: pino + pino-http logging

See `docs/architecture.md` for full module boundaries and data flow.

## Will this run on Vercel?

**Partially.**

- ✅ `frontend/` can be deployed to Vercel.
- ⚠️ Full platform cannot run on Vercel alone because this project requires persistent worker processes (BullMQ), Redis, PostgreSQL, scheduling, and Playwright crawler jobs.

Use a split deployment:
- Vercel for frontend
- Container platform for API + worker
- Managed Postgres + Redis

See `docs/vercel.md`.

## Complete dependency list

### Backend runtime dependencies
- axios
- bcryptjs
- bullmq
- cors
- dotenv
- express
- helmet
- ioredis
- jsonwebtoken
- pg
- pino
- pino-http
- playwright
- zod

### Backend dev dependencies
- @types/* for node/express/jwt/pg/jest/bcryptjs
- jest + ts-jest + supertest
- tsx
- typescript

### Frontend runtime dependencies
- react
- react-dom
- axios
- recharts

### Frontend dev dependencies
- vite
- @vitejs/plugin-react
- typescript
- vitest
- @types/react + @types/react-dom

## Quick Start (Local)

### 1) Prerequisites
- Docker + Docker Compose
- Node.js 20+

### 2) Environment
```bash
cp .env.example .env
```

### 3) Run full stack with Docker (recommended)
```bash
docker compose up --build
```

Services:
- Frontend: `http://localhost:5173`
- API: `http://localhost:4000/api/health`
- Postgres: `localhost:5432`
- Redis: `localhost:6379`

### 4) Run locally without Docker (advanced)
Start Postgres + Redis first, then:
```bash
# terminal 1: backend API
cd backend
npm install
npm run dev

# terminal 2: worker
cd backend
npm run worker

# terminal 3: frontend
cd frontend
npm install
npm run dev
```

## API endpoints (implemented)

- `POST /api/auth/login`
- `GET /api/projects?organizationId=<uuid>`
- `POST /api/projects`
- `POST /api/audits`
- `POST /api/schedules`
- `GET /api/reports/:projectId`
- `GET /api/health`

Detailed API payloads in `docs/api.md`.

## Testing

```bash
cd backend && npm test
cd ../frontend && npm test
```

## Deployment

- Build containers using `docker compose build`
- Push images to your registry
- Deploy API/worker/web to AWS ECS, EKS, Render, Railway, Fly.io, or DigitalOcean Apps
- Configure `REDIS_URL`, `DATABASE_URL`, and API keys in secrets manager

Detailed deployment guidance in `docs/deployment.md`.
