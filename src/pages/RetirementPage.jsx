import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { submitLead } from '../lib/leads';
import FadeIn from '../components/animations/FadeIn';
import SliderRow from '../components/calculators/SliderRow';
import RetirementGrowthChart from '../components/calculators/RetirementGrowthChart';

const RETIREMENT_STEPS = [
  {
    id: 'step1',
    icon: '💬',
    num: '01',
    title: 'Understand Your Lifestyle',
    description: 'We start by understanding your current income, expenses, and the lifestyle you want to maintain in retirement.',
    detailedDescription: 'We talk about your dreams, post-retirement travel plans, daily spending habits, and regular obligations to map your financial baseline.'
  },
  {
    id: 'step2',
    icon: '🧮',
    num: '02',
    title: 'Calculate Your Corpus',
    description: 'We calculate exactly how much corpus you\'ll actually need — factoring in real inflation, not just rough estimates.',
    detailedDescription: 'We apply realistic inflation metrics to healthcare and food, calculating your target corpus to ensure you never outlive your accumulated savings.'
  },
  {
    id: 'step3',
    icon: '📊',
    num: '03',
    title: 'Build Your Investment Plan',
    description: 'A dedicated, personalized plan combining mutual funds, insurance, and other instruments to hit your number.',
    detailedDescription: 'We select a high-performance mix of debt and equity funds, along with annuity options, tailored to compound wealth while preserving principal.'
  },
  {
    id: 'step4',
    icon: '🔄',
    num: '04',
    title: 'Annual Reviews',
    description: 'Life changes. We review your plan annually and make adjustments so you stay perfectly on track.',
    detailedDescription: 'Whether you get a salary raise, change jobs, or experience major life events, we update your goals and portfolios yearly to stay aligned.'
  },
  {
    id: 'step5',
    icon: '🏥',
    num: '05',
    title: 'Plan for Healthcare',
    description: 'Healthcare costs are the biggest retirement wildcard. We build this in from day one so you\'re never caught off guard.',
    detailedDescription: 'We secure comprehensive super-top-up health covers and dedicated medical emergency pools so medical bills never eat into your corpus.'
  },
  {
    id: 'cta',
    icon: '🏖️',
    num: 'CTA',
    title: 'Ready to Start?',
    description: 'Get a free, no-obligation retirement corpus estimate tailored specifically to your situation.',
    detailedDescription: 'Let\'s build a secure, worry-free future. Click below to request a detailed retirement estimate with our specialists.',
    isCta: true
  }
];

const RetirementPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hovered, setHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('ret-contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919664977576?text=Hi!%20I%20would%20like%20to%20discuss%20my%20retirement%20planning%20with%20you.', '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !age) {
      setError('Please fill out all required fields');
      return;
    }
    setError('');
    setLoading(true);

    const res = await submitLead({
      name,
      phone,
      interest: `Retirement Planning - Current Age: ${age || 'Not Specified'}`,
      message: 'Lead from Retirement Page'
    });

    if (!res.success) {
      setError(res.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const labelStyles = "text-gold text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] text-textDark font-semibold mb-[2rem] leading-tight";
  const cardStyles = "premium-card-interactive";
  const inputStyles = "w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-gold focus:bg-white/10 placeholder-white/35 transition-colors";
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







  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>Retirement Planning — Shah Financial Services</title>
        <meta name="description" content="Build a realistic, inflation-adjusted retirement corpus plan. Start at 28 or 52 — it's never too early or too late." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-navy py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center gap-[6px] bg-gold/15 border border-gold/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-goldLight text-[11px] uppercase tracking-[0.12em]">Retirement Planning</span>
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
                className="bg-gold text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-goldLight transition-colors shadow-lg shadow-gold/20"
              >
                📅 Book a Free Retirement Planning Call
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
      <section className="bg-white py-[2.5rem] w-full border-b border-navy/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-6 md:gap-12">
            {[
              { number: '28', label: 'Ideal age to start' },
              { number: '52', label: 'Never too late to begin' },
              { number: '15%', label: 'Avg CAGR assumed' },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-4">
                <div className="font-serif text-[42px] text-navy font-semibold leading-none">{stat.number}</div>
                <div className="text-muted text-[14px] leading-snug max-w-[120px]">{stat.label}</div>
              </div>
            ))}
            <div className="md:ml-auto max-w-md">
              <p className="text-muted text-[15px] leading-[1.7] italic border-l-4 border-gold pl-4">
                "Whether you're 28 or 52 — it's not too early and it's not too late."
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Our Process Section */}
      <section className="bg-cream py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Our Process</div>
            <h2 className={titleStyles}>How We Build Your Retirement Plan</h2>

            <div className="mt-[3rem] w-full premium-feature-card group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-stretch">
                {/* Left Column (50%) */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    {/* Soft colored square box icon container */}
                    <div className="relative w-14 h-14 mb-6 group/icon">
                      <div className="absolute inset-0 bg-gold/10 rounded-xl transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:bg-gold/15"></div>
                      <div className="absolute inset-1 bg-white rounded-lg shadow-sm border border-gold/10 flex items-center justify-center text-2xl transition-all duration-300 group-hover/icon:rotate-6">
                        🏖️
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-[24px] md:text-[26px] font-bold text-textDark mb-3 group-hover:text-navy transition-colors duration-300">
                      Retirement Planning
                    </h3>

                    {/* Description */}
                    <p className="text-[15px] leading-relaxed text-muted mb-6">
                      Build a realistic, inflation-adjusted retirement corpus with dedicated investment plans and annual reviews so you can truly live well.
                    </p>

                    {/* 3 key benefit points with a gold checkmark */}
                    <ul className="space-y-3.5 mb-8">
                      {[
                        'Inflation-adjusted corpus target calculations',
                        'Diversified high-yield investment allocations',
                        'Annual retirement strategy reviews and rebalancing'
                      ].map((benefit, idx) => (
                        <li key={idx} className="flex items-start text-[14.5px] text-muted">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center mr-3 mt-[2px] transition-transform duration-300 group-hover:scale-110">
                            <span className="text-gold text-[10px] font-bold">✓</span>
                          </span>
                          <span className="leading-relaxed text-[#4e5566] group-hover:text-textDark transition-colors duration-300">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn more -> link in gold at the bottom */}
                  <div className="mt-auto pt-4">
                    <button
                      onClick={handleScrollToContact}
                      className="inline-flex items-center text-[14px] font-bold text-gold hover:text-goldLight group/link transition-colors duration-300"
                    >
                      <span className="relative py-1">
                        Learn more
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <svg className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right Column (50%) - Tilted 3D Preview Box */}
                <div className="relative w-full h-full min-h-[320px] md:min-h-full">
                  <div className="relative w-full h-full bg-[#f4f7fa] rounded-[16px] flex flex-col justify-between border border-slate-100 shadow-inner overflow-hidden group/right">
                    
                    {/* Top Area (Approx 80% height): Tilted 3D Preview container */}
                    <div 
                      className="relative flex-grow flex items-center justify-center p-8 pb-4" 
                      style={{ perspective: '1000px' }}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <div 
                        className="relative w-[90%] aspect-[16/10] bg-white rounded-xl border border-slate-100 overflow-hidden"
                        style={{ 
                          transform: hovered 
                            ? 'rotateX(4deg) rotateY(-6deg) rotateZ(1deg) scale(1.02)' 
                            : 'rotateX(8deg) rotateY(-12deg) rotateZ(2deg)',
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
                          boxShadow: hovered
                            ? '0 30px 60px rgba(13,37,69,0.12), 0 10px 20px rgba(0,0,0,0.04)'
                            : '0 20px 40px rgba(13,37,69,0.06), 0 5px 15px rgba(0,0,0,0.02)'
                        }}
                      >
                        <img 
                          src="/retirement_preview.png" 
                          alt="Retirement Planning"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-lg"></div>
                      </div>
                    </div>

                    {/* Bottom Bar: White background, service name label and green indicator dot */}
                    <div className="bg-white border-t border-slate-100/80 px-6 py-4 flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-[#5c687e] tracking-wide">
                        Retirement Planning
                      </span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Process Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[4rem] relative">
              {RETIREMENT_STEPS.map((step, index) => {
                const isHovered = hoveredIndex === index;
                const isAnyHovered = hoveredIndex !== null;
                
                // Calculate slide translations based on relative position in a 3-column layout
                let xTranslate = 0;
                let yTranslate = 0;
                
                if (isAnyHovered && !isHovered) {
                  const columns = 3;
                  const r = Math.floor(index / columns);
                  const c = index % columns;
                  const hr = Math.floor(hoveredIndex / columns);
                  const hc = hoveredIndex % columns;
                  
                  const dr = r - hr;
                  const dc = c - hc;
                  
                  // Translate outwards away from the hovered card
                  xTranslate = Math.sign(dc) * 60;
                  yTranslate = Math.sign(dr) * 60;
                }
                
                if (step.isCta) {
                  return (
                    <motion.div
                      key={step.id}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{
                        originX: 0.5,
                        originY: 0.5,
                      }}
                      animate={{
                        scale: isHovered ? 1.06 : isAnyHovered ? 0.92 : 1,
                        x: xTranslate,
                        y: yTranslate,
                        opacity: isHovered ? 1 : isAnyHovered ? 0.2 : 1,
                        zIndex: isHovered ? 50 : 1,
                        boxShadow: isHovered 
                          ? '0 20px 40px rgba(13, 37, 69, 0.12), 0 8px 16px rgba(201, 146, 42, 0.15)' 
                          : '0 4px 6px rgba(13, 37, 69, 0.02)',
                        borderColor: isHovered ? 'rgba(201, 146, 42, 0.4)' : 'rgba(201, 146, 42, 0.15)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 24,
                      }}
                      className="bg-navy rounded-[12px] p-[1.5rem] h-full flex flex-col justify-between relative overflow-hidden cursor-pointer"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gold rounded-full blur-[60px] opacity-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
                      <div className="relative z-10">
                        <div className="text-[32px] mb-3 select-none">🏖️</div>
                        <h3 className="font-serif text-[18px] text-white font-semibold mb-2">{step.title}</h3>
                        <p className="text-white/60 text-[14px] leading-[1.6]">{step.description}</p>
                      </div>

                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: isHovered ? 'auto' : 0, 
                          opacity: isHovered ? 1 : 0,
                          marginTop: isHovered ? 16 : 0
                        }}
                        transition={{ 
                          duration: 0.35, 
                          ease: [0.16, 1, 0.3, 1] 
                        }}
                        className="overflow-hidden relative z-10 w-full"
                      >
                        <p className="text-white/50 text-[13.5px] leading-[1.6] border-t border-white/10 pt-3 mb-4">
                          {step.detailedDescription}
                        </p>
                        <button onClick={handleScrollToContact}
                          className="bg-gold text-white py-[10px] px-[20px] rounded-[8px] text-[14px] font-medium hover:bg-goldLight transition-colors w-full relative z-10">
                          Get My Free Plan →
                        </button>
                      </motion.div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={step.id}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      originX: 0.5,
                      originY: 0.5,
                    }}
                    animate={{
                      scale: isHovered ? 1.06 : isAnyHovered ? 0.92 : 1,
                      x: xTranslate,
                      y: yTranslate,
                      opacity: isHovered ? 1 : isAnyHovered ? 0.2 : 1,
                      zIndex: isHovered ? 50 : 1,
                      boxShadow: isHovered 
                        ? '0 20px 40px rgba(13, 37, 69, 0.12), 0 8px 16px rgba(201, 146, 42, 0.15)' 
                        : '0 4px 6px rgba(13, 37, 69, 0.02)',
                      borderColor: isHovered ? 'rgba(201, 146, 42, 0.4)' : 'rgba(13, 37, 69, 0.12)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 24,
                    }}
                    className="bg-white border rounded-[12px] p-[1.5rem] h-full flex flex-col justify-between cursor-pointer transition-colors duration-300"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4 select-none">
                        <div className="text-[32px]">{step.icon}</div>
                        <div className="font-serif text-[32px] text-navy/15 font-bold leading-none">{step.num}</div>
                      </div>
                      <h3 className="font-serif text-[18px] text-navy font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted text-[14px] leading-[1.6]">{step.description}</p>
                    </div>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: isHovered ? 'auto' : 0, 
                        opacity: isHovered ? 1 : 0,
                        marginTop: isHovered ? 16 : 0
                      }}
                      transition={{ 
                        duration: 0.35, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted text-[13.5px] leading-[1.6] border-t border-navy/5 pt-3">
                        {step.detailedDescription}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </section>
 
      {/* ====== RETIREMENT CORPUS CALCULATOR ====== */}
      <section id="calculator" className="bg-cream py-[5rem] w-full">
        <FadeIn>
          <div className="max-w-5xl mx-auto px-4">
            <div className={labelStyles}>Retirement Planning</div>
            <h2 className={titleStyles}>Calculate your retirement corpus</h2>
            <p className="text-muted text-[15px] mb-8 -mt-4">How much do you need — and what SIP gets you there?</p>
 
            {/* Sliders Card */}
            <div className="bg-navy rounded-[16px] p-6 md:p-8 mb-4 space-y-5">
              <SliderRow label="Current age" value={currentAge} min={18} max={55} onChange={setCurrentAge} display={`${currentAge} yrs`} />
              <SliderRow label="Retirement age" value={retirementAge} min={Math.max(currentAge + 5, 40)} max={75} onChange={v => setRetirementAge(Math.max(currentAge + 5, v))} display={`${retirementAge} yrs`} />
              <SliderRow label="Life expectancy" value={lifeExpectancy} min={Math.max(retirementAge + 1, 65)} max={100} onChange={v => setLifeExpectancy(Math.max(retirementAge + 1, v))} display={`${lifeExpectancy} yrs`} />
              <SliderRow label="Monthly expenses today" value={monthlyExpenses} min={5000} max={500000} step={1000} onChange={setMonthlyExpenses} display={fmt(monthlyExpenses)} />
              <SliderRow label="Inflation rate" value={inflationRate} min={2} max={12} step={0.5} onChange={setInflationRate} display={`${inflationRate}%`} />
              <SliderRow label="Expected return on investment" value={roiRate} min={6} max={18} step={0.5} onChange={setRoiRate} display={`${roiRate}%`} />
              <SliderRow label="Current savings already invested" value={currentSavings} min={0} max={10000000} step={10000} onChange={setCurrentSavings} display={fmt(currentSavings)} />
            </div>
 
            {/* Results Panel */}
            <div className="bg-navy rounded-[16px] p-6 mb-4">
              <div className="flex flex-col md:flex-row justify-between gap-4 mb-4">
                <div>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">Corpus you need at retirement</p>
                  <p className="font-serif text-[40px] text-white font-bold leading-none">{fmt(calc.corpusNeeded)}</p>
                  <p className="text-white/40 text-[12px] mt-1">Monthly expenses at retirement: {fmt(calc.expAtRetirement)}</p>
                </div>
                <div className="md:text-right">
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">SIP needed per month</p>
                  <p className="font-serif text-[40px] text-goldLight font-bold leading-none">{fmt(calc.sipNeeded)}</p>
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
                  <div className="bg-gold h-full rounded-full transition-all duration-500" style={{ width: `${calc.coveragePercent}%` }} />
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
                <div key={s.label} className="bg-navy rounded-[12px] p-4">
                  <p className="text-white/40 text-[11px] mb-1">{s.label}</p>
                  <p className="font-serif text-[22px] text-white font-semibold">{s.value}</p>
                </div>
              ))}
            </div>
 
            {/* Delay Insight */}
            {calc.delaySip > 0 && calc.delayPct > 0 && (
              <div className="bg-gold/10 border border-gold/30 rounded-[10px] px-5 py-4 mb-6 text-[#7a5520] text-[13px] leading-[1.6]">
                Starting now at {currentAge}, you need <strong>{fmt(calc.sipNeeded)}/month</strong>. Waiting just 5 more years would require <strong>{fmt(calc.delaySip)}/month</strong> — <strong>{calc.delayPct}% more</strong> for the same goal.
              </div>
            )}
 
            {/* Chart */}
            <div className="bg-navy rounded-[16px] p-5 mb-6">
              <RetirementGrowthChart chartData={calc.chartData} corpusNeeded={calc.corpusNeeded} fmt={fmt} />
            </div>
 
            {/* CTA under calculator */}
            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={handleScrollToContact} className="bg-gold text-white px-[24px] py-[11px] rounded-[8px] font-medium hover:bg-goldLight transition-colors text-[14px]">
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
                <h3 className="font-serif text-[17px] text-navy font-semibold mb-2">Realistic Numbers</h3>
                <p className="text-muted text-[14px] leading-[1.6]">We factor in actual inflation rates and real healthcare cost escalations, not optimistic assumptions.</p>
              </div>
              <div className={cardStyles}>
                <div className="text-[32px] mb-3">📐</div>
                <h3 className="font-serif text-[17px] text-navy font-semibold mb-2">Goal-Based Investing</h3>
                <p className="text-muted text-[14px] leading-[1.6]">Every SIP, every fund, every rupee is mapped back to your retirement target. Nothing is vague.</p>
              </div>
              <div className={cardStyles}>
                <div className="text-[32px] mb-3">🔁</div>
                <h3 className="font-serif text-[17px] text-navy font-semibold mb-2">Ongoing Partnership</h3>
                <p className="text-muted text-[14px] leading-[1.6]">Annual reviews mean your plan evolves with you — promotions, lifestyle changes, and life events all get accounted for.</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Contact / Lead Form */}
      <section id="ret-contact" className="bg-navy py-[5rem] w-full border-t border-white/5">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">
                Book Your Free Retirement Planning Call
              </h2>
              <p className="text-goldLight text-[18px] font-serif italic">
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
                      <option value="" className="bg-navy">Select age range</option>
                      <option value="Under 30" className="bg-navy">Under 30</option>
                      <option value="30–40" className="bg-navy">30 – 40</option>
                      <option value="40–50" className="bg-navy">40 – 50</option>
                      <option value="50–55" className="bg-navy">50 – 55</option>
                      <option value="55+" className="bg-navy">55+</option>
                    </select>
                  </div>

                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px] mt-2">
                      {error}
                    </div>
                  )}

                  <div className="md:col-span-2 mt-3">
                    <button type="submit" disabled={loading} className="w-full bg-gold text-white border-none py-[14px] rounded-[8px] text-[15px] font-medium hover:bg-goldLight transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gold/20">
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
