import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

// Defined at module level so React never remounts it on parent re-renders
const SliderRow = ({ label, value, min, max, step = 1, onChange }) => {
  const [inputVal, setInputVal] = useState(String(value));
  React.useEffect(() => { setInputVal(String(value)); }, [value]);
  const handleBlur = () => {
    const num = parseFloat(inputVal);
    if (!isNaN(num)) onChange(Math.min(max, Math.max(min, num)));
    else setInputVal(String(value));
  };
  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-[12px] sm:gap-[24px]">
      <div className="min-w-[140px] text-[14px] text-white/80 flex justify-between sm:block">
        <span>{label}</span>
        <input
          type="number"
          min={min} max={max} step={step}
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
          className="sm:hidden font-medium text-white bg-transparent border-b border-transparent hover:border-white/40 focus:border-white outline-none text-right w-[80px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 w-full h-[6px] bg-[#4A4A4A] rounded-lg appearance-none cursor-pointer accent-gold"
      />
      <input
        type="number"
        min={min} max={max} step={step}
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
        className="hidden sm:block min-w-[80px] text-right text-[15px] font-medium text-white bg-transparent border-b border-transparent hover:border-white/40 focus:border-white outline-none transition-colors cursor-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
};

const GOALS = [
  { id: 'custom', label: 'Custom SIP', icon: null, target: null, desc: null },
  { id: 'retirement', label: 'Retirement', icon: '🛋️', target: 30000000, desc: 'Save for a ₹3.0Cr retirement fund.', defaultSip: 25000, defaultRate: 12, defaultYears: 15 },
  { id: 'house', label: 'Buy a House', icon: '🏠', target: 5000000, desc: 'Save for a ₹50L down payment on your dream home.', defaultSip: 20000, defaultRate: 12, defaultYears: 10 },
  { id: 'education', label: 'Child Education', icon: '🎓', target: 3000000, desc: 'Build a ₹30L corpus for higher education.', defaultSip: 10000, defaultRate: 12, defaultYears: 12 },
  { id: 'car', label: 'Buy a Car', icon: '🚗', target: 2000000, desc: 'Plan for a ₹20L car purchase.', defaultSip: 15000, defaultRate: 12, defaultYears: 6 },
  { id: 'wedding', label: 'Wedding', icon: '💍', target: 5000000, desc: 'Prepare for a ₹50L dream wedding.', defaultSip: 20000, defaultRate: 12, defaultYears: 6 },
  { id: 'vacation', label: 'Dream Vacation', icon: '✈️', target: 2000000, desc: 'Save ₹20L for that round-the-world trip.', defaultSip: 10000, defaultRate: 12, defaultYears: 4 },
];

// ─── 3D Pie Chart — solid wedges, thick extrusion, exploded slices, % labels ───
const ThreeDPieChart = ({ invested, gain }) => {
  const total = invested + gain;
  if (!total) return null;

  const W = 310, H = 258;
  const cx = 148, cy = 94;     // ellipse center
  const rx = 125, ry = 75;     // outer ellipse radii
  const depth = 42;            // moderate extrusion
  const GAP   = 0.013;          // gap between slices
  const EXPL  = 9;              // explode distance along bisector

  const invFrac = Math.max(0.05, Math.min(0.95, invested / total));
  const pct1 = Math.round(invFrac * 100);
  const pct2 = 100 - pct1;

  // Point on ellipse at fraction frac (0→1), with optional dx/dy offset
  const ep = (frac, erx, ery, dx = 0, dy = 0) => {
    const a = frac * 2 * Math.PI - Math.PI / 2;
    return [cx + erx * Math.cos(a) + dx, cy + ery * Math.sin(a) + dy];
  };

  // Bisector offset so each slice is "pushed out" along its midpoint angle
  const bOff = (s, e) => {
    const a = ((s + e) / 2) * 2 * Math.PI - Math.PI / 2;
    return [EXPL * Math.cos(a), EXPL * Math.sin(a)];
  };

  const s1 = GAP / 2,           e1 = invFrac - GAP / 2;   // navy — invested
  const s2 = invFrac + GAP / 2, e2 = 1 - GAP / 2;         // gold  — gain

  const [bx1, by1] = bOff(s1, e1);
  const [bx2, by2] = bOff(s2, e2);

  // ── Solid wedge (pie slice, no hole) ──────────────────────────────────────
  const wedge = (s, e, erx, ery, dx, dy) => {
    const [x1, y1] = ep(s, erx, ery, dx, dy);
    const [x2, y2] = ep(e, erx, ery, dx, dy);
    const lg = (e - s) > 0.5 ? 1 : 0;
    return `M${cx + dx},${cy + dy}L${x1},${y1}A${erx},${ery},0,${lg},1,${x2},${y2}Z`;
  };

  // ── Outer cylindrical side wall (extruded) ────────────────────────────────
  const sideWall = (s, e, erx, ery, dx, dy) => {
    const [x1, y1] = ep(s, erx, ery, dx, dy);
    const [x2, y2] = ep(e, erx, ery, dx, dy);
    const lg = (e - s) > 0.5 ? 1 : 0;
    return `M${x1},${y1}A${erx},${ery},0,${lg},1,${x2},${y2}L${x2},${y2 + depth}A${erx},${ery},0,${lg},0,${x1},${y1 + depth}Z`;
  };

  // ── Flat radial cut-face (the "slice" edge between two segments) ──────────
  const cutFace = (frac, erx, ery, dx, dy, fill) => {
    const [ox, oy] = ep(frac, erx, ery, dx, dy);
    const px = cx + dx, py = cy + dy;
    return <polygon key={frac} points={`${px},${py} ${ox},${oy} ${ox},${oy + depth} ${px},${py + depth}`} fill={fill} />;
  };

  // ── Centroid for label placement ──────────────────────────────────────────
  const centroid = (s, e, erx, ery, dx, dy) => {
    const a = ((s + e) / 2) * 2 * Math.PI - Math.PI / 2;
    return [cx + erx * 0.56 * Math.cos(a) + dx, cy + ery * 0.56 * Math.sin(a) + dy];
  };

  const [lx1, ly1] = centroid(s1, e1, rx, ry, bx1, by1);
  const [lx2, ly2] = centroid(s2, e2, rx, ry, bx2, by2);

  return (
    <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ overflow: 'visible' }}>
      <defs>
        {/* Front-half clip — only front-facing walls rendered */}
        <clipPath id="fwPie">
          <rect x={-60} y={cy - 1} width={W + 120} height={H + 120} />
        </clipPath>

        {/* ── Top-face gradients ── */}
        <linearGradient id="nvyG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e4a8a" />
          <stop offset="100%" stopColor="#0a1e3d" />
        </linearGradient>
        <linearGradient id="gldG" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f2cc6e" />
          <stop offset="100%" stopColor="#b8840a" />
        </linearGradient>

        {/* ── Side-wall gradients (darker bottom edge) ── */}
        <linearGradient id="nvySide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0d2545" />
          <stop offset="100%" stopColor="#050f1c" />
        </linearGradient>
        <linearGradient id="gldSide" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a5a08" />
          <stop offset="100%" stopColor="#3d2c03" />
        </linearGradient>

        {/* Shine overlays */}
        <radialGradient id="sh1" cx="38%" cy="28%" r="58%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.17" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="sh2" cx="64%" cy="28%" r="58%">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </radialGradient>

        {/* Soft ground shadow */}
        <filter id="drp" x="-20%" y="-5%" width="140%" height="175%">
          <feDropShadow dx="0" dy="12" stdDeviation="16" floodColor="#000" floodOpacity="0.22" />
        </filter>
      </defs>

      {/* ── Layer 1 — Outer side walls (front half only) ── */}
      <path d={sideWall(s1, e1, rx, ry, bx1, by1)} fill="url(#nvySide)" clipPath="url(#fwPie)" />
      <path d={sideWall(s2, e2, rx, ry, bx2, by2)} fill="url(#gldSide)" clipPath="url(#fwPie)" />

      {/* ── Layer 2 — Radial cut-faces at slice seams ── */}
      {cutFace(e1, rx, ry, bx1, by1, '#091a30')}
      {cutFace(s2, rx, ry, bx2, by2, '#4a3206')}

      {/* ── Layer 3 — Top faces (with drop shadow underneath entire pie) ── */}
      <g filter="url(#drp)">
        <path d={wedge(s1, e1, rx, ry, bx1, by1)} fill="url(#nvyG)" />
        <path d={wedge(s2, e2, rx, ry, bx2, by2)} fill="url(#gldG)" />
      </g>

      {/* Shine on top faces */}
      <path d={wedge(s1, e1, rx, ry, bx1, by1)} fill="url(#sh1)" />
      <path d={wedge(s2, e2, rx, ry, bx2, by2)} fill="url(#sh2)" />

      {/* Top-edge rim highlight */}
      <path d={wedge(s1, e1, rx, ry, bx1, by1)} fill="none" stroke="rgba(255,255,255,0.13)" strokeWidth="1.2" />
      <path d={wedge(s2, e2, rx, ry, bx2, by2)} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.2" />

      {/* ── Layer 4 — Bold % labels on top face ── */}
      <text
        x={lx1} y={ly1 + 7}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="26" fontWeight="900" fill="white"
        fontFamily="Georgia,'Times New Roman',serif"
        style={{ userSelect: 'none', letterSpacing: '-0.5px' }}
      >
        {pct1}%
      </text>
      <text
        x={lx2} y={ly2 + 7}
        textAnchor="middle" dominantBaseline="middle"
        fontSize="20" fontWeight="900" fill="white"
        fontFamily="Georgia,'Times New Roman',serif"
        style={{ userSelect: 'none', letterSpacing: '-0.5px' }}
      >
        {pct2}%
      </text>
    </svg>
  );
};

const SIPCalculator = () => {
  const [activeGoalId, setActiveGoalId] = useState('custom');
  const [calcMode, setCalcMode] = useState('sip'); // 'sip' | 'lumpsum'
  const [sip, setSip] = useState(10000);
  const [rate, setRate] = useState(12);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(6);

  const location = useLocation();
  const navigate = useNavigate();

  const activeGoal = GOALS.find(g => g.id === activeGoalId);

  const applySuggestedValues = () => {
    if (activeGoal && activeGoal.id !== 'custom') {
      setSip(activeGoal.defaultSip);
      setRate(activeGoal.defaultRate);
      setYears(activeGoal.defaultYears);
      setInflation(6);
    }
  };

  const handleScrollToContact = () => {
    if (location.pathname !== '/') {
      navigate('/#contact');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const fmt = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };

  const { corpus, invested, gain, chartData, inflationAdjustedCorpus } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = years * 12;

    let investedAmt = 0;
    let corpusAmt = 0;

    if (calcMode === 'sip') {
      investedAmt = sip * n;
      corpusAmt = sip * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    } else {
      investedAmt = sip;
      corpusAmt = sip * Math.pow(1 + r, n);
    }

    const gainAmt = corpusAmt - investedAmt;
    const inflationAdjusted = corpusAmt / Math.pow(1 + (inflation / 100), years);

    const data = [];
    for (let y = 0; y <= years; y++) {
      const months = y * 12;
      let inv = 0;
      let corp = 0;

      if (calcMode === 'sip') {
        inv = sip * months;
        corp = months === 0 ? 0 : sip * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
      } else {
        inv = sip;
        corp = sip * Math.pow(1 + r, months);
      }

      data.push({ year: `Yr ${y}`, invested: inv, total: corp });
    }

    return { corpus: corpusAmt, invested: investedAmt, gain: gainAmt, chartData: data, inflationAdjustedCorpus: inflationAdjusted };
  }, [sip, rate, years, inflation, calcMode]);

  const wealthRatio = (corpus / invested).toFixed(2);

  const getProgress = (current, target) => {
    if (!target) return 0;
    return Math.min((current / target) * 100, 100);
  };

  const activeGoalProgress = getProgress(corpus, activeGoal?.target);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#1C2838] p-3 rounded-lg shadow-lg border border-white/10">
          <p className="text-white/60 text-xs mb-1">{label}</p>
          <p className="text-gold font-medium text-sm">Total: {fmt(payload[0]?.value || 0)}</p>
          <p className="text-white font-medium text-sm">Invested: {fmt(payload[1]?.value || 0)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <section id="calculator" className="w-full bg-white py-[3.5rem] px-4">
      <div className="max-w-6xl mx-auto">

        {/* Header & Toggle */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-[2rem]">
          <div>
            <div className="text-gold text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]">
              Our Calculator
            </div>
            <h2 className="font-serif text-[28px] font-semibold mb-[0.75rem] text-textDark leading-tight">
              See What Your Money Can Grow To.
            </h2>
            <p className="text-muted text-[15px] leading-[1.6] font-light">
              A simple estimate to get you thinking about your financial future.
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <div className="flex bg-[#F1F5F9] rounded-[100px] p-1 border border-[#E2E8F0] shadow-inner">
              <button
                onClick={() => { setCalcMode('sip'); setSip(10000); }}
                className={`px-5 py-2 rounded-[100px] text-[13.5px] font-semibold transition-all duration-300 ${
                  calcMode === 'sip'
                    ? 'bg-white text-[#0d2545] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0d2545]'
                }`}
              >
                Monthly SIP
              </button>
              <button
                onClick={() => { setCalcMode('lumpsum'); setSip(100000); }}
                className={`px-5 py-2 rounded-[100px] text-[13.5px] font-semibold transition-all duration-300 ${
                  calcMode === 'lumpsum'
                    ? 'bg-white text-[#0d2545] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0d2545]'
                }`}
              >
                One-time
              </button>
            </div>
            <div className="text-[12px] text-[#64748B] px-1 w-full text-left md:text-right transition-all duration-300">
              {calcMode === 'sip' ? 'Invest a fixed amount every month' : 'Invest a single amount upfront'}
            </div>
          </div>
        </div>

        {/* Goal Pills */}
        <div className="flex flex-wrap gap-2 mb-[1.5rem]">
          {GOALS.map(goal => {
            const isActive = activeGoalId === goal.id;
            return (
              <button
                key={goal.id}
                onClick={() => setActiveGoalId(goal.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-[#B8860B] text-white shadow-md'
                    : 'bg-[#333333] text-white/80 hover:bg-[#444444]'
                }`}
              >
                {goal.icon && <span>{goal.icon}</span>}
                {goal.label}
              </button>
            );
          })}
        </div>

        {/* Active Goal Banner */}
        {activeGoal && activeGoal.id !== 'custom' && (
          <div className="bg-[#2C2C2E] rounded-lg p-4 mb-[2rem] flex flex-col sm:flex-row items-start sm:items-center justify-between border border-[#3A3A3C]">
            <div className="text-white/90 text-[14px]">
              <span className="font-semibold text-white">{activeGoal.icon} {activeGoal.label}</span> — {activeGoal.desc}
            </div>
            <button
              onClick={applySuggestedValues}
              className="text-gold hover:text-goldLight text-[14px] font-medium mt-2 sm:mt-0 whitespace-nowrap"
            >
              Apply suggested values &rarr;
            </button>
          </div>
        )}

        {/* ── Two-column layout: Calculator Left | Donut Right ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* LEFT — Calculator Card */}
          <div className="flex-1 min-w-0">
            <div className="bg-[#333333] rounded-[12px] p-[1.5rem] sm:p-[2rem] shadow-xl">
              <div className="flex flex-col gap-[2rem]">
                <SliderRow
                  label={calcMode === 'sip' ? "Monthly SIP" : "Investment Amount"}
                  value={sip}
                  min={calcMode === 'sip' ? 1000 : 10000}
                  max={calcMode === 'sip' ? 100000 : 5000000}
                  step={calcMode === 'sip' ? 1000 : 10000}
                  onChange={setSip}
                />
                <SliderRow label="Expected Rate" value={rate} min={12} max={20} step={0.5} onChange={setRate} />
                <SliderRow label="Time Period" value={years} min={1} max={30} step={1} onChange={setYears} />
                <SliderRow label="Assumed Inflation" value={inflation} min={4} max={12} step={0.5} onChange={setInflation} />
              </div>

              {/* Result Box */}
              <div className="bg-[#1E293B] rounded-[10px] p-[1.5rem] mt-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-[1.5rem] md:gap-0 border border-blue-900/30 transition-all duration-300">
                <div className="w-full md:w-auto flex-1">
                  <div className="text-white/60 text-[13px] mb-1">Estimated corpus</div>
                  <div className="font-serif text-white text-[32px] sm:text-[36px] font-semibold leading-tight">
                    {fmt(corpus)}
                  </div>
                  <div className="text-white/60 text-[13px] mt-1">
                    Real value (inflation adj): <span className="text-white font-medium">{fmt(inflationAdjustedCorpus)}</span>
                  </div>
                  <div className="text-goldLight text-[13px] mt-2 font-medium">
                    Invested: {fmt(invested)} &middot; Gain: {fmt(gain)}
                  </div>
                </div>

                <div className="w-full md:w-[280px] flex flex-col items-end gap-4">
                  {activeGoal && activeGoal.id !== 'custom' && (
                    <div className="w-full mt-2 md:mt-0">
                      <div className="flex justify-between text-[12px] text-white/80 mb-2">
                        <span>Goal: {activeGoalProgress.toFixed(0)}% of {fmt(activeGoal.target)}</span>
                      </div>
                      <div className="w-full bg-[#334155] h-[6px] rounded-full overflow-hidden">
                        <div
                          className="bg-[#D4AF37] h-full rounded-full transition-all duration-500"
                          style={{ width: `${activeGoalProgress}%` }}
                        />
                      </div>
                    </div>
                  )}
                  <div className="flex flex-col gap-2 w-full mt-2">
                    <button
                      onClick={handleScrollToContact}
                      className="bg-[#D4AF37] text-white text-[14px] px-[20px] py-[10px] rounded-[6px] font-semibold hover:bg-[#C09B2E] transition-colors whitespace-nowrap w-full text-center shadow-md uppercase tracking-wide"
                    >
                      {calcMode === 'sip' ? 'START YOUR SIP TODAY ↗' : 'START INVESTING TODAY ↗'}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="bg-[#2C2C2E] rounded-[10px] p-4">
                <div className="text-white/60 text-[12px] mb-1">Total invested</div>
                <div className="text-white text-[18px] font-semibold">{fmt(invested)}</div>
              </div>
              <div className="bg-[#2C2C2E] rounded-[10px] p-4">
                <div className="text-white/60 text-[12px] mb-1">Est. returns</div>
                <div className="text-white text-[18px] font-semibold">{fmt(gain)}</div>
              </div>
              <div className="bg-[#2C2C2E] rounded-[10px] p-4">
                <div className="text-white/60 text-[12px] mb-1">Wealth ratio</div>
                <div className="text-white text-[18px] font-semibold">{wealthRatio}&times;</div>
              </div>
              <div className="bg-[#2C2C2E] rounded-[10px] p-4">
                <div className="text-white/60 text-[12px] mb-1">CAGR equivalent</div>
                <div className="text-white text-[18px] font-semibold">{rate}%</div>
              </div>
            </div>

            {/* Chart Section */}
            <div className="mt-[3rem] h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2} />
                      <stop offset="95%" stopColor="#D4AF37" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1} />
                      <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="#5c6478" fontSize={12} tickLine={false} axisLine={false} minTickGap={30} />
                  <YAxis stroke="#5c6478" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => fmt(val)} width={70} />
                  <Tooltip content={<CustomTooltip />} />
                  <Area type="monotone" dataKey="total" name="Estimated Corpus" stroke="#D4AF37" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                  <Area type="monotone" dataKey="invested" name="Total Invested" stroke="#64748B" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorInvested)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* RIGHT — Standalone Donut Chart (no card bg) */}
          <div className="lg:w-[300px] shrink-0 flex flex-col items-center pt-2 lg:pt-[1rem] select-none">

            {/* Total corpus label up top */}
            <div className="self-start w-full mb-5 pl-1">
              <div className="text-[#6B7280] text-[13px] font-medium mb-1">Resultant Value</div>
              <div className="font-serif text-[32px] font-bold text-[#1a1a2e] leading-none">{fmt(corpus)}</div>
            </div>

            {/* 3D Pie Chart */}
            <div className="relative w-full flex justify-center -mx-2">
              <ThreeDPieChart invested={invested} gain={gain} />
            </div>

            {/* Legend */}
            <div className="mt-6 w-full space-y-5 pl-1">
              {/* Amount Invested — navy */}
              <div className="flex items-start gap-3">
                <span className="mt-[3px] w-[14px] h-[14px] rounded-sm shrink-0" style={{ background: 'linear-gradient(135deg,#2a5298,#0d2545)' }} />
                <div>
                  <div className="text-[#374151] text-[13px] font-medium leading-none mb-[6px]">Amount Invested</div>
                  <div className="text-[#0d2545] text-[22px] font-bold font-serif leading-none">{fmt(invested)}</div>
                </div>
              </div>

              {/* Estimated Returns — gold */}
              <div className="flex items-start gap-3">
                <span className="mt-[3px] w-[14px] h-[14px] rounded-sm shrink-0" style={{ background: 'linear-gradient(135deg,#f0c96a,#c9922a)' }} />
                <div>
                  <div className="text-[#374151] text-[13px] font-medium leading-none mb-[6px]">Estimated Returns</div>
                  <div className="text-[#c9922a] text-[22px] font-bold font-serif leading-none">{fmt(gain)}</div>
                </div>
              </div>
            </div>

          </div>

        </div>{/* end two-col */}

        {/* Disclaimer */}
        <div className="mt-[3rem] p-4 bg-[#faf8f4] rounded-lg border border-[#0d2545]/12 text-center">
          <p className="text-muted text-[11px] leading-[1.6]">
            <strong>Disclaimer:</strong> The calculations provided by this SIP Calculator are for illustrative purposes only and do not represent actual returns or guarantee future results. Mutual fund investments are subject to market risks; please read all scheme-related documents carefully before investing. The "Assumed Inflation" and "Real value" calculations are estimates and actual purchasing power may vary.
          </p>
        </div>

      </div>
    </section>
  );
};

export default SIPCalculator;
