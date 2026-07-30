import React, { useState } from 'react';
import { motion, LayoutGroup } from 'framer-motion';

const teamMembers = [
  {
    id: 1,
    name: 'Piyush Shah',
    role: 'Founder, Director & CEO',
    tag: 'FOUNDER | CEO',
    details: '25+ Years of advisory excellence in Mutual Funds & Insurance.',
    badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    avatar: 'PS',
    bgActive: 'bg-gradient-to-b from-[#0d2545] via-[#132d54] to-[#1a3866]',

  },
  {
    id: 2,
    name: 'Rutvik Shah',
    role: 'Managing Director & Partner',
    tag: 'MANAGING DIRECTOR',
    details: 'Specializing in portfolio allocation, SIP compounding, and equity market analysis.',
    badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    avatar: 'RS',
    bgActive: 'bg-gradient-to-b from-[#0b2b24] via-[#103d33] to-[#175245]',

  },
  {
    id: 3,
    name: 'Reena Shah',
    role: 'Co-founder',
    tag: 'CO-FOUNDER',
    badgeStyle: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    avatar: 'RS',
    bgActive: 'bg-gradient-to-b from-[#1e1b4b] via-[#2e2a72] to-[#3b358c]'
  }
];

const TeamMemberCardCarousel = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % teamMembers.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + teamMembers.length) % teamMembers.length);
  };

  return (
    <LayoutGroup>
      <div className="flex flex-col items-center justify-center my-4 select-none w-full max-w-5xl mx-auto px-4">
        {/* Header Controls */}
        <div className="flex items-center justify-end w-full mb-6">
          {/* Carousel Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={goPrev}
              className="w-10 h-10 rounded-full bg-navy border border-white/20 text-white flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 cursor-pointer shadow-md active:scale-95"
              aria-label="Previous Team Member"
            >
              &#8592;
            </button>
            <button
              onClick={goNext}
              className="w-10 h-10 rounded-full bg-navy border border-white/20 text-white flex items-center justify-center hover:bg-gold hover:border-gold transition-all duration-300 cursor-pointer shadow-md active:scale-95"
              aria-label="Next Team Member"
            >
              &#8594;
            </button>
          </div>
        </div>

        {/* Smooth Accordion Track */}
        <div className="flex items-stretch justify-center gap-4 sm:gap-6 w-full py-4 min-h-[460px]">
          {teamMembers.map((member, idx) => {
            const isActive = idx === activeIndex;

            return (
              <motion.div
                key={member.id}
                layout
                onClick={() => setActiveIndex(idx)}
                transition={{
                  type: 'spring',
                  stiffness: 220,
                  damping: 28,
                  mass: 0.9
                }}
                className={`relative rounded-[32px] p-6 sm:p-7 cursor-pointer border shadow-xl transition-colors duration-500 flex flex-col justify-between overflow-hidden ${isActive
                  ? 'flex-[2.8] border-gold/60 ring-2 ring-gold/30 shadow-[0_20px_50px_rgba(13,37,69,0.4)] ' + member.bgActive
                  : 'flex-1 border-white/10 bg-navy/80 hover:bg-navy/90 hover:border-white/20'
                  }`}
              >
                {/* Top Row: Avatar & Badge */}
                <div className="flex justify-between items-start z-10 w-full">
                  <motion.div
                    layout="position"
                    className={`rounded-2xl flex items-center justify-center font-serif font-bold text-white shadow-md border border-white/20 shrink-0 ${isActive ? 'w-13 h-13 text-xl bg-white/15' : 'w-10 h-10 text-sm bg-white/10'
                      }`}
                  >
                    {member.avatar}
                  </motion.div>
                  <span className={`text-[9.5px] font-extrabold px-3 py-1 rounded-full border uppercase tracking-wider shrink-0 ${member.badgeStyle}`}>
                    {member.tag}
                  </span>
                </div>

                {/* Center Title & Role */}
                <motion.div layout="position" className="my-auto py-3 z-10">
                  <span className="text-[9.5px] text-white/50 font-mono uppercase tracking-[0.2em] block mb-1">
                    DRISHTI WEALTH ADVISOR
                  </span>
                  <h3 className={`font-serif font-bold text-white leading-tight ${isActive ? 'text-[22px] sm:text-[26px]' : 'text-[17px] sm:text-[19px]'}`}>
                    {member.name}
                  </h3>
                  <p className={`font-semibold text-goldLight ${isActive ? 'text-[13px] mt-1' : 'text-[12px] mt-0.5'}`}>
                    {member.role}
                  </p>
                </motion.div>

                {/* Bottom Details Section with Smooth Opacity Crossfade */}
                <div className="border-t border-white/15 pt-4 z-10 w-full min-h-[90px] flex flex-col justify-end">
                  <motion.p
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0.4 }}
                    transition={{ duration: 0.3 }}
                    className={`text-white/80 leading-relaxed ${isActive ? 'text-[12px]' : 'text-[11px] line-clamp-2'}`}
                  >
                    {member.details}
                  </motion.p>

                  <motion.div
                    initial={false}
                    animate={{ opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.25 }}
                    className="flex justify-end items-center text-[10px] font-mono text-goldLight mt-3"
                  >
                    <span className="font-bold text-emerald-400">&bull; VERIFIED</span>
                  </motion.div>
                </div>

                {/* Ambient Glow inside Card */}
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold/15 rounded-full blur-3xl pointer-events-none"
                  />
                )}
              </motion.div>
            );
          })}
        </div>
      </div>
    </LayoutGroup>
  );
};

export default TeamMemberCardCarousel;
