import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import supabase from '../lib/supabase';
import FadeIn from '../components/animations/FadeIn';

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
    <div className="flex items-center gap-3">
      <span className="text-white/70 text-[13px] w-[200px] flex-shrink-0">{label}</span>
      <input
        type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 h-[4px] appearance-none bg-white/10 rounded-full outline-none cursor-pointer"
        style={{ accentColor: '#c9922a' }}
      />
      <input
        type="number"
        min={min} max={max} step={step}
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
        className="text-[#f0c96a] text-[13px] font-semibold w-[70px] text-right flex-shrink-0 bg-transparent border-b border-transparent hover:border-[#f0c96a]/40 focus:border-[#f0c96a] outline-none transition-colors cursor-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
};

const RetirementPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('ret-contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919800000000?text=Hi!%20I%20would%20like%20to%20discuss%20my%20retirement%20planning%20with%20you.', '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !age) {
      setError('Please fill out all required fields');
      return;
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Phone number must have at least 10 digits');
      return;
    }
    setError('');
    setLoading(true);

    const { error: sbError } = await supabase
      .from('leads')
      .insert([{
        name,
        phone,
        interest: `Retirement Planning - Current Age: ${age || 'Not Specified'}`,
        city: '',
        is_nri: '',
        nri_country: '',
        message: 'Lead from Retirement Page',
        status: 'new',
        created_at: new Date().toISOString()
      }]);

    if (sbError) {
      console.error('Full error:', sbError);
      setError(sbError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const labelStyles = "text-[#c9922a] text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] text-[#1a1a2e] font-semibold mb-[2rem] leading-tight";
  const cardStyles = "bg-white border border-[#0d2545]/12 rounded-[12px] p-[1.5rem] h-full transition-transform hover:-translate-y-1";
  const inputStyles = "w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-[#c9922a] focus:bg-white/10 placeholder-white/35 transition-colors";
  const formLabelStyles = "block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]";

  // --- Calculator State ---
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [lifeExpectancy, setLifeExpectancy] = useState(85);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [roiRate, setRoiRate] = useState(12);
  const [currentSavings, setCurrentSavings] = useState(0);

  // --- Calculator Logic ---
  const calc = useMemo(() => {
    const yearsToRetirement = Math.max(1, retirementAge - currentAge);
    const retirementDuration = Math.max(1, lifeExpectancy - retirementAge);
    const mRate = roiRate / 100 / 12;
    const iRate = inflationRate / 100;
    const realMonthly = (roiRate / 100 - iRate) / 12;

    // Monthly expenses at retirement
    const expAtRetirement = monthlyExpenses * Math.pow(1 + iRate, yearsToRetirement);

    // Corpus needed (PV of inflation-adjusted withdrawals)
    let corpusNeeded;
    if (Math.abs(realMonthly) < 0.0001) {
      corpusNeeded = expAtRetirement * retirementDuration * 12;
    } else {
      corpusNeeded = expAtRetirement * (1 - Math.pow(1 + realMonthly, -retirementDuration * 12)) / realMonthly;
    }

    // Future value of existing savings
    const savingsFV = currentSavings * Math.pow(1 + mRate, yearsToRetirement * 12);
    const coveragePercent = Math.min(100, (savingsFV / corpusNeeded) * 100);

    // SIP needed
    const remainingCorpus = Math.max(0, corpusNeeded - savingsFV);
    let sipNeeded = 0;
    if (mRate > 0 && yearsToRetirement > 0) {
      sipNeeded = remainingCorpus * mRate / (Math.pow(1 + mRate, yearsToRetirement * 12) - 1);
    }
    const totalSipInvested = sipNeeded * yearsToRetirement * 12;
    const wealthMultiplier = totalSipInvested > 0 ? corpusNeeded / totalSipInvested : 0;

    // Chart data: corpus at each year from currentAge+1 to retirementAge
    const chartData = [];
    for (let y = 0; y <= yearsToRetirement; y++) {
      const months = y * 12;
      const sipFV = mRate > 0 ? sipNeeded * (Math.pow(1 + mRate, months) - 1) / mRate : sipNeeded * months;
      const savFV = currentSavings * Math.pow(1 + mRate, months);
      chartData.push({ age: currentAge + y, corpus: sipFV + savFV });
    }

    // Delay penalty: SIP if starting 5 years later
    const delayYears = yearsToRetirement - 5;
    let delaySip = 0;
    if (delayYears > 0 && mRate > 0) {
      delaySip = remainingCorpus * mRate / (Math.pow(1 + mRate, delayYears * 12) - 1);
    }
    const delayPct = sipNeeded > 0 ? Math.round(((delaySip - sipNeeded) / sipNeeded) * 100) : 0;

    return { yearsToRetirement, retirementDuration, expAtRetirement, corpusNeeded, savingsFV, coveragePercent, sipNeeded, totalSipInvested, wealthMultiplier, chartData, delaySip, delayPct };
  }, [currentAge, retirementAge, lifeExpectancy, monthlyExpenses, inflationRate, roiRate, currentSavings]);

  const fmt = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };



  // SVG Chart
  const ChartSVG = () => {
    const W = 700, H = 200, PAD = { t: 10, r: 10, b: 40, l: 55 };
    const data = calc.chartData;
    if (!data || data.length < 2) return null;
    const maxCorpus = calc.corpusNeeded;
    const minAge = data[0].age;
    const maxAge = data[data.length - 1].age;
    const toX = (age) => PAD.l + ((age - minAge) / Math.max(1, maxAge - minAge)) * (W - PAD.l - PAD.r);
    const toY = (val) => PAD.t + (1 - Math.min(1, val / maxCorpus)) * (H - PAD.t - PAD.b);
    const pts = data.map(d => `${toX(d.age)},${toY(d.corpus)}`).join(' ');
    const areaPath = `M${toX(minAge)},${toY(0)} ` + data.map(d => `L${toX(d.age)},${toY(d.corpus)}`).join(' ') + ` L${toX(maxAge)},${toY(0)} Z`;
    // Y-axis labels
    const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => ({ val: maxCorpus * f, y: toY(maxCorpus * f) }));
    // X-axis labels (every 5 years)
    const xTicks = data.filter((_, i) => i % Math.max(1, Math.floor(data.length / 6)) === 0 || i === data.length - 1);
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

  const steps = [
    {
      icon: '💬',
      step: '01',
      title: 'Understand Your Lifestyle',
      description: 'We start by understanding your current income, expenses, and the lifestyle you want to maintain in retirement.',
    },
    {
      icon: '🧮',
      step: '02',
      title: 'Calculate Your Corpus',
      description: 'We calculate exactly how much corpus you\'ll actually need — factoring in real inflation, not just rough estimates.',
    },
    {
      icon: '📊',
      step: '03',
      title: 'Build Your Investment Plan',
      description: 'A dedicated, personalized plan combining mutual funds, insurance, and other instruments to hit your number.',
    },
    {
      icon: '🔄',
      step: '04',
      title: 'Annual Reviews',
      description: 'Life changes. We review your plan annually and make adjustments so you stay perfectly on track.',
    },
    {
      icon: '🏥',
      step: '05',
      title: 'Plan for Healthcare',
      description: 'Healthcare costs are the biggest retirement wildcard. We build this in from day one so you\'re never caught off guard.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>Retirement Planning — Shah Financial Services</title>
        <meta name="description" content="Build a realistic, inflation-adjusted retirement corpus plan. Start at 28 or 52 — it's never too early or too late." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#0d2545] py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center gap-[6px] bg-[#c9922a]/15 border border-[#c9922a]/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-[#f0c96a] text-[11px] uppercase tracking-[0.12em]">Retirement Planning</span>
            </div>

            <h1 className="font-serif text-[36px] md:text-[48px] text-white font-semibold leading-[1.2] mb-[1.25rem] max-w-4xl">
              Retire Comfortably. Not Just Survive — Actually Live Well.
            </h1>

            <p className="text-white/65 text-[16px] leading-[1.6] mb-[0.75rem] max-w-2xl">
              Retirement planning is not something you do at 55. The earlier you start, the less you need to invest every month.
            </p>
            <p className="text-white/65 text-[16px] leading-[1.6] mb-[2rem] max-w-2xl">
              We build a retirement plan that's realistic, reviewed regularly, and adjusts as your life changes.
            </p>

            <div className="flex flex-wrap gap-4 mt-[2rem]">
              <button
                onClick={handleScrollToContact}
                className="bg-[#c9922a] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#f0c96a] transition-colors shadow-lg shadow-[#c9922a]/20"
              >
                📅 Book a Free Retirement Planning Call
              </button>
              <button
                onClick={handleWhatsApp}
                className="bg-[#25D366] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#22c35e] transition-colors flex items-center gap-2 shadow-lg shadow-[#25D366]/20"
              >
                <span className="text-[18px]">💬</span> WhatsApp Us
              </button>
              <button
                onClick={() => document.getElementById('calculator')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 text-white border border-white/20 px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                🧮 Calculate My Retirement Corpus
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Key Insight Banner */}
      <section className="bg-white py-[2.5rem] w-full border-b border-[#0d2545]/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-6 md:gap-12">
            {[
              { number: '28', label: 'Ideal age to start' },
              { number: '52', label: 'Never too late to begin' },
              { number: '15%', label: 'Avg CAGR assumed' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="font-serif text-[42px] text-[#0d2545] font-semibold leading-none">{stat.number}</div>
                <div className="text-[#5c6478] text-[14px] leading-snug max-w-[120px]">{stat.label}</div>
              </div>
            ))}
            <div className="md:ml-auto max-w-md">
              <p className="text-[#5c6478] text-[15px] leading-[1.7] italic border-l-4 border-[#c9922a] pl-4">
                "Whether you're 28 or 52 — it's not too early and it's not too late."
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Our Process Section */}
      <section className="bg-[#faf8f4] py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Our Process</div>
            <h2 className={titleStyles}>How We Build Your Retirement Plan</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[3rem]">
              {steps.map((step) => (
                <div key={step.step} className={cardStyles}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-[32px]">{step.icon}</div>
                    <div className="font-serif text-[32px] text-[#0d2545]/15 font-bold leading-none">{step.step}</div>
                  </div>
                  <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">{step.title}</h3>
                  <p className="text-[#5c6478] text-[14px] leading-[1.6]">{step.description}</p>
                </div>
              ))}

              {/* CTA Card in the grid */}
              <div className="bg-[#0d2545] rounded-[12px] p-[1.5rem] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9922a] rounded-full blur-[60px] opacity-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                  <div className="text-[32px] mb-3">🏖️</div>
                  <h3 className="font-serif text-[18px] text-white font-semibold mb-2">Ready to Start?</h3>
                  <p className="text-white/60 text-[14px] leading-[1.6] mb-6">
                    Get a free, no-obligation retirement corpus estimate tailored specifically to your situation.
                  </p>
                </div>
                <button
                  onClick={handleScrollToContact}
                  className="bg-[#c9922a] text-white py-[10px] px-[20px] rounded-[8px] text-[14px] font-medium hover:bg-[#f0c96a] transition-colors w-full relative z-10"
                >
                  Get My Free Plan →
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ====== RETIREMENT CORPUS CALCULATOR ====== */}
      <section id="calculator" className="bg-[#faf8f4] py-[5rem] w-full">
        <FadeIn>
          <div className="max-w-5xl mx-auto px-4">
            <div className={labelStyles}>Retirement Planning</div>
            <h2 className={titleStyles}>Calculate your retirement corpus</h2>
            <p className="text-[#5c6478] text-[15px] mb-8 -mt-4">How much do you need — and what SIP gets you there?</p>

            {/* Sliders Card */}
            <div className="bg-[#1e293b] rounded-[16px] p-6 md:p-8 mb-4 space-y-5">
              <SliderRow label="Current age" value={currentAge} min={18} max={55} onChange={setCurrentAge} display={`${currentAge} yrs`} />
              <SliderRow label="Retirement age" value={retirementAge} min={Math.max(currentAge + 5, 40)} max={75} onChange={v => setRetirementAge(Math.max(currentAge + 5, v))} display={`${retirementAge} yrs`} />
              <SliderRow label="Life expectancy" value={lifeExpectancy} min={Math.max(retirementAge + 1, 65)} max={100} onChange={v => setLifeExpectancy(Math.max(retirementAge + 1, v))} display={`${lifeExpectancy} yrs`} />
              <SliderRow label="Monthly expenses today" value={monthlyExpenses} min={5000} max={500000} step={1000} onChange={setMonthlyExpenses} display={fmt(monthlyExpenses)} />
              <SliderRow label="Inflation rate" value={inflationRate} min={2} max={12} step={0.5} onChange={setInflationRate} display={`${inflationRate}%`} />
              <SliderRow label="Expected return on investment" value={roiRate} min={6} max={18} step={0.5} onChange={setRoiRate} display={`${roiRate}%`} />
              <SliderRow label="Current savings already invested" value={currentSavings} min={0} max={10000000} step={10000} onChange={setCurrentSavings} display={fmt(currentSavings)} />
            </div>

            {/* Results Panel */}
            <div className="bg-[#0d2545] rounded-[16px] p-6 mb-4">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">Corpus you need at retirement</p>
                  <p className="font-serif text-[40px] text-white font-bold leading-none">{fmt(calc.corpusNeeded)}</p>
                  <p className="text-white/40 text-[12px] mt-1">Monthly expenses at retirement: {fmt(calc.expAtRetirement)}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">SIP needed per month</p>
                  <p className="font-serif text-[40px] text-[#f0c96a] font-bold leading-none">{fmt(calc.sipNeeded)}</p>
                  <p className="text-white/40 text-[12px] mt-1">{calc.yearsToRetirement} years to build</p>
                </div>
              </div>
              {/* Coverage bar */}
              <div className="mb-1">
                <div className="flex justify-between text-[11px] text-white/40 mb-1">
                  <span>Corpus covered by existing savings</span>
                  <span>{calc.coveragePercent.toFixed(0)}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-[6px] overflow-hidden">
                  <div className="bg-[#c9922a] h-full rounded-full transition-all duration-500" style={{ width: `${calc.coveragePercent}%` }} />
                </div>
              </div>
              <p className="text-white/35 text-[11px] mt-1">Existing savings will grow to: {fmt(calc.savingsFV)}</p>
            </div>

            {/* Stats Row */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Years to retirement', value: `${calc.yearsToRetirement} yrs` },
                { label: 'Retirement duration', value: `${calc.retirementDuration} yrs` },
                { label: 'Total SIP invested', value: fmt(calc.totalSipInvested) },
                { label: 'Wealth multiplier', value: `${calc.wealthMultiplier.toFixed(1)}×` },
              ].map(s => (
                <div key={s.label} className="bg-[#1e293b] rounded-[12px] p-4">
                  <p className="text-white/40 text-[11px] mb-1">{s.label}</p>
                  <p className="font-serif text-[22px] text-white font-semibold">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Delay Insight */}
            {calc.delaySip > 0 && calc.delayPct > 0 && (
              <div className="bg-[#c9922a]/10 border border-[#c9922a]/30 rounded-[10px] px-5 py-4 mb-6 text-[#7a5520] text-[13px] leading-[1.6]">
                Starting now at {currentAge}, you need <strong>{fmt(calc.sipNeeded)}/month</strong>. Waiting just 5 more years would require <strong>{fmt(calc.delaySip)}/month</strong> — <strong>{calc.delayPct}% more</strong> for the same goal.
              </div>
            )}

            {/* Chart */}
            <div className="bg-[#1e293b] rounded-[16px] p-5 mb-6">
              <ChartSVG />
            </div>

            {/* CTA under calculator */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={handleScrollToContact} className="bg-[#c9922a] text-white px-[24px] py-[11px] rounded-[8px] font-medium hover:bg-[#f0c96a] transition-colors text-[14px]">
                📅 Book a Free Planning Call
              </button>
              <button onClick={handleWhatsApp} className="bg-[#25D366] text-white px-[24px] py-[11px] rounded-[8px] font-medium hover:bg-[#22c35e] transition-colors text-[14px] flex items-center gap-2">
                💬 WhatsApp Us
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* What Makes Us Different */}
      <section className="bg-white py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Why Us</div>
            <h2 className={titleStyles}>Retirement Planning Done Right</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className={cardStyles}>
                <div className="text-[32px] mb-3">🔍</div>
                <h3 className="font-serif text-[17px] text-[#0d2545] font-semibold mb-2">Realistic Numbers</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">We factor in actual inflation rates and real healthcare cost escalations, not optimistic assumptions.</p>
              </div>
              <div className={cardStyles}>
                <div className="text-[32px] mb-3">📐</div>
                <h3 className="font-serif text-[17px] text-[#0d2545] font-semibold mb-2">Goal-Based Investing</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">Every SIP, every fund, every rupee is mapped back to your retirement target. Nothing is vague.</p>
              </div>
              <div className={cardStyles}>
                <div className="text-[32px] mb-3">🔁</div>
                <h3 className="font-serif text-[17px] text-[#0d2545] font-semibold mb-2">Ongoing Partnership</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">Annual reviews mean your plan evolves with you — promotions, lifestyle changes, and life events all get accounted for.</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Contact / Lead Form */}
      <section id="ret-contact" className="bg-[#0d2545] py-[5rem] w-full border-t border-white/5">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">
                Book Your Free Retirement Planning Call
              </h2>
              <p className="text-[#f0c96a] text-[18px] font-serif italic">
                "The best time to plan for retirement was yesterday. The second best time is now."
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[16px] p-[2rem] md:p-[2.5rem] shadow-2xl backdrop-blur-sm">
              {success ? (
                <div className="bg-green-500/15 border border-green-500/30 rounded-[10px] p-[2rem] text-center text-[#4ade80]">
                  <div className="text-[32px] mb-2">✅</div>
                  <h3 className="font-serif text-[24px] mb-2">Request Received</h3>
                  <p>Thank you! Our retirement planning specialist will contact you within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className={formLabelStyles}>Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className={inputStyles} />
                  </div>

                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Phone / WhatsApp</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputStyles} />
                  </div>

                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Your Current Age</label>
                    <select value={age} onChange={e => setAge(e.target.value)} className={`${inputStyles} appearance-none cursor-pointer`}>
                      <option value="" className="bg-[#0d2545]">Select age range</option>
                      <option value="Under 30" className="bg-[#0d2545]">Under 30</option>
                      <option value="30–40" className="bg-[#0d2545]">30 – 40</option>
                      <option value="40–50" className="bg-[#0d2545]">40 – 50</option>
                      <option value="50–55" className="bg-[#0d2545]">50 – 55</option>
                      <option value="55+" className="bg-[#0d2545]">55+</option>
                    </select>
                  </div>

                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px] mt-2">
                      {error}
                    </div>
                  )}

                  <div className="md:col-span-2 mt-3">
                    <button type="submit" disabled={loading} className="w-full bg-[#c9922a] text-white border-none py-[14px] rounded-[8px] text-[15px] font-medium hover:bg-[#f0c96a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#c9922a]/20">
                      {loading ? 'Submitting...' : 'Book My Free Planning Call'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default RetirementPage;
