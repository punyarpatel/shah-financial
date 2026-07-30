import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';

const PageLoader = ({
  brandName = 'Drishti Wealth',
  duration = 2.4,
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

  // Trigger smooth curved mask exit when counter hits 100
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsClosing(true);
      setTimeout(() => {
        setIsVisible(false);
        if (onComplete) onComplete();
      }, 700); // Mask animation duration
    }, duration * 1000 + 100);

    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9999] pointer-events-none flex flex-col justify-between overflow-hidden"
        style={{ perspective: '1200px' }}
      >
        {/* Curving Fullscreen Mask Container */}
        <motion.div
          initial={{ borderRadius: '0%' }}
          animate={isClosing ? {
            borderRadius: '50% 50% 0 0',
            y: '-105%',
            scaleY: 0.8
          } : {
            borderRadius: '0%',
            y: '0%',
            scaleY: 1
          }}
          transition={{
            duration: 0.75,
            ease: [0.77, 0.02, 0.24, 1.02]
          }}
          className="w-full h-full bg-[#071324] text-white flex flex-col justify-between p-8 md:p-14 relative origin-top overflow-hidden shadow-2xl"
        >
          {/* Top Row: Brand Name & Minimalist Badge */}
          <div className="flex justify-between items-center w-full z-10">
            <motion.div
              initial={{ opacity: 0, y: 10, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex items-center gap-2"
            >
              <div className="w-2.5 h-2.5 rounded-full bg-gold animate-pulse"></div>
              <span className="font-serif text-[22px] md:text-[28px] font-bold text-white tracking-wide">
                {brandName}
              </span>
            </motion.div>
            
            <span className="text-goldLight text-[11px] font-mono uppercase tracking-[0.2em] px-3 py-1 bg-white/5 border border-white/10 rounded-full">
              EST. 2001 &middot; AHMEDABAD
            </span>
          </div>

          {/* Center Row: Animated Line Mask Bar */}
          <div className="w-full my-auto py-6 relative z-10 flex flex-col items-center">
            <div className="w-full max-w-4xl h-[2px] bg-white/10 relative overflow-hidden rounded-full">
              <motion.div
                initial={{ width: '0%' }}
                animate={{ width: `${displayCount}%` }}
                transition={{ ease: 'linear' }}
                className="h-full bg-gradient-to-r from-gold/40 via-gold to-goldLight shadow-[0_0_15px_rgba(201,146,42,0.8)]"
              />
            </div>
          </div>

          {/* Bottom Row: Large Numeric Counter & Subtext */}
          <div className="flex justify-between items-end w-full z-10">
            <div className="hidden sm:block text-white/50 text-[12px] uppercase tracking-widest font-mono">
              Loading Financial Platform...
            </div>
            
            <div className="flex items-baseline font-serif font-light text-gold text-[80px] sm:text-[140px] md:text-[180px] leading-none tracking-tighter">
              <span>{displayCount}</span>
              <span className="text-[0.4em] font-sans font-light text-goldLight ml-1">%</span>
            </div>
          </div>

          {/* Background Ambient Radial Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[140px] pointer-events-none" />
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default PageLoader;
