# API Design (v1)

Base URL: `/api`

## Authentication

### `POST /auth/login`
Authenticate a user and return JWT bearer token.

Request body:
```json
{
  "email": "admin@company.com",
  "password": "password123"
}
```

Response:
```json
{
  "accessToken": "<jwt>",
  "tokenType": "Bearer",
  "expiresIn": 43200
}
```

---

## Projects

### `GET /projects?organizationId=<uuid>`
Return projects for one organization.

Headers:
- `Authorization: Bearer <token>`

### `POST /projects`
Create a project.

Headers:
- `Authorization: Bearer <token>`

Request body:
```json
{
  "organizationId": "f5dfe89a-ecca-4ff4-9c62-5db819fc6a51",
  "name": "Client A",
  "domain": "example.com"
}
```

---

## Audit & Crawl

### `POST /audits`
Enqueue crawl for a project.

Headers:
- `Authorization: Bearer <token>`

Request body:
```json
{
  "projectId": "f5dfe89a-ecca-4ff4-9c62-5db819fc6a51",
  "seedUrl": "https://example.com"
}
```

Response:
```json
{ "jobId": "123", "status": "queued" }
```

---

## Scheduler

### `POST /schedules`
Create repeatable audit schedule.

Headers:
- `Authorization: Bearer <token>`

Request body:
```json
{
  "projectId": "f5dfe89a-ecca-4ff4-9c62-5db819fc6a51",
  "cron": "0 3 * * *"
}
```

---

## Reports

### `GET /reports/:projectId`
Get dashboard summary payload.

Headers:
- `Authorization: Bearer <token>`

Response:
```json
{
  "projectId": "f5dfe89a-ecca-4ff4-9c62-5db819fc6a51",
  "score": 82,
  "issuesBySeverity": { "critical": 1, "high": 3, "medium": 8, "low": 14 },
  "trend": [72, 75, 79, 82],
  "topIssues": [
    { "type": "missing_meta_description", "count": 14 }
  ]
}
```

---

## Health

### `GET /health`
Health check endpoint.
