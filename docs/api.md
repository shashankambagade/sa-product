# API Design (v1)

## Auth
- `POST /api/auth/login` (planned)
- `POST /api/auth/tokens` (planned)

## Audit & Crawl
- `POST /api/audits` enqueue crawl for a project
  - body: `{ "projectId": "uuid", "seedUrl": "https://example.com" }`

## Scheduler
- `POST /api/schedules` create repeatable audit
  - body: `{ "projectId": "uuid", "cron": "0 3 * * *" }`

## Reports
- `GET /api/reports/:projectId` get aggregated report payload for dashboard

## Health
- `GET /api/health`
