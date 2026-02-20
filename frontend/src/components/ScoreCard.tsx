import React from 'react';

type ScoreCardProps = { score: number };

export function ScoreCard({ score }: ScoreCardProps) {
  const label = score >= 85 ? 'Excellent' : score >= 70 ? 'Good' : 'Needs work';

  return (
    <section className="glass card">
      <p className="muted" style={{ margin: 0 }}>SEO Health Score</p>
      <p className="score">{score}/100</p>
      <span className="pill">{label}</span>
    </section>
  );
}
