import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

const ScrollZoomReveal = ({
  leftText = 'Drishti Wealth',
  rightText = 'Showcase 2026',
  buttonText = 'Explore Wealth Solutions',
  onButtonClick,
  imageSrc = 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=2000&q=80',
  videoUrl = ''
}) => {
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Scroll Transforms
  const width = useTransform(scrollYProgress, [0, 1], ['18vw', '100vw']);
  const height = useTransform(scrollYProgress, [0, 1], ['14vh', '100vh']);
  const rawRadius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const borderRadius = useSpring(rawRadius, { stiffness: 120, damping: 25, mass: 0.6 });

  const centerTextOpacity = useTransform(scrollYProgress, [0.35, 0.65], [0, 1]);
  const centerTextY = useTransform(scrollYProgress, [0.35, 0.65], [40, 0]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#071324] text-white">
      {/* Sticky Fullscreen Portal Container */}
      <div className="sticky top-0 h-screen flex items-center justify-center gap-6 px-4 overflow-hidden">
        {/* Left Typography */}
        <div className="hidden sm:block w-[180px] md:w-[240px] text-right font-serif text-[24px] md:text-[42px] font-bold leading-tight text-goldLight tracking-tight">
          {leftText}
        </div>

        {/* Center Expanding Media Window */}
        <motion.div
          style={{ width, height, borderRadius }}
          className="relative overflow-hidden bg-navy border border-gold/30 shadow-[0_30px_90px_rgba(0,0,0,0.8)] shrink-0 flex items-center justify-center"
        >
          {/* Background Image / Video */}
          <motion.img
            src={imageSrc}
            alt="Drishti Wealth Reveal"
            className="absolute inset-0 w-full h-full object-cover"
            style={{ opacity: isPlaying ? 0 : 1 }}
          />

          {videoUrl && (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
            >
              <source src={videoUrl} type="video/mp4" />
            </video>
          )}

          {/* Dark Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/40 to-transparent" />

          {/* Center Call to Action Text & Button on Full Zoom */}
          <motion.div
            style={{ opacity: centerTextOpacity, y: centerTextY }}
            className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 z-10 space-y-4"
          >
            <span className="text-[11px] font-mono tracking-[0.3em] uppercase text-goldLight bg-white/10 px-4 py-1 rounded-full border border-white/20">
              TRUSTED WEALTH MANAGEMENT
            </span>
            <h2 className="font-serif text-[36px] md:text-[60px] font-bold text-white max-w-2xl leading-tight">
              Building Generational Prosperity & Financial Peace
            </h2>
            <button
              onClick={onButtonClick}
              className="mt-4 px-8 py-3.5 rounded-full bg-gold text-white font-semibold text-[14px] hover:bg-goldLight hover:scale-105 transition-all shadow-xl flex items-center gap-3 cursor-pointer"
            >
              <span>{buttonText}</span>
              <span className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center text-xs">
                &#8594;
              </span>
            </button>
          </motion.div>
        </motion.div>

        {/* Right Typography */}
        <div className="hidden sm:block w-[180px] md:w-[240px] text-left font-serif text-[24px] md:text-[42px] font-bold leading-tight text-goldLight tracking-tight">
          {rightText}
        </div>
      </div>
    </section>
  );
};

export default ScrollZoomReveal;
