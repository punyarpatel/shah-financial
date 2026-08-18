import React, { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

// Presets for Monthly SIP
const SIP_PRESETS = [2000, 5000, 10000, 25000, 50000];

const SipCompoundingVisualizer = () => {
  const [monthlySip, setMonthlySip] = useState(10000);
  const [returnRate, setReturnRate] = useState(12);
  const [years, setYears] = useState(25);
  
  // Animation state
  const [isPlaying, setIsPlaying] = useState(false);
  const [animYear, setAnimYear] = useState(1);
  const playIntervalRef = useRef(null);

  // Restart or update year when playing
  useEffect(() => {
    if (isPlaying) {
      playIntervalRef.current = setInterval(() => {
        setAnimYear((prev) => {
          if (prev >= years) {
            setIsPlaying(false);
            clearInterval(playIntervalRef.current);
            return years;
          }
          return prev + 1;
        });
      }, 250); // Tick every 250ms
    } else {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    }

    return () => {
      if (playIntervalRef.current) {
        clearInterval(playIntervalRef.current);
      }
    };
  }, [isPlaying, years]);

  // Keep animYear in bounds when years slider changes manually
  useEffect(() => {
    if (!isPlaying) {
      setAnimYear(years);
    } else if (animYear > years) {
      setAnimYear(years);
    }
  }, [years, isPlaying, animYear]);

  // Math Calculations
  const calculations = useMemo(() => {
    const r = returnRate / 100 / 12;
    
    // 1. Current Year Values (for animating states)
    const currentMonths = animYear * 12;
    const investedCurrent = monthlySip * currentMonths;
    let corpusCurrent = 0;
    if (currentMonths > 0) {
      corpusCurrent = monthlySip * ((Math.pow(1 + r, currentMonths) - 1) / r) * (1 + r);
    }
    const gainCurrent = Math.max(0, corpusCurrent - investedCurrent);
    
    // 2. Final Selected Year Values (for final scale reference)
    const finalMonths = years * 12;
    const investedFinal = monthlySip * finalMonths;
    let corpusFinal = 0;
    if (finalMonths > 0) {
      corpusFinal = monthlySip * ((Math.pow(1 + r, finalMonths) - 1) / r) * (1 + r);
    }
    
    const gainRatio = corpusCurrent > 0 ? gainCurrent / corpusCurrent : 0;
    const wealthMultiplier = investedCurrent > 0 ? (corpusCurrent / investedCurrent).toFixed(1) : '1.0';

    return {
      investedCurrent,
      corpusCurrent,
      gainCurrent,
      corpusFinal,
      gainRatio,
      wealthMultiplier,
    };
  }, [monthlySip, returnRate, animYear, years]);

  const handlePlayToggle = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (animYear >= years) {
        setAnimYear(1);
      }
      setIsPlaying(true);
    }
  };

  const formatCurrency = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(2)} L`;
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };

  // Stage commentary based on current year
  const stageCommentary = useMemo(() => {
    const y = animYear;
    if (y <= 5) {
      return {
        title: "Phase 1: The Seed Phase (Years 1–5)",
        text: "Your compounding journey begins. At this early stage, your own contributions make up over 80% of your total balance. Compounding is active, but working quietly beneath the surface. Stay patient and consistent!",
        color: "border-sky-500/20 text-sky-300 bg-sky-950/25"
      };
    } else if (y <= 12) {
      return {
        title: "Phase 2: Gathering Momentum (Years 6–12)",
        text: "The wealth snowball is starting to roll! The interest earned on your savings is beginning to compound significantly. Your earnings are starting to make their own earnings.",
        color: "border-emerald-500/20 text-emerald-300 bg-emerald-950/25"
      };
    } else if (y <= 20) {
      return {
        title: "Phase 3: The Inflection Point (Years 13–20)",
        text: "The magic becomes visible! The wealth generated purely from compound interest now exceeds your total invested principal. Your money is doing more work than your pocket.",
        color: "border-amber-500/20 text-amber-300 bg-amber-950/25"
      };
    } else {
      return {
        title: "Phase 4: Exponential Rocket (Years 21–30)",
        text: "Pure Compounding Magic! Your returns are exploding. Over 75% of your final wealth is generated purely by interest-on-interest, not your contributions. A massive wealth generator!",
        color: "border-gold/30 text-gold bg-gold/5"
      };
    }
  }, [animYear]);

  // Wave y-axis level (from 0–100, where 100 is empty, 0 is full)
  // We want to fill it with gold up to the gainRatio percentage
  const goldWaveLevel = 100 - (calculations.gainRatio * 100);

  // Snowball scale (grows as corpus grows relative to final corpus)
  // Scale dynamically from 0.5–1.0
  const finalCorpusRef = calculations.corpusFinal || 1;
  const currentRatio = calculations.corpusCurrent / finalCorpusRef;
  const snowballScale = 0.55 + (currentRatio * 0.45);

  return (
    <div className="bg-[#0d2545] text-white rounded-[16px] p-6 md:p-10 shadow-2xl border border-white/10 relative overflow-hidden select-none font-sans">
      
      {/* CSS Styles for customized wave liquid & particles */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes wave-flow-1 {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100px); }
        }
        @keyframes wave-flow-2 {
          0% { transform: translateX(-20px); }
          100% { transform: translateX(80px); }
        }
        @keyframes bubble-up-particle {
          0% { transform: translateY(100px) translateX(0) scale(0.2); opacity: 0; }
          10% { opacity: 0.7; }
          90% { opacity: 0.7; }
          100% { transform: translateY(15px) translateX(var(--drift)) scale(1.1); opacity: 0; }
        }
        @keyframes flow-horizontal {
          0% { transform: translate(0, 0) scale(0.6); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translate(var(--target-x), var(--target-y)) scale(1); opacity: 0; }
        }
        .animate-wave-1 {
          animation: wave-flow-1 5s linear infinite;
        }
        .animate-wave-2 {
          animation: wave-flow-2 7s linear infinite;
        }
        .bubble-item {
          animation: bubble-up-particle var(--duration) ease-in-out infinite;
        }
        .flow-particle {
          animation: flow-horizontal var(--duration) cubic-bezier(0.25, 0.46, 0.45, 0.94) infinite;
        }
      `}} />

      {/* Floating horizontal coin streams when playing */}
      {isPlaying && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden z-10">
          {[...Array(8)].map((_, i) => {
            const duration = 0.8 + Math.random() * 0.7;
            const delay = i * 0.2;
            const startY = 150 + Math.random() * 250;
            const driftY = (Math.random() - 0.5) * 80;
            return (
              <div
                key={i}
                className="absolute w-2.5 h-2.5 bg-gold rounded-full opacity-0 shadow-lg flow-particle"
                style={{
                  left: '15%',
                  top: `${startY}px`,
                  '--target-x': '300px',
                  '--target-y': `${driftY}px`,
                  '--duration': `${duration}s`,
                  animationDelay: `${delay}s`,
                }}
              />
            );
          })}
        </div>
      )}

      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-white/10 pb-6 mb-8">
        <div>
          <span className="text-gold text-[11px] uppercase tracking-[0.2em] font-semibold">
            Interactive Compounding Visualizer
          </span>
          <h2 className="font-serif text-[26px] md:text-[32px] font-bold text-white leading-tight mt-1">
            See the "Snowball Effect" in Action
          </h2>
          <p className="text-white/60 text-[14px] font-light mt-1 max-w-xl">
            Drag the sliders or hit "Play" to watch your monthly investments compound exponentially over time.
          </p>
        </div>
        
        {/* Play/Pause Button */}
        <button
          onClick={handlePlayToggle}
          className={`px-5 py-3 rounded-full text-[14px] font-semibold flex items-center gap-2.5 transition-all shadow-lg shrink-0 ${
            isPlaying 
              ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-500/15' 
              : 'bg-gold hover:bg-goldLight text-navy shadow-gold/20'
          }`}
        >
          <span className="text-[14px]">{isPlaying ? '⏸' : '▶'}</span>
          <span>{isPlaying ? 'Pause Simulation' : 'Play Time-Lapse'}</span>
        </button>
      </div>

      {/* MAIN TWO-COLUMN DASHBOARD */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* LEFT COLUMN: Controls (Lg: 5 columns) */}
        <div className="lg:col-span-5 flex flex-col justify-between gap-6 bg-white/5 border border-white/10 rounded-[12px] p-6">
          
          <div className="space-y-6">
            {/* Monthly SIP Selector */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[13px] text-white/70 uppercase tracking-wider font-medium">Monthly Investment</label>
                <span className="text-[18px] font-semibold text-gold">{formatCurrency(monthlySip)}</span>
              </div>
              <input 
                type="range" 
                min="1000" 
                max="100000" 
                step="1000"
                value={monthlySip}
                disabled={isPlaying}
                onChange={(e) => setMonthlySip(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold disabled:opacity-50"
              />
              
              {/* Presets Grid */}
              <div className="grid grid-cols-5 gap-1.5 mt-3">
                {SIP_PRESETS.map((preset) => (
                  <button
                    key={preset}
                    onClick={() => setMonthlySip(preset)}
                    disabled={isPlaying}
                    className={`py-1 text-[11px] font-medium rounded transition-all border ${
                      monthlySip === preset
                        ? 'bg-gold/25 text-gold border-gold'
                        : 'bg-transparent text-white/50 border-white/10 hover:border-white/30 hover:text-white'
                    }`}
                  >
                    ₹{preset >= 1000 ? `${preset/1000}k` : preset}
                  </button>
                ))}
              </div>
            </div>

            {/* Expected Returns Rate */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[13px] text-white/70 uppercase tracking-wider font-medium">Expected Returns (CAGR)</label>
                <span className="text-[18px] font-semibold text-gold">{returnRate}%</span>
              </div>
              <input 
                type="range" 
                min="8" 
                max="15" 
                step="0.5"
                value={returnRate}
                disabled={isPlaying}
                onChange={(e) => setReturnRate(Number(e.target.value))}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold disabled:opacity-50"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>8% (Conservative)</span>
                <span>12% (Balanced)</span>
                <span>15% (Aggressive Max)</span>
              </div>
            </div>

            {/* Investment Duration */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-[13px] text-white/70 uppercase tracking-wider font-medium">Time Horizon</label>
                <span className="text-[18px] font-semibold text-gold">{years} Years</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="30" 
                step="1"
                value={years}
                disabled={isPlaying}
                onChange={(e) => {
                  setYears(Number(e.target.value));
                  if (!isPlaying) setAnimYear(Number(e.target.value));
                }}
                className="w-full h-1.5 bg-white/10 rounded-lg appearance-none cursor-pointer accent-gold disabled:opacity-50"
              />
              <div className="flex justify-between text-[10px] text-white/40 mt-1">
                <span>1 Yr</span>
                <span>15 Yrs</span>
                <span>30 Yrs</span>
              </div>
            </div>
          </div>

          {/* Time Lapse Year Indicator & Slider */}
          <div className="border-t border-white/10 pt-5 mt-4">
            <div className="flex justify-between items-center mb-3">
              <span className="text-[13px] text-white/70 uppercase tracking-wider font-medium flex items-center gap-1.5">
                <span className="relative flex h-2 w-2">
                  <span className={`animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75 ${isPlaying ? '' : 'hidden'}`}></span>
                  <span className={`relative inline-flex rounded-full h-2 w-2 ${isPlaying ? 'bg-gold' : 'bg-white/40'}`}></span>
                </span>
                Timeline Progress
              </span>
              <span className="text-[20px] font-serif font-bold text-gold">Year {animYear} of {years}</span>
            </div>
            
            {/* Year Timeline Scrubber */}
            <input 
              type="range" 
              min="1" 
              max={years} 
              step="1"
              value={animYear}
              disabled={isPlaying}
              onChange={(e) => setAnimYear(Number(e.target.value))}
              className="w-full h-1 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold disabled:opacity-80"
            />
          </div>

        </div>

        {/* MIDDLE COLUMN: The Wealth Snowball Animation (Lg: 4 columns) */}
        <div className="lg:col-span-4 flex flex-col justify-center items-center p-6 bg-white/5 border border-white/10 rounded-[12px] relative min-h-[300px]">
          
          {/* Label */}
          <div className="absolute top-4 left-4 text-[11px] uppercase tracking-wider text-white/50 font-medium z-10">
            Wealth Accumulator
          </div>

          {/* Snowball Container with dynamic scale */}
          <motion.div 
            className="relative w-48 h-48 md:w-56 md:h-56 flex items-center justify-center select-none"
            animate={{ scale: snowballScale }}
            transition={{ type: 'spring', stiffness: 80, damping: 15 }}
          >
            {/* Ground shadow beneath snowball */}
            <div className="absolute -bottom-4 w-4/5 h-4 bg-black/45 rounded-full blur-md opacity-80" />

            {/* Glowing outer rings */}
            <div className="absolute inset-0 rounded-full border border-gold/15 animate-svg-pulse" />
            <div className="absolute -inset-2 rounded-full border border-gold/5 animate-svg-pulse" style={{ animationDelay: '1s' }} />

            {/* The main orb container */}
            <div className="w-full h-full rounded-full border-2 border-white/25 overflow-hidden shadow-2xl relative bg-[#061224] flex items-center justify-center">
              
              {/* Dynamic Wave Liquid */}
              <div 
                className="absolute inset-0 w-full h-full transition-all duration-500 ease-out"
                style={{ top: `${goldWaveLevel}%` }}
              >
                {/* Wave SVG */}
                <svg className="absolute w-[200%] h-[120px] -top-8 left-0" viewBox="0 0 200 100" preserveAspectRatio="none">
                  {/* Wave Layer 1 (Darker Gold, Back) */}
                  <path 
                    d="M0,45 C50,45 50,55 100,55 C150,55 150,45 200,45 L200,100 L0,100 Z" 
                    fill="#a5751b" 
                    className="animate-wave-2"
                  />
                  {/* Wave Layer 2 (Light Gold, Front) */}
                  <path 
                    d="M0,50 C50,38 50,62 100,50 C150,38 150,62 200,50 L200,100 L0,100 Z" 
                    fill="#c9922a" 
                    className="animate-wave-1"
                  />
                </svg>
                {/* Solid Fill below wave */}
                <div className="absolute inset-x-0 bottom-0 top-[30px] bg-[#c9922a]" />
              </div>

              {/* Inside Bubble Particles rising from the bottom */}
              <div className="absolute inset-0 rounded-full overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => {
                  const duration = 1.5 + Math.random() * 2;
                  const delay = i * 0.4;
                  const left = 15 + Math.random() * 70;
                  const drift = (Math.random() - 0.5) * 40;
                  return (
                    <div
                      key={i}
                      className="absolute w-1.5 h-1.5 bg-white rounded-full opacity-0 bubble-item"
                      style={{
                        left: `${left}%`,
                        bottom: '0px',
                        '--drift': `${drift}px`,
                        '--duration': `${duration}s`,
                        animationDelay: `${delay}s`,
                      }}
                    />
                  );
                })}
              </div>

              {/* Text inside the Orb showing CAGR speed & growth */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4 z-10 bg-gradient-to-t from-transparent via-[#061224]/20 to-[#061224]/50 pointer-events-none">
                <span className="text-[10px] text-white/50 uppercase tracking-widest leading-none mb-1 font-semibold">
                  Wealth Growth
                </span>
                <span className="font-serif text-[20px] md:text-[24px] font-bold text-white leading-none">
                  {formatCurrency(calculations.corpusCurrent)}
                </span>
                <span className="text-[11px] font-semibold text-gold mt-1 leading-none">
                  {calculations.wealthMultiplier}x Growth
                </span>
              </div>

            </div>
          </motion.div>

          {/* Quick Metrics at the bottom of the snowball */}
          <div className="mt-6 text-center">
            <div className="text-[11px] text-white/50 uppercase tracking-wider mb-1 font-semibold">
              Current Composition
            </div>
            <div className="flex items-center gap-4 text-[12px] font-medium justify-center">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-[#061224] border border-white/20 rounded-full shrink-0" />
                <span>Invested: {Math.round((1 - calculations.gainRatio) * 100)}%</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 bg-gold rounded-full shrink-0" />
                <span>Gains: {Math.round(calculations.gainRatio * 100)}%</span>
              </div>
            </div>
          </div>

        </div>

        {/* RIGHT COLUMN: Results & Side-by-Side Comparison (Lg: 3 columns) */}
        <div className="lg:col-span-3 flex flex-col justify-between gap-6 bg-white/5 border border-white/10 rounded-[12px] p-6">
          
          <div>
            <div className="text-[11px] uppercase tracking-wider text-white/50 font-medium mb-4">
              Locker Cash vs. SIP Wealth
            </div>

            {/* Visual comparison bars */}
            <div className="h-44 flex items-end justify-around gap-6 relative px-2 mb-6">
              
              {/* Locker Cash Bar */}
              <div className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="text-[11px] font-medium text-white/70 mb-1.5 text-center leading-none truncate w-full">
                  {formatCurrency(calculations.investedCurrent)}
                </div>
                <div className="w-8 bg-white/15 hover:bg-white/25 rounded-t-md relative transition-all duration-300" style={{
                  height: `${(calculations.investedCurrent / finalCorpusRef) * 100}%`,
                  minHeight: '4px'
                }}>
                  <div className="absolute inset-x-0 top-0 h-full bg-gradient-to-t from-white/0 to-white/10 rounded-t-md" />
                </div>
                <div className="text-[11px] text-white/50 mt-2 font-medium tracking-wide">
                  Locker
                </div>
              </div>

              {/* SIP Wealth Bar */}
              <div className="flex-1 flex flex-col items-center h-full justify-end group">
                <div className="text-[12px] font-bold text-gold mb-1.5 text-center leading-none truncate w-full">
                  {formatCurrency(calculations.corpusCurrent)}
                </div>
                <div className="w-8 bg-gradient-to-t from-gold/50 to-gold rounded-t-md relative shadow-lg shadow-gold/10 transition-all duration-300" style={{
                  height: `${(calculations.corpusCurrent / finalCorpusRef) * 100}%`,
                  minHeight: '4px'
                }}>
                  <div className="absolute inset-x-0 top-0 h-0.5 bg-white/30 rounded-t-md" />
                </div>
                <div className="text-[11px] text-gold mt-2 font-semibold tracking-wide">
                  SIP
                </div>
              </div>

              {/* Multiplier Connector Line & Bubble */}
              {Number(calculations.wealthMultiplier) > 1.1 && (
                <div className="absolute inset-x-0 top-1/3 flex flex-col items-center pointer-events-none z-10">
                  <div className="bg-gold text-navy font-bold text-[11px] px-2 py-0.5 rounded-full shadow-md animate-svg-pulse uppercase tracking-wide border border-white/20 whitespace-nowrap">
                    {calculations.wealthMultiplier}x Wealthier
                  </div>
                </div>
              )}
            </div>

            {/* Numeric details list */}
            <div className="space-y-3 pt-2 border-t border-white/10 text-[13px]">
              <div className="flex justify-between items-center text-white/70">
                <span>Total Invested:</span>
                <span className="font-semibold text-white">{formatCurrency(calculations.investedCurrent)}</span>
              </div>
              <div className="flex justify-between items-center text-white/70">
                <span>Compound Returns:</span>
                <span className="font-semibold text-gold">+{formatCurrency(calculations.gainCurrent)}</span>
              </div>
              <div className="flex justify-between items-center border-t border-white/10 pt-2 text-[14px]">
                <span className="font-medium text-white/80">Estimated Corpus:</span>
                <span className="font-bold text-gold">{formatCurrency(calculations.corpusCurrent)}</span>
              </div>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/20 rounded-[8px] p-3.5 mt-2 flex items-center justify-between gap-3 shrink-0">
            <div>
              <div className="text-[10px] text-gold uppercase tracking-wider font-semibold">Wealth Multiplier</div>
              <div className="text-[18px] font-bold font-serif text-white">{calculations.wealthMultiplier}x Your Money</div>
            </div>
            <div className="text-[20px] filter animate-svg-sway">
              🏆
            </div>
          </div>

        </div>

      </div>

      {/* BOTTOM COMMENTARY & STATE DESCRIPTION CARD */}
      <div className="mt-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={stageCommentary.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className={`border rounded-[10px] p-5 md:p-6 transition-all duration-300 ${stageCommentary.color}`}
          >
            <div className="flex items-center gap-3 mb-2">
              <div className="text-[20px]">
                {animYear <= 5 ? '🌱' : animYear <= 12 ? '📈' : animYear <= 20 ? '⚡' : '🚀'}
              </div>
              <h4 className="font-serif font-bold text-[16px] md:text-[18px] leading-tight">
                {stageCommentary.title}
              </h4>
            </div>
            <p className="text-[13.5px] md:text-[14.5px] leading-relaxed text-white/80 font-light">
              {stageCommentary.text}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

    </div>
  );
};

export default SipCompoundingVisualizer;
