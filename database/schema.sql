CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE organizations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('admin', 'viewer', 'scheduler', 'integrator')),
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  organization_id UUID NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  domain TEXT NOT NULL,
  settings JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (organization_id, domain)
);

CREATE TABLE audit_runs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  trigger_type TEXT NOT NULL CHECK (trigger_type IN ('manual', 'scheduled', 'api')),
  status TEXT NOT NULL CHECK (status IN ('queued', 'running', 'completed', 'failed')),
  started_at TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE crawled_pages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  audit_run_id UUID NOT NULL REFERENCES audit_runs(id) ON DELETE CASCADE,
  url TEXT NOT NULL,
  status_code INTEGER,
  content_type TEXT,
  title TEXT,
  meta_description TEXT,
  canonical_url TEXT,
  h1_count INTEGER NOT NULL DEFAULT 0,
  h2_count INTEGER NOT NULL DEFAULT 0,
  word_count INTEGER NOT NULL DEFAULT 0,
  is_js_rendered BOOLEAN NOT NULL DEFAULT FALSE,
  crawl_depth INTEGER NOT NULL DEFAULT 0,
  response_time_ms INTEGER,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (audit_run_id, url)
);

CREATE TABLE page_links (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  crawled_page_id UUID NOT NULL REFERENCES crawled_pages(id) ON DELETE CASCADE,
  target_url TEXT NOT NULL,
  link_type TEXT NOT NULL CHECK (link_type IN ('internal', 'external')),
  anchor_text TEXT,
  http_status INTEGER,
  is_broken BOOLEAN NOT NULL DEFAULT FALSE
);

CREATE TABLE technical_issues (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  audit_run_id UUID NOT NULL REFERENCES audit_runs(id) ON DELETE CASCADE,
  page_url TEXT,
  issue_type TEXT NOT NULL,
  severity TEXT NOT NULL CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  details JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE performance_metrics (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  page_url TEXT NOT NULL,
  lcp_ms INTEGER,
  fid_ms INTEGER,
  cls NUMERIC(8,4),
  ttfb_ms INTEGER,
  performance_score INTEGER,
  source TEXT NOT NULL DEFAULT 'pagespeed',
  measured_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE keywords (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  keyword TEXT NOT NULL,
  locale TEXT NOT NULL DEFAULT 'en-US',
  device TEXT NOT NULL DEFAULT 'desktop',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (project_id, keyword, locale, device)
);

CREATE TABLE keyword_rankings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  keyword_id UUID NOT NULL REFERENCES keywords(id) ON DELETE CASCADE,
  ranking_date DATE NOT NULL,
  position INTEGER,
  url TEXT,
  source TEXT NOT NULL DEFAULT 'manual',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE (keyword_id, ranking_date)
);

CREATE TABLE scheduled_jobs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  job_type TEXT NOT NULL CHECK (job_type IN ('crawl', 'performance', 'report')),
  cron_expression TEXT NOT NULL,
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  last_run_at TIMESTAMPTZ,
  next_run_at TIMESTAMPTZ,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE reports (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  project_id UUID NOT NULL REFERENCES projects(id) ON DELETE CASCADE,
  audit_run_id UUID REFERENCES audit_runs(id) ON DELETE SET NULL,
  format TEXT NOT NULL CHECK (format IN ('pdf', 'csv', 'json')),
  storage_path TEXT NOT NULL,
  summary JSONB NOT NULL DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE api_tokens (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  token_hash TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX idx_projects_org ON projects(organization_id);
CREATE INDEX idx_audit_runs_project_created_at ON audit_runs(project_id, created_at DESC);
CREATE INDEX idx_crawled_pages_audit ON crawled_pages(audit_run_id);
CREATE INDEX idx_technical_issues_audit_severity ON technical_issues(audit_run_id, severity);
CREATE INDEX idx_performance_metrics_project_measured ON performance_metrics(project_id, measured_at DESC);
CREATE INDEX idx_keyword_rankings_keyword_date ON keyword_rankings(keyword_id, ranking_date DESC);
CREATE INDEX idx_scheduled_jobs_project_active ON scheduled_jobs(project_id, is_active);
