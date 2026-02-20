# Architecture & Data Flow

## Logical Modules

1. **Auth & RBAC**
   - JWT auth middleware
   - Role checks for admin/viewer/scheduler/integrator
2. **Crawler**
   - Queue-driven crawl jobs
   - Playwright for JS-rendered pages
3. **SEO Analyzer**
   - Title/meta/header/canonical/link validations
4. **Performance Collector**
   - Google PageSpeed API metrics ingestion
5. **Ranking Collector**
   - Keyword + ranking history per project
6. **Reporting**
   - Aggregate findings into report snapshots (JSON/PDF/CSV)
7. **Scheduler**
   - Repeatable jobs for periodic audits

## Request Flow

- Frontend requests `/api/audits` -> API validates JWT -> enqueue crawl job.
- Worker picks job -> crawls pages -> saves `crawled_pages`, `page_links`, `technical_issues`.
- Performance jobs ingest Web Vitals into `performance_metrics`.
- Reporting job aggregates latest run + trends into `reports`.
- Dashboard consumes `/api/reports/:projectId` for scorecards and trend charts.

## Security Notes

- Token-based auth with signed JWT.
- API tokens stored as hash (`api_tokens.token_hash`).
- Use HTTPS, secret manager, and rotating keys in production.
