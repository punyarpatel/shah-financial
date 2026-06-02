import React, { useState, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { submitLead } from '../lib/leads';
import FadeIn from '../components/animations/FadeIn';
import SliderRow from '../components/calculators/SliderRow';
import ServiceCardGraphic from '../components/ServiceCardGraphic';
import ELSSGrowthChart from '../components/calculators/ELSSGrowthChart';

const BENEFITS = [
  { 
    id: 'start-year',
    icon: '📅', 
    title: 'Start-of-Year SIPs', 
    description: 'We set up your SIPs at the start of the financial year — no last-minute March panic or rushed decisions.',
    detailedDescription: 'By planning in April rather than scrambling in March, we help you distribute your tax savings systematically, avoiding rash investment decisions and securing better average buy prices.'
  },
  { 
    id: 'spread',
    icon: '💸', 
    title: 'Spread Across 12 Months', 
    description: '₹1.5L spread across 12 months means smaller, manageable amounts — ₹12,500/month instead of one lump sum.',
    detailedDescription: 'A monthly SIP of ₹12,500 keeps your cash flow healthy and leverages Rupee Cost Averaging, buying more units when the market is low and fewer when it is high.'
  },
  { 
    id: 'selection',
    icon: '🔍', 
    title: 'Consistent Fund Selection', 
    description: 'We pick funds with consistent long-term track records, not just last year\'s top performers.',
    detailedDescription: 'We analyze 3-year and 5-year rolling returns, downside capture ratios, and fund manager histories to select ELSS funds that perform reliably across market cycles.'
  },
  { 
    id: 'growth',
    icon: '📈', 
    title: 'Money That Grows', 
    description: 'Your tax-saving money doesn\'t sit idle — it actively grows in equity markets, beating inflation over the long term.',
    detailedDescription: 'Unlike traditional tax savers (PPF/FDs) yielding 6-7%, ELSS funds expose your capital to high-growth Indian equities, helping you outpace inflation and compound your wealth.'
  },
];

const ELSSPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [taxBracket, setTaxBracket] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hovered, setHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  // Calculator state
  const [monthlyInvest, setMonthlyInvest] = useState(12500);
  const [years, setYears] = useState(10);
  const [roi, setRoi] = useState(13);

  const handleScrollToContact = () => {
    document.getElementById('elss-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919664977576?text=Hi!%20I%20want%20to%20start%20my%20ELSS%20SIP%20to%20save%20tax%20under%20Section%2080C.%20Can%20you%20help%20me%20get%20started%3F", '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !taxBracket) { 
      setError('Please fill out all required fields'); 
      return; 
    }
    setError(''); setLoading(true);

    const res = await submitLead({
      name,
      phone,
      interest: `Tax Saving ELSS - Tax Bracket: ${taxBracket || 'Not Specified'}`,
      message: 'Lead from ELSS Page'
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

  // Calculator logic
  const calc = useMemo(() => {
    const r = roi / 100 / 12;
    const n = years * 12;
    const fv = r > 0 ? monthlyInvest * ((Math.pow(1 + r, n) - 1) / r) * (1 + r) : monthlyInvest * n;
    const totalInvested = monthlyInvest * n;
    const gains = fv - totalInvested;
    // Annual tax saving at 31.2% (max 1.5L)
    const annualInvest = monthlyInvest * 12;
    const eligible = Math.min(annualInvest, 150000);
    const taxSaved312 = Math.round(eligible * 0.312);
    const taxSaved208 = Math.round(eligible * 0.208);
    const totalTaxSaved312 = taxSaved312 * years;
    return { fv, totalInvested, gains, annualInvest, eligible, taxSaved312, taxSaved208, totalTaxSaved312 };
  }, [monthlyInvest, years, roi]);

  const fmt = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)}Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)}L`;
    if (val >= 1000) return `₹${(val / 1000).toFixed(1)}K`;
    return `₹${Math.round(val).toLocaleString('en-IN')}`;
  };







  const ogImage = `${window.location.origin}/elss_preview.png`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>Tax Saving ELSS — Shah Financial Services</title>
        <meta name="description" content="Save up to ₹46,800 in tax every year with ELSS mutual funds under Section 80C. Shortest 3-year lock-in with equity-level returns." />
        <meta property="og:title" content="Tax Saving ELSS — Shah Financial Services" />
        <meta property="og:description" content="Save up to ₹46,800 in tax every year with ELSS mutual funds under Section 80C. Shortest 3-year lock-in with equity-level returns." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Tax Saving ELSS — Shah Financial Services" />
        <meta name="twitter:description" content="Save up to ₹46,800 in tax every year with ELSS mutual funds under Section 80C. Shortest 3-year lock-in with equity-level returns." />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-navy py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-6">
              <Link to="/services" className="text-gold/85 hover:text-gold font-medium text-[14px] inline-flex items-center gap-1.5 transition-colors">
                &larr; Back to Services
              </Link>
            </div>
            <div className="inline-flex items-center gap-[6px] bg-gold/15 border border-gold/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-goldLight text-[11px] uppercase tracking-[0.12em]">Tax Saving — ELSS</span>
            </div>

            <h1 className="font-serif text-[34px] md:text-[46px] text-white font-semibold leading-[1.2] mb-[1.25rem] max-w-4xl">
              Save ₹46,800 in Tax Every Year — And Build Wealth While You're At It
            </h1>

            <p className="text-white/65 text-[16px] leading-[1.6] mb-[2rem] max-w-2xl">
              ELSS (Equity Linked Savings Scheme) is the smartest tax-saving option under Section 80C — shortest lock-in of just 3 years, and equity-level returns over the long term.
            </p>

            <div className="flex flex-wrap gap-4 mt-[2rem]">
              <a href="tel:+919664977576"
                className="bg-white/10 text-white border border-white/20 px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                <span className="text-[18px]">📞</span> Call Us
              </a>
              <button onClick={handleScrollToContact}
                className="bg-gold text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-goldLight transition-colors shadow-lg shadow-gold/20">
                Invest Now
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Tax Saving Highlight Cards */}
      <section className="bg-white py-[3rem] w-full border-b border-navy/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-muted text-[13px] uppercase tracking-[0.15em] font-medium mb-4">How much can you save?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              <div className="bg-navy rounded-[14px] p-6 flex items-start gap-4">
                <div className="text-[36px]">💰</div>
                <div>
                  <p className="text-white/60 text-[12px] uppercase tracking-wider mb-1">At 31.2% Tax Bracket</p>
                  <p className="font-serif text-[28px] text-goldLight font-bold">Save ₹46,800</p>
                  <p className="text-white/50 text-[13px] mt-1">on ₹1,50,000 invested in ELSS</p>
                </div>
              </div>
              <div className="bg-cream border border-navy/10 rounded-[14px] p-6 flex items-start gap-4">
                <div className="text-[36px]">💵</div>
                <div>
                  <p className="text-muted text-[12px] uppercase tracking-wider mb-1">At 20.8% Tax Bracket</p>
                  <p className="font-serif text-[28px] text-navy font-bold">Save ₹31,200</p>
                  <p className="text-muted text-[13px] mt-1">on ₹1,50,000 invested in ELSS</p>
                </div>
              </div>
            </div>
            <p className="text-gold text-[14px] font-medium mt-5 border-l-4 border-gold pl-4">
              Don't let your tax-saving money sit idle in FDs or LIC. Make it work harder.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Why ELSS Through Us */}
      <section className="bg-cream py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Why Choose Us</div>
            <h2 className={titleStyles}>Why ELSS Through Us</h2>
            
            <div className="mt-[3rem] w-full premium-feature-card group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-stretch">
                {/* Left Column (50%) */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    {/* Soft colored square box icon container */}
                    <div className="relative w-14 h-14 mb-6 group/icon">
                      <div className="absolute inset-0 bg-gold/10 rounded-xl transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:bg-gold/15"></div>
                      <div className="absolute inset-1 bg-white rounded-lg shadow-sm border border-gold/10 flex items-center justify-center text-2xl transition-all duration-300 group-hover/icon:rotate-6">
                        💰
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-[24px] md:text-[26px] font-bold text-textDark mb-3 group-hover:text-navy transition-colors duration-300">
                      Tax Saving — ELSS
                    </h3>

                    {/* Description */}
                    <p className="text-[15px] leading-relaxed text-muted mb-6">
                      Save up to ₹46,800 in tax every year under Section 80C while building wealth with equity-level returns and a short 3-year lock-in.
                    </p>

                    {/* 3 key benefit points with a gold checkmark */}
                    <ul className="space-y-3.5 mb-8">
                      {[
                        'Up to ₹46,800 annual tax savings under Sec 80C',
                        'Lowest 3-year lock-in compared to PPF or FDs',
                        'Wealth compounding through equity exposure'
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
                          src="/elss_preview.png" 
                          alt="Tax Saving — ELSS"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-lg"></div>
                      </div>
                    </div>

                    {/* Bottom Bar: White background, service name label and green indicator dot */}
                    <div className="bg-white border-t border-slate-100/80 px-6 py-4 flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-[#5c687e] tracking-wide">
                        Tax Saving — ELSS
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

            {/* Interactive Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[4rem] relative">
              {BENEFITS.map((b, index) => {
                const isHovered = hoveredIndex === index;
                const isAnyHovered = hoveredIndex !== null;
                
                // Calculate slide translations based on relative position in a 4-column layout
                let xTranslate = 0;
                let yTranslate = 0;
                
                if (isAnyHovered && !isHovered) {
                  const columns = 4;
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
                
                return (
                  <motion.div
                    key={b.id}
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
                      stiffness: 150,
                      damping: 25,
                      mass: 0.8,
                    }}
                    className="relative bg-white border border-navy/10 hover:border-gold/50 rounded-[16px] p-6 h-full flex flex-col justify-between cursor-pointer overflow-hidden group min-h-[220px]"
                  >
                    <div className="relative pr-16">
                      <h3 className="font-serif text-[17px] text-navy font-bold mb-2 group-hover:text-gold transition-colors">{b.title}</h3>
                      <p className="text-muted text-[13px] leading-[1.6]">{b.description}</p>
                      
                      {/* Image Graphic in top right */}
                      <div className="absolute -top-1 -right-2 w-14 h-14 md:w-16 md:h-16 pointer-events-none transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 ease-out">
                        <ServiceCardGraphic id={b.id === 'selection' ? 'selection-elss' : b.id} />
                      </div>
                    </div>

                    <div>
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
                        <p className="text-muted text-[12.5px] leading-[1.6] border-t border-navy/5 pt-3">
                          {b.detailedDescription}
                        </p>
                      </motion.div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ELSS vs 80C Alternatives Comparison */}
      <section className="bg-white py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-5xl mx-auto px-4">
            <div className={labelStyles}>Comparison</div>
            <h2 className={titleStyles}>ELSS vs Other 80C Options</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-[14px] border-collapse">
                <thead>
                  <tr className="bg-navy text-white">
                    <th className="text-left p-4 rounded-tl-[10px] font-medium">Option</th>
                    <th className="text-center p-4 font-medium">Lock-in</th>
                    <th className="text-center p-4 font-medium">Returns</th>
                    <th className="text-center p-4 rounded-tr-[10px] font-medium">Tax on Returns</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { name: 'ELSS Mutual Fund ✅', lockIn: '3 years', returns: '12–15% (market)', tax: 'LTCG 10% above ₹1L', highlight: true },
                    { name: 'PPF', lockIn: '15 years', returns: '7.1% (fixed)', tax: 'Tax-free', highlight: false },
                    { name: 'NSC', lockIn: '5 years', returns: '7.7% (fixed)', tax: 'Taxable', highlight: false },
                    { name: 'Tax-Saving FD', lockIn: '5 years', returns: '6–7% (fixed)', tax: 'Taxable', highlight: false },
                    { name: 'LIC / Endowment', lockIn: '10–20 years', returns: '4–6%', tax: 'Mostly tax-free', highlight: false },
                  ].map((row, i) => (
                    <tr key={i} className={`border-b border-navy/8 ${row.highlight ? 'bg-gold/8' : i % 2 === 0 ? 'bg-cream' : 'bg-white'}`}>
                      <td className={`p-4 font-medium ${row.highlight ? 'text-gold' : 'text-navy'}`}>{row.name}</td>
                      <td className="p-4 text-center text-muted">{row.lockIn}</td>
                      <td className={`p-4 text-center font-medium ${row.highlight ? 'text-navy' : 'text-muted'}`}>{row.returns}</td>
                      <td className="p-4 text-center text-muted">{row.tax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ELSS Growth Calculator */}
      <section className="bg-cream py-[5rem] w-full">
        <FadeIn>
          <div className="max-w-5xl mx-auto px-4">
            <div className={labelStyles}>ELSS Calculator</div>
            <h2 className={titleStyles}>See how your ELSS SIP grows</h2>
            <p className="text-muted text-[15px] mb-8 -mt-4">Adjust sliders to see your potential tax savings and wealth creation</p>

            {/* Sliders */}
            <div className="bg-[#1e293b] rounded-[16px] p-6 md:p-8 mb-4 space-y-5">
              <SliderRow label="Monthly SIP amount" value={monthlyInvest} min={500} max={50000} step={500} onChange={setMonthlyInvest} display={fmt(monthlyInvest)} />
              <SliderRow label="Investment period" value={years} min={3} max={25} onChange={setYears} display={`${years} yrs`} />
              <SliderRow label="Expected return (CAGR)" value={roi} min={8} max={20} step={0.5} onChange={setRoi} display={`${roi}%`} />
            </div>

            {/* Results */}
            <div className="bg-navy rounded-[16px] p-6 mb-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">Total corpus at maturity</p>
                  <p className="font-serif text-[38px] text-white font-bold leading-none">{fmt(calc.fv)}</p>
                  <p className="text-white/40 text-[12px] mt-1">Invested: {fmt(calc.totalInvested)}</p>
                </div>
                <div>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">Wealth gained</p>
                  <p className="font-serif text-[38px] text-[#4ade80] font-bold leading-none">{fmt(calc.gains)}</p>
                  <p className="text-white/40 text-[12px] mt-1">{Math.round((calc.gains / calc.totalInvested) * 100)}% gain on investment</p>
                </div>
                <div>
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">Annual tax saved (31.2%)</p>
                  <p className="font-serif text-[38px] text-goldLight font-bold leading-none">{fmt(calc.taxSaved312)}</p>
                  <p className="text-white/40 text-[12px] mt-1">Total over {years} yrs: {fmt(calc.totalTaxSaved312)}</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-[#1e293b] rounded-[16px] p-5 mb-6">
              <ELSSGrowthChart monthlyInvest={monthlyInvest} years={years} roi={roi} fmt={fmt} />
            </div>

            {/* Insight */}
            <div className="bg-gold/10 border border-gold/30 rounded-[10px] px-5 py-4 mb-6 text-[#7a5520] text-[13px] leading-[1.6]">
              Investing <strong>{fmt(monthlyInvest)}/month</strong> for <strong>{years} years</strong> grows to <strong>{fmt(calc.fv)}</strong> — while saving you <strong>{fmt(calc.taxSaved312)}/year</strong> in taxes. That's your money doing two jobs at once.
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={handleWhatsApp} className="bg-[#25D366] text-white px-[24px] py-[11px] rounded-[8px] font-medium hover:bg-[#22c35e] transition-colors text-[14px] flex items-center gap-2">
                💬 Start My ELSS SIP on WhatsApp
              </button>
              <button onClick={handleScrollToContact} className="bg-gold text-white px-[24px] py-[11px] rounded-[8px] font-medium hover:bg-goldLight transition-colors text-[14px]">
                Invest Now →
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Contact / Lead Form */}
      <section id="elss-contact" className="bg-navy py-[5rem] w-full border-t border-white/5">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">Start Saving Tax Today</h2>
              <p className="text-goldLight text-[19px] font-serif italic">"Start early. Stay consistent. Let the market do the rest."</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-[16px] p-[2rem] md:p-[2.5rem] shadow-2xl backdrop-blur-sm">
              {success ? (
                <div className="bg-green-500/15 border border-green-500/30 rounded-[10px] p-[2rem] text-center text-[#4ade80]">
                  <div className="text-[32px] mb-2">✅</div>
                  <h3 className="font-serif text-[24px] mb-2">Request Received</h3>
                  <p>Thank you! Our advisor will contact you to set up your ELSS SIP.</p>
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
                    <label className={formLabelStyles}>Your Tax Bracket</label>
                    <select value={taxBracket} onChange={e => setTaxBracket(e.target.value)} className={`${inputStyles} appearance-none cursor-pointer`}>
                      <option value="" className="bg-navy">Select bracket</option>
                      <option value="5%" className="bg-navy">5% slab</option>
                      <option value="20%" className="bg-navy">20% slab</option>
                      <option value="30%" className="bg-navy">30% slab</option>
                      <option value="Not Sure" className="bg-navy">Not sure</option>
                    </select>
                  </div>
                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px] mt-2">{error}</div>
                  )}
                  <div className="md:col-span-2 mt-3">
                    <button type="submit" disabled={loading} className="w-full bg-gold text-white border-none py-[14px] rounded-[8px] text-[15px] font-medium hover:bg-goldLight transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gold/20">
                      {loading ? 'Submitting...' : 'Start My ELSS Investment'}
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

export default ELSSPage;
