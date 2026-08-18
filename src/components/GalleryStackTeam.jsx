import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const teamMembers = [
  {
    id: 1,
    name: 'Piyush Shah',
    role: 'Founder & Principal',
    tag: 'FOUNDER',
    details: '25+ Years of leadership excellence in Mutual Funds & Wealth Management.',
    badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    avatar: 'PS',
    bgGradient: 'from-[#0d2545] via-[#132d54] to-[#1a3866]',
    rotation: -4
  },
  {
    id: 2,
    name: 'Rutvik Shah',
    role: 'Wealth Specialist & Partner',
    tag: 'WEALTH SPECIALIST',
    details: 'Specializing in portfolio allocation, SIP compounding, and equity market analysis.',
    badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    avatar: 'RS',
    bgGradient: 'from-[#0b2b24] via-[#103d33] to-[#175245]',
    rotation: 5
  },
  {
    id: 3,
    name: 'Reena Shah',
    role: 'Client Relations & NRI Desk',
    tag: 'CLIENT RELATIONS',
    details: 'Dedicated client support, paperless KYC, and cross-border client operations.',
    badgeStyle: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    avatar: 'RS',
    bgGradient: 'from-[#1e1b4b] via-[#2e2a72] to-[#3b358c]',
    rotation: -3
  }
];

const GalleryStackTeam = () => {
  // Array order representing stacked cards (top card is first element)
  const [cards, setCards] = useState([0, 1, 2]);

  // Tap top card to cycle it to back of stack (Framer swipe-to-back interaction)
  const handleCycleCard = () => {
    setCards((prev) => {
      const next = [...prev];
      const top = next.shift();
      next.push(top);
      return next;
    });
  };

  return (
    <div className="flex flex-col items-center justify-center my-8 select-none">
      {/* Tap Instruction Header */}
      <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-gold tracking-widest uppercase bg-gold/10 px-4 py-2 rounded-full border border-gold/20 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-gold animate-ping"></span>
        Tap Card Stack to Cycle Team Members
      </div>

      {/* Gallery Stack Container */}
      <div
        onClick={handleCycleCard}
        className="relative w-[320px] sm:w-[360px] h-[400px] flex items-center justify-center cursor-pointer group"
      >
        {cards.map((memberIndex, stackPos) => {
          const member = teamMembers[memberIndex];
          const isTop = stackPos === 0;

          // Compute stack offsets (stacked cards peek from behind with slight scale & offset)
          const scale = 1 - stackPos * 0.05;
          const yOffset = stackPos * 14;
          const rotation = isTop ? 0 : member.rotation * (stackPos + 1);

          return (
            <motion.div
              key={member.id}
              layoutId={`card-${member.id}`}
              initial={false}
              animate={{
                scale,
                y: yOffset,
                rotate: rotation,
                zIndex: 30 - stackPos
              }}
              whileTap={isTop ? { x: 400, opacity: 0, scale: 0.85, rotate: 15 } : {}}
              transition={{
                type: 'spring',
                stiffness: 240,
                damping: 22
              }}
              className={`absolute w-[280px] sm:w-[310px] h-[360px] rounded-[28px] bg-gradient-to-b ${member.bgGradient} text-white p-7 border border-white/20 shadow-[0_25px_60px_rgba(7,19,36,0.5)] flex flex-col justify-between overflow-hidden cursor-pointer hover:border-gold/60 transition-colors`}
            >
              {/* Top Row: Avatar & Status Badge */}
              <div className="flex justify-between items-start z-10">
                <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 text-gold font-serif font-bold text-lg flex items-center justify-center shadow-md">
                  {member.avatar}
                </div>
                <span className={`text-[9.5px] font-extrabold px-3 py-1 rounded-full border uppercase tracking-wider ${member.badgeStyle}`}>
                  {member.tag}
                </span>
              </div>

              {/* Middle Row: Name & Role */}
              <div className="my-auto py-4 z-10">
                <span className="text-[10px] text-white/50 font-mono uppercase tracking-[0.2em] block mb-1">
                  DRISHTI WEALTH ROSTER
                </span>
                <h3 className="font-serif font-bold text-white text-[22px] leading-tight mb-1">
                  {member.name}
                </h3>
                <p className="text-[13px] font-semibold text-goldLight">{member.role}</p>
              </div>

              {/* Bottom Row: Details Bio & Tap Indicator */}
              <div className="border-t border-white/15 pt-4 z-10">
                <p className="text-[11.5px] text-white/80 leading-relaxed mb-4">
                  {member.details}
                </p>

                <div className="flex items-center justify-between text-[10px] font-mono text-white/50">
                  <span>0{member.id} / 03</span>
                  <span className="text-goldLight flex items-center gap-1 font-semibold">
                    TAP TO CYCLE ↻
                  </span>
                </div>
              </div>

              {/* Ambient Background Glow inside Card */}
              <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gold/10 rounded-full blur-2xl pointer-events-none" />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default GalleryStackTeam;
