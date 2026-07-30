import React from 'react';
import { motion } from 'framer-motion';

const ModernFramerHero = ({ handleScrollToSection }) => {
  const stats = [
    { value: '6,000+', label: 'Happy Families' },
    { value: '₹750Cr+', label: 'Assets Managed' },
    { value: '25+', label: 'Years Experience' },
    { value: '100+', label: 'Global NRI Clients' }
  ];

  const floatingBadges = [
    { icon: '📈', title: 'Asset Allocation', sub: 'Balanced Risk & Return' },
    { icon: '🛡️', title: 'AMFI Registered MFD', sub: 'ARN-12480 Verified' },
    { icon: '🌍', title: 'Global NRI Desk', sub: 'Cross-Border Solutions' }
  ];

  return (
    <div className="relative w-full min-h-[85vh] bg-[#071324] text-white flex flex-col justify-between overflow-hidden py-16 px-4 md:px-12 select-none">
      
      {/* Background Animated Gradient Mesh Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-gradient-to-r from-gold/20 via-blue-600/10 to-gold/20 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute -bottom-20 -right-20 w-[450px] h-[450px] bg-gold/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero Content Container */}
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center z-10 my-auto">
        
        {/* Left Column: Bold Hero Typography & Dual Action Buttons */}
        <div className="lg:col-span-7 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 backdrop-blur-md text-goldLight text-xs font-mono uppercase tracking-widest shadow-md"
          >
            <span className="w-2 h-2 rounded-full bg-gold animate-ping"></span>
            AMFI REGISTERED MUTUAL FUND DISTRIBUTOR &middot; AHMEDABAD
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-serif text-[42px] sm:text-[56px] md:text-[68px] font-bold leading-[1.08] text-white tracking-tight"
          >
            Smarter Wealth Planning for Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold via-goldLight to-amber-200">Family’s Future</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-white/80 text-[16px] sm:text-[18px] max-w-2xl leading-relaxed font-sans"
          >
            Tailored Mutual Funds, Insurance & NRI wealth advisory trusted by 6,000+ families across India & abroad since 2001.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-wrap items-center gap-4 pt-2"
          >
            <button
              onClick={() => handleScrollToSection('contact')}
              className="px-8 py-4 rounded-full bg-gold text-white font-semibold text-[15px] shadow-[0_10px_30px_rgba(201,146,42,0.4)] hover:bg-goldLight hover:scale-105 transition-all cursor-pointer flex items-center gap-3"
            >
              <span>Get Personalized Wealth Plan</span>
              <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs">
                &#8594;
              </span>
            </button>

            <button
              onClick={() => handleScrollToSection('calculator')}
              className="px-7 py-4 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-[15px] backdrop-blur-md transition-all cursor-pointer"
            >
              Calculate SIP Returns
            </button>
          </motion.div>
        </div>

        {/* Right Column: Floating Framer Bento Badges & Interactive Visual Card */}
        <div className="lg:col-span-5 relative flex flex-col gap-4">
          {floatingBadges.map((badge, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + idx * 0.15 }}
              whileHover={{ scale: 1.03, x: -6 }}
              className="bg-white/10 backdrop-blur-xl border border-white/15 rounded-3xl p-5 shadow-[0_20px_50px_rgba(0,0,0,0.3)] flex items-center gap-4 hover:border-gold/50 transition-all cursor-pointer"
            >
              <div className="w-13 h-13 rounded-2xl bg-gold/20 border border-gold/40 text-2xl flex items-center justify-center shrink-0 shadow-inner">
                {badge.icon}
              </div>
              <div>
                <h4 className="font-serif font-bold text-white text-[17px] leading-snug">
                  {badge.title}
                </h4>
                <p className="text-white/60 text-[12.5px] font-sans mt-0.5">{badge.sub}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom Floating Stats Strip */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="max-w-7xl mx-auto w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 pt-8 border-t border-white/10 z-10"
      >
        {stats.map((st, sIdx) => (
          <div key={sIdx} className="bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-4 text-center">
            <span className="font-serif text-[28px] md:text-[36px] font-extrabold text-gold leading-none block font-mono">
              {st.value}
            </span>
            <span className="text-white/60 text-[12px] font-medium tracking-wide block mt-1">
              {st.label}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default ModernFramerHero;
