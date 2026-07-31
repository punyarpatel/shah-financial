import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from 'framer-motion';

const ScrollZoomReveal = ({
  leftText = 'Drishti Wealth',
  rightText = 'Showcase 2026',
  buttonText = 'Explore Wealth Solutions',
  onButtonClick,
  imageSrc = 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&w=2000&q=80',
  videoUrl = '/Generate_an_animated_video_for.mp4'
}) => {
  const containerRef = useRef(null);
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch((err) => {
        console.log("Autoplay playback error:", err);
      });
    }
  }, []);

  const toggleSound = (e) => {
    e.stopPropagation();
    if (videoRef.current) {
      const nextMutedState = !isMuted;
      videoRef.current.muted = nextMutedState;
      setIsMuted(nextMutedState);
      videoRef.current.play().catch(() => {});
    }
  };

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end']
  });

  // Automatically mute sound when user scrolls away from this section
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (videoRef.current) {
      const isInSection = latest >= 0.05 && latest <= 0.95;
      if (!isInSection) {
        videoRef.current.muted = true;
      } else {
        videoRef.current.muted = isMuted;
      }
    }
  });

  // Responsive max bounds
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Scroll Transforms - Capped at middle preview size matching design
  const width = useTransform(scrollYProgress, [0, 1], [isMobile ? '35vw' : '18vw', isMobile ? '88vw' : '64vw']);
  const height = useTransform(scrollYProgress, [0, 1], [isMobile ? '20vh' : '14vh', isMobile ? '60vh' : '70vh']);
  const rawRadius = useTransform(scrollYProgress, [0, 1], [40, 20]);
  const borderRadius = useSpring(rawRadius, { stiffness: 120, damping: 25, mass: 0.6 });

  // Smooth opacity for overlay text (no Y displacement so text stays fixed)
  const centerTextOpacity = useTransform(scrollYProgress, [0.2, 0.6], [0, 1]);

  return (
    <section ref={containerRef} className="relative h-[250vh] bg-[#071324] text-white">
      {/* Sticky Fullscreen Portal Container */}
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Top Text - Positions outside and above the video as it expands */}
        <motion.div
          style={{ opacity: centerTextOpacity }}
          className="text-center z-20 max-w-3xl px-4 pointer-events-none mb-4"
        >
          <span className="text-[10px] sm:text-[11px] font-mono tracking-[0.3em] uppercase text-goldLight bg-white/10 px-4 py-1 rounded-full border border-white/20 inline-block mb-2">
            TRUSTED WEALTH MANAGEMENT
          </span>
          <h2 className="font-serif text-[24px] sm:text-[32px] md:text-[42px] font-bold text-white leading-tight">
            Building Generational Prosperity & Financial Peace
          </h2>
        </motion.div>

        {/* Center Row: Left Typography | Video Card | Right Typography */}
        <div className="flex items-center justify-center gap-6 w-full">
          {/* Left Typography */}
          <div className="hidden sm:block w-[180px] md:w-[240px] text-right font-serif text-[24px] md:text-[42px] font-bold leading-tight text-goldLight tracking-tight">
            {leftText}
          </div>

          {/* Center Expanding Media Window */}
          <motion.div
            style={{ width, height, borderRadius }}
            className="relative overflow-hidden bg-navy border border-gold/30 shadow-[0_30px_90px_rgba(0,0,0,0.8)] shrink-0 flex items-center justify-center"
          >
            {/* Background Video / Image */}
            {videoUrl ? (
              <>
                <video
                  ref={videoRef}
                  autoPlay
                  loop
                  muted={isMuted}
                  playsInline
                  preload="auto"
                  className="absolute inset-0 w-full h-full object-cover z-0"
                >
                  <source src={videoUrl} type="video/mp4" />
                </video>

                {/* Sound Mute / Unmute Button */}
                <button
                  onClick={toggleSound}
                  className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-navy/80 border border-gold/40 text-goldLight hover:scale-110 hover:bg-navy transition-all shadow-lg backdrop-blur-md cursor-pointer flex items-center justify-center"
                  title={isMuted ? "Unmute Sound" : "Mute Sound"}
                >
                  {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                  )}
                </button>
              </>
            ) : (
              <motion.img
                src={imageSrc}
                alt="Drishti Wealth Reveal"
                className="absolute inset-0 w-full h-full object-cover z-0"
              />
            )}
          </motion.div>

          {/* Right Typography */}
          <div className="hidden sm:block w-[180px] md:w-[240px] text-left font-serif text-[24px] md:text-[42px] font-bold leading-tight text-goldLight tracking-tight">
            {rightText}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScrollZoomReveal;
