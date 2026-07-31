import React, { useState, useRef, useCallback } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const teamMembers = [
  {
    id: 1,
    name: 'Piyush Shah',
    role: 'Founder & Director CEO',
    tag: 'FOUNDER & CEO',
    details: '25+ Years of advisory excellence in Mutual Funds & Wealth Management.',
    experience: '25+ Years',
    avatar: 'PS',
    bgGradient: 'from-[#0d2545] via-[#132d54] to-[#1a3866]',
    quote: '"Preserving family wealth through disciplined asset allocation and long-term compounding since 2001."',
    image: '/piyush_shah.jpg',
    cropStyle: 'object-[center_10%] scale-[1.45] origin-top'
  },
  {
    id: 2,
    name: 'Rutvik Shah',
    role: 'Managing Director & Partner',
    tag: 'MANAGING DIRECTOR',
    details: 'Specializing in portfolio allocation, SIP compounding, and equity market analysis.',
    experience: '12+ Years',
    avatar: 'RS',
    bgGradient: 'from-[#0b2b24] via-[#103d33] to-[#175245]',
    quote: '"Customizing risk-adjusted SIP strategies tailored to your life goals and market cycles."',
    image: '/rutvik_shah.jpg',
    cropStyle: 'object-[center_28%] scale-[1.8]'
  },
  {
    id: 3,
    name: 'Reena Shah',
    role: 'Co-founder',
    tag: 'CO-FOUNDER',
    details: 'Dedicated advisory support, paperless KYC, and cross-border client operations.',
    experience: '10+ Years',
    avatar: 'RS',
    bgGradient: 'from-[#1e1b4b] via-[#2e2a72] to-[#3b358c]',
    quote: '"Providing seamless cross-border NRI financial services with priority execution."',
    image: '/reena_shah.jpg',
    cropStyle: 'object-[center_24%] scale-[1.65]'
  }
];

const TILT_SPRING = { damping: 30, stiffness: 120, mass: 0.8 };
const FLIP_SPRING = { type: 'spring', damping: 24, stiffness: 240, mass: 0.7 };

const SinglePolaroidCard = ({ member }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const cardRef = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mx = useSpring(x, TILT_SPRING);
  const my = useSpring(y, TILT_SPRING);

  const tiltX = useTransform(my, [-0.5, 0.5], [10, -10]);
  const tiltY = useTransform(mx, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = useCallback((e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  }, [x, y]);

  const handleMouseLeave = useCallback(() => {
    x.set(0);
    y.set(0);
  }, [x, y]);

  const handleClick = useCallback(() => {
    x.set(0);
    y.set(0);
    setIsFlipped((prev) => !prev);
  }, [x, y]);

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
      className="relative w-[300px] sm:w-[320px] h-[410px] cursor-pointer select-none"
      style={{ perspective: 1000 }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          transformStyle: 'preserve-3d',
          rotateX: tiltX,
          rotateY: tiltY
        }}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={FLIP_SPRING}
          className="absolute inset-0"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* FRONT FACE (POLAROID STYLE WITH PHOTO FRAME) */}
          <div
            className="absolute inset-0 bg-white rounded-2xl p-4 pb-14 shadow-[0_15px_35px_rgba(0,0,0,0.18)] border border-slate-200 flex flex-col justify-between"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden'
            }}
          >
            {/* Photo Window */}
            <div className={`w-full h-[270px] rounded-xl bg-gradient-to-b ${member.bgGradient} p-5 flex flex-col justify-between relative overflow-hidden shadow-inner`}>
              {member.image && (
                <img src={member.image} alt={member.name} className={`absolute inset-0 w-full h-full object-cover opacity-90 ${member.cropStyle || 'object-top'}`} />
              )}
              <div className="flex justify-between items-center z-10">
                <div className="w-11 h-11 rounded-xl bg-white/15 backdrop-blur-md border border-white/20 text-gold font-serif font-bold text-lg flex items-center justify-center shadow-sm">
                  {member.avatar}
                </div>
                <span className="text-[9px] font-extrabold px-2.5 py-0.5 rounded-full bg-gold/20 text-goldLight border border-gold/40 uppercase tracking-wider">
                  {member.tag}
                </span>
              </div>

              <div className="z-10 mt-auto">
                <span className="text-[9px] font-mono text-white/50 uppercase tracking-[0.2em]">
                  DRISHTI WEALTH
                </span>
                <h4 className="font-serif font-bold text-white text-[20px] leading-tight">
                  {member.name}
                </h4>
                <p className="text-[12px] text-goldLight font-medium">{member.role}</p>
              </div>

              {/* Decorative Watermark */}
              <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-white/5 rounded-full blur-xl pointer-events-none" />
            </div>

            {/* Handwritten Style Bottom Caption Area */}
            <div className="flex justify-between items-center px-1 text-slate-700">
              <span className="font-serif font-bold text-[15px]">{member.name}</span>
              <span className="text-[10px] font-mono text-slate-400">TAP TO FLIP ↻</span>
            </div>
          </div>

          {/* BACK FACE (SECRET DOSSIER & QUOTE) */}
          <div
            className="absolute inset-0 bg-[#0c192c] text-white rounded-2xl p-6 border-2 border-gold/40 shadow-[0_20px_45px_rgba(7,19,36,0.6)] flex flex-col justify-between"
            style={{
              backfaceVisibility: 'hidden',
              WebkitBackfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)'
            }}
          >
            <div>
              <div className="flex justify-between items-center border-b border-white/10 pb-3 mb-4">
                <span className="text-[10px] font-mono font-bold tracking-widest text-goldLight uppercase">
                  ADVISOR STATEMENT
                </span>
                <span className="text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/30">
                  {member.experience}
                </span>
              </div>

              <p className="text-[13px] font-serif italic text-white/90 leading-relaxed mb-4">
                {member.quote}
              </p>

              <div className="space-y-2 border-t border-white/10 pt-3 text-[11px] font-sans text-white/70">
                <p>{member.details}</p>
              </div>
            </div>

            <div className="border-t border-white/10 pt-3 flex justify-between items-center text-[10px] font-mono text-goldLight">
              <span>DRISHTI WEALTH HQ</span>
              <span>VERIFIED ADVISOR</span>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

const PolaroidTeamSection = () => {
  return (
    <div className="flex flex-col items-center justify-center my-8 select-none w-full">
      <div className="mb-6 flex items-center gap-2 text-xs font-semibold text-gold tracking-widest uppercase bg-gold/10 px-4 py-2 rounded-full border border-gold/20 shadow-sm">
        <span className="w-2 h-2 rounded-full bg-gold animate-ping"></span>
        Hover for 3D Tilt & Tap to Flip Card
      </div>

      <div className="flex flex-wrap justify-center items-center gap-8 py-4 max-w-6xl">
        {teamMembers.map((member) => (
          <SinglePolaroidCard key={member.id} member={member} />
        ))}
      </div>
    </div>
  );
};

export default PolaroidTeamSection;
