import React, { useState, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AreaChart, Area, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from 'recharts';

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

const SIPCalculator = () => {
  const [activeGoalId, setActiveGoalId] = useState('custom');
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
    const investedAmt = sip * n;
    const corpusAmt = sip * ((Math.pow(1 + r, n) - 1) / r) * (1 + r);
    const gainAmt = corpusAmt - investedAmt;
    const inflationAdjusted = corpusAmt / Math.pow(1 + (inflation / 100), years);
    
    // Generate chart data
    const data = [];
    for (let y = 0; y <= years; y++) {
      const months = y * 12;
      const inv = sip * months;
      const corp = months === 0 ? 0 : sip * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
      data.push({
        year: `Yr ${y}`,
        invested: inv,
        total: corp
      });
    }

    return { corpus: corpusAmt, invested: investedAmt, gain: gainAmt, chartData: data, inflationAdjustedCorpus: inflationAdjusted };
  }, [sip, rate, years, inflation]);

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
      <div className="max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="text-gold text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]">
          Our Calculator
        </div>
        <h2 className="font-serif text-[28px] font-semibold mb-[0.75rem] text-textDark leading-tight">
          See What Your SIP Can Grow To.
        </h2>
        <p className="text-muted text-[15px] leading-[1.6] font-light mb-[2rem]">
          A simple estimate to get you thinking about your financial future.
        </p>

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
            )
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

        {/* Main Calculator Card */}
        <div className="bg-[#333333] rounded-[12px] p-[1.5rem] sm:p-[2rem] shadow-xl">
          
          <div className="flex flex-col gap-[2rem]">
            <SliderRow label="Monthly SIP" value={sip} min={1000} max={100000} step={1000} onChange={setSip} display={fmt(sip)} />
            <SliderRow label="Expected Rate" value={rate} min={12} max={20} step={0.5} onChange={setRate} display={`${rate}%`} />
            <SliderRow label="Time Period" value={years} min={1} max={30} step={1} onChange={setYears} display={`${years} yrs`} />
            <SliderRow label="Assumed Inflation" value={inflation} min={4} max={12} step={0.5} onChange={setInflation} display={`${inflation}%`} />
          </div>

          {/* Result Box */}
          <div className="bg-[#1E293B] rounded-[10px] p-[1.5rem] mt-[2.5rem] flex flex-col md:flex-row justify-between items-start md:items-center gap-[1.5rem] md:gap-0 border border-blue-900/30">
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
            
            <div className="w-full md:w-[300px] flex flex-col items-end gap-4">
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
              <button 
                onClick={handleScrollToContact}
                className="bg-transparent border border-white/20 text-white text-[13px] px-[20px] py-[10px] rounded-[6px] font-medium hover:bg-white/5 transition-colors whitespace-nowrap w-full sm:w-auto text-center flex items-center justify-center gap-2"
              >
                Start This SIP ↗
              </button>
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
        <div className="mt-[4rem] h-[250px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#D4AF37" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#D4AF37" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorInvested" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="year" stroke="#5c6478" fontSize={12} tickLine={false} axisLine={false} minTickGap={30} />
              <YAxis 
                stroke="#5c6478" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(val) => fmt(val)} 
                width={70}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend 
                verticalAlign="top" 
                height={36} 
                iconType="circle"
                formatter={(value) => <span className="text-textDark text-[13px] ml-2 font-medium">{value}</span>} 
              />
              <Area 
                type="monotone" 
                dataKey="total"
                name="Estimated Corpus"
                stroke="#D4AF37" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorTotal)" 
              />
              <Area 
                type="monotone" 
                dataKey="invested"
                name="Total Invested"
                stroke="#64748B" 
                strokeWidth={2}
                strokeDasharray="4 4"
                fillOpacity={1} 
                fill="url(#colorInvested)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>



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
