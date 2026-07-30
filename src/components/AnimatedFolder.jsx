import React, { useState } from 'react';
import { motion } from 'framer-motion';

const defaultTeamMembers = [
  {
    name: 'Piyush Shah',
    role: 'Founder & Principal Advisor',
    tag: 'FOUNDER',
    details: '25+ Years of advisory excellence in Mutual Funds & Wealth Management.',
    badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/40',
    avatar: 'PS'
  },
  {
    name: 'Rutvik Shah',
    role: 'Wealth Advisor & Partner',
    tag: 'WEALTH ADVISOR',
    details: 'Specializing in portfolio allocation, SIP compounding, and market analysis.',
    badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40',
    avatar: 'RS'
  },
  {
    name: 'Reena Shah',
    role: 'Client Relations & NRI Desk',
    tag: 'CLIENT RELATIONS',
    details: 'Dedicated advisory support, paperless KYC, and cross-border client operations.',
    badgeStyle: 'bg-blue-500/20 text-blue-300 border-blue-500/40',
    avatar: 'RS'
  }
];

const AnimatedFolder = ({ members = defaultTeamMembers }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);

  // Staggered spring transition variants for authentic Framer-like folder fan out
  const cardVariants = [
    // Card 0: Left Card
    {
      closed: { y: 0, x: 0, rotate: 0, scale: 0.8, zIndex: 15 },
      open: { y: -230, x: -145, rotate: -16, scale: 1, zIndex: 15 },
      hover: { y: -260, x: -145, rotate: -10, scale: 1.06, zIndex: 50 }
    },
    // Card 1: Center Card
    {
      closed: { y: 0, x: 0, rotate: 0, scale: 0.85, zIndex: 25 },
      open: { y: -270, x: 0, rotate: 0, scale: 1.04, zIndex: 25 },
      hover: { y: -300, x: 0, rotate: 0, scale: 1.1, zIndex: 50 }
    },
    // Card 2: Right Card
    {
      closed: { y: 0, x: 0, rotate: 0, scale: 0.8, zIndex: 15 },
      open: { y: -230, x: 145, rotate: 16, scale: 1, zIndex: 15 },
      hover: { y: -260, x: 145, rotate: 10, scale: 1.06, zIndex: 50 }
    }
  ];

  return (
    <div className="flex flex-col items-center justify-center my-12 select-none">
      {/* Main Folder Outer Wrapper with High Perspective & Ample Top Margin for Cards */}
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-[340px] sm:w-[440px] h-[440px] flex items-end justify-center cursor-pointer group"
        style={{ perspective: '1800px' }}
      >
        {/* Back Folder Wall / Pocket */}
        <div className="absolute bottom-0 w-full h-[220px] bg-[#071324] rounded-[28px] border border-blue-900/60 shadow-[0_30px_70px_rgba(4,12,24,0.7)] overflow-hidden p-6 flex flex-col justify-between">
          <div className="flex justify-between items-center opacity-60">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-gold"></div>
              <span className="text-[11px] uppercase font-bold tracking-[0.2em] text-slate-300">Drishti Wealth Roster</span>
            </div>
            <span className="text-[10px] text-goldLight tracking-widest font-mono">3 MEMBERS</span>
          </div>
          <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>
        </div>

        {/* Fanning Out Floating Cards inside Folder */}
        <div className="absolute bottom-[40px] w-full flex justify-center items-end z-10 pointer-events-none">
          {members.map((member, idx) => {
            const variant = cardVariants[idx];
            const isHovered = hoveredCard === idx;

            return (
              <motion.div
                key={member.name}
                initial={false}
                animate={
                  !isOpen 
                    ? variant.closed 
                    : isHovered 
                    ? variant.hover 
                    : variant.open
                }
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 22,
                  delay: !isOpen ? 0 : idx * 0.05
                }}
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
                className="absolute bottom-0 w-[190px] sm:w-[220px] h-[240px] bg-gradient-to-b from-[#132238] to-[#0c182b] text-white rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] p-5 border border-blue-400/35 flex flex-col justify-between origin-bottom-center pointer-events-auto transition-colors duration-200 hover:border-gold/70"
              >
                {/* Card Top Avatar & Badge */}
                <div className="flex justify-between items-start">
                  <div className="w-11 h-11 rounded-xl bg-gold/15 border border-gold/40 text-gold font-serif font-bold text-base flex items-center justify-center shadow-md">
                    {member.avatar}
                  </div>
                  <span className={`text-[8.5px] font-extrabold px-2.5 py-1 rounded-full border uppercase tracking-wider ${member.badgeStyle}`}>
                    {member.tag}
                  </span>
                </div>

                {/* Card Text Content */}
                <div>
                  <h4 className="font-serif font-bold text-white text-[16px] leading-tight">{member.name}</h4>
                  <p className="text-[11px] font-semibold text-goldLight mt-1">{member.role}</p>
                </div>
                
                <p className="text-[10px] text-slate-300 leading-relaxed border-t border-white/10 pt-2">
                  {member.details}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Front Folder Cover Flap (Opens Downward in 3D) */}
        <motion.div
          initial={false}
          animate={isOpen ? {
            rotateX: -65,
            y: 18
          } : {
            rotateX: 0,
            y: 0
          }}
          transition={{ type: "spring", stiffness: 180, damping: 22 }}
          className="absolute bottom-0 w-full h-[200px] bg-gradient-to-b from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] rounded-[28px] shadow-[0_25px_65px_rgba(29,78,216,0.55)] border border-blue-400/40 p-6 flex flex-col justify-between z-30 origin-bottom"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Top Folder Tab Notch */}
          <div className="absolute -top-5 left-8 w-36 h-6 bg-[#2563eb] rounded-t-2xl border-t border-x border-blue-400/40 flex items-center justify-center px-3">
            <div className="w-12 h-1 bg-white/40 rounded-full"></div>
          </div>

          {/* Front Flap Content */}
          <div className="flex justify-between items-start z-10 pt-1">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-lg border border-white/20">
                👥
              </div>
              <div>
                <span className="text-[14px] font-bold text-white tracking-wide block font-serif">Drishti Wealth Team</span>
                <span className="text-[11px] text-blue-200 block font-medium">3 Senior Wealth Advisors</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/90 group-hover:text-white transition-colors">
              <svg className={`w-4 h-4 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>

          <div className="flex items-center justify-between z-10 border-t border-white/20 pt-4">
            <span className="text-[11px] uppercase tracking-widest text-blue-100 font-semibold">
              {isOpen ? 'Tap Folder to Close' : 'Tap Folder to Expand Roster'}
            </span>
            <span className="text-[11px] font-bold text-goldLight bg-[#071324] border border-gold/40 px-3 py-1 rounded-full shadow-inner">
              EST. 2001
            </span>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default AnimatedFolder;
