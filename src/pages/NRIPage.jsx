import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { submitLead } from '../lib/leads';
import FadeIn from '../components/animations/FadeIn';

const POLICY_CHECKS = [
  {
    id: 'waiting',
    icon: '⏳',
    title: 'Waiting Period Clauses',
    description: "So you're covered when you actually need it — not after a long wait.",
    detailedDescription: 'We verify that any waiting periods for pre-existing diseases align perfectly with your planned travel schedules to India.'
  },
  {
    id: 'pre-existing',
    icon: '🏥',
    title: 'Pre-existing Disease Terms',
    description: 'We review coverage for pre-existing conditions so there are no surprises at claim time.',
    detailedDescription: 'We help declare medical histories transparently and check loading charges to prevent claim disputes during hospitalization.'
  },
  {
    id: 'cashless',
    icon: '🗺️',
    title: 'Cashless Hospital Network',
    description: 'We verify the cashless network covers the hospitals in your home city in India.',
    detailedDescription: 'We verify that the insurer has active cashless agreements with leading super-specialty hospitals in your specific home town.'
  },
  {
    id: 'fit',
    icon: '📋',
    title: 'Age & Sum Insured Fit',
    description: 'We ensure the policy covers your age bracket and provides adequate sum insured.',
    detailedDescription: 'We match your age profile with premium rates and calculate an optimal sum insured (e.g., ₹10L–25L) that covers modern medical inflation.'
  },
  {
    id: 'portability',
    icon: '🔄',
    title: 'Portability Options',
    description: 'Options to port the policy if you return to India permanently later.',
    detailedDescription: 'If you relocate back to India in the future, we ensure your accumulated waiting period credits are fully transferable to standard domestic policies.'
  },
];

const NRIPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [nriCountry, setNriCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hovered, setHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleScrollToContact = () => {
    document.getElementById('nri-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919664977576?text=Hi!%20I%20am%20an%20NRI%20and%20interested%20in%20your%20investment%20services.', '_blank');
  };

  const handleWhatsAppNriHealth = () => {
    const text = encodeURIComponent('Hi Shah Financial, I am an NRI interested in getting health insurance coverage for my medical treatment in India.');
    window.open(`https://wa.me/919664977576?text=${text}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:officeinsurance2017@gmail.com?subject=NRI%20Investment%20%26%20Insurance%20Enquiry';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !interest || !nriCountry || !timezone) { 
      setError('Please fill out all required fields'); 
      return; 
    }
    setError(''); setLoading(true);

    const res = await submitLead({
      name,
      phone,
      interest: `NRI Services - ${interest || 'Not Specified'}`,
      is_nri: `Yes - ${nriCountry || 'Not Specified'}`,
      nri_country: nriCountry || '',
      message: `Timezone: ${timezone || 'Not Specified'} | Lead from NRI Page`
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

  const mfServices = [
    'NRE / NRO account-based mutual fund investments',
    'DTAA (Double Tax Avoidance Agreement) guidance',
    'KYC and re-KYC for NRIs',
    'PAN card application and Aadhaar linking support',
    'Repatriation planning — moving money back abroad smoothly',
    'SIP setup and portfolio management remotely',
  ];

  const procedures = [
    { icon: '🦴', label: 'Orthopaedic surgeries (knee/hip replacement)' },
    { icon: '❤️', label: 'Cardiac procedures' },
    { icon: '🎗️', label: 'Cancer treatment' },
    { icon: '👁️', label: 'Eye surgeries (cataract, LASIK)' },
    { icon: '🦷', label: 'Dental and cosmetic procedures' },
    { icon: '🧬', label: 'Fertility treatments (IVF)' },
    { icon: '🩺', label: 'General health checkups and diagnostics' },
  ];

  const insurerPartners = ['HDFC Ergo', 'ICICI Lombard', 'Go Digit', 'Tata AIG', 'Bajaj Allianz', 'Edelweiss Zuno'];



  const countries = ['🇺🇸 USA', '🇬🇧 UK', '🇦🇪 UAE', '🇦🇺 Australia', '🇨🇦 Canada', '🇸🇬 Singapore', '🇩🇪 Germany', '🇳🇿 New Zealand'];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>NRI Investment Services India — Shah Financial Services</title>
        <meta name="description" content="NRI mutual fund investments, NRI health insurance in India, DTAA guidance, KYC, repatriation planning. Serving NRIs across USA, UK, UAE, Canada, Australia, Singapore." />
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="bg-navy py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center gap-[6px] bg-gold/15 border border-gold/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-goldLight text-[11px] uppercase tracking-[0.12em]">NRI Investment Services</span>
            </div>
            <h1 className="font-serif text-[34px] md:text-[46px] text-white font-semibold leading-[1.2] mb-[1.25rem] max-w-4xl">
              Your India Investments & Insurance — Managed Professionally, Even From Abroad
            </h1>
            <p className="text-white/65 text-[16px] leading-[1.6] mb-[2rem] max-w-2xl">
              You've built a life abroad. Your India investments and insurance deserve the same attention. We specialise in helping NRIs invest, stay compliant, grow their wealth back home — and stay protected every time they visit India.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={handleScrollToContact}
                className="bg-gold text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-goldLight transition-colors shadow-lg shadow-gold/20">
                📅 Schedule a Call
              </button>
              <button onClick={handleEmail}
                className="bg-white/10 text-white border border-white/20 px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                ✉️ Email Us
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Countries We Serve */}
      <section className="bg-white py-[2.5rem] w-full border-b border-navy/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-muted text-[12px] uppercase tracking-[0.15em] font-medium mb-3">Serving NRIs Across</p>
            <div className="flex flex-wrap gap-3">
              {countries.map(c => (
                <div key={c} className="bg-cream border border-navy/10 rounded-full px-[16px] py-[8px] text-[14px] text-navy font-medium shadow-sm">{c}</div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* NRI Mutual Fund Investments */}
      <section className="bg-cream py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Mutual Fund Investments</div>
            <h2 className={titleStyles}>NRI Mutual Fund Investments</h2>
 
            <div className="mt-[3rem] w-full premium-feature-card group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-stretch">
                {/* Left Column (50%) */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    {/* Soft colored square box icon container */}
                    <div className="relative w-14 h-14 mb-6 group/icon">
                      <div className="absolute inset-0 bg-gold/10 rounded-xl transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:bg-gold/15"></div>
                      <div className="absolute inset-1 bg-white rounded-lg shadow-sm border border-gold/10 flex items-center justify-center text-2xl transition-all duration-300 group-hover/icon:rotate-6">
                        🌍
                      </div>
                    </div>
 
                    {/* Title */}
                    <h3 className="font-serif text-[24px] md:text-[26px] font-bold text-textDark mb-3 group-hover:text-navy transition-colors duration-300">
                      NRI Investment Services
                    </h3>
 
                    {/* Description */}
                    <p className="text-[15px] leading-relaxed text-muted mb-6">
                      Specialized advisory for NRIs including NRE/NRO investing, remote KYC, repatriation planning, and health insurance for treatment in India.
                    </p>
 
                    {/* 3 key benefit points with a gold checkmark */}
                    <ul className="space-y-3.5 mb-8">
                      {[
                        'NRE & NRO investment account configuration',
                        'Remote KYC compliance and tax residency advisory',
                        'Repatriation coordination and Indian health coverage'
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
                          src="/nri_services_preview.png" 
                          alt="NRI Investment Services"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-lg"></div>
                      </div>
                    </div>

                    {/* Bottom Bar: White background, service name label and green indicator dot */}
                    <div className="bg-white border-t border-slate-100/80 px-6 py-4 flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-[#5c687e] tracking-wide">
                        NRI Investment Services
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

            {/* Original NRI Mutual Fund Details Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start mt-[4rem]">
              <div>
                <ul className="space-y-4">
                  {mfServices.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-gold font-bold mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-muted text-[15px] leading-[1.6]">{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 bg-navy/5 border-l-4 border-gold p-4 rounded-r-lg">
                  <p className="text-navy text-[14px] font-semibold mb-1">100% Digital Process</p>
                  <p className="text-muted text-[13px] leading-[1.5]">You don't need to fly down for any of this. Everything is handled digitally with proper compliance.</p>
                </div>
              </div>
 
              {/* NRE vs NRO mini comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={cardStyles}>
                  <h3 className="font-serif text-[18px] text-navy font-semibold mb-3">NRE Account</h3>
                  <ul className="space-y-2 text-muted text-[13px]">
                    <li>• Funded by foreign earnings</li>
                    <li>• Fully repatriable</li>
                    <li>• Interest tax-free in India</li>
                    <li>• Ideal for long-term SIPs</li>
                  </ul>
                </div>
                <div className={cardStyles}>
                  <h3 className="font-serif text-[18px] text-navy font-semibold mb-3">NRO Account</h3>
                  <ul className="space-y-2 text-muted text-[13px]">
                    <li>• Funded by India-sourced income</li>
                    <li>• Partially repatriable (up to $1M/yr)</li>
                    <li>• Interest taxable in India</li>
                    <li>• Ideal for local Indian earnings</li>
                  </ul>
                </div>
                <div className="sm:col-span-2 bg-navy rounded-[12px] p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gold rounded-full blur-[50px] opacity-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
                  <p className="text-white/60 text-[11px] uppercase tracking-wider mb-1">DTAA Coverage</p>
                  <p className="text-white font-serif text-[16px] font-semibold leading-snug">India has active DTAA treaties with 90+ countries — so you don't pay tax twice.</p>
                  <button onClick={handleScrollToContact} className="mt-3 text-goldLight text-[13px] font-medium hover:text-white transition-colors">
                    Ask us about your country →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* NRI Health Insurance — Full Section */}
      <section className="bg-white py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>NRI Health Insurance</div>
            <h2 className="font-serif text-[28px] text-textDark font-semibold mb-4 leading-tight max-w-3xl">
              Get World-Class Treatment in India, at a Fraction of the Cost
            </h2>
            <p className="text-muted text-[15px] leading-[1.7] max-w-3xl mb-10">
              Healthcare abroad is expensive. A surgery that costs ₹3–5 lakhs in India can cost 10–20× more in the US, UK, or Gulf countries. Many NRIs now fly back to India for planned procedures — and the smart ones are covered with an Indian health insurance policy before they land.
            </p>
 
            {/* Cost Comparison Banner */}
            <div className="bg-navy rounded-[20px] p-6 md:p-8 mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold rounded-full blur-[100px] opacity-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="text-center md:text-left">
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">Knee Replacement in India</p>
                  <p className="font-serif text-[36px] text-goldLight font-bold">₹3–5L</p>
                </div>
                <div className="text-center flex items-center justify-center">
                  <div className="text-white/30 text-[40px] font-serif">vs</div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">Same Procedure Abroad</p>
                  <p className="font-serif text-[36px] text-white/70 font-bold line-through">₹30–60L</p>
                </div>
              </div>
              <p className="text-white/50 text-[13px] text-center mt-4 relative z-10">With Indian health insurance, your ₹3–5L surgery is fully covered.</p>
            </div>
            
            {/* What's covered */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
              <div>
                <h3 className="font-serif text-[20px] text-navy font-semibold mb-5">We help NRIs so that…</h3>
                <ul className="space-y-3">
                  {[
                    'Planned surgeries, procedures, and hospitalisation in India are fully covered',
                    "You're not paying out of pocket when you visit family and need medical care",
                    "You get access to India's best hospitals — Apollo, Fortis, AIIMS, Kokilaben — at insured rates",
                    'Premium costs a fraction of what international health cover charges',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-gold font-bold mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-muted text-[15px] leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
 
              {/* Procedures grid */}
              <div>
                <h3 className="font-serif text-[20px] text-navy font-semibold mb-5">Procedures NRI clients come back for</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {procedures.map((p) => (
                    <div key={p.label} className="flex items-center gap-3 bg-cream border border-navy/8 rounded-[10px] px-4 py-3">
                      <span className="text-[22px]">{p.icon}</span>
                      <span className="text-muted text-[13px] leading-snug">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
 
            {/* Insurer Partners (trust badges — no links) */}
            <div className="mb-10">
              <p className="text-muted text-[12px] uppercase tracking-[0.15em] font-medium mb-3">Our Insurer Partners for NRI Health Covers</p>
              <div className="flex flex-wrap gap-3">
                {insurerPartners.map((p) => (
                  <div key={p} className="bg-cream border border-navy/10 rounded-[8px] px-[16px] py-[8px] text-navy text-[13px] font-semibold shadow-sm select-none">{p}</div>
                ))}
              </div>
            </div>
            
            {/* Policy Checks */}
            <div className="mb-10">
              <h3 className="font-serif text-[22px] text-navy font-semibold mb-6">Important things we check for you</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative">
                {POLICY_CHECKS.map((c, index) => {
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
                  
                  return (
                    <motion.div
                      key={c.id}
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
                        <div className="text-[28px] mb-3 select-none">{c.icon}</div>
                        <h4 className="font-serif text-[16px] text-navy font-semibold mb-2">{c.title}</h4>
                        <p className="text-muted text-[13px] leading-[1.6]">{c.description}</p>
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
                        <p className="text-muted text-[12.5px] leading-[1.6] border-t border-navy/5 pt-3">
                          {c.detailedDescription}
                        </p>
                      </motion.div>
                    </motion.div>
                  );
                })}
              </div>
            </div>
 
            {/* ROI highlight */}
            <div className="bg-gold/10 border border-gold/30 rounded-[14px] px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
              <p className="text-[#7a5520] text-[15px] leading-[1.6] font-medium max-w-2xl">
                💡 This is one of the most underutilised financial decisions an NRI can make. <strong>One planned surgery can recover the entire premium cost many times over.</strong>
              </p>
              <button onClick={handleWhatsAppNriHealth}
                className="flex-shrink-0 bg-[#25D366] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#22c35e] transition-colors flex items-center gap-2 shadow-lg shadow-[#25D366]/20 whitespace-nowrap">
                💬 WhatsApp About NRI Cover
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* KYC Process */}
      <section className="bg-cream py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>KYC Process</div>
            <h2 className={titleStyles}>Get Started in 3 Simple Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { num: '1', title: 'Submit Documents Online', desc: 'Provide your passport, overseas address proof, and PAN card through our secure digital process.' },
                { num: '2', title: 'Video Call Verification', desc: 'A quick 15-minute video KYC call scheduled entirely at your convenience, in your timezone.' },
                { num: '3', title: 'Account Activated', desc: 'Your NRI mutual fund account is activated within 48 hours and ready for investment.' },
              ].map((step) => (
                <div key={step.num} className={cardStyles}>
                  <div className="text-gold font-serif text-[48px] leading-none mb-2 opacity-40">{step.num}</div>
                  <h3 className="font-serif font-semibold text-navy text-[16px] mb-2">{step.title}</h3>
                  <p className="text-muted text-[14px] leading-[1.6]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Contact / Lead Form */}
      <section id="nri-contact" className="bg-navy py-[5rem] w-full border-t border-white/5">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">Book Your Free NRI Consultation</h2>
              <p className="text-goldLight text-[18px] font-serif italic">"Leave your details and mention your time zone — we'll call you at a time that works."</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <button onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#4ade80] px-6 py-3 rounded-[8px] font-medium transition-colors border border-[#25D366]/30">
                <span className="text-[18px]">💬</span> WhatsApp Us
              </button>
              <button onClick={handleEmail}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-[8px] font-medium transition-colors border border-white/15">
                ✉️ Email Us
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[16px] p-[2rem] md:p-[2.5rem] shadow-2xl backdrop-blur-sm">
              {success ? (
                <div className="bg-green-500/15 border border-green-500/30 rounded-[10px] p-[2rem] text-center text-[#4ade80]">
                  <div className="text-[32px] mb-2">✅</div>
                  <h3 className="font-serif text-[24px] mb-2">Request Received</h3>
                  <p>Thank you! Our NRI investment specialist will contact you at your preferred time.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className={formLabelStyles}>Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className={inputStyles} />
                  </div>
                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Phone / WhatsApp</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (XXX) XXX-XXXX" className={inputStyles} />
                  </div>
                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Country of Residence</label>
                    <input type="text" value={nriCountry} onChange={e => setNriCountry(e.target.value)} placeholder="e.g. USA, UAE, UK" className={inputStyles} />
                  </div>
                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Your Time Zone</label>
                    <input type="text" value={timezone} onChange={e => setTimezone(e.target.value)} placeholder="e.g. EST, GST, BST" className={inputStyles} />
                  </div>
                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Primary Interest</label>
                    <select value={interest} onChange={e => setInterest(e.target.value)} className={`${inputStyles} appearance-none cursor-pointer`}>
                      <option value="" className="bg-navy">Select an option</option>
                      <option value="NRI Mutual Fund SIP" className="bg-navy">NRI Mutual Fund SIP</option>
                      <option value="NRI Health Insurance" className="bg-navy">NRI Health Insurance</option>
                      <option value="KYC / Account Setup" className="bg-navy">KYC / Account Setup</option>
                      <option value="Portfolio Review" className="bg-navy">Existing Portfolio Review</option>
                      <option value="Repatriation Planning" className="bg-navy">Repatriation Planning</option>
                      <option value="General Enquiry" className="bg-navy">General Enquiry</option>
                    </select>
                  </div>
                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px] mt-2">{error}</div>
                  )}
                  <div className="md:col-span-2 mt-3">
                    <button type="submit" disabled={loading} className="w-full bg-gold text-white border-none py-[14px] rounded-[8px] text-[15px] font-medium hover:bg-goldLight transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gold/20">
                      {loading ? 'Submitting...' : 'Schedule My Free NRI Consultation'}
                    </button>
                    <p className="text-white/30 text-[11px] text-center mt-3">Mention your time zone and we'll call you at a convenient time.</p>
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

export default NRIPage;
