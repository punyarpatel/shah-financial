import React from 'react';

const RetirementGrowthChart = ({ chartData, corpusNeeded, fmt }) => {
  if (!chartData || chartData.length < 2) return null;
  const W = 700, H = 200, PAD = { t: 10, r: 10, b: 40, l: 55 };
  const maxCorpus = corpusNeeded;
  const minAge = chartData[0].age;
  const maxAge = chartData[chartData.length - 1].age;
  const toX = (age) => PAD.l + ((age - minAge) / Math.max(1, maxAge - minAge)) * (W - PAD.l - PAD.r);
  const toY = (val) => PAD.t + (1 - Math.min(1, val / maxCorpus)) * (H - PAD.t - PAD.b);
  const pts = chartData.map(d => `${toX(d.age)},${toY(d.corpus)}`).join(' ');
  const areaPath = `M${toX(minAge)},${toY(0)} ` + chartData.map(d => `L${toX(d.age)},${toY(d.corpus)}`).join(' ') + ` L${toX(maxAge)},${toY(0)} Z`;
  // Y-axis labels
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => ({ val: maxCorpus * f, y: toY(maxCorpus * f) }));
  // X-axis labels (every 5 years)
  const xTicks = chartData.filter((_, i) => i % Math.max(1, Math.floor(chartData.length / 6)) === 0 || i === chartData.length - 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="corpusGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9922a" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#c9922a" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {/* Grid lines */}
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={PAD.l} y1={t.y} x2={W - PAD.r} y2={t.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x={PAD.l - 6} y={t.y + 4} fill="rgba(255,255,255,0.35)" fontSize="10" textAnchor="end">{fmt(t.val)}</text>
        </g>
      ))}
      {/* Target corpus dashed line */}
      <line x1={PAD.l} y1={toY(maxCorpus)} x2={W - PAD.r} y2={toY(maxCorpus)} stroke="#0d2545" strokeWidth="1.5" strokeDasharray="4 3" />
      {/* Area fill */}
      <path d={areaPath} fill="url(#corpusGrad)" />
      {/* Line */}
      <polyline points={pts} fill="none" stroke="#c9922a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* X-axis labels */}
      {xTicks.map((d, i) => (
        <text key={i} x={toX(d.age)} y={H - PAD.b + 16} fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">Age {d.age}</text>
      ))}
      {/* Legend */}
      <rect x={PAD.l} y={H - 10} width="12" height="3" rx="1" fill="#c9922a" />
      <text x={PAD.l + 16} y={H - 6} fill="rgba(255,255,255,0.45)" fontSize="9">Projected corpus</text>
      <line x1={PAD.l + 120} y1={H - 8} x2={PAD.l + 132} y2={H - 8} stroke="#0d2545" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={PAD.l + 136} y={H - 6} fill="rgba(255,255,255,0.45)" fontSize="9">Target corpus</text>
    </svg>
  );
};

export default RetirementGrowthChart;
