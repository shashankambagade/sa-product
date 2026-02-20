# InternalSEOAuditTool

Internal SEO audit platform for automated crawling, technical SEO checks, performance tracking, keyword rank history, and report generation for internal client operations.

## Architecture Summary

- **Frontend**: React + Vite + TypeScript + Recharts + TailwindCSS
- **Backend API**: Node.js + Express + TypeScript + PostgreSQL + BullMQ
- **Workers**: BullMQ queues for crawl, performance checks, and report generation
- **Database**: PostgreSQL schema in `database/schema.sql`
- **Scheduler**: repeatable jobs managed by BullMQ
- **Observability**: structured logging with pino and request IDs

See `docs/architecture.md` for full module boundaries and data flow.

## Quick Start

### 1) Prerequisites
- Docker + Docker Compose
- Node.js 20+

### 2) Environment
```bash
cp .env.example .env
```

### 3) Run with Docker
```bash
docker compose up --build
```

### 4) Local development
```bash
# Backend
cd backend
npm install
npm run dev

# Frontend
cd ../frontend
npm install
npm run dev
```

## Testing

```bash
cd backend && npm test
cd ../frontend && npm test
```

## Deployment

- Build containers using `docker compose build`
- Push images to your registry
- Deploy API/worker/web to AWS ECS, EKS, or DigitalOcean Apps
- Configure `REDIS_URL`, `DATABASE_URL`, and API keys in secrets manager

Detailed deployment guidance in `docs/deployment.md`.
