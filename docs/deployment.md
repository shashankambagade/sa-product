# Deployment Guide

## Environments
- **Dev**: Docker Compose
- **Prod**: Containerized API + worker + web app

## Production Steps
1. Build and tag images.
2. Push images to registry.
3. Provision PostgreSQL + Redis (managed preferred).
4. Inject environment variables from secrets manager.
5. Run DB migrations using `database/schema.sql` or migration tool.
6. Deploy API and worker separately for independent scaling.
7. Configure autoscaling based on queue depth and API latency.

## CI/CD
Use `.github/workflows/ci.yml` for lint, tests, and build verification.
