import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const PageLoader = ({
  brandName = 'Drishti Wealth',
  duration = 0.5,
  onComplete
}) => {
  const [displayCount, setDisplayCount] = useState(0);
  const [isClosing, setIsClosing] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    duration: duration * 1000,
    bounce: 0
  });

  // Track counter spring change
  useEffect(() => {
    const unsubscribe = springValue.on('change', (latest) => {
      setDisplayCount(Math.round(latest));
    });
    motionValue.set(100);
    return () => unsubscribe();
  }, [motionValue, springValue]);

  // Trigger staggered waterfall shutter exit when counter hits 100
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 650); // Clean exit duration for shutters
    }, duration * 1000 + 50);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  // 5 Vertical Shutter Columns
  const columns = [0, 1, 2, 3, 4];

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[9999] pointer-events-none overflow-hidden">
        {/* Staggered Vertical 5-Column Waterfall Shutters */}
        <div className="absolute inset-0 flex w-full h-full z-10">
          {columns.map((colIdx) => (
            <motion.div
              key={colIdx}
              initial={{ y: '0%' }}
              animate={isClosing ? { y: '-100%' } : { y: '0%' }}
              transition={{
                duration: 0.55,
                delay: isClosing ? colIdx * 0.05 : 0,
                ease: [0.77, 0, 0.175, 1]
              }}
              className="relative flex-1 h-full bg-[#071324] border-r border-white/5 last:border-r-0 origin-top shadow-2xl"
            >
              {/* Subtle Gold Accent Line on Bottom Edge of Each Panel */}
              <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold/30 via-gold to-goldLight/30 opacity-80" />
            </motion.div>
          ))}
        </div>

        {/* Foreground Content Container */}
        <motion.div
          animate={isClosing ? {
            opacity: 0,
            scale: 1.03,
            filter: 'blur(8px)'
          } : {
            opacity: 1,
            scale: 1,
            filter: 'blur(0px)'
          }}
          transition={{
            duration: 0.3,
            ease: 'easeOut'
          }}
          className="absolute inset-0 z-20 text-white flex flex-col justify-between p-8 md:p-14 pointer-events-none"
        >
          {/* Top Row: Brand Name & Minimalist Badge */}
          <div className="flex justify-between items-center w-full">
            <motion.div
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="flex items-center gap-3"
            >
              <img
                src="/DW_22-removebg-preview.png"
                alt="Drishti Wealth Logo"
                className="h-10 w-auto object-contain shrink-0"
              />
              <span className="font-serif text-[22px] md:text-[28px] font-bold text-white tracking-wide">
                {brandName}
              </span>
            </motion.div>
            
            <span className="text-goldLight text-[11px] font-mono uppercase tracking-[0.2em] px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              EST. 2001 &middot; AHMEDABAD
            </span>
          </div>

          {/* Center Row: Animated Line Mask Bar */}
          <div className="w-full my-auto py-6 relative flex flex-col items-center">
            <div className="w-full max-w-4xl h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${displayCount}%` }}
                transition={{ ease: 'linear' }}
                className="h-full bg-gradient-to-r from-gold/40 via-gold to-goldLight shadow-[0_0_20px_rgba(212,175,55,0.9)]"
              />
            </div>
          </div>

          {/* Bottom Row: Large Numeric Counter & Subtext */}
          <div className="flex justify-between items-end w-full">
            <div className="hidden sm:block text-white/50 text-[12px] uppercase tracking-widest font-mono">
              Loading Financial Platform...
            </div>
            
            <div className="flex items-baseline font-serif font-light text-gold text-[80px] sm:text-[140px] md:text-[180px] leading-none tracking-tighter">
              <span>{displayCount}</span>
              <span className="text-[0.4em] font-sans font-light text-goldLight ml-1">%</span>
            </div>
          </div>
        </motion.div>

        {/* Ambient Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[160px] pointer-events-none z-15" />
      </div>
    </AnimatePresence>
  );
};

export default PageLoader;
