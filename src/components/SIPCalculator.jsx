import React, { useState, useMemo, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { jsPDF } from 'jspdf';

// Defined at module level so React never remounts it on parent re-renders
const SliderRow = ({ label, value, min, max, step = 1, onChange, prefix, suffix }) => {
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
        <div className="sm:hidden flex items-center justify-end gap-1">
          {prefix && <span className="text-white/60 text-[13px]">{prefix}</span>}
          <input
            type="number"
            min={min} max={max} step={step}
            value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
            className="font-medium text-white bg-transparent border-b border-transparent hover:border-white/40 focus:border-white outline-none text-right w-[75px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          {suffix && <span className="text-white/60 text-[13px]">{suffix}</span>}
        </div>
      </div>
      <input
        type="range"
        min={min} max={max} step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 w-full h-[6px] bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
      />
      <div className="hidden sm:flex items-center justify-end min-w-[100px]">
        {prefix && <span className="mr-1 text-white/60 text-[14px]">{prefix}</span>}
        <input
          type="number"
          min={min} max={max} step={step}
          value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onBlur={handleBlur}
          onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
          className="text-right text-[15px] font-medium text-white bg-transparent border-b border-transparent hover:border-white/40 focus:border-white outline-none transition-colors cursor-text w-[80px] [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
        {suffix && <span className="ml-1 text-white/60 text-[14px]">{suffix}</span>}
      </div>
    </div>
  );
};

const GOALS = [
  { id: 'custom', label: 'Custom SIP', icon: null, defaultSip: 10000, defaultRate: 12, defaultYears: 10, desc: null },
  { id: 'retirement', label: 'Retirement', icon: '🛋️', defaultSip: 25000, defaultRate: 12, defaultYears: 30, desc: 'Plan your retirement corpus based on your current age and target retirement age.' },
  { id: 'house', label: 'Buy a House', icon: '🏠', defaultCost: 5000000, defaultSip: 20000, defaultRate: 12, defaultYears: 10, desc: 'Save for down payment or home purchase with inflation adjustment.' },
  { id: 'education', label: 'Child Education', icon: '🎓', defaultCost: 2500000, defaultSip: 12000, defaultRate: 12, defaultYears: 15, desc: 'Build a college fund based on your child\'s current and college age.' },
  { id: 'car', label: 'Buy a Car', icon: '🚗', defaultCost: 1500000, defaultSip: 15000, defaultRate: 12, defaultYears: 5, desc: 'Plan for your vehicle purchase with inflation alignment.' },
  { id: 'wedding', label: 'Wedding', icon: '💍', defaultCost: 3500000, defaultSip: 20000, defaultRate: 12, defaultYears: 8, desc: 'Prepare for dream wedding expenses factoring in future cost inflation.' },
  { id: 'vacation', label: 'Dream Vacation', icon: '✈️', defaultCost: 1000000, defaultSip: 10000, defaultRate: 12, defaultYears: 4, desc: 'Save for overseas travel and vacation milestones.' },
];

// ─── 3D Pie Chart: solid wedges, thick extrusion, exploded slices, % labels ───
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

  const s1 = GAP / 2,           e1 = invFrac - GAP / 2;   // navy: invested
  const s2 = invFrac + GAP / 2, e2 = 1 - GAP / 2;         // gold : gain

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
        {/* Front-half clip: only front-facing walls rendered */}
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

      {/* ── Layer 1: Outer side walls (front half only) ── */}
      <path d={sideWall(s1, e1, rx, ry, bx1, by1)} fill="url(#nvySide)" clipPath="url(#fwPie)" />
      <path d={sideWall(s2, e2, rx, ry, bx2, by2)} fill="url(#gldSide)" clipPath="url(#fwPie)" />

      {/* ── Layer 2: Radial cut-faces at slice seams ── */}
      {cutFace(e1, rx, ry, bx1, by1, '#091a30')}
      {cutFace(s2, rx, ry, bx2, by2, '#4a3206')}

      {/* ── Layer 3: Top faces (with drop shadow underneath entire pie) ── */}
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

      {/* ── Layer 4: Bold % labels on top face ── */}
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
  const location = useLocation();
  const navigate = useNavigate();

  // Read URL search params for initial state on mount
  const queryParams = useMemo(() => new URLSearchParams(window.location.search), []);

  const initialGoalId = queryParams.get('goal') || 'custom';
  const initialCalcMode = queryParams.get('mode') || 'sip';
  const initialSip = Number(queryParams.get('sip')) || (initialCalcMode === 'sip' ? 10000 : 100000);
  const initialRate = Number(queryParams.get('rate')) || 12;
  const initialYears = Number(queryParams.get('years')) || 10;

  const [activeGoalId, setActiveGoalId] = useState(initialGoalId);
  const [calcMode, setCalcMode] = useState(initialCalcMode);
  const [sip, setSip] = useState(initialSip);
  const [rate, setRate] = useState(initialRate);
  const [years, setYears] = useState(initialYears);

  // FundzBazar style Goal-specific Metric states
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [childAge, setChildAge] = useState(3);
  const [collegeAge, setCollegeAge] = useState(18);
  const [inflation, setInflation] = useState(6);
  const [targetCost, setTargetCost] = useState(5000000);

  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    const params = new URLSearchParams();
    if (activeGoalId !== 'custom') params.set('goal', activeGoalId);
    params.set('mode', calcMode);
    params.set('sip', sip.toString());
    params.set('rate', rate.toString());
    params.set('years', years.toString());
    const shareUrl = `${window.location.origin}${window.location.pathname}?${params.toString()}`;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const activeGoal = GOALS.find(g => g.id === activeGoalId);

  // Compute effective time horizon in years based on goal selection
  const effectiveYears = useMemo(() => {
    if (activeGoalId === 'retirement') {
      return Math.max(1, retirementAge - currentAge);
    }
    if (activeGoalId === 'education') {
      return Math.max(1, collegeAge - childAge);
    }
    return years;
  }, [activeGoalId, retirementAge, currentAge, collegeAge, childAge, years]);

  // Compute inflation-adjusted target cost for cost-based goals
  const futureGoalCost = useMemo(() => {
    if (activeGoalId === 'custom') return null;
    if (activeGoalId === 'retirement') return null;
    const baseCost = targetCost || activeGoal?.defaultCost || 2500000;
    return baseCost * Math.pow(1 + (inflation / 100), effectiveYears);
  }, [activeGoalId, targetCost, activeGoal, inflation, effectiveYears]);

  const handleScrollToContact = () => {
    if (location.pathname !== '/') {
      navigate('/#contact');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'auto' });
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'auto' });
    }
  };

  const fmt = (val) => {
    if (!val || isNaN(val)) return '₹0';
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)}L`;
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };

  const { corpus, invested, gain, chartData } = useMemo(() => {
    const r = rate / 100 / 12;
    const n = effectiveYears * 12;

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

    const data = [];
    for (let y = 0; y <= effectiveYears; y++) {
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

    return { corpus: corpusAmt, invested: investedAmt, gain: gainAmt, chartData: data };
  }, [sip, rate, effectiveYears, calcMode]);

  const wealthRatio = (corpus / (invested || 1)).toFixed(2);
  const realValue = corpus / Math.pow(1 + (inflation / 100), effectiveYears);

  const downloadPDF = () => {
    try {
      const doc = new jsPDF();
      
      // Colors
      const navy = '#0d2545';
      const gold = '#c9922a';
      const textDark = '#1a1a2e';
      const gray = '#5c6478';
      
      // Header Logo & Branding
      doc.setFillColor(13, 37, 69);
      doc.rect(0, 0, 210, 30, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(20);
      doc.text("DRISHTI WEALTH", 15, 20);
      
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.text("Goal Investment Report", 195, 20, { align: "right" });
      
      // Document Title
      doc.setTextColor(navy);
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      doc.text(`${activeGoal?.label || "Custom SIP"} Calculation Report`, 15, 45);
      
      // Date
      doc.setTextColor(gray);
      doc.setFontSize(9);
      doc.text(`Generated on: ${new Date().toLocaleDateString('en-IN')}`, 15, 52);
      
      // Inputs Table / Box
      doc.setFillColor(250, 248, 244);
      doc.rect(15, 58, 180, 35, 'F');
      doc.setDrawColor(201, 146, 42);
      doc.setLineWidth(0.5);
      doc.line(15, 58, 15, 93);
      
      doc.setTextColor(navy);
      doc.setFontSize(11);
      doc.setFont("Helvetica", "bold");
      doc.text("Investment Metrics", 20, 66);
      
      doc.setTextColor(textDark);
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      
      const modeLabel = calcMode === 'sip' ? "Monthly Investment:" : "One-time Investment:";
      doc.text(modeLabel, 20, 75);
      doc.setFont("Helvetica", "bold");
      doc.text(fmt(sip), 75, 75);
      
      doc.setFont("Helvetica", "normal");
      doc.text("Expected Annual Return:", 20, 83);
      doc.setFont("Helvetica", "bold");
      doc.text(`${rate}%`, 75, 83);
      
      doc.setFont("Helvetica", "normal");
      doc.text("Time Horizon:", 110, 75);
      doc.setFont("Helvetica", "bold");
      doc.text(`${effectiveYears} Years`, 160, 75);
      
      doc.setFont("Helvetica", "normal");
      doc.text("Inflation Rate:", 110, 83);
      doc.setFont("Helvetica", "bold");
      doc.text(`${inflation}%`, 160, 83);
      
      // Projection Summary Cards
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(12);
      doc.setTextColor(navy);
      doc.text("Projection Summary", 15, 107);
      
      // Three Columns
      doc.setFillColor(241, 245, 249);
      doc.rect(15, 112, 56, 25, 'F');
      doc.setTextColor(gray);
      doc.setFontSize(9);
      doc.text("TOTAL INVESTED", 20, 119);
      doc.setTextColor(navy);
      doc.setFontSize(12);
      doc.setFont("Helvetica", "bold");
      doc.text(fmt(invested), 20, 128);
      
      doc.setFillColor(241, 245, 249);
      doc.rect(77, 112, 56, 25, 'F');
      doc.setTextColor(gray);
      doc.setFontSize(9);
      doc.setFont("Helvetica", "normal");
      doc.text("ESTIMATED GAINS", 82, 119);
      doc.setTextColor(gold);
      doc.setFontSize(12);
      doc.setFont("Helvetica", "bold");
      doc.text(fmt(gain), 82, 128);
      
      doc.setFillColor(13, 37, 69);
      doc.rect(139, 112, 56, 25, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont("Helvetica", "normal");
      doc.text("ESTIMATED CORPUS", 144, 119);
      doc.setFontSize(12);
      doc.setFont("Helvetica", "bold");
      doc.text(fmt(corpus), 144, 128);
      
      // Growth table
      doc.setTextColor(navy);
      doc.setFontSize(12);
      doc.setFont("Helvetica", "bold");
      doc.text("Year-by-Year Growth Details", 15, 149);
      
      doc.setFillColor(13, 37, 69);
      doc.rect(15, 154, 180, 8, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont("Helvetica", "bold");
      doc.text("Year", 20, 159.5);
      doc.text("Invested Principal", 70, 159.5);
      doc.text("Future Value (Estimated)", 140, 159.5);
      
      let yOffset = 162;
      doc.setFont("Helvetica", "normal");
      doc.setTextColor(textDark);
      
      const step = effectiveYears > 15 ? Math.ceil(effectiveYears / 15) : 1;
      
      for (let y = 0; y <= effectiveYears; y += step) {
        if (Math.round(y / step) % 2 === 0) {
          doc.setFillColor(250, 248, 244);
          doc.rect(15, yOffset, 180, 6, 'F');
        }
        
        doc.setTextColor(textDark);
        doc.text(`Year ${y}`, 20, yOffset + 4.5);
        
        const yrData = chartData.find(d => d.year === `Yr ${y}`) || chartData[y];
        if (yrData) {
          doc.text(fmt(yrData.invested), 70, yOffset + 4.5);
          doc.text(fmt(yrData.total), 140, yOffset + 4.5);
        }
        
        yOffset += 6;
      }
      
      // Disclaimer Box at bottom
      doc.setFillColor(250, 248, 244);
      doc.rect(15, 260, 180, 22, 'F');
      doc.setDrawColor(226, 232, 240);
      doc.rect(15, 260, 180, 22, 'S');
      
      doc.setTextColor(gray);
      doc.setFontSize(7);
      doc.setFont("Helvetica", "normal");
      
      const disclaimerLines = [
        "Disclaimer: The projections provided in this report are for illustrative purposes only based on the expected annual return input.",
        "They do not guarantee or represent actual future returns. Mutual fund investments are subject to market risks.",
        "Please read all scheme-related documents carefully before investing or seek professional financial guidance.",
        "Drishti Wealth © 2026. All rights reserved."
      ];
      
      let discY = 263.5;
      disclaimerLines.forEach(line => {
        doc.text(line, 20, discY);
        discY += 3.5;
      });
      
      doc.save(`Drishti_Wealth_${activeGoalId}_Report.pdf`);
    } catch (e) {
      console.error(e);
    }
  };

  const downloadCSV = () => {
    try {
      const headers = ["Year", "Invested Principal (INR)", "Estimated Corpus (INR)"];
      const rows = chartData.map(d => [
        d.year.replace('Yr ', ''),
        Math.round(d.invested),
        Math.round(d.total)
      ]);
      
      const csvContent = [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Drishti_Wealth_${activeGoalId}_Export.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (e) {
      console.error(e);
    }
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-navy p-3 rounded-lg shadow-lg border border-gold/20">
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
              Goal & Wealth Planner
            </div>
            <h2 className="font-serif text-[28px] font-semibold mb-[0.75rem] text-textDark leading-tight">
              See What Your Money Can Grow To.
            </h2>
            <p className="text-muted text-[15px] leading-[1.6] font-light">
              Select your financial goal, adjust your metrics, and plan your wealth creation path.
            </p>
          </div>

          {/* Mode Toggle */}
          <div className="flex flex-col items-start md:items-end gap-2 shrink-0">
            <div className="flex bg-[#F1F5F9] rounded-[100px] p-1 border border-[#E2E8F0] shadow-inner">
              <button
                onClick={() => { setCalcMode('sip'); if (sip > 200000) setSip(25000); }}
                className={`px-5 py-2 rounded-[100px] text-[13.5px] font-semibold transition-all duration-300 ${
                  calcMode === 'sip'
                    ? 'bg-white text-[#0d2545] shadow-sm'
                    : 'text-[#64748B] hover:text-[#0d2545]'
                }`}
              >
                Monthly SIP
              </button>
              <button
                onClick={() => { setCalcMode('lumpsum'); if (sip < 100000) setSip(500000); }}
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
                onClick={() => {
                  setActiveGoalId(goal.id);
                  if (goal.id === 'retirement') {
                    setCurrentAge(30);
                    setRetirementAge(60);
                    setSip(25000);
                    setRate(12);
                    setInflation(6);
                  } else if (goal.id === 'education') {
                    setChildAge(3);
                    setCollegeAge(18);
                    setTargetCost(2500000);
                    setSip(12000);
                    setRate(12);
                    setInflation(7);
                  } else if (goal.defaultCost) {
                    setTargetCost(goal.defaultCost);
                    setSip(goal.defaultSip || 20000);
                    setYears(goal.defaultYears || 10);
                    setRate(goal.defaultRate || 12);
                    setInflation(6);
                  } else {
                    setSip(goal.defaultSip || 10000);
                    setRate(goal.defaultRate || 12);
                    setYears(goal.defaultYears || 10);
                  }
                }}
                className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-medium transition-colors ${
                  isActive
                    ? 'bg-gold text-white shadow-md'
                    : 'bg-navy/[0.08] text-navy hover:bg-navy/[0.15]'
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
          <div className="bg-navy/[0.05] rounded-lg p-4 mb-[2rem] flex flex-col sm:flex-row items-start sm:items-center justify-between border border-navy/10 gap-3">
            <div className="text-textDark/80 text-[14px]">
              <span className="font-semibold text-navy">{activeGoal.icon} {activeGoal.label}</span>: {activeGoal.desc}
            </div>
            {futureGoalCost && (
              <div className="bg-gold/15 border border-gold/30 rounded-md px-3 py-1 text-[12.5px] text-navy font-semibold shrink-0">
                Est. Future Cost: {fmt(futureGoalCost)}
              </div>
            )}
          </div>
        )}

        {/* ── Two-column layout: Calculator Left | Donut Right ── */}
        <div className="flex flex-col lg:flex-row gap-8 items-start">

          {/* LEFT: Calculator Card */}
          <div className="flex-1 min-w-0">
            <div className="bg-navy rounded-[12px] p-[1.5rem] sm:p-[2rem] shadow-xl">
              <div className="flex flex-col gap-[1.8rem]">

                {/* RETIREMENT METRICS */}
                {activeGoalId === 'retirement' && (
                  <>
                    <SliderRow
                      label="Current Age"
                      value={currentAge}
                      min={18}
                      max={65}
                      step={1}
                      onChange={(val) => {
                        setCurrentAge(val);
                        if (val >= retirementAge) setRetirementAge(val + 5);
                      }}
                      suffix="Yrs"
                    />
                    <SliderRow
                      label="Retirement Age"
                      value={retirementAge}
                      min={Math.max(40, currentAge + 1)}
                      max={75}
                      step={1}
                      onChange={setRetirementAge}
                      suffix="Yrs"
                    />
                    <SliderRow
                      label={calcMode === 'sip' ? "Monthly Investment" : "Investment Amount"}
                      value={sip}
                      min={calcMode === 'sip' ? 1000 : 50000}
                      max={calcMode === 'sip' ? 200000 : 5000000}
                      step={calcMode === 'sip' ? 1000 : 10000}
                      onChange={setSip}
                      prefix="₹"
                    />
                    <SliderRow label="Expected Return" value={rate} min={8} max={15} step={0.5} onChange={setRate} suffix="%" />
                    <SliderRow label="Inflation Rate" value={inflation} min={3} max={10} step={0.5} onChange={setInflation} suffix="%" />
                  </>
                )}

                {/* CHILD EDUCATION METRICS */}
                {activeGoalId === 'education' && (
                  <>
                    <SliderRow
                      label="Child's Current Age"
                      value={childAge}
                      min={0}
                      max={17}
                      step={1}
                      onChange={(val) => {
                        setChildAge(val);
                        if (val >= collegeAge) setCollegeAge(val + 5);
                      }}
                      suffix="Yrs"
                    />
                    <SliderRow
                      label="College Age"
                      value={collegeAge}
                      min={Math.max(15, childAge + 1)}
                      max={25}
                      step={1}
                      onChange={setCollegeAge}
                      suffix="Yrs"
                    />
                    <SliderRow
                      label="Education Cost (Today)"
                      value={targetCost}
                      min={500000}
                      max={10000000}
                      step={100000}
                      onChange={setTargetCost}
                      prefix="₹"
                    />
                    <SliderRow
                      label={calcMode === 'sip' ? "Monthly SIP" : "Investment Amount"}
                      value={sip}
                      min={calcMode === 'sip' ? 1000 : 20000}
                      max={calcMode === 'sip' ? 100000 : 2000000}
                      step={calcMode === 'sip' ? 1000 : 10000}
                      onChange={setSip}
                      prefix="₹"
                    />
                    <SliderRow label="Expected Return" value={rate} min={8} max={15} step={0.5} onChange={setRate} suffix="%" />
                    <SliderRow label="Education Inflation" value={inflation} min={4} max={12} step={0.5} onChange={setInflation} suffix="%" />
                  </>
                )}

                {/* HOUSE / CAR / WEDDING / VACATION METRICS */}
                {(activeGoalId === 'house' || activeGoalId === 'car' || activeGoalId === 'wedding' || activeGoalId === 'vacation') && (
                  <>
                    <SliderRow
                      label="Goal Cost (Today)"
                      value={targetCost}
                      min={500000}
                      max={20000000}
                      step={100000}
                      onChange={setTargetCost}
                      prefix="₹"
                    />
                    <SliderRow
                      label="Time Horizon"
                      value={years}
                      min={1}
                      max={30}
                      step={1}
                      onChange={setYears}
                      suffix="Yrs"
                    />
                    <SliderRow
                      label={calcMode === 'sip' ? "Monthly SIP" : "Investment Amount"}
                      value={sip}
                      min={calcMode === 'sip' ? 1000 : 20000}
                      max={calcMode === 'sip' ? 200000 : 5000000}
                      step={calcMode === 'sip' ? 1000 : 10000}
                      onChange={setSip}
                      prefix="₹"
                    />
                    <SliderRow label="Expected Return" value={rate} min={8} max={15} step={0.5} onChange={setRate} suffix="%" />
                    <SliderRow label="Inflation Rate" value={inflation} min={3} max={12} step={0.5} onChange={setInflation} suffix="%" />
                  </>
                )}

                {/* CUSTOM SIP METRICS */}
                {activeGoalId === 'custom' && (
                  <>
                    <SliderRow
                      label={calcMode === 'sip' ? "Monthly SIP" : "Investment Amount"}
                      value={sip}
                      min={calcMode === 'sip' ? 1000 : 10000}
                      max={calcMode === 'sip' ? 200000 : 5000000}
                      step={calcMode === 'sip' ? 1000 : 10000}
                      onChange={setSip}
                      prefix="₹"
                    />
                    <SliderRow label="Expected Rate" value={rate} min={8} max={15} step={0.5} onChange={setRate} suffix="%" />
                    <SliderRow label="Time Period" value={years} min={1} max={30} step={1} onChange={setYears} suffix="Yrs" />
                  </>
                )}

              </div>

              {/* Result Box */}
              <div className="bg-navy/80 rounded-[10px] p-[1.5rem] mt-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-[1.5rem] md:gap-0 border border-white/10 transition-all duration-300">
                <div className="w-full md:w-auto flex-1">
                  <div className="text-white/60 text-[13px] mb-1">Estimated corpus in {effectiveYears} years</div>
                  <div className="font-serif text-white text-[32px] sm:text-[36px] font-semibold leading-tight">
                    {fmt(corpus)}<sup className="text-[18px] text-gold align-super ml-0.5">*</sup>
                  </div>
                  <div className="text-goldLight text-[13px] mt-2 font-medium">
                    Invested: {fmt(invested)} &middot; Gain: {fmt(gain)}<sup className="text-[10px] text-goldLight align-super ml-0.5">*</sup>
                  </div>
                </div>

                <div className="w-full md:w-[280px] flex flex-col items-end gap-4">
                  <div className="flex flex-col gap-2 w-full mt-2">
                    <button
                      onClick={handleScrollToContact}
                      className="bg-gold text-white text-[14px] px-[20px] py-[10px] rounded-[6px] font-semibold hover:bg-goldLight hover:text-navy transition-colors whitespace-nowrap w-full text-center shadow-md uppercase tracking-wide cursor-pointer"
                    >
                      {calcMode === 'sip' ? 'START YOUR SIP TODAY ↗' : 'START INVESTING TODAY ↗'}
                    </button>
                    <div className="flex items-center justify-between text-[11px] text-white/50 px-1 pt-1">
                      <button type="button" onClick={downloadPDF} className="hover:text-gold transition-colors flex items-center gap-1 cursor-pointer">
                        📄 Download PDF
                      </button>
                      <button type="button" onClick={downloadCSV} className="hover:text-gold transition-colors flex items-center gap-1 cursor-pointer">
                        📊 Export CSV
                      </button>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mt-4">
              <div className="bg-navy/[0.05] border border-navy/10 rounded-[10px] p-4">
                <div className="text-muted text-[12px] mb-1">Total invested</div>
                <div className="text-navy text-[18px] font-semibold">{fmt(invested)}</div>
              </div>
              <div className="bg-navy/[0.05] border border-navy/10 rounded-[10px] p-4">
                <div className="text-muted text-[12px] mb-1">Est. returns</div>
                <div className="text-navy text-[18px] font-semibold">{fmt(gain)}<sup className="text-[11px] text-gold align-super ml-0.5">*</sup></div>
              </div>
              <div className="bg-navy/[0.05] border border-navy/10 rounded-[10px] p-4">
                <div className="text-muted text-[12px] mb-1">Time Horizon</div>
                <div className="text-navy text-[18px] font-semibold">{effectiveYears} Years</div>
              </div>
              <div className="bg-navy/[0.05] border border-navy/10 rounded-[10px] p-4">
                <div className="text-muted text-[12px] mb-1">Purchasing Power</div>
                <div className="text-navy text-[18px] font-semibold">{fmt(realValue)}</div>
              </div>
            </div>

            {/* Chart Section with Guide */}
            <div className="mt-[3rem] hidden md:flex flex-row items-center gap-6 w-full">
              {/* Left: The Graph */}
              <div className="h-[220px] min-h-[220px] sm:h-[250px] flex-1 w-full relative">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#c9922a" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#c9922a" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0d2545" stopOpacity={0.1} />
                        <stop offset="95%" stopColor="#0d2545" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="year" stroke="#5c6478" fontSize={12} tickLine={false} axisLine={false} minTickGap={30} />
                    <YAxis stroke="#5c6478" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(val) => fmt(val)} width={70} />
                    <Tooltip content={<CustomTooltip />} />
                    <Area type="monotone" dataKey="total" name="Estimated Corpus" stroke="#c9922a" strokeWidth={2} fillOpacity={1} fill="url(#colorTotal)" />
                    <Area type="monotone" dataKey="invested" name="Total Invested" stroke="#5c6478" strokeWidth={2} strokeDasharray="4 4" fillOpacity={1} fill="url(#colorInvested)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              {/* Right: Graph Guide Legend */}
              <div className="flex md:flex-col flex-row gap-6 md:gap-4 shrink-0 bg-[#faf8f4]/60 md:bg-transparent p-3 md:p-0 rounded-lg w-full md:w-[160px] border border-navy/5 md:border-none justify-center md:justify-start">
                <div className="flex items-center gap-3">
                  <div className="flex items-center shrink-0">
                    <span className="w-[18px] h-[3px] bg-gold rounded-full inline-block" />
                  </div>
                  <div className="text-left">
                    <div className="text-[12px] font-semibold text-textDark leading-none mb-1">Estimated Corpus</div>
                    <div className="text-[10px] text-muted leading-none">Growth projection</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="flex items-center shrink-0">
                    <span className="w-[18px] h-[3px] border-t-2 border-dashed border-muted inline-block" />
                  </div>
                  <div className="text-left">
                    <div className="text-[12px] font-semibold text-textDark leading-none mb-1">Total Invested</div>
                    <div className="text-[10px] text-muted leading-none">Principal amount</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Standalone Donut Chart */}
          <div className="lg:w-[300px] shrink-0 flex flex-col items-center pt-2 lg:pt-[1rem] select-none">

            <div className="self-start w-full mb-5 pl-1">
              <div className="text-[#6B7280] text-[13px] font-medium mb-1">Resultant Value</div>
              <div className="font-serif text-[32px] font-bold text-[#1a1a2e] leading-none">{fmt(corpus)}<sup className="text-[16px] text-[#c9922a] align-super ml-0.5">*</sup></div>
            </div>

            <div className="relative w-full flex justify-center -mx-2">
              <ThreeDPieChart invested={invested} gain={gain} />
            </div>

            {/* Legend */}
            <div className="mt-6 w-full space-y-5 pl-1">
              {/* Amount Invested: navy */}
              <div className="flex items-start gap-3">
                <span className="mt-[3px] w-[14px] h-[14px] rounded-sm shrink-0" style={{ background: 'linear-gradient(135deg,#2a5298,#0d2545)' }} />
                <div>
                  <div className="text-[#374151] text-[13px] font-medium leading-none mb-[6px]">Amount Invested</div>
                  <div className="text-[#0d2545] text-[22px] font-bold font-serif leading-none">{fmt(invested)}</div>
                </div>
              </div>

              {/* Estimated Returns: gold */}
              <div className="flex items-start gap-3">
                <span className="mt-[3px] w-[14px] h-[14px] rounded-sm shrink-0" style={{ background: 'linear-gradient(135deg,#f0c96a,#c9922a)' }} />
                <div>
                  <div className="text-[#374151] text-[13px] font-medium leading-none mb-[6px]">Estimated Returns</div>
                  <div className="text-[#c9922a] text-[22px] font-bold font-serif leading-none">{fmt(gain)}<sup className="text-[12px] align-super ml-0.5">*</sup></div>
                </div>
              </div>
            </div>

          </div>

        </div>{/* end two-col */}

        {/* Disclaimer */}
        <div className="mt-[3rem] p-4 bg-[#faf8f4] rounded-lg border border-[#0d2545]/12 text-center">
          <p className="text-muted text-[11px] leading-[1.6]">
            <strong>Disclaimer:</strong> The calculations provided by this SIP Calculator are for illustrative purposes only and do not represent actual returns or guarantee future results. Mutual fund investments are subject to market risks; please read all scheme-related documents carefully before investing.
          </p>
        </div>

      </div>

      {/* Share Modal */}
      {isShareModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[1000] px-4 font-sans">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsShareModalOpen(false)}
          />
          
          {/* Content */}
          <div className="bg-[#0d2545] border border-gold/20 rounded-[16px] w-full max-w-[480px] p-6 relative z-10 text-white shadow-2xl animate-in fade-in zoom-in-95 duration-200">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setIsShareModalOpen(false)}
              className="absolute top-4 right-4 text-white/60 hover:text-white text-[22px] bg-transparent border-none cursor-pointer"
            >
              &times;
            </button>
            
            <h3 className="font-serif text-[20px] font-semibold text-white mb-2">Share Calculation</h3>
            <p className="text-white/60 text-[13px] mb-5">
              Share your projected SIP growth of <span className="text-gold font-semibold">{fmt(corpus)}</span> with others.
            </p>
            
            {/* Link Copy Bar */}
            <div className="flex gap-2 mb-6">
              <input
                type="text"
                readOnly
                value={window.location.href}
                className="flex-1 bg-white/5 border border-white/10 rounded-[8px] px-3 py-2 text-[12.5px] text-white/80 outline-none"
                onClick={e => e.currentTarget.select()}
              />
              <button
                type="button"
                onClick={handleCopyLink}
                className="bg-gold hover:bg-goldLight text-white text-[12.5px] font-semibold px-4 py-2 rounded-[8px] transition-colors whitespace-nowrap min-w-[70px]"
              >
                {copied ? 'Copied!' : 'Copy'}
              </button>
            </div>
            
            {/* Social Share Buttons */}
            <div>
              <div className="text-[11px] uppercase tracking-wider text-white/40 font-semibold mb-3">Or share via</div>
              <div className="grid grid-cols-3 gap-3">
                <a
                  href={`https://api.whatsapp.com/send?text=I projected my SIP growth with Drishti Wealth! I estimated a corpus of ${encodeURIComponent(fmt(corpus))} in ${years} years. Calculate yours here: ${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-[10px] bg-white/5 border border-white/5 hover:border-[#25D366]/30 hover:bg-[#25D366]/5 transition-all text-center text-white/85 hover:text-white"
                >
                  <svg className="w-5 h-5 text-[#25D366]" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.513 2.262 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.455L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.966a9.822 9.822 0 00-6.965-2.879c-5.44 0-9.866 4.372-9.87 9.802 0 1.764.47 3.487 1.359 5.011l-.979 3.578 3.7-.972zm11.226-5.328c-.287-.144-1.696-.837-1.958-.933-.262-.096-.452-.144-.642.144-.19.288-.737.933-.904 1.124-.166.19-.332.216-.618.072-.287-.144-1.21-.446-2.305-1.424-.853-.761-1.43-1.7-1.597-1.988-.166-.288-.018-.444.125-.587.13-.13.287-.336.43-.504.143-.168.19-.288.286-.48.096-.192.048-.361-.024-.505-.072-.144-.642-1.547-.88-2.12-.23-.557-.464-.48-.642-.49-.166-.008-.356-.01-.546-.01s-.5.072-.76.361c-.262.288-1.001.98-1.001 2.392s1.022 2.778 1.166 2.97c.143.192 2.012 3.078 4.875 4.316.68.295 1.213.47 1.627.602.684.218 1.306.187 1.8.113.548-.083 1.696-.693 1.935-1.363.238-.67.238-1.244.166-1.363-.07-.12-.26-.192-.546-.336z"/>
                  </svg>
                  <span className="text-[11px] font-medium">WhatsApp</span>
                </a>
                <a
                  href={`https://twitter.com/intent/tweet?text=I projected my SIP growth with Drishti Wealth! I estimated a corpus of ${encodeURIComponent(fmt(corpus))} in ${years} years. Calculate yours:&url=${encodeURIComponent(window.location.href)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-[10px] bg-white/5 border border-white/5 hover:border-white/20 hover:bg-white/5 transition-all text-center text-white/85 hover:text-white"
                >
                  <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                  </svg>
                  <span className="text-[11px] font-medium">Twitter / X</span>
                </a>
                <a
                  href={`mailto:?subject=Projected SIP Growth Estimate&body=I calculated my projected SIP corpus with Drishti Wealth. With a monthly investment of ${fmt(sip)} at ${rate}% expected returns, the estimated corpus is ${fmt(corpus)} in ${years} years. View details here: ${window.location.href}`}
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-[10px] bg-white/5 border border-white/5 hover:border-gold/30 hover:bg-gold/5 transition-all text-center text-white/85 hover:text-white"
                >
                  <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-[11px] font-medium">Email</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default SIPCalculator;
