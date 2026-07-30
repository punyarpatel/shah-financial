import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const teamData = [
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

const DocumentCardFolder = () => {
  const [stage, setStage] = useState(0); // 0: closed, 1: hover/peek, 2: card slide out, 3: card flipped
  const [activeTeamIndex, setActiveTeamIndex] = useState(0);

  const handleNextMember = () => {
    setActiveTeamIndex((prev) => (prev + 1) % teamData.length);
  };

  const handleToggleOpen = () => {
    if (stage === 0) setStage(1);
    else if (stage === 1) setStage(2);
    else if (stage === 2) setStage(3);
    else setStage(0);
  };

  const currentMember = teamData[activeTeamIndex];

  return (
    <div className="flex flex-col items-center justify-center my-8 select-none">
      {/* Click Step Controller / Status */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => setStage((prev) => (prev + 1) % 4)}
          className="text-xs font-semibold text-gold tracking-widest uppercase bg-gold/10 px-4 py-2 rounded-full border border-gold/20 flex items-center gap-2 hover:bg-gold/20 transition-all cursor-pointer shadow-sm"
        >
          <span className="w-2 h-2 rounded-full bg-gold animate-ping"></span>
          {stage === 0 && 'Tap Folder: Peek File'}
          {stage === 1 && 'Tap Folder: Slide Out Document'}
          {stage === 2 && 'Tap Folder: Flip Secret Dossier'}
          {stage === 3 && 'Tap Folder: Reset & Close'}
        </button>

        {stage > 0 && (
          <button
            onClick={handleNextMember}
            className="text-xs font-semibold text-white tracking-wider bg-navy px-3.5 py-2 rounded-full border border-white/20 hover:bg-navy/80 transition-all cursor-pointer shadow-sm"
          >
            Next Member →
          </button>
        )}
      </div>

      {/* 3D Container */}
      <div
        onClick={handleToggleOpen}
        className="relative w-[320px] sm:w-[360px] h-[400px] flex items-center justify-center cursor-pointer group"
        style={{ perspective: '1400px' }}
      >
        {/* Document Card (Slides out to the right & flips 180deg) */}
        <motion.div
          initial={false}
          animate={{
            x: stage === 0 ? 0 : stage === 1 ? 40 : 160,
            y: stage === 0 ? 0 : stage === 1 ? -10 : -20,
            rotate: stage === 0 ? 0 : stage === 1 ? 4 : stage === 2 ? -4 : -6,
            rotateY: stage === 3 ? 180 : 0,
            zIndex: stage >= 2 ? 30 : 10
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 22 }}
          className="absolute w-[260px] sm:w-[280px] h-[350px] rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.4)] border border-slate-200 overflow-hidden"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* FRONT OF DOCUMENT CARD */}
          <div
            className="absolute inset-0 bg-white p-6 flex flex-col justify-between"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <div>
              <div className="flex justify-between items-center border-b border-slate-100 pb-3 mb-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                  CONFIDENTIAL DOSSIER
                </span>
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse"></span>
              </div>
              
              <div className="space-y-2">
                <div className="w-12 h-12 rounded-xl bg-gold/15 border border-gold/40 text-gold font-serif font-bold text-lg flex items-center justify-center shadow-sm mb-3">
                  {currentMember.avatar}
                </div>
                <span className={`inline-block text-[9px] font-extrabold px-2.5 py-0.5 rounded-full border uppercase tracking-wider ${currentMember.badgeStyle}`}>
                  {currentMember.tag}
                </span>
                <h4 className="font-serif font-bold text-slate-900 text-[18px] leading-tight mt-1">
                  {currentMember.name}
                </h4>
                <p className="text-[12px] font-semibold text-gold mt-0.5">{currentMember.role}</p>
              </div>
            </div>

            <div className="border-t border-slate-100 pt-3">
              <p className="text-[11px] text-slate-600 leading-relaxed font-sans">
                {currentMember.details}
              </p>
              <div className="mt-3 flex justify-between items-center text-[10px] font-mono text-slate-400">
                <span>FILE NO. 00{activeTeamIndex + 1}</span>
                <span>TAP TO FLIP ↻</span>
              </div>
            </div>
          </div>

          {/* BACK OF DOCUMENT CARD (Secret Clearance Details) */}
          <div
            className="absolute inset-0 bg-[#0c192c] text-white p-6 flex flex-col justify-between border border-gold/40"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-goldLight uppercase">
                  VERIFIED CREDENTIALS
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  PASSED
                </span>
              </div>

              <div className="space-y-3">
                <h4 className="font-serif font-bold text-white text-[16px] leading-tight">
                  {currentMember.name}
                </h4>
                <p className="text-[11px] font-medium text-goldLight">{currentMember.role}</p>

                <div className="space-y-2 pt-2 border-t border-white/10 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-white/50">Empanelment:</span>
                    <span className="font-semibold text-white">AMFI & IRDAI</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Location:</span>
                    <span className="font-semibold text-white">Ahmedabad HQ</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-white/50">Desk Access:</span>
                    <span className="font-semibold text-emerald-400">Direct Priority</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[10px] font-mono text-goldLight">
              <span>DRISHTI WEALTH</span>
              <span>VERIFIED ADVISOR</span>
            </div>
          </div>
        </motion.div>

        {/* Front Cover Folder Flap (Rotates open -45deg on y-axis) */}
        <motion.div
          initial={false}
          animate={{
            rotateY: stage > 0 ? -45 : 0
          }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          className="absolute w-[300px] sm:w-[320px] h-[370px] bg-gradient-to-b from-[#2563eb] via-[#1d4ed8] to-[#1e3a8a] rounded-[24px] shadow-[0_25px_60px_rgba(29,78,216,0.5)] border border-blue-400/40 p-6 flex flex-col justify-between z-20 origin-left"
          style={{ transformStyle: 'preserve-3d' }}
        >
          <div className="flex justify-between items-start z-10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-lg border border-white/20">
                📁
              </div>
              <div>
                <span className="text-[13px] font-bold text-white tracking-wide block font-serif">
                  CONFIDENTIAL FILES
                </span>
                <span className="text-[10.5px] text-blue-200 block font-medium">Internal Advisor Roster</span>
              </div>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/90 group-hover:text-white transition-colors">
              <svg
                className={`w-4 h-4 transition-transform duration-300 ${stage > 0 ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>

          <div className="my-auto py-6 border-y border-white/10 flex flex-col gap-2">
            <span className="text-[11px] font-mono tracking-widest text-blue-200 uppercase">
              CLASSIFIED DOSSIER
            </span>
            <p className="text-[12px] text-white/80 leading-relaxed font-sans">
              Tap folder to release advisor document card and inspect credentials.
            </p>
          </div>

          <div className="flex items-center justify-between z-10 border-t border-white/15 pt-3">
            <span className="text-[10px] uppercase tracking-widest text-blue-200 font-semibold">
              DRISHTI WEALTH HQ
            </span>
            <span className="text-[10px] font-bold text-goldLight bg-[#071324] border border-gold/40 px-2.5 py-0.5 rounded-full">
              EST. 2001
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default DocumentCardFolder;
