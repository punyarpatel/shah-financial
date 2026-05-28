import React from 'react';

const ELSSGrowthChart = ({ monthlyInvest, years, roi, fmt }) => {
  const W = 700, H = 180, PAD = { t: 10, r: 10, b: 35, l: 55 };
  const dataPoints = [];
  for (let y = 1; y <= years; y++) {
    const n = y * 12;
    const r = roi / 100 / 12;
    const fv = r > 0 ? monthlyInvest * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) : monthlyInvest * n;
    const invested = monthlyInvest * n;
    dataPoints.push({ year: y, fv, invested });
  }
  const maxVal = dataPoints[dataPoints.length - 1]?.fv || 1;
  const toX = (i) => PAD.l + (i / (dataPoints.length - 1)) * (W - PAD.l - PAD.r);
  const toY = (val) => PAD.t + (1 - val / maxVal) * (H - PAD.t - PAD.b);
  const fvPts = dataPoints.map((d, i) => `${toX(i)},${toY(d.fv)}`).join(' ');
  const invPts = dataPoints.map((d, i) => `${toX(i)},${toY(d.invested)}`).join(' ');
  const fvArea = `M${toX(0)},${toY(0)} ` + dataPoints.map((d, i) => `L${toX(i)},${toY(d.fv)}`).join(' ') + ` L${toX(dataPoints.length - 1)},${toY(0)} Z`;
  const invArea = `M${toX(0)},${toY(0)} ` + dataPoints.map((d, i) => `L${toX(i)},${toY(d.invested)}`).join(' ') + ` L${toX(dataPoints.length - 1)},${toY(0)} Z`;
  const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => ({ val: maxVal * f, y: toY(maxVal * f) }));
  const xTicks = dataPoints.filter((_, i) => i % Math.max(1, Math.floor(dataPoints.length / 6)) === 0 || i === dataPoints.length - 1);

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
      <defs>
        <linearGradient id="elssGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#c9922a" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#c9922a" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="invGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#94a3b8" stopOpacity="0.02" />
        </linearGradient>
      </defs>
      {yTicks.map((t, i) => (
        <g key={i}>
          <line x1={PAD.l} y1={t.y} x2={W - PAD.r} y2={t.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
          <text x={PAD.l - 6} y={t.y + 4} fill="rgba(255,255,255,0.35)" fontSize="10" textAnchor="end">{fmt(t.val)}</text>
        </g>
      ))}
      <path d={invArea} fill="url(#invGrad)" />
      <path d={fvArea} fill="url(#elssGrad)" />
      <polyline points={invPts} fill="none" stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
      <polyline points={fvPts} fill="none" stroke="#c9922a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {xTicks.map((d, i) => (
        <text key={i} x={toX(dataPoints.indexOf(d))} y={H - PAD.b + 16} fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">Yr {d.year}</text>
      ))}
      <rect x={PAD.l} y={H - 10} width="12" height="3" rx="1" fill="#c9922a" />
      <text x={PAD.l + 16} y={H - 6} fill="rgba(255,255,255,0.45)" fontSize="9">Corpus value</text>
      <line x1={PAD.l + 110} y1={H - 8} x2={PAD.l + 122} y2={H - 8} stroke="#94a3b8" strokeWidth="1.5" strokeDasharray="4 3" />
      <text x={PAD.l + 126} y={H - 6} fill="rgba(255,255,255,0.45)" fontSize="9">Amount invested</text>
    </svg>
  );
};

export default ELSSGrowthChart;
