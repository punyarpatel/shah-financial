import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const credentialsData = [
  {
    index: 0,
    title: 'Rajesh Shah',
    subtext: 'Founder & Principal Advisor',
    icon: (
      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
      </svg>
    ),
    screenTitle: 'Rajesh Shah',
    screenSubtitle: 'Founder & Principal Advisor',
    screenDetails: [
      { label: 'Experience', value: '25+ Years' },
      { label: 'Role', value: 'Principal Advisory' },
      { label: 'Expertise', value: 'Mutual Funds & Insurance' },
      { label: 'Status', value: 'AMFI / IRDAI Certified' }
    ],
    screenBadge: 'FOUNDER',
    screenIcon: (
      <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30 shadow-[0_0_15px_rgba(201,146,42,0.2)]">
        <span className="text-gold font-serif font-bold text-xl">RS</span>
      </div>
    )
  },
  {
    index: 1,
    title: 'Nisha Shah',
    subtext: 'NRI Services Head',
    icon: (
      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 009 11V7a4 4 0 00-8 0v4c0 2.508 1.11 4.757 2.87 6.299m18-6.299c0 2.508-1.11 4.757-2.87 6.299m-1.92-12.74a3.5 3.5 0 11-4.95 4.95" />
      </svg>
    ),
    screenTitle: 'Nisha Shah',
    screenSubtitle: 'NRI Services Head',
    screenDetails: [
      { label: 'Specialization', value: 'Cross-Border Wealth' },
      { label: 'Tax Advisory', value: 'DTAA Guidance' },
      { label: 'NRI Clients', value: '100+ Families Globally' },
      { label: 'Compliance', value: 'FEMA Compliant Setup' }
    ],
    screenBadge: 'NRI HEAD',
    screenIcon: (
      <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30 shadow-[0_0_15px_rgba(201,146,42,0.2)]">
        <span className="text-gold font-serif font-bold text-xl">NS</span>
      </div>
    )
  },
  {
    index: 2,
    title: 'Arjun Shah',
    subtext: 'Client Relations Specialist',
    icon: (
      <svg className="w-5 h-5 text-gold" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    screenTitle: 'Arjun Shah',
    screenSubtitle: 'Client Relations',
    screenDetails: [
      { label: 'Role', value: 'Client Support & Operations' },
      { label: 'Desk Status', value: 'Active Portfolio Sync' },
      { label: 'Response Time', value: '< 2 Hours on WhatsApp' },
      { label: 'Client Base', value: '2,500+ Local Families' }
    ],
    screenBadge: 'CLIENT FOCUS',
    screenIcon: (
      <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center border border-gold/30 shadow-[0_0_15px_rgba(201,146,42,0.2)]">
        <span className="text-gold font-serif font-bold text-xl">AS</span>
      </div>
    )
  }
];

const renderPhoneScreen = (index) => {
  if (index === 0) { // Rajesh Shah
    return (
      <div className="w-[185px] h-[185px] rounded-full border border-white/20 flex flex-col items-center justify-center p-4 bg-white/[0.02] shadow-[0_0_30px_rgba(255,255,255,0.02)] select-none">
        <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center border border-gold/40 text-gold text-2xl font-serif font-bold mb-2">
          RS
        </div>
        <span className="text-white font-sans font-bold text-[15px] leading-tight text-center">Rajesh Shah</span>
        <span className="text-goldLight font-sans text-[10px] tracking-[0.1em] mt-1 text-center font-medium">FOUNDER & ADVISOR</span>
      </div>
    );
  } else if (index === 1) { // Nisha Shah
    return (
      <div className="w-[185px] h-[185px] rounded-full border border-white/20 flex flex-col items-center justify-center p-4 bg-white/[0.02] shadow-[0_0_30px_rgba(255,255,255,0.02)] select-none">
        <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center border border-gold/40 text-gold text-2xl font-serif font-bold mb-2">
          NS
        </div>
        <span className="text-white font-sans font-bold text-[15px] leading-tight text-center">Nisha Shah</span>
        <span className="text-goldLight font-sans text-[10px] tracking-[0.1em] mt-1 text-center font-medium">NRI SERVICES HEAD</span>
      </div>
    );
  } else { // Arjun Shah
    return (
      <div className="w-[185px] h-[185px] rounded-full border border-white/20 flex flex-col items-center justify-center p-4 bg-white/[0.02] shadow-[0_0_30px_rgba(255,255,255,0.02)] select-none">
        <div className="w-16 h-16 rounded-full bg-gold/15 flex items-center justify-center border border-gold/40 text-gold text-2xl font-serif font-bold mb-2">
          AS
        </div>
        <span className="text-white font-sans font-bold text-[15px] leading-tight text-center">Arjun Shah</span>
        <span className="text-goldLight font-sans text-[10px] tracking-[0.1em] mt-1 text-center font-medium">CLIENT RELATIONS</span>
      </div>
    );
  }
};

const CredentialsShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const autoplayRef = useRef(null);

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
      className="bg-[#faf8f4] py-[4.5rem] w-full overflow-hidden"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      <div className="max-w-7xl mx-auto px-4">

        {/* Section Header */}
        <div className="text-center mb-[3.5rem] max-w-2xl mx-auto">
          <span className="text-gold text-[11px] tracking-[0.2em] uppercase font-semibold mb-2 block">
            Our Team
          </span>
          <h2 className="font-serif text-[32px] md:text-[40px] text-navy font-bold leading-tight mb-4">
            The People Behind Your Wealth
          </h2>
          <p className="text-muted text-[15px] md:text-[16px] leading-relaxed">
            Meet the dedicated financial advisors and relationship managers focused on protecting and growing your assets.
          </p>
        </div>

        {/* Showcase Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 items-center justify-center">

          {/* Left Column: Our Advisory Team (Left Card) */}
          <motion.div
            initial={isMobile ? { y: 120, opacity: 0 } : { x: "-30%", opacity: 0 }}
            whileInView={isMobile ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.85, ease: "easeOut", delay: 0.15 }}
            className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-2 flex flex-col gap-6 relative z-10"
          >
            <div className="bg-white border border-navy/10 rounded-2xl p-6 shadow-sm relative overflow-hidden">
              <div className="absolute -left-12 -top-12 w-28 h-28 bg-[#faf8f4] rounded-full blur-2xl pointer-events-none" />

              <div className="mb-4">
                <span className="text-gold text-[11px] font-semibold tracking-widest uppercase">OUR ADVISORY TEAM</span>
                <h3 className="font-serif text-[18px] text-navy font-bold mt-1">Meet Our Advisors</h3>
                <p className="text-[12px] text-muted mt-1">Select an advisor to see their qualifications and credentials.</p>
              </div>

              <div className="flex flex-col gap-3">
                {credentialsData.map((item) => {
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
                <span className="text-[10px] uppercase tracking-wider font-semibold">EXPERT WEALTH ADVISORY</span>
                <svg className="w-8 h-8 opacity-45" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m.94-3.197a5.971 5.971 0 00-.94 3.197M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a2 2 0 11-4 0 2 2 0 014 0zM7 12a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Smartphone Mockup (Center Card) */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.65, ease: "easeOut" }}
            className="col-span-12 md:col-span-6 lg:col-span-5 lg:col-start-8 flex justify-center items-center relative z-20"
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

                    {/* Team Details on simulated phone screen */}
                    <div className="mt-6 w-full space-y-2.5">
                      <div className="text-[10px] text-gold uppercase tracking-[0.2em] font-bold border-b border-white/10 pb-1.5 text-center">
                        {credentialsData[activeIndex].screenBadge}
                      </div>
                      <div className="text-white text-[15px] font-serif font-semibold text-center">
                        {credentialsData[activeIndex].screenSubtitle}
                      </div>
                      <div className="space-y-1.5 pt-1">
                        {credentialsData[activeIndex].screenDetails.map((detail, idx) => (
                          <div key={idx} className="flex justify-between text-[11.5px] leading-tight">
                            <span className="text-white/40 font-medium">{detail.label}</span>
                            <span className="text-white/80 text-right font-semibold">{detail.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                  </motion.div>
                </AnimatePresence>

              </div>

              {/* Apple-style software home indicator bar */}
              <div className="w-full h-5 flex justify-center items-center pb-2 bg-[#050f1a]">
                <div className="w-[100px] h-[4px] bg-white/40 rounded-full" />
              </div>

            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
};

export default CredentialsShowcase;
