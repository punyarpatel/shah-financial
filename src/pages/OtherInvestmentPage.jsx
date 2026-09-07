import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { submitLead } from '../lib/leads';
import FadeIn from '../components/animations/FadeIn';
import StaggerGroup from '../components/animations/StaggerGroup';
import StaggerItem from '../components/animations/StaggerItem';
import BorderGlow from '../components/animations/BorderGlow';
import PhoneNumberField from '../components/PhoneNumberField';

const OTHER_SERVICES = [
  {
    id: 'stock-broking',
    icon: '📊',
    tag: 'Direct Equity & Demat',
    title: 'Stock Broking',
    subtitle: 'Direct Equity Trading & Seamless Demat Setups',
    description: 'Direct equity trading solutions and seamless Demat account setups with leading Indian brokers for equities, ETFs, and derivatives.',
    detailedFeatures: [
      'Zero-friction digital Demat & Trading account setup',
      'Access to NSE & BSE direct equities, ETFs, and market derivatives',
      'Real-time market insights & equity research updates',
      'Seamless linkage with your overall wealth portfolio'
    ],
    targetAudience: 'Active investors & wealth builders seeking direct equity exposure.',
    badgeColor: 'bg-blue-50 text-blue-700 border-blue-200'
  },
  {
    id: 'smallcase',
    icon: '💼',
    tag: 'Thematic Baskets',
    title: 'Smallcase',
    subtitle: 'Modern Theme-Driven Stock & ETF Portfolios',
    description: 'Modern, theme-driven baskets of stocks & ETFs designed around emerging economic trends, key industrial sectors, and quantitative growth strategies.',
    detailedFeatures: [
      'Curated baskets reflecting megatrends like EV, IT, Banking & Green Energy',
      'Direct ownership of individual stocks in your Demat account',
      'Automated one-click rebalancing and dividend tracking',
      'Flexible SIP options into thematic stock baskets'
    ],
    targetAudience: 'Investors wanting targeted sectoral exposure without managing individual stocks.',
    badgeColor: 'bg-amber-50 text-amber-700 border-amber-200'
  },
  {
    id: 'sif',
    icon: '🏛️',
    tag: 'Specialised Funds',
    title: 'Specialised Investment Funds (SIF)',
    subtitle: 'High-Conviction Targeted Allocations',
    description: 'Specialised Investment Funds designed for high-conviction strategies, targeted sector allocations, and custom capital growth.',
    detailedFeatures: [
      'Tailored strategies targeting high-growth sectors & emerging niches',
      'Institutional risk management & focused portfolio execution',
      'Ideal for capital appreciation alongside core mutual fund holdings',
      'Regular performance tracking & active portfolio rebalancing'
    ],
    targetAudience: 'Experienced investors looking for specialized & focused growth vehicles.',
    badgeColor: 'bg-emerald-50 text-emerald-700 border-emerald-200'
  },
  {
    id: 'las',
    icon: '⚡',
    tag: 'Instant Liquidity',
    title: 'Loan Against Securities (LAS)',
    subtitle: 'Liquidity Without Liquidating Investments',
    description: 'Access fast, flexible credit lines against your existing mutual funds and equity holdings without liquidating your long-term portfolio.',
    detailedFeatures: [
      'Borrow up to 80% against mutual funds & approved equity shares',
      'Pay interest only on the utilized credit amount',
      'Keep earning dividends, compounding & capital appreciation',
      'Zero foreclosure charges & flexible repayment terms'
    ],
    targetAudience: 'Investors needing short-term liquidity for business or personal emergency without selling assets.',
    badgeColor: 'bg-purple-50 text-purple-700 border-purple-200'
  },
  {
    id: 'fixed-income',
    icon: '📜',
    tag: 'Guaranteed Yields',
    title: 'Fixed Deposits & Bonds',
    subtitle: 'Capital Preservation & Fixed Income Securities',
    description: 'Capital preservation through high-rated Corporate FDs, Sovereign Gold Bonds (SGB), 54EC Capital Gains Tax-Saving Bonds, and Fixed Income Securities.',
    detailedFeatures: [
      'AAA / AA+ rated Corporate Fixed Deposits with attractive yields',
      'Sovereign Gold Bonds (SGB) with 2.5% p.a. interest + tax-free maturity gains',
      '54EC Capital Gains Bonds to save tax on property or real estate sale',
      'Primary market NCDs & Government Securities for stable cash flows'
    ],
    targetAudience: 'Risk-averse investors, retirees, and property sellers aiming for steady income.',
    badgeColor: 'bg-amber-50 text-amber-800 border-amber-300'
  },
  {
    id: 'nps',
    icon: '🇮🇳',
    tag: 'Tax-Saved Retirement',
    title: 'National Pension System (NPS)',
    subtitle: 'Government-Backed Pension with Extra Tax Benefits',
    description: 'National Pension System — government-backed pension scheme offering market-linked growth with exclusive tax benefits under Sec 80CCD(1B).',
    detailedFeatures: [
      'Additional tax deduction of up to ₹50,000 under Sec 80CCD(1B)',
      'Choice of Active & Auto Choice asset allocation across Equity & Debt',
      'Lowest fund management cost among retirement products worldwide',
      'Flexible annuity options for guaranteed pension income post-retirement'
    ],
    targetAudience: 'Salaried & self-employed individuals seeking extra tax savings and structured retirement corpus.',
    badgeColor: 'bg-indigo-50 text-indigo-700 border-indigo-200'
  },
  {
    id: 'pms-aif-gift',
    icon: '💎',
    tag: 'UHNI & Global Capital',
    title: 'PMS / AIF / Gift IFSC',
    subtitle: 'Institutional-Grade Bespoke Wealth Solutions',
    description: 'Institutional-grade Portfolio Management Services (PMS), Alternative Investment Funds (AIF), and international GIFT City IFSC investment structures.',
    detailedFeatures: [
      'Bespoke PMS strategies managed by India\'s top fund managers (Min ₹50L)',
      'Category I, II & III Alternative Investment Funds (AIF) for high-net-worth strategies (Min ₹1Cr)',
      'GIFT City IFSC structures for tax-efficient global investing & NRI capital',
      'Direct interaction with fund managers & customized reporting'
    ],
    targetAudience: 'High-Net-Worth Individuals (HNIs), NRIs, and Family Offices seeking tailored capital growth.',
    badgeColor: 'bg-rose-50 text-rose-700 border-rose-200'
  }
];

const OtherInvestmentPage = () => {
  const location = useLocation();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('Stock Broking');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [expandedIndex, setExpandedIndex] = useState(null);

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 200);
      }
    }
  }, [location]);

  const handleInquireService = (serviceTitle) => {
    setInterest(serviceTitle);
    const formSection = document.getElementById('inquiry-form');
    if (formSection) {
      formSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsAppInquiry = (serviceTitle) => {
    const text = encodeURIComponent(`Hi Drishti Wealth team, I would like to inquire about ${serviceTitle}.`);
    window.open(`https://wa.me/919664977576?text=${text}`, '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !interest) {
      setError('Please fill out all required fields');
      return;
    }
    setError('');
    setLoading(true);

    const res = await submitLead({
      name,
      phone,
      interest: `Other Investments - ${interest}`,
      message: message || `Inquiring about ${interest}`,
      source: 'Other Investments Page'
    });

    if (!res.success) {
      setError(res.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setInterest('Stock Broking');
    setMessage('');
    setError('');
    setSuccess(false);
  };

  const ogImage = `${window.location.origin}/why_choose_us_mockup.png`;

  return (
    <div className="min-h-screen bg-cream flex flex-col relative">
      <Helmet>
        <title>Other Investment Services | Stock Broking, LAS, NPS, PMS & AIF | Drishti Wealth</title>
        <meta name="description" content="Explore specialized investment products including Stock Broking, Smallcase, SIF, Loan Against Securities (LAS), Bonds, NPS, PMS, AIF, and GIFT City IFSC wealth solutions at Drishti Wealth Ahmedabad." />
        <link rel="canonical" href="https://drishtiwealth.com/services/other-investments" />
        <meta property="og:title" content="Other Investment Services | Stock Broking, LAS, NPS, PMS & AIF | Drishti Wealth" />
        <meta property="og:description" content="Explore specialized investment products including Stock Broking, Smallcase, SIF, Loan Against Securities (LAS), Bonds, NPS, PMS, AIF, and GIFT City IFSC wealth solutions." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drishtiwealth.com/services/other-investments" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Other Investment Services | Drishti Wealth Ahmedabad" />
        <meta name="twitter:description" content="Comprehensive stock broking, LAS, NPS, Bonds, PMS & AIF investment solutions." />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Navbar />

      {/* ── Hero Section ── */}
      <section className="bg-navy py-[4.5rem] w-full relative overflow-hidden">
        {/* Subtle dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <FadeIn delay={0.1}>
            <div className="mb-6">
              <Link to="/services" className="text-gold/85 hover:text-gold font-medium text-[14px] inline-flex items-center gap-1.5 transition-colors">
                &larr; Back to Main Services
              </Link>
            </div>

            <div className="inline-flex items-center gap-[6px] bg-gold/15 border border-gold/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-goldLight text-[11px] uppercase tracking-[0.14em] font-semibold">Expanded Wealth Avenues</span>
            </div>

            <h1 className="font-serif text-[36px] md:text-[50px] text-white font-bold leading-[1.15] mb-[1.25rem] max-w-4xl">
              Other Investment <span className="text-gold">Services</span>
            </h1>

            <p className="text-white/70 text-[16px] md:text-[17px] leading-[1.7] mb-[2rem] max-w-3xl">
              Beyond traditional mutual funds and insurance, we offer specialized market access, liquidity strategies, tax-optimised pension plans, fixed income bonds, and UHNI wealth management.
            </p>

            <div className="flex flex-wrap gap-4 mt-[2rem]">
              <a
                href="#services-list"
                className="bg-gold text-navy font-bold px-[24px] py-[12px] rounded-[10px] text-[14.5px] hover:bg-goldLight transition-all shadow-lg shadow-gold/20 flex items-center gap-2"
              >
                <span>Explore Solutions</span>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </a>
              <button
                onClick={() => {
                  const el = document.getElementById('inquiry-form');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
                className="bg-white/10 text-white border border-white/20 px-[24px] py-[12px] rounded-[10px] font-medium text-[14.5px] hover:bg-white/20 transition-all flex items-center gap-2"
              >
                <span>Request Inquiry Desk</span>
                <span>&rarr;</span>
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Key Highlights Strip ── */}
      <section className="bg-[#f0ece1] border-b border-amber-900/10 py-6 w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-[24px] md:text-[28px] font-serif font-bold text-[#0d2545]">7+</div>
              <div className="text-[12px] text-[#5c6478] uppercase tracking-wider font-medium">Investment Avenues</div>
            </div>
            <div>
              <div className="text-[24px] md:text-[28px] font-serif font-bold text-[#0d2545]">80% LTV</div>
              <div className="text-[12px] text-[#5c6478] uppercase tracking-wider font-medium">Instant LAS Credit</div>
            </div>
            <div>
              <div className="text-[24px] md:text-[28px] font-serif font-bold text-[#0d2545]">Sec 80CCD</div>
              <div className="text-[12px] text-[#5c6478] uppercase tracking-wider font-medium">NPS Tax Deductions</div>
            </div>
            <div>
              <div className="text-[24px] md:text-[28px] font-serif font-bold text-[#0d2545]">Bespoke</div>
              <div className="text-[12px] text-[#5c6478] uppercase tracking-wider font-medium">PMS / AIF / GIFT City</div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Services Catalog Section ── */}
      <section id="services-list" className="py-[4.5rem] w-full bg-[#faf8f4]">
        <div className="max-w-7xl mx-auto px-4">

          <FadeIn>
            <div className="text-center mb-[3.5rem]">
              <div className="inline-block bg-[#fef3c7] text-[#b45309] border border-[#fde68a] text-[11px] uppercase tracking-[0.18em] font-extrabold px-[14px] py-[5px] rounded-[8px] mb-[1rem]">
                Complete Portfolio Offerings
              </div>
              <h2 className="font-serif text-[30px] md:text-[40px] text-[#0d2545] font-bold mb-[1rem] leading-tight">
                Our Alternative & Specialized Services
              </h2>
              <p className="text-[#475569] text-[15.5px] leading-[1.6] max-w-[680px] mx-auto">
                Explore customized financial products designed for capital growth, tactical trading, liquidity optimization, and tax-efficient wealth management.
              </p>
            </div>
          </FadeIn>

          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {OTHER_SERVICES.map((item, index) => (
              <StaggerItem key={item.id}>
                <div
                  id={item.id}
                  className="bg-white border border-slate-200/90 rounded-[24px] p-7 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_14px_36px_rgba(13,37,69,0.09)] hover:border-[#ca8a04]/40 transition-all duration-300 flex flex-col justify-between h-full group hover:-translate-y-1 scroll-mt-24"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className={`text-[11px] font-extrabold tracking-wider px-3 py-1 rounded-[8px] border uppercase ${item.badgeColor}`}>
                        {item.tag}
                      </span>
                      <span className="text-[32px] transform group-hover:scale-110 transition-transform duration-300">
                        {item.icon}
                      </span>
                    </div>

                    <h3 className="font-serif text-[#0d2545] text-[22px] md:text-[24px] font-bold mt-5 mb-2 leading-tight group-hover:text-[#ca8a04] transition-colors duration-300">
                      {item.title}
                    </h3>
                    
                    <p className="text-[#94a3b8] text-[12px] font-medium uppercase tracking-wider mb-3">
                      {item.subtitle}
                    </p>

                    <p className="text-[#475569] text-[14px] leading-[1.65] mb-6">
                      {item.description}
                    </p>

                    <div className="border-t border-slate-100 pt-4 mb-6">
                      <div className="text-[12px] uppercase tracking-wider text-[#0d2545] font-bold mb-3.5">
                        Key Features & Benefits:
                      </div>
                      <ul className="space-y-2.5">
                        {item.detailedFeatures.map((feat, idx) => (
                          <li key={idx} className="flex items-start text-[13px] text-[#475569]">
                            <span className="text-gold font-bold mr-2 text-[12px]">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex items-center gap-3">
                    <button
                      onClick={() => handleInquireService(item.title)}
                      className="flex-1 bg-[#0d2545] text-white py-2.5 px-4 rounded-[10px] text-[13px] font-semibold hover:bg-[#ca8a04] transition-colors text-center"
                    >
                      Inquire Desk
                    </button>
                    <button
                      onClick={() => handleWhatsAppInquiry(item.title)}
                      className="px-3.5 py-2.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-[10px] hover:bg-emerald-100 transition-colors text-[16px]"
                      title="WhatsApp Inquiry"
                    >
                      💬
                    </button>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      {/* ── Interactive Deep Dive / Feature Comparison Section ── */}
      <section className="py-[4.5rem] w-full bg-white border-t border-slate-200/80">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-14">
              <span className="text-gold text-[11px] tracking-[0.18em] uppercase font-bold mb-2 block">Interactive Breakdown</span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-[#0d2545] font-bold">
                Which Service Fits Your Financial Needs?
              </h2>
              <p className="text-[#5c6478] text-[15px] max-w-[600px] mx-auto mt-2">
                Click on any service card below to view detailed investor profiles and usage scenarios.
              </p>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {OTHER_SERVICES.map((item, index) => {
              const isExpanded = expandedIndex === index;
              return (
                <BorderGlow key={item.id} className="h-full" borderRadius={16} backgroundColor="#ffffff">
                  <div
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    className="p-6 cursor-pointer flex flex-col justify-between h-full group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-[28px]">{item.icon}</span>
                        <span className="text-[12px] font-bold text-gold bg-gold/10 px-2.5 py-1 rounded-full">
                          {isExpanded ? 'Hide Details ▲' : 'View Target Profile ▼'}
                        </span>
                      </div>
                      <h3 className="font-serif text-[20px] font-bold text-[#0d2545] mb-2 group-hover:text-[#ca8a04] transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-[13.5px] text-[#5c6478] leading-relaxed">
                        {item.description}
                      </p>
                    </div>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{
                        height: isExpanded ? 'auto' : 0,
                        opacity: isExpanded ? 1 : 0,
                        marginTop: isExpanded ? 16 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden border-t border-slate-100 pt-3"
                    >
                      <div className="text-[12px] font-bold text-[#0d2545] uppercase tracking-wider mb-1">
                        Best Suited For:
                      </div>
                      <p className="text-[13px] text-[#475569] leading-relaxed bg-[#faf8f4] p-3 rounded-lg border border-amber-900/10">
                        {item.targetAudience}
                      </p>
                    </motion.div>
                  </div>
                </BorderGlow>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── Why Choose Drishti Wealth for Specialised Investments ── */}
      <section className="py-[4.5rem] w-full bg-[#f8fafc]">
        <div className="max-w-7xl mx-auto px-4">
          <FadeIn>
            <div className="text-center mb-[3.5rem]">
              <span className="text-gold text-[11px] tracking-[0.18em] uppercase font-bold mb-2 block">Our Advantage</span>
              <h2 className="font-serif text-[28px] md:text-[36px] text-[#0d2545] font-bold">
                Why Partner with Drishti Wealth?
              </h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-white p-7 rounded-[20px] border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold text-2xl flex items-center justify-center mb-5 font-bold">
                🎯
              </div>
              <h3 className="font-serif text-[18px] font-bold text-[#0d2545] mb-2">Unbiased Advisory</h3>
              <p className="text-[13.5px] text-[#5c6478] leading-relaxed">
                Independent guidance tailored strictly to your liquidity, risk appetite, and tax brackets.
              </p>
            </div>

            <div className="bg-white p-7 rounded-[20px] border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold text-2xl flex items-center justify-center mb-5 font-bold">
                🤝
              </div>
              <h3 className="font-serif text-[18px] font-bold text-[#0d2545] mb-2">Institutional Access</h3>
              <p className="text-[13.5px] text-[#5c6478] leading-relaxed">
                Direct partnerships with leading stockbrokers, PMS managers, AIF schemes, and corporate bond desks.
              </p>
            </div>

            <div className="bg-white p-7 rounded-[20px] border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold text-2xl flex items-center justify-center mb-5 font-bold">
                ⚡
              </div>
              <h3 className="font-serif text-[18px] font-bold text-[#0d2545] mb-2">Seamless Onboarding</h3>
              <p className="text-[13.5px] text-[#5c6478] leading-relaxed">
                Paperless account openings, digital KYC, and hassle-free LAS loan sanctioning.
              </p>
            </div>

            <div className="bg-white p-7 rounded-[20px] border border-slate-200/80 shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-gold/15 text-gold text-2xl flex items-center justify-center mb-5 font-bold">
                📈
              </div>
              <h3 className="font-serif text-[18px] font-bold text-[#0d2545] mb-2">Unified Tracking</h3>
              <p className="text-[13.5px] text-[#5c6478] leading-relaxed">
                Consolidated view of all your mutual funds, direct stocks, NPS, and bonds under one umbrella.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Lead Inquiry Form Section ── */}
      <section id="inquiry-form" className="bg-navy py-[5rem] w-full border-t border-white/5 scroll-mt-16">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <div className="inline-block bg-gold/15 text-goldLight border border-gold/30 text-[11px] uppercase tracking-[0.18em] font-semibold px-3 py-1 rounded-full mb-3">
                Inquire Desk
              </div>
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">
                Explore Alternative Investment Opportunities
              </h2>
              <p className="text-goldLight text-[18px] font-serif italic max-w-xl mx-auto">
                Connect with our specialists for stock broking, LAS, NPS, PMS, or fixed income solutions.
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[16px] p-[2rem] md:p-[2.5rem] shadow-2xl backdrop-blur-sm">
              {success ? (
                <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-[10px] p-[2rem] text-center text-[#4ade80] flex flex-col items-center gap-4">
                  <div className="text-[32px] mb-2">✅</div>
                  <h3 className="font-serif text-[24px] mb-2">Inquiry Submitted Successfully</h3>
                  <p className="text-white/80">Thank you! Our specialized investment advisory team will get in touch with you shortly.</p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 py-[8px] px-[16px] rounded-[6px] text-[13px] font-medium cursor-pointer transition-all"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className="block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your Full Name"
                      className="w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-gold focus:bg-white/10 placeholder-white/35 transition-colors"
                    />
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]">
                      Phone / WhatsApp *
                    </label>
                    <PhoneNumberField value={phone} onChange={setPhone} />
                  </div>

                  <div className="md:col-span-1">
                    <label className="block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]">
                      Service Interested In *
                    </label>
                    <select
                      value={interest}
                      onChange={(e) => setInterest(e.target.value)}
                      className="w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-gold focus:bg-white/10 placeholder-white/35 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="Stock Broking" className="bg-navy">Stock Broking (Demat / Equity)</option>
                      <option value="Smallcase" className="bg-navy">Smallcase (Thematic Baskets)</option>
                      <option value="Specialised Funds (SIF)" className="bg-navy">Specialised Investment Funds (SIF)</option>
                      <option value="Loan Against Securities (LAS)" className="bg-navy">Loan Against Securities (LAS)</option>
                      <option value="Fixed Deposit / Bonds" className="bg-navy">Fixed Deposit / Bonds / SGB</option>
                      <option value="National Pension System (NPS)" className="bg-navy">National Pension System (NPS)</option>
                      <option value="PMS / AIF / Gift IFSC" className="bg-navy">PMS / AIF / GIFT City IFSC</option>
                    </select>
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]">
                      Specific Requirements or Remarks (Optional)
                    </label>
                    <textarea
                      rows={3}
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="E.g., Looking for LAS against my mutual funds, or inquiring about Sovereign Gold Bonds..."
                      className="w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-gold focus:bg-white/10 placeholder-white/35 transition-colors resize-none"
                    />
                  </div>

                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px]">
                      {error}
                    </div>
                  )}

                  <div className="md:col-span-2 mt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gold text-navy font-bold border-none py-[14px] rounded-[8px] text-[15px] hover:bg-goldLight transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gold/20 cursor-pointer"
                    >
                      {loading ? 'Submitting Inquiry...' : 'Submit Service Inquiry'}
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

export default OtherInvestmentPage;
