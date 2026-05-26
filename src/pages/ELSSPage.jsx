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

const ELSSPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [taxBracket, setTaxBracket] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Phone number must have at least 10 digits');
      return;
    }
    setError(''); setLoading(true);
    const { error: sbError } = await supabase
      .from('leads')
      .insert([{
        name,
        phone,
        interest: `Tax Saving ELSS - Tax Bracket: ${taxBracket || 'Not Specified'}`,
        city: '',
        is_nri: '',
        nri_country: '',
        message: 'Lead from ELSS Page',
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



  // SVG Bar Chart (year-by-year growth)
  const GrowthChart = () => {
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

  const benefits = [
    { icon: '📅', title: 'Start-of-Year SIPs', description: 'We set up your SIPs at the start of the financial year — no last-minute March panic or rushed decisions.' },
    { icon: '💸', title: 'Spread Across 12 Months', description: '₹1.5L spread across 12 months means smaller, manageable amounts — ₹12,500/month instead of one lump sum.' },
    { icon: '🔍', title: 'Consistent Fund Selection', description: 'We pick funds with consistent long-term track records, not just last year\'s top performers.' },
    { icon: '📈', title: 'Money That Grows', description: 'Your tax-saving money doesn\'t sit idle — it actively grows in equity markets, beating inflation over the long term.' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>Tax Saving ELSS — Shah Financial Services</title>
        <meta name="description" content="Save up to ₹46,800 in tax every year with ELSS mutual funds under Section 80C. Shortest 3-year lock-in with equity-level returns." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#0d2545] py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center gap-[6px] bg-[#c9922a]/15 border border-[#c9922a]/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-[#f0c96a] text-[11px] uppercase tracking-[0.12em]">Tax Saving — ELSS</span>
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
              <button onClick={handleWhatsApp}
                className="bg-[#25D366] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#22c35e] transition-colors flex items-center gap-2 shadow-lg shadow-[#25D366]/20">
                <span className="text-[18px]">💬</span> Start My ELSS SIP on WhatsApp
              </button>
              <button onClick={handleScrollToContact}
                className="bg-[#c9922a] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#f0c96a] transition-colors shadow-lg shadow-[#c9922a]/20">
                Invest Now
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Tax Saving Highlight Cards */}
      <section className="bg-white py-[3rem] w-full border-b border-[#0d2545]/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-[#5c6478] text-[13px] uppercase tracking-[0.15em] font-medium mb-4">How much can you save?</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-3xl">
              <div className="bg-[#0d2545] rounded-[14px] p-6 flex items-start gap-4">
                <div className="text-[36px]">💰</div>
                <div>
                  <p className="text-white/60 text-[12px] uppercase tracking-wider mb-1">At 31.2% Tax Bracket</p>
                  <p className="font-serif text-[28px] text-[#f0c96a] font-bold">Save ₹46,800</p>
                  <p className="text-white/50 text-[13px] mt-1">on ₹1,50,000 invested in ELSS</p>
                </div>
              </div>
              <div className="bg-[#faf8f4] border border-[#0d2545]/10 rounded-[14px] p-6 flex items-start gap-4">
                <div className="text-[36px]">💵</div>
                <div>
                  <p className="text-[#5c6478] text-[12px] uppercase tracking-wider mb-1">At 20.8% Tax Bracket</p>
                  <p className="font-serif text-[28px] text-[#0d2545] font-bold">Save ₹31,200</p>
                  <p className="text-[#5c6478] text-[13px] mt-1">on ₹1,50,000 invested in ELSS</p>
                </div>
              </div>
            </div>
            <p className="text-[#c9922a] text-[14px] font-medium mt-5 border-l-4 border-[#c9922a] pl-4">
              Don't let your tax-saving money sit idle in FDs or LIC. Make it work harder.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Why ELSS Through Us */}
      <section className="bg-[#faf8f4] py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Why Choose Us</div>
            <h2 className={titleStyles}>Why ELSS Through Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {benefits.map((b) => (
                <div key={b.title} className={cardStyles}>
                  <div className="text-[32px] mb-3">{b.icon}</div>
                  <h3 className="font-serif text-[17px] text-[#0d2545] font-semibold mb-2">{b.title}</h3>
                  <p className="text-[#5c6478] text-[13px] leading-[1.6]">{b.description}</p>
                </div>
              ))}
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
                  <tr className="bg-[#0d2545] text-white">
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
                    <tr key={i} className={`border-b border-[#0d2545]/8 ${row.highlight ? 'bg-[#c9922a]/8' : i % 2 === 0 ? 'bg-[#faf8f4]' : 'bg-white'}`}>
                      <td className={`p-4 font-medium ${row.highlight ? 'text-[#c9922a]' : 'text-[#0d2545]'}`}>{row.name}</td>
                      <td className="p-4 text-center text-[#5c6478]">{row.lockIn}</td>
                      <td className={`p-4 text-center font-medium ${row.highlight ? 'text-[#0d2545]' : 'text-[#5c6478]'}`}>{row.returns}</td>
                      <td className="p-4 text-center text-[#5c6478]">{row.tax}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* ELSS Growth Calculator */}
      <section className="bg-[#faf8f4] py-[5rem] w-full">
        <FadeIn>
          <div className="max-w-5xl mx-auto px-4">
            <div className={labelStyles}>ELSS Calculator</div>
            <h2 className={titleStyles}>See how your ELSS SIP grows</h2>
            <p className="text-[#5c6478] text-[15px] mb-8 -mt-4">Adjust sliders to see your potential tax savings and wealth creation</p>

            {/* Sliders */}
            <div className="bg-[#1e293b] rounded-[16px] p-6 md:p-8 mb-4 space-y-5">
              <SliderRow label="Monthly SIP amount" value={monthlyInvest} min={500} max={50000} step={500} onChange={setMonthlyInvest} display={fmt(monthlyInvest)} />
              <SliderRow label="Investment period" value={years} min={3} max={25} onChange={setYears} display={`${years} yrs`} />
              <SliderRow label="Expected return (CAGR)" value={roi} min={8} max={20} step={0.5} onChange={setRoi} display={`${roi}%`} />
            </div>

            {/* Results */}
            <div className="bg-[#0d2545] rounded-[16px] p-6 mb-4">
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
                  <p className="font-serif text-[38px] text-[#f0c96a] font-bold leading-none">{fmt(calc.taxSaved312)}</p>
                  <p className="text-white/40 text-[12px] mt-1">Total over {years} yrs: {fmt(calc.totalTaxSaved312)}</p>
                </div>
              </div>
            </div>

            {/* Chart */}
            <div className="bg-[#1e293b] rounded-[16px] p-5 mb-6">
              <GrowthChart />
            </div>

            {/* Insight */}
            <div className="bg-[#c9922a]/10 border border-[#c9922a]/30 rounded-[10px] px-5 py-4 mb-6 text-[#7a5520] text-[13px] leading-[1.6]">
              Investing <strong>{fmt(monthlyInvest)}/month</strong> for <strong>{years} years</strong> grows to <strong>{fmt(calc.fv)}</strong> — while saving you <strong>{fmt(calc.taxSaved312)}/year</strong> in taxes. That's your money doing two jobs at once.
            </div>

            <div className="flex flex-wrap gap-3 justify-center">
              <button onClick={handleWhatsApp} className="bg-[#25D366] text-white px-[24px] py-[11px] rounded-[8px] font-medium hover:bg-[#22c35e] transition-colors text-[14px] flex items-center gap-2">
                💬 Start My ELSS SIP on WhatsApp
              </button>
              <button onClick={handleScrollToContact} className="bg-[#c9922a] text-white px-[24px] py-[11px] rounded-[8px] font-medium hover:bg-[#f0c96a] transition-colors text-[14px]">
                Invest Now →
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Contact / Lead Form */}
      <section id="elss-contact" className="bg-[#0d2545] py-[5rem] w-full border-t border-white/5">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">Start Saving Tax Today</h2>
              <p className="text-[#f0c96a] text-[19px] font-serif italic">"Start early. Stay consistent. Let the market do the rest."</p>
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
                      <option value="" className="bg-[#0d2545]">Select bracket</option>
                      <option value="5%" className="bg-[#0d2545]">5% slab</option>
                      <option value="20%" className="bg-[#0d2545]">20% slab</option>
                      <option value="30%" className="bg-[#0d2545]">30% slab</option>
                      <option value="Not Sure" className="bg-[#0d2545]">Not sure</option>
                    </select>
                  </div>
                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px] mt-2">{error}</div>
                  )}
                  <div className="md:col-span-2 mt-3">
                    <button type="submit" disabled={loading} className="w-full bg-[#c9922a] text-white border-none py-[14px] rounded-[8px] text-[15px] font-medium hover:bg-[#f0c96a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#c9922a]/20">
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
