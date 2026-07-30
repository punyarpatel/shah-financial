import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const ModernBentoCalculator = () => {
  const [calculatorType, setCalculatorType] = useState('sip'); // 'sip' | 'lumpsum' | 'stepup'
  const [monthlyInvest, setMonthlyInvest] = useState(15000);
  const [annualIncrement, setAnnualIncrement] = useState(10); // % for Step-up
  const [expectedRate, setExpectedRate] = useState(12);
  const [timePeriod, setTimePeriod] = useState(15);

  // Calculation Logic
  const calculationResults = useMemo(() => {
    let totalInvested = 0;
    let chartData = [];
    const monthlyRate = expectedRate / 12 / 100;
    const months = timePeriod * 12;

    if (calculatorType === 'sip') {
      totalInvested = monthlyInvest * months;
      let currentVal = 0;
      for (let m = 1; m <= months; m++) {
        currentVal = (currentVal + monthlyInvest) * (1 + monthlyRate);
        if (m % 12 === 0) {
          const yr = m / 12;
          const investedSoFar = monthlyInvest * m;
          chartData.push({
            year: `Yr ${yr}`,
            Invested: Math.round(investedSoFar),
            Wealth: Math.round(currentVal),
            Returns: Math.round(currentVal - investedSoFar)
          });
        }
      }
    } else if (calculatorType === 'lumpsum') {
      totalInvested = monthlyInvest * 10; // treat input as lump sum amount
      const futureVal = totalInvested * Math.pow(1 + expectedRate / 100, timePeriod);
      for (let yr = 1; yr <= timePeriod; yr++) {
        const val = totalInvested * Math.pow(1 + expectedRate / 100, yr);
        chartData.push({
          year: `Yr ${yr}`,
          Invested: totalInvested,
          Wealth: Math.round(val),
          Returns: Math.round(val - totalInvested)
        });
      }
    } else if (calculatorType === 'stepup') {
      let currentMonthly = monthlyInvest;
      let totalAccumulated = 0;
      let totalInvestedAcc = 0;

      for (let yr = 1; yr <= timePeriod; yr++) {
        for (let m = 1; m <= 12; m++) {
          totalAccumulated = (totalAccumulated + currentMonthly) * (1 + monthlyRate);
          totalInvestedAcc += currentMonthly;
        }
        chartData.push({
          year: `Yr ${yr}`,
          Invested: Math.round(totalInvestedAcc),
          Wealth: Math.round(totalAccumulated),
          Returns: Math.round(totalAccumulated - totalInvestedAcc)
        });
        currentMonthly = currentMonthly * (1 + annualIncrement / 100);
      }
      totalInvested = totalInvestedAcc;
    }

    const finalWealth = chartData.length > 0 ? chartData[chartData.length - 1].Wealth : 0;
    const estReturns = Math.max(0, finalWealth - totalInvested);

    return { totalInvested, finalWealth, estReturns, chartData };
  }, [calculatorType, monthlyInvest, annualIncrement, expectedRate, timePeriod]);

  const formatCurrency = (val) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(val);
  };

  return (
    <div className="w-full bg-[#071324] text-white py-16 px-4 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-goldLight bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
            FRAMER BENTO DATA VISUALIZATION
          </span>
          <h2 className="font-serif text-[32px] md:text-[46px] font-bold text-white leading-tight mt-3">
            Interactive Financial Growth Engine
          </h2>
          <p className="text-white/70 text-[15px] max-w-xl mx-auto mt-2">
            Calculate your future wealth corpus with interactive Bento cards & real-time growth curves.
          </p>

          {/* Calculator Mode Switcher */}
          <div className="inline-flex items-center p-1 bg-white/10 border border-white/15 rounded-full mt-6 gap-1 shadow-md">
            <button
              onClick={() => setCalculatorType('sip')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                calculatorType === 'sip' ? 'bg-gold text-white shadow-sm' : 'text-white/60 hover:text-white'
              }`}
            >
              SIP Wealth
            </button>
            <button
              onClick={() => setCalculatorType('stepup')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                calculatorType === 'stepup' ? 'bg-gold text-white shadow-sm' : 'text-white/60 hover:text-white'
              }`}
            >
              Step-Up SIP (+10% Yr)
            </button>
            <button
              onClick={() => setCalculatorType('lumpsum')}
              className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                calculatorType === 'lumpsum' ? 'bg-gold text-white shadow-sm' : 'text-white/60 hover:text-white'
              }`}
            >
              Lump Sum Growth
            </button>
          </div>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Bento Card 1: Interactive Sliders Controls (5 cols) */}
          <div className="lg:col-span-5 bg-navy/90 border border-white/15 rounded-[32px] p-7 md:p-8 flex flex-col justify-between shadow-2xl space-y-6">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <h3 className="font-serif font-bold text-xl text-white">Investment Parameters</h3>
              <span className="text-[10px] font-mono text-goldLight uppercase tracking-widest bg-gold/15 px-2.5 py-0.5 rounded-full border border-gold/30">
                LIVE INPUTS
              </span>
            </div>

            {/* Slider 1: Monthly Investment */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold text-white/90">
                <span>{calculatorType === 'lumpsum' ? 'One-time Investment' : 'Monthly SIP Amount'}</span>
                <span className="text-gold font-bold text-base font-mono">{formatCurrency(calculatorType === 'lumpsum' ? monthlyInvest * 10 : monthlyInvest)}</span>
              </div>
              <input
                type="range"
                min={1000}
                max={200000}
                step={1000}
                value={monthlyInvest}
                onChange={(e) => setMonthlyInvest(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono">
                <span>₹1,000</span>
                <span>₹2,00,000</span>
              </div>
            </div>

            {/* Slider 2: Annual Step-Up % (If Step-Up selected) */}
            {calculatorType === 'stepup' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="space-y-2">
                <div className="flex justify-between items-center text-sm font-semibold text-white/90">
                  <span>Annual Step-Up (%)</span>
                  <span className="text-gold font-bold text-base font-mono">{annualIncrement}%</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={25}
                  step={1}
                  value={annualIncrement}
                  onChange={(e) => setAnnualIncrement(Number(e.target.value))}
                  className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
                />
              </motion.div>
            )}

            {/* Slider 3: Expected Return Rate */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold text-white/90">
                <span>Expected Return Rate (p.a)</span>
                <span className="text-gold font-bold text-base font-mono">{expectedRate}%</span>
              </div>
              <input
                type="range"
                min={6}
                max={22}
                step={0.5}
                value={expectedRate}
                onChange={(e) => setExpectedRate(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono">
                <span>6% p.a</span>
                <span>22% p.a</span>
              </div>
            </div>

            {/* Slider 4: Time Horizon */}
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm font-semibold text-white/90">
                <span>Time Horizon (Years)</span>
                <span className="text-gold font-bold text-base font-mono">{timePeriod} Yrs</span>
              </div>
              <input
                type="range"
                min={3}
                max={35}
                step={1}
                value={timePeriod}
                onChange={(e) => setTimePeriod(Number(e.target.value))}
                className="w-full h-2 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold"
              />
              <div className="flex justify-between text-[10px] text-white/40 font-mono">
                <span>3 Years</span>
                <span>35 Years</span>
              </div>
            </div>
          </div>

          {/* Bento Card 2: Interactive Chart & Real-time Totals (7 cols) */}
          <div className="lg:col-span-7 bg-navy/90 border border-white/15 rounded-[32px] p-7 md:p-8 flex flex-col justify-between shadow-2xl">
            
            {/* Real-time Summary Cards */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-white/50 block mb-1">
                  TOTAL INVESTED
                </span>
                <span className="text-[15px] md:text-[18px] font-bold text-white font-mono">
                  {formatCurrency(calculationResults.totalInvested)}
                </span>
              </div>

              <div className="bg-white/5 border border-white/10 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
                  EST. RETURNS
                </span>
                <span className="text-[15px] md:text-[18px] font-bold text-emerald-400 font-mono">
                  {formatCurrency(calculationResults.estReturns)}
                </span>
              </div>

              <div className="bg-gold/15 border border-gold/40 rounded-2xl p-4 text-center">
                <span className="text-[10px] font-mono uppercase tracking-wider text-goldLight block mb-1">
                  FUTURE CORPUS
                </span>
                <span className="text-[16px] md:text-[20px] font-extrabold text-gold font-mono">
                  {formatCurrency(calculationResults.finalWealth)}
                </span>
              </div>
            </div>

            {/* Realtime Compounding Area Chart */}
            <div className="w-full h-[250px] md:h-[280px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={calculationResults.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="wealthGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#c9922a" stopOpacity={0.8}/>
                      <stop offset="95%" stopColor="#c9922a" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="investedGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.5}/>
                      <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} tickFormatter={(v) => `₹${(v/100000).toFixed(0)}L`} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0c192c', borderColor: 'rgba(201,146,42,0.4)', borderRadius: '12px' }}
                    formatter={(val) => formatCurrency(val)}
                  />
                  <Area type="monotone" dataKey="Wealth" stroke="#c9922a" strokeWidth={3} fillOpacity={1} fill="url(#wealthGrad)" />
                  <Area type="monotone" dataKey="Invested" stroke="#3b82f6" strokeWidth={2} fillOpacity={1} fill="url(#investedGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernBentoCalculator;
