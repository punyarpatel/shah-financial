import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const credentialsData = [
  {
    index: 0,
    title: 'AMFI Registered MFD',
    icon: (
      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
    ),
    screenTitle: 'AMFI Certified',
    screenSubtitle: 'Association of Mutual Funds in India',
    screenDetails: [
      { label: 'Registration No.', value: 'ARN-XXXXX' },
      { label: 'Status', value: 'Active / Registered' },
      { label: 'Audit Compliance', value: 'AMFI Guidelines' },
      { label: 'Validity', value: 'Continuous Renewal' }
    ],
    screenBadge: 'OFFICIAL MFD',
    screenIcon: (
      <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30 shadow-[0_0_15px_rgba(201,146,42,0.2)]">
        <svg className="w-8 h-8 text-gold animate-pulse" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        </svg>
      </div>
    )
  },
  {
    index: 1,
    title: 'IRDAI Licensed Advisor',
    icon: (
      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    screenTitle: 'IRDAI Licensed',
    screenSubtitle: 'Insurance Regulatory & Development Authority',
    screenDetails: [
      { label: 'License Code', value: 'IRDAI / XXXXXXXXX' },
      { label: 'Role', value: 'Licensed Insurance Advisor' },
      { label: 'Authorized Products', value: 'Life & General Advisory' },
      { label: 'Compliance Status', value: 'Fully Empanelled' }
    ],
    screenBadge: 'VERIFIED ADVISOR',
    screenIcon: (
      <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30 shadow-[0_0_15px_rgba(201,146,42,0.2)]">
        <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.956 11.956 0 0112 2.714z" />
        </svg>
      </div>
    )
  },
  {
    index: 2,
    title: 'SEC / SEBI Compliance',
    subtext: 'Transparent Advisory Standards',
    icon: (
      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11V7a4 4 0 00-8 0v4c0 2.508 1.11 4.757 2.87 6.299m18-6.299c0 2.508-1.11 4.757-2.87 6.299m-1.92-12.74a3.5 3.5 0 11-4.95 4.95" />
      </svg>
    ),
    screenTitle: 'Investor Protection',
    screenSubtitle: 'Compliance & Transparency Audit',
    screenDetails: [
      { label: 'KYC Standards', value: '100% Digital & Paperless' },
      { label: 'Fee Structure', value: 'Fully Disclosed' },
      { label: 'NRI Compliances', value: 'DTAA / FEMA Guidelines' },
      { label: 'Brokerage / Commissions', value: 'Zero Hidden Charges' }
    ],
    screenBadge: 'COMPLIANT DESK',
    screenIcon: (
      <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30 shadow-[0_0_15px_rgba(201,146,42,0.2)]">
        <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v18m-9-9h18M6.25 6.25l11.5 11.5M6.25 17.75l11.5-11.5" />
        </svg>
      </div>
    )
  },
  {
    index: 3,
    title: 'NJ Client Desk',
    subtext: 'Empanelled Platinum Partner',
    icon: (
      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    screenTitle: 'NJ Client Desk',
    screenSubtitle: 'Integrated Portfolio Platforms',
    screenDetails: [
      { label: 'Empanelled Partner', value: 'Since 2010' },
      { label: 'Wealth Desk Status', value: 'Platinum Distributor' },
      { label: 'Client Portals', value: 'NJ Client Desk App' },
      { label: 'Transactions', value: 'Instant Mutual Funds' }
    ],
    screenBadge: 'STRATEGIC PARTNER',
    screenIcon: (
      <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30 shadow-[0_0_15px_rgba(201,146,42,0.2)]">
        <svg className="w-8 h-8 text-gold" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m.94-3.197a5.971 5.971 0 00-.94 3.197M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a2 2 0 11-4 0 2 2 0 014 0zM7 12a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      </div>
    )
  },
  {
    index: 4,
    title: 'Prudent Client Desk',
    subtext: 'One-Click Digital Transactions',
    icon: (
      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    screenTitle: 'Prudent Client Desk',
    screenSubtitle: 'One-Click Execution Portal',
    screenDetails: [
      { label: 'App Execution', value: 'Paperless SIP Setup' },
      { label: 'Redemptions', value: 'Instant Bank Payouts' },
      { label: 'Tracking', value: 'Active Portfolio Sync' },
      { label: 'Security', value: '256-Bit Encrypted' }
    ],
    screenBadge: 'TRANSACTIONS DESK',
    screenIcon: (
      <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center border border-emerald-500/25 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
        <svg className="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
    )
  },
  {
    index: 5,
    title: 'Prudent Partner',
    subtext: 'Diverse Mutual Fund Offerings',
    icon: (
      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
      </svg>
    ),
    screenTitle: 'Prudent Portal',
    screenSubtitle: 'Multi-Asset Advisory Hub',
    screenDetails: [
      { label: 'Partner Status', value: 'Empanelled Broker' },
      { label: 'Asset Reach', value: '5,000+ Active Schemes' },
      { label: 'Digital Audits', value: 'Monthly Portfolio Reports' },
      { label: 'System Access', value: 'Prudent Desk Gateway' }
    ],
    screenBadge: 'PRODUCT GATEWAY',
    screenIcon: (
      <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30 shadow-[0_0_15px_rgba(201,146,42,0.2)]">
        <svg className="w-8 h-8 text-gold animate-bounce" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 3v16.5c0 .414.336.75.75.75H21m-16.5-3l5.25-5.25 3 3 6.75-6.75M21 9h-3.75V5.25" />
        </svg>
      </div>
    )
  }
];
const renderPhoneScreen = (index) => {
  if (index === 0) { // AMFI
    return (
      <div className="w-[185px] h-[185px] rounded-full border border-white/20 flex flex-col items-center justify-center p-4 bg-white/[0.02] shadow-[0_0_30px_rgba(255,255,255,0.02)] select-none">
        <span className="text-gold font-sans font-semibold text-[13px] md:text-[14px] tracking-[0.18em] mb-1">AMFI</span>
        <span className="text-white font-sans font-black text-[20px] md:text-[22px] tracking-[0.05em] leading-none text-center">REGISTERED</span>
        <span className="text-white/40 font-sans text-[10px] md:text-[11px] tracking-[0.12em] mt-2">MUTUAL FUNDS</span>
      </div>
    );
  } else if (index === 1) { // IRDAI
    return (
      <div className="w-[185px] h-[185px] rounded-full border border-white/20 flex flex-col items-center justify-center p-4 bg-white/[0.02] shadow-[0_0_30px_rgba(255,255,255,0.02)] select-none">
        <span className="text-gold font-sans font-semibold text-[13px] md:text-[14px] tracking-[0.18em] mb-1">IRDAI</span>
        <span className="text-white font-sans font-black text-[20px] md:text-[22px] tracking-[0.05em] leading-none text-center">LICENSE</span>
        <span className="text-white/40 font-sans text-[10px] md:text-[11px] tracking-[0.12em] mt-2">INSURANCE</span>
      </div>
    );
  } else if (index === 2) { // SEBI
    return (
      <div className="w-[185px] h-[185px] rounded-full border border-white/20 flex flex-col items-center justify-center p-4 bg-white/[0.02] shadow-[0_0_30px_rgba(255,255,255,0.02)] select-none">
        <span className="text-gold font-sans font-semibold text-[13px] md:text-[14px] tracking-[0.18em] mb-1">SEBI</span>
        <span className="text-white font-sans font-black text-[20px] md:text-[22px] tracking-[0.05em] leading-none text-center">COMPLIANT</span>
        <span className="text-white/40 font-sans text-[10px] md:text-[11px] tracking-[0.12em] mt-2">STANDARDS</span>
      </div>
    );
  } else if (index === 3) { // NJ Client Desk
    return (
      <div className="border border-gold/80 p-1.5 rounded-lg w-[185px] h-[185px] flex items-center justify-center bg-white/[0.01] select-none">
        <div className="border border-white/20 h-full w-full flex flex-col items-center justify-center p-4 rounded-md">
          <span className="font-serif italic text-goldLight text-[14px] md:text-[15px] tracking-wide mb-1.5">Partner</span>
          <span className="text-white font-sans font-extrabold text-[14px] md:text-[16px] tracking-[0.05em] leading-tight text-center mb-3">NJ CLIENT DESK</span>
          <div className="bg-gold text-[#071324] font-sans font-bold px-4 py-1 text-[11px] md:text-[12px] tracking-wider rounded-sm uppercase">2026</div>
        </div>
      </div>
    );
  } else if (index === 4) { // Prudent Client Desk
    return (
      <div className="border border-gold/80 p-1.5 rounded-lg w-[185px] h-[185px] flex items-center justify-center bg-white/[0.01] select-none">
        <div className="border border-white/20 h-full w-full flex flex-col items-center justify-center p-4 rounded-md">
          <span className="font-serif italic text-goldLight text-[14px] md:text-[15px] tracking-wide mb-1.5">Partner</span>
          <span className="text-white font-sans font-extrabold text-[13px] md:text-[15px] tracking-[0.05em] leading-tight text-center mb-3">PRUDENT CLIENT DESK</span>
          <div className="bg-gold text-[#071324] font-sans font-bold px-4 py-1 text-[11px] md:text-[12px] tracking-wider rounded-sm uppercase">DIGITAL</div>
        </div>
      </div>
    );
  } else { // Prudent
    return (
      <div className="border border-gold/80 p-1.5 rounded-lg w-[185px] h-[185px] flex items-center justify-center bg-white/[0.01] select-none">
        <div className="border border-white/20 h-full w-full flex flex-col items-center justify-center p-4 rounded-md">
          <span className="font-serif italic text-goldLight text-[14px] md:text-[15px] tracking-wide mb-1.5">Partner</span>
          <span className="text-white font-sans font-extrabold text-[18px] md:text-[20px] tracking-[0.05em] leading-tight text-center mb-3">PRUDENT</span>
          <div className="bg-gold text-[#071324] font-sans font-bold px-4 py-1 text-[11px] md:text-[12px] tracking-wider rounded-sm uppercase">MULTI-ASSET</div>
        </div>
      </div>
    );
  }
};

const CredentialsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const autoplayRef = useRef(null);

  // Monitor screen size for animations
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Autoplay intervals setup
  useEffect(() => {
    if (isPlaying) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % credentialsData.length);
      }, 4500);
    }

    return () => {
      if (autoplayRef.current) clearInterval(autoplayRef.current);
    };
  }, [isPlaying]);

  // Handle manual item selection click
  const handleItemSelect = (index) => {
    setActiveIndex(index);
    // Restart autoplay countdown
    if (autoplayRef.current) clearInterval(autoplayRef.current);
    if (isPlaying) {
      autoplayRef.current = setInterval(() => {
        setActiveIndex((prevIndex) => (prevIndex + 1) % credentialsData.length);
      }, 4500);
    }
  };

  return (
    <section
      id="credentials"
      className="bg-cream py-[4.5rem] w-full overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-[3.5rem] max-w-2xl mx-auto">
          <span className="text-gold text-[11px] tracking-[0.2em] uppercase font-semibold mb-2 block">
            Registrations
          </span>
          <h2 className="font-serif text-[32px] md:text-[40px] text-navy font-bold leading-tight mb-4">
            Verified Credentials & Compliances
          </h2>
          <p className="text-muted text-[15px] md:text-[16px] leading-relaxed">
            Every transaction, advice, and portfolio audit is regulated by national compliance boards to protect your family's future.
          </p>
        </div>

        {/* Showcase Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-center relative">

          {/* Column 1: Regulatory Compliance (Left Card) */}
          <motion.div
            initial={isMobile ? { y: 120, opacity: 0 } : { x: "70%", opacity: 0 }}
            whileInView={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
            className="order-2 md:order-1 md:col-span-4 flex flex-col gap-6 relative z-10"
          >
            <div className="bg-white border border-navy/10 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute -left-12 -top-12 w-28 h-28 bg-[#faf8f4] rounded-full blur-2xl pointer-events-none" />

              <div className="mb-4">
                <span className="text-gold text-[11px] font-semibold tracking-widest uppercase">SECTION A</span>
                <h3 className="font-serif text-[18px] text-navy font-bold mt-1">Regulatory Licenses</h3>
                <p className="text-[12px] text-muted mt-1">National financial registrations governed by government bodies.</p>
              </div>

              <div className="flex flex-col gap-3">
                {credentialsData.slice(0, 3).map((item) => {
                  const isActive = activeIndex === item.index;
                  return (
                    <div
                      key={item.index}
                      onClick={() => handleItemSelect(item.index)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl cursor-pointer select-none transition-all duration-300 border ${isActive
                          ? 'bg-[#0d2545]/5 border-gold shadow-[0_4px_15px_rgba(201,146,42,0.12)] scale-[1.02]'
                          : 'bg-white border-navy/10 hover:border-navy/20 hover:bg-[#faf8f4]'
                        }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors duration-300 ${isActive ? 'bg-[#0d2545]/10 text-navy' : 'bg-cream text-gold'
                        }`}>
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[14px] leading-tight font-semibold ${isActive ? 'text-navy' : 'text-textDark'
                          }`}>
                          {item.title}
                        </span>
                        <span className="text-[11px] text-muted mt-0.5 leading-snug">
                          {item.subtext}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Card Footer Graphic */}
              <div className="mt-6 pt-4 border-t border-navy/5 flex items-center justify-between text-navy/25">
                <span className="text-[10px] uppercase tracking-wider font-semibold">100% REGULATED DESK</span>
                <svg className="w-8 h-8 opacity-45" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751A11.956 11.956 0 0112 2.714z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Column 2: Central Smartphone Mockup (Center Card) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="order-1 md:order-2 md:col-span-4 flex justify-center items-center relative z-20"
          >

            {/* Outer CSS smartphone bezel */}
            <div className="border-[10px] border-[#08182d] rounded-[38px] bg-[#050f1a] relative shadow-[0_25px_60px_-15px_rgba(13,37,69,0.35)] w-[265px] md:w-[285px] h-[525px] md:h-[555px] overflow-hidden flex flex-col justify-between">

              {/* Dynamic Island Notch */}
              <div className="absolute top-2.5 left-1/2 -translate-x-1/2 w-[85px] h-[20px] bg-black rounded-full z-30 flex items-center justify-between px-2">
                <div className="w-1.5 h-1.5 rounded-full bg-blue-900" />
                <div className="w-3.5 h-1 bg-white/20 rounded-full" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
              </div>

              {/* Status bar (Time/battery indicators) */}
              <div className="flex justify-between items-center px-5 pt-6 pb-2 text-[10px] text-white/95 font-sans z-20">
                <span className="font-semibold select-none">09:41</span>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21l-12-18h24z" /></svg>
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24"><path d="M20 20h2v-16h-2v16zM14 20h2v-10h-2v10zM8 20h2v-4h-2v4zM2 20h2v-1h-2v1z" /></svg>
                  <div className="w-5 h-2.5 border border-white/70 rounded-[4px] p-[1px] flex items-center justify-start"><div className="h-full w-[80%] bg-white rounded-[2px]" /></div>
                </div>
              </div>

              {/* Phone screen content with fade transitions */}
              <div className="flex-1 relative flex flex-col bg-gradient-to-b from-[#0d2545] to-[#050f1a] text-white px-5 pt-2 pb-6 overflow-hidden select-none">

                {/* Visual grid pattern background inside smartphone */}
                <div className="absolute inset-0 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, scale: 0.96, y: 15 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.96, y: -15 }}
                    transition={{ duration: 0.35, ease: "easeInOut" }}
                    className="h-full flex flex-col items-center justify-center relative z-10"
                  >
                    {renderPhoneScreen(activeIndex)}

                  </motion.div>
                </AnimatePresence>

              </div>

              {/* Apple-style software home indicator bar */}
              <div className="w-full h-5 flex justify-center items-center pb-2 bg-[#050f1a]">
                <div className="w-[100px] h-[4px] bg-white/40 rounded-full" />
              </div>

            </div>
          </motion.div>

          {/* Column 3: Strategic Integrations (Right Card) */}
          <motion.div
            initial={isMobile ? { y: -120, opacity: 0 } : { x: "-70%", opacity: 0 }}
            whileInView={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
            className="order-3 md:col-span-4 flex flex-col gap-6 relative z-10"
          >
            <div className="bg-white border border-navy/10 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute -right-12 -bottom-12 w-28 h-28 bg-[#faf8f4] rounded-full blur-2xl pointer-events-none" />

              <div className="mb-4">
                <span className="text-gold text-[11px] font-semibold tracking-widest uppercase">SECTION B</span>
                <h3 className="font-serif text-[18px] text-navy font-bold mt-1">Strategic Integrations</h3>
                <p className="text-[12px] text-muted mt-1">Direct API platforms and transaction processing partners.</p>
              </div>

              <div className="flex flex-col gap-3">
                {credentialsData.slice(3, 6).map((item) => {
                  const isActive = activeIndex === item.index;
                  return (
                    <div
                      key={item.index}
                      onClick={() => handleItemSelect(item.index)}
                      className={`flex items-start gap-3 p-3.5 rounded-xl cursor-pointer select-none transition-all duration-300 border ${isActive
                          ? 'bg-[#0d2545]/5 border-gold shadow-[0_4px_15px_rgba(201,146,42,0.12)] scale-[1.02]'
                          : 'bg-white border-navy/10 hover:border-navy/20 hover:bg-[#faf8f4]'
                        }`}
                    >
                      <div className={`p-2 rounded-lg transition-colors duration-300 ${isActive ? 'bg-[#0d2545]/10 text-navy' : 'bg-cream text-gold'
                        }`}>
                        {item.icon}
                      </div>
                      <div className="flex flex-col">
                        <span className={`text-[14px] leading-tight font-semibold ${isActive ? 'text-navy' : 'text-textDark'
                          }`}>
                          {item.title}
                        </span>
                        <span className="text-[11px] text-muted mt-0.5 leading-snug">
                          {item.subtext}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Card Footer Graphic */}
              <div className="mt-6 pt-4 border-t border-navy/5 flex items-center justify-between text-navy/25">
                <span className="text-[10px] uppercase tracking-wider font-semibold">API LINK STABLE</span>
                <svg className="w-8 h-8 opacity-45" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                </svg>
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default CredentialsShowcase;
