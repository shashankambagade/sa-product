import React from 'react';

type ScoreCardProps = { score: number };

export function ScoreCard({ score }: ScoreCardProps) {
  return (
    <div style={{ padding: 16, border: '1px solid #ddd', borderRadius: 12 }}>
      <h3>SEO Health Score</h3>
      <p style={{ fontSize: 28, fontWeight: 700 }}>{score}/100</p>
    </div>
  );
}
