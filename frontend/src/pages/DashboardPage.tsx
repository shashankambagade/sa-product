import React, { useEffect, useState } from 'react';
import { ScoreCard } from '../components/ScoreCard';
import { TrendChart } from '../components/TrendChart';
import { fetchProjectReport } from '../services/api';
import { ReportPayload } from '../types/report';

export function DashboardPage() {
  const [report, setReport] = useState<ReportPayload | null>(null);

  useEffect(() => {
    fetchProjectReport('11111111-1111-1111-1111-111111111111', 'demo-token').then(setReport).catch(() => {
      setReport({
        projectId: 'offline-fallback',
        score: 0,
        issuesBySeverity: {},
        trend: [],
        topIssues: []
      });
    });
  }, []);

  return (
    <main className="app-shell">
      <section className="container">
        <h1 style={{ margin: 0 }}>Internal SEO Audit Dashboard</h1>
        <p className="muted">Monitor crawls, technical issues, web vitals, and ranking movements in one modern workspace.</p>

        {report && (
          <div className="grid">
            <ScoreCard score={report.score} />

            <section className="glass card">
              <h3 className="title">Issues by Severity</h3>
              <ul className="list">
                {Object.entries(report.issuesBySeverity).map(([severity, count]) => (
                  <li key={severity} className="row">
                    <span style={{ textTransform: 'capitalize' }}>{severity}</span>
                    <span className="pill">{count}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section style={{ gridColumn: '1 / -1' }}>
              <TrendChart values={report.trend} />
            </section>

            <section className="glass card" style={{ gridColumn: '1 / -1' }}>
              <h3 className="title">Top Technical Issues</h3>
              <ul className="list">
                {report.topIssues.map((issue) => (
                  <li key={issue.type} className="row">
                    <span>{issue.type}</span>
                    <span className="pill">{issue.count}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>
        )}
      </section>
    </main>
  );
}
