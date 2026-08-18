import React, { useState } from 'react';
import { motion, LayoutGroup, AnimatePresence } from 'framer-motion';

const teamMembers = [
  {
    id: 1,
    name: 'Piyush Shah',
    role: 'Founder, Director & CEO',
    tag: 'FOUNDER | CEO',
    details: 'The driving force behind Drishti Wealth since its inception over 25 years ago, leading the firm’s growth with an unwavering commitment to trust, integrity, and helping clients achieve their financial goals.',
    badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    avatar: 'PS',
    bgActive: 'bg-gradient-to-b from-[#0d2545] via-[#132d54] to-[#1a3866]',
    image: '/piyush_shah.jpg',
    cropStyle: 'object-cover object-[center_15%]'
  },
  {
    id: 2,
    name: 'Rutvik Shah',
    role: 'Managing Director & Partner',
    tag: 'MANAGING DIRECTOR',
    details: 'Committed to combining analytical thinking, business acumen, and a forward-looking approach to deliver thoughtful solutions while carrying forward Drishti Wealth’s legacy of trust and long-term relationships.',
    badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    avatar: 'RS',
    bgActive: 'bg-gradient-to-b from-[#0b2b24] via-[#103d33] to-[#175245]',
    image: '/rutvik_shah.jpg',
    cropStyle: 'object-cover object-[center_15%]'
  },
  {
    id: 3,
    name: 'Reena Shah',
    role: 'Co-founder',
    tag: 'CO-FOUNDER',
    details: 'A founding pillar of Drishti Wealth, instrumental in the firm’s journey through unwavering support, guidance, and a strong commitment to shape its growth and long-term vision.',
    badgeStyle: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    avatar: 'RS',
    bgActive: 'bg-gradient-to-b from-[#1e1b4b] via-[#2e2a72] to-[#3b358c]',
    image: '/reena_shah.jpg',
    cropStyle: 'object-cover object-[center_15%]'
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
        <div className="flex items-center justify-between w-full mb-6">
          <div className="text-[12px] font-mono text-gold tracking-widest uppercase bg-gold/10 px-3 py-1.5 rounded-full border border-gold/20">
            Team Member {activeIndex + 1} of {teamMembers.length}
          </div>
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
        <div className="flex items-stretch justify-center gap-4 sm:gap-6 w-full py-2 min-h-[460px]">
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
                className={`relative rounded-[32px] p-6 sm:p-7 border shadow-xl transition-colors duration-500 overflow-hidden ${
                  isActive
                    ? 'w-full md:flex-[2.8] border-gold/60 ring-2 ring-gold/30 shadow-[0_20px_50px_rgba(13,37,69,0.4)] ' + member.bgActive
                    : 'hidden md:block md:flex-1 border-white/10 bg-navy/80 hover:bg-navy/90 hover:border-white/20 cursor-pointer'
                }`}
              >
                <div className="flex flex-col md:flex-row h-full w-full justify-between items-stretch gap-6 relative z-10">
                  {/* Left Column Text Content */}
                  <div className="flex-1 flex flex-col justify-between min-w-0">
                    {/* Top Row: Avatar & Badge */}
                    <div className="flex justify-between items-start w-full">
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
                    <motion.div layout="position" className="my-auto py-3">
                      <span className="text-[9.5px] text-white/50 font-mono uppercase tracking-[0.2em] block mb-1">
                        DRISHTI WEALTH TEAM
                      </span>
                      <h3 className={`font-serif font-bold text-white leading-tight ${isActive ? 'text-[22px] sm:text-[26px]' : 'text-[17px] sm:text-[19px]'}`}>
                        {member.name}
                      </h3>
                      <p className={`font-semibold text-goldLight ${isActive ? 'text-[13px] mt-1' : 'text-[12px] mt-0.5'}`}>
                        {member.role}
                      </p>
                    </motion.div>

                    {/* Bottom Details Section */}
                    <div className="border-t border-white/15 pt-4 w-full min-h-[85px] flex flex-col justify-end">
                      <motion.p
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0.4 }}
                        transition={{ duration: 0.3 }}
                        className={`text-white/80 leading-relaxed ${isActive ? 'text-[12.5px] sm:text-[13px]' : 'text-[11px] line-clamp-2'}`}
                      >
                        {member.details}
                      </motion.p>

                      <motion.div
                        initial={false}
                        animate={{ opacity: isActive ? 1 : 0 }}
                        transition={{ duration: 0.25 }}
                        className="flex justify-end items-center text-[10px] font-mono text-goldLight mt-3"
                      >
                        <span className="font-bold text-emerald-400">&bull; VERIFIED DISTRIBUTOR</span>
                      </motion.div>
                    </div>
                  </div>

                  {/* Right Column: Member Photo */}
                  <AnimatePresence>
                    {isActive && member.image && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.85, x: 25 }}
                        animate={{ opacity: 1, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.85, x: 25 }}
                        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                        className="shrink-0 my-auto ml-0 md:ml-4 self-center md:self-stretch flex items-center justify-center"
                      >
                        <div className="relative group overflow-hidden rounded-2xl border-2 border-gold/40 shadow-[0_12px_30px_rgba(0,0,0,0.5)] w-40 h-52 sm:w-44 sm:h-56 md:w-48 md:h-64 bg-black/30">
                          <img
                            src={member.image}
                            alt={member.name}
                            className={`w-full h-full object-cover transform transition-all duration-500 ${member.cropStyle || 'object-top'}`}
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
                          <div className="absolute bottom-2 left-2 right-2 text-center bg-black/40 backdrop-blur-md rounded-lg py-1 border border-white/10">
                            <span className="text-[10px] font-serif font-medium text-goldLight tracking-wider block">
                              {member.name}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
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

        {/* Mobile Pagination Dots */}
        <div className="flex items-center justify-center gap-2 mt-4 md:hidden">
          {teamMembers.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveIndex(idx)}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                idx === activeIndex ? 'w-8 bg-gold' : 'w-2.5 bg-navy/30'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </LayoutGroup>
  );
};

export default TeamMemberCardCarousel;

