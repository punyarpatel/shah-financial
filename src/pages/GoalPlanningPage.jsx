import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import api from '../lib/api';
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
      <span className="text-white/70 text-[13px] w-[210px] flex-shrink-0">{label}</span>
      <input type="range" min={min} max={max} step={step} value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 h-[4px] appearance-none bg-white/10 rounded-full outline-none cursor-pointer"
        style={{ accentColor: '#c9922a' }} />
      <input
        type="number"
        min={min} max={max} step={step}
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
        className="text-[#f0c96a] text-[13px] font-semibold w-[80px] text-right flex-shrink-0 bg-transparent border-b border-transparent hover:border-[#f0c96a]/40 focus:border-[#f0c96a] outline-none transition-colors cursor-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
};

const GoalPlanningPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // Goal calculator state
  const [goalAmount, setGoalAmount] = useState(2500000);
  const [goalYears, setGoalYears] = useState(10);
  const [calcRoi, setCalcRoi] = useState(12);
  const [inflation, setInflation] = useState(6);

  const handleScrollToContact = () => {
    document.getElementById('goal-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919800000000?text=Hi!%20I%20would%20like%20to%20plan%20my%20financial%20goals%20with%20you.%20Can%20we%20book%20a%20goal%20planning%20session%3F', '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) { setError('Please enter your name and phone number'); return; }
    setError(''); setLoading(true);
    try {
      await api.post('/api/leads', { name, phone, interest: `Goal-Based Planning - ${primaryGoal || 'Not Specified'}`, message: 'Lead from Goal Planning Page' });
      setSuccess(true);
    } catch { setError('Something went wrong. Please try again'); }
    finally { setLoading(false); }
  };

  const labelStyles = "text-[#c9922a] text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] text-[#1a1a2e] font-semibold mb-[2rem] leading-tight";
  const cardStyles = "bg-white border border-[#0d2545]/12 rounded-[12px] p-[1.5rem] h-full transition-transform hover:-translate-y-1";
  const inputStyles = "w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-[#c9922a] focus:bg-white/10 placeholder-white/35 transition-colors";
  const formLabelStyles = "block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]";

  // Calculator logic — inflation-adjusted future goal, then SIP needed
  const calc = useMemo(() => {
    const inflatedGoal = goalAmount * Math.pow(1 + inflation / 100, goalYears);
    const r = calcRoi / 100 / 12;
    const n = goalYears * 12;
    let sipNeeded = 0;
    if (r > 0) {
      sipNeeded = inflatedGoal * r / ((Math.pow(1 + r, n) - 1) * (1 + r));
    } else {
      sipNeeded = inflatedGoal / n;
    }
    const totalInvested = sipNeeded * n;
    const gains = inflatedGoal - totalInvested;
    // Chart data
    const chartData = [];
    for (let y = 0; y <= goalYears; y++) {
      const mn = y * 12;
      const fv = r > 0 ? sipNeeded * ((Math.pow(1 + r, mn) - 1) / r) * (1 + r) : sipNeeded * mn;
      chartData.push({ year: y, corpus: fv, target: inflatedGoal * (y / goalYears) });
    }
    return { inflatedGoal, sipNeeded, totalInvested, gains, chartData };
  }, [goalAmount, goalYears, calcRoi, inflation]);

  const fmt = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };



  // SVG Chart
  const GoalChart = () => {
    const W = 700, H = 180, PAD = { t: 10, r: 10, b: 35, l: 55 };
    const data = calc.chartData;
    if (!data || data.length < 2) return null;
    const maxVal = calc.inflatedGoal;
    const toX = (i) => PAD.l + (i / Math.max(1, data.length - 1)) * (W - PAD.l - PAD.r);
    const toY = (val) => PAD.t + (1 - Math.min(1, val / maxVal)) * (H - PAD.t - PAD.b);
    const corpusPts = data.map((d, i) => `${toX(i)},${toY(d.corpus)}`).join(' ');
    const targetPts = data.map((d, i) => `${toX(i)},${toY(d.target)}`).join(' ');
    const areaPath = `M${toX(0)},${toY(0)} ` + data.map((d, i) => `L${toX(i)},${toY(d.corpus)}`).join(' ') + ` L${toX(data.length - 1)},${toY(0)} Z`;
    const yTicks = [0, 0.25, 0.5, 0.75, 1].map(f => ({ val: maxVal * f, y: toY(maxVal * f) }));
    const xTicks = data.filter((_, i) => i % Math.max(1, Math.floor(data.length / 6)) === 0 || i === data.length - 1);
    return (
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full" preserveAspectRatio="xMidYMid meet">
        <defs>
          <linearGradient id="goalGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#c9922a" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#c9922a" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {yTicks.map((t, i) => (
          <g key={i}>
            <line x1={PAD.l} y1={t.y} x2={W - PAD.r} y2={t.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />
            <text x={PAD.l - 6} y={t.y + 4} fill="rgba(255,255,255,0.35)" fontSize="10" textAnchor="end">{fmt(t.val)}</text>
          </g>
        ))}
        <polyline points={targetPts} fill="none" stroke="#4ade80" strokeWidth="1.5" strokeDasharray="5 3" />
        <path d={areaPath} fill="url(#goalGrad)" />
        <polyline points={corpusPts} fill="none" stroke="#c9922a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        {xTicks.map((d, i) => (
          <text key={i} x={toX(data.indexOf(d))} y={H - PAD.b + 16} fill="rgba(255,255,255,0.4)" fontSize="10" textAnchor="middle">Yr {d.year}</text>
        ))}
        <rect x={PAD.l} y={H - 10} width="12" height="3" rx="1" fill="#c9922a" />
        <text x={PAD.l + 16} y={H - 6} fill="rgba(255,255,255,0.45)" fontSize="9">Corpus growth</text>
        <line x1={PAD.l + 115} y1={H - 8} x2={PAD.l + 127} y2={H - 8} stroke="#4ade80" strokeWidth="1.5" strokeDasharray="5 3" />
        <text x={PAD.l + 131} y={H - 6} fill="rgba(255,255,255,0.45)" fontSize="9">Goal target (inflation-adjusted)</text>
      </svg>
    );
  };

  const steps = [
    { num: '01', icon: '🗣️', title: 'List Every Goal', desc: 'We sit with you and list every financial goal — big and small, near and far.' },
    { num: '02', icon: '🎯', title: 'Put a Number On It', desc: 'We put a realistic rupee figure and timeline on each one, adjusted for inflation.' },
    { num: '03', icon: '🪣', title: 'Separate Buckets', desc: 'We create dedicated investment buckets for each goal — nothing gets mixed up.' },
    { num: '04', icon: '🔄', title: 'Track & Correct', desc: 'We track progress every year and course-correct if needed due to life changes.' },
    { num: '05', icon: '✅', title: 'Goal Achieved', desc: 'When the goal arrives — the money is ready. No scrambling, no shortfall.' },
  ];

  const commonGoals = [
    { icon: '🎓', title: "Child's Higher Education", detail: 'Plan for college fees 10–15 years out, inflation-adjusted' },
    { icon: '💍', title: "Child's Marriage", detail: 'Build a dedicated corpus well in advance' },
    { icon: '🏠', title: 'Down Payment for a Home', detail: 'Hit your target without disturbing other savings' },
    { icon: '🚀', title: 'Business Startup Capital', detail: 'Accumulate capital systematically over 3–7 years' },
    { icon: '✈️', title: 'Dream Vacation or Sabbatical', detail: 'Short-term goal with liquid instruments' },
    { icon: '🏖️', title: 'Early Retirement', detail: 'Retire at 45 or 50 with a properly sized corpus' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>Goal-Based Wealth Planning — Shah Financial Services</title>
        <meta name="description" content="Plan for every financial goal — education, home, business, retirement. Dedicated investment buckets, tracked annually." />
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="bg-[#0d2545] py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center gap-[6px] bg-[#c9922a]/15 border border-[#c9922a]/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-[#f0c96a] text-[11px] uppercase tracking-[0.12em]">Goal-Based Wealth Planning</span>
            </div>
            <h1 className="font-serif text-[36px] md:text-[48px] text-white font-semibold leading-[1.2] mb-[1.25rem] max-w-4xl">
              Every Dream Has a Price Tag. Let's Make Sure You Can Afford It.
            </h1>
            <p className="text-white/65 text-[16px] leading-[1.6] mb-[2rem] max-w-2xl">
              Whether it's your child's education in 10 years, a home in 7 years, or your own business in 5 — every goal needs a dedicated plan. Ad-hoc investing rarely gets you there.
            </p>
            <div className="flex flex-wrap gap-4 mt-[2rem]">
              <button onClick={handleScrollToContact}
                className="bg-[#c9922a] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#f0c96a] transition-colors shadow-lg shadow-[#c9922a]/20">
                📅 Book a Goal Planning Session
              </button>
              <button onClick={handleWhatsApp}
                className="bg-[#25D366] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#22c35e] transition-colors flex items-center gap-2 shadow-lg shadow-[#25D366]/20">
                <span className="text-[18px]">💬</span> WhatsApp Us
              </button>
              <button onClick={() => document.getElementById('goal-calculator')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-white/10 text-white border border-white/20 px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                🗺️ Map My Goals
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Key Message Banner */}
      <section className="bg-white py-[2.5rem] w-full border-b border-[#0d2545]/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-[#5c6478] text-[15px] leading-[1.7] italic border-l-4 border-[#c9922a] pl-5 max-w-3xl">
              "Your goals are personal. Your plan should be too." — Ad-hoc investing rarely gets you where you want to go. A dedicated bucket for each goal does.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* How It Works — 5 Steps */}
      <section className="bg-[#faf8f4] py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>How It Works</div>
            <h2 className={titleStyles}>Goal-Based Planning in 5 Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[2rem]">
              {steps.map((step) => (
                <div key={step.num} className={cardStyles}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-[32px]">{step.icon}</div>
                    <div className="font-serif text-[32px] text-[#0d2545]/15 font-bold leading-none">{step.num}</div>
                  </div>
                  <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">{step.title}</h3>
                  <p className="text-[#5c6478] text-[14px] leading-[1.6]">{step.desc}</p>
                </div>
              ))}
              {/* CTA card */}
              <div className="bg-[#0d2545] rounded-[12px] p-[1.5rem] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9922a] rounded-full blur-[60px] opacity-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                  <div className="text-[32px] mb-3">🗺️</div>
                  <h3 className="font-serif text-[18px] text-white font-semibold mb-2">Ready to Map Your Goals?</h3>
                  <p className="text-white/60 text-[14px] leading-[1.6] mb-6">Book a free session and we'll build your personalised goal map together.</p>
                </div>
                <button onClick={handleScrollToContact}
                  className="bg-[#c9922a] text-white py-[10px] px-[20px] rounded-[8px] text-[14px] font-medium hover:bg-[#f0c96a] transition-colors w-full relative z-10">
                  Book Free Session →
                </button>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Common Goals Grid */}
      <section className="bg-white py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Goals We Plan For</div>
            <h2 className={titleStyles}>What We Commonly Help You Achieve</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {commonGoals.map((g) => (
                <div key={g.title} className="flex items-start gap-4 p-5 bg-[#faf8f4] border border-[#0d2545]/8 rounded-[14px] hover:border-[#c9922a]/40 transition-colors group">
                  <div className="text-[36px] flex-shrink-0 group-hover:scale-110 transition-transform duration-200">{g.icon}</div>
                  <div>
                    <h3 className="font-serif text-[16px] text-[#0d2545] font-semibold mb-1">{g.title}</h3>
                    <p className="text-[#5c6478] text-[13px] leading-[1.5]">{g.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Goal SIP Calculator */}
      <section id="goal-calculator" className="bg-[#faf8f4] py-[5rem] w-full">
        <FadeIn>
          <div className="max-w-5xl mx-auto px-4">
            <div className={labelStyles}>Goal Calculator</div>
            <h2 className={titleStyles}>How much SIP do you need for your goal?</h2>
            <p className="text-[#5c6478] text-[15px] mb-8 -mt-4">Enter your goal amount and timeline — we'll tell you exactly what SIP gets you there.</p>

            {/* Sliders */}
            <div className="bg-[#1e293b] rounded-[16px] p-6 md:p-8 mb-4 space-y-5">
              <SliderRow label="Goal amount (today's value)" value={goalAmount} min={100000} max={50000000} step={100000} onChange={setGoalAmount} display={fmt(goalAmount)} />
              <SliderRow label="Time to achieve goal" value={goalYears} min={1} max={30} onChange={setGoalYears} display={`${goalYears} yrs`} />
              <SliderRow label="Expected return (CAGR)" value={calcRoi} min={6} max={18} step={0.5} onChange={setCalcRoi} display={`${calcRoi}%`} />
              <SliderRow label="Inflation rate" value={inflation} min={2} max={10} step={0.5} onChange={setInflation} display={`${inflation}%`} />
            </div>

            {/* Results */}
            <div className="bg-[#0d2545] rounded-[16px] p-6 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">Inflation-adjusted goal</p>
                  <p className="font-serif text-[38px] text-white font-bold leading-none">{fmt(calc.inflatedGoal)}</p>
                  <p className="text-white/40 text-[12px] mt-1">Today's value: {fmt(goalAmount)}</p>
                </div>
                <div>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">Monthly SIP needed</p>
                  <p className="font-serif text-[38px] text-[#f0c96a] font-bold leading-none">{fmt(calc.sipNeeded)}</p>
                  <p className="text-white/40 text-[12px] mt-1">For {goalYears} years</p>
                </div>
                <div>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">Market gains for you</p>
                  <p className="font-serif text-[38px] text-[#4ade80] font-bold leading-none">{fmt(calc.gains)}</p>
                  <p className="text-white/40 text-[12px] mt-1">You invest: {fmt(calc.totalInvested)}</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-[#1e293b] rounded-[16px] p-5 mb-5">
              <GoalChart />
            </div>

            {/* Insight */}
            <div className="bg-[#c9922a]/10 border border-[#c9922a]/30 rounded-[10px] px-5 py-4 mb-6 text-[#7a5520] text-[13px] leading-[1.6]">
              To reach <strong>{fmt(calc.inflatedGoal)}</strong> in <strong>{goalYears} years</strong>, you need just <strong>{fmt(calc.sipNeeded)}/month</strong>. The market does the rest — contributing <strong>{fmt(calc.gains)}</strong> on top of your investment.
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={handleScrollToContact} className="bg-[#c9922a] text-white px-[24px] py-[11px] rounded-[8px] font-medium hover:bg-[#f0c96a] transition-colors text-[14px]">
                📅 Book a Goal Planning Session
              </button>
              <button onClick={handleWhatsApp} className="bg-[#25D366] text-white px-[24px] py-[11px] rounded-[8px] font-medium hover:bg-[#22c35e] transition-colors text-[14px] flex items-center gap-2">
                💬 WhatsApp Us
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Contact / Lead Form */}
      <section id="goal-contact" className="bg-[#0d2545] py-[5rem] w-full border-t border-white/5">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">Book Your Free Goal Planning Session</h2>
              <p className="text-[#f0c96a] text-[19px] font-serif italic">"A goal without a plan is just a wish."</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-[16px] p-[2rem] md:p-[2.5rem] shadow-2xl backdrop-blur-sm">
              {success ? (
                <div className="bg-green-500/15 border border-green-500/30 rounded-[10px] p-[2rem] text-center text-[#4ade80]">
                  <div className="text-[32px] mb-2">✅</div>
                  <h3 className="font-serif text-[24px] mb-2">Request Received</h3>
                  <p>Thank you! Our advisor will reach out to book your goal planning session.</p>
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
                    <label className={formLabelStyles}>Primary Goal</label>
                    <select value={primaryGoal} onChange={e => setPrimaryGoal(e.target.value)} className={`${inputStyles} appearance-none cursor-pointer`}>
                      <option value="" className="bg-[#0d2545]">Select your goal</option>
                      <option value="Child's Education" className="bg-[#0d2545]">Child's Education</option>
                      <option value="Child's Marriage" className="bg-[#0d2545]">Child's Marriage</option>
                      <option value="Home Down Payment" className="bg-[#0d2545]">Home Down Payment</option>
                      <option value="Business Capital" className="bg-[#0d2545]">Business Startup Capital</option>
                      <option value="Dream Vacation" className="bg-[#0d2545]">Dream Vacation / Sabbatical</option>
                      <option value="Early Retirement" className="bg-[#0d2545]">Early Retirement</option>
                      <option value="Multiple Goals" className="bg-[#0d2545]">Multiple Goals</option>
                    </select>
                  </div>
                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px] mt-2">{error}</div>
                  )}
                  <div className="md:col-span-2 mt-3">
                    <button type="submit" disabled={loading} className="w-full bg-[#c9922a] text-white border-none py-[14px] rounded-[8px] text-[15px] font-medium hover:bg-[#f0c96a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#c9922a]/20">
                      {loading ? 'Submitting...' : 'Book My Goal Planning Session'}
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

export default GoalPlanningPage;
