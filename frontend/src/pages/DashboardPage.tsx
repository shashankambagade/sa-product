import React, { useEffect, useState } from 'react';
import { ScoreCard } from '../components/ScoreCard';
import { TrendChart } from '../components/TrendChart';
import { fetchProjectReport } from '../services/api';
import { ReportPayload } from '../types/report';

export function DashboardPage() {
  const [report, setReport] = useState<ReportPayload | null>(null);

  useEffect(() => {
    fetchProjectReport('demo-project', 'demo-token').then(setReport).catch(() => {
      setReport({ score: 0, issuesBySeverity: {}, trend: [] });
    });
  }, []);

  return (
    <main style={{ maxWidth: 1000, margin: '0 auto', padding: 24 }}>
      <h1>Internal SEO Audit Dashboard</h1>
      <p>Track audits, rankings, and technical issues across client domains.</p>
      {report && (
        <>
          <ScoreCard score={report.score} />
          <h3 style={{ marginTop: 24 }}>SEO Trend</h3>
          <TrendChart values={report.trend} />
        </>
      )}
    </main>
  );
}
