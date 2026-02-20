import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function TrendChart({ values }: { values: number[] }) {
  const data = values.map((value, index) => ({ day: `D${index + 1}`, value }));

  return (
    <div className="glass card" style={{ width: '100%', height: 320 }}>
      <h3 className="title">SEO Trend</h3>
      <ResponsiveContainer>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="4 4" stroke="rgba(255,255,255,0.18)" />
          <XAxis dataKey="day" stroke="#d6ddff" />
          <YAxis domain={[0, 100]} stroke="#d6ddff" />
          <Tooltip />
          <Line dataKey="value" stroke="#60a5fa" strokeWidth={3} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
