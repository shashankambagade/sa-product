# Deployment Guide

## Environments
- **Dev**: Docker Compose
- **Prod**: Containerized API + worker + web app

## Production Topology
1. Frontend app (`frontend`) behind CDN
2. Backend API (`backend` API process)
3. Worker process (`backend` worker command)
4. PostgreSQL database
5. Redis instance

## Environment Variables

### Shared
- `NODE_ENV`
- `DATABASE_URL`
- `REDIS_URL`
- `JWT_SECRET`

### Backend-only
- `API_PORT`
- `PAGESPEED_API_KEY`
- `SEARCH_CONSOLE_CLIENT_EMAIL`
- `SEARCH_CONSOLE_PRIVATE_KEY`

### Frontend-only
- `VITE_API_BASE_URL`

## Production Steps
1. Build and tag images.
2. Push images to registry.
3. Provision PostgreSQL + Redis (managed preferred).
4. Inject environment variables from secrets manager.
5. Run DB migrations using `database/schema.sql` or migration tool.
6. Deploy API and worker separately for independent scaling.
7. Configure autoscaling based on queue depth and API latency.
8. Configure HTTPS + CORS allowed origins.

## Local Release-like Validation
1. `docker compose up --build`
2. Open `http://localhost:5173`
3. Check API health `http://localhost:4000/api/health`
4. Run smoke test requests against `/api/auth/login`, `/api/projects`, `/api/audits`

## CI/CD
Use `.github/workflows/ci.yml` for lint, tests, and build verification.
