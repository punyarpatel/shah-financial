import React, { useRef, useState } from 'react';
import { motion, useScroll, useSpring, useTransform, useMotionValueEvent, AnimatePresence } from 'framer-motion';

const milestones = [
  {
    year: '2009',
    title: 'Sowing the Seeds',
    description: 'Shah Financial Services was founded in Ahmedabad by Rajesh Shah with a simple vision — helping local families achieve financial freedom with transparent and honest advice.',
    icon: (
      <svg className="w-16 h-16 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 22V12" />
        <path d="M12 12c-2-2.5-5.5-2.5-7.5 0 2 2.5 5.5 2.5 7.5 0z" />
        <path d="M12 12c2-2.5 5.5-2.5 7.5 0-2 2.5-5.5 2.5-7.5 0z" />
        <path d="M12 15c-1.5-1.5-4-1.5-5.5 0 1.5 1.5 4 1.5 5.5 0z" />
        <path d="M12 15c1.5-1.5 4-1.5 5.5 0-1.5 1.5-4 1.5-5.5 0z" />
      </svg>
    ),
    stat: '100+ Families Served',
    tag: 'Foundation'
  },
  {
    year: '2010',
    title: 'Strategic Partnership',
    description: 'Empanelled with NJ Wealth, one of India’s largest mutual fund and wealth distribution platforms, expanding our investment offerings and reach.',
    icon: (
      <svg className="w-16 h-16 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
    stat: 'NJ Wealth Partner',
    tag: 'Expansion'
  },
  {
    year: '2015',
    title: 'Going Global (NRI Services)',
    description: 'Crossed 1,000+ local families and launched a dedicated advisory vertical for Non-Resident Indian (NRI) clients to navigate cross-border investing, compliance, and taxation.',
    icon: (
      <svg className="w-16 h-16 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
        <path d="M2 12h20" />
      </svg>
    ),
    stat: '100+ NRI Clients',
    tag: 'NRI Advisory'
  },
  {
    year: '2018',
    title: 'Crossing ₹100 Crore AUM',
    description: 'Achieved a major milestone of ₹100 Crores in Assets Under Management (AUM), cementing our position as a highly trusted financial advisor in Gujarat.',
    icon: (
      <svg className="w-16 h-16 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <path d="M3 20h18" />
      </svg>
    ),
    stat: '₹100 Cr AUM',
    tag: 'Trust Milestone'
  },
  {
    year: '2021',
    title: 'Digital Transformation',
    description: 'Partnered with Prudent Corporate FundzBazar, introducing state-of-the-art mobile apps and online tracking systems for seamless, paperless client investment journeys.',
    icon: (
      <svg className="w-16 h-16 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
        <line x1="12" y1="18" x2="12.01" y2="18" />
      </svg>
    ),
    stat: 'Paperless Execution',
    tag: 'Fintech Era'
  },
  {
    year: '2024',
    title: 'Unlocking Growth',
    description: 'Surpassed 2,500+ active clients and expanded our team of wealth managers, setting up a high-touch customer support desk in Ahmedabad.',
    icon: (
      <svg className="w-16 h-16 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4.5 16.5c-1.5 1.25-2.5 3-2.5 4.5h20c0-1.5-1-3.25-2.5-4.5" />
        <path d="M12 2C7.5 2 7 6 7 10c0 4.5 5 10 5 10s5-5.5 5-10c0-4-0.5-8-5-8z" />
      </svg>
    ),
    stat: '2,500+ Clients',
    tag: 'Scaling Wealth'
  },
  {
    year: '2026',
    title: 'The Trusted Destination',
    description: 'Now serving 3,000+ families globally with over ₹500 Crores in AUM. Combining personal family values with institutional-grade technology to secure generational wealth.',
    icon: (
      <svg className="w-16 h-16 text-gold" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 22h18" />
        <path d="M6 18v-7" />
        <path d="M10 18v-7" />
        <path d="M14 18v-7" />
        <path d="M18 18v-7" />
        <path d="M3 11h18L12 3z" />
      </svg>
    ),
    stat: '₹500 Cr+ AUM',
    tag: 'Present Day'
  }
];

const JourneyTimeline = () => {
  const containerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Hook to track the vertical scroll of the component container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth scrollbar value
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 20,
    restDelta: 0.001
  });

  // Track scroll change to update the active year
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    // Determine which section the scroll is on
    const index = Math.min(
      Math.floor(latest * milestones.length),
      milestones.length - 1
    );
    if (index !== activeIndex && index >= 0) {
      setActiveIndex(index);
    }
  });

  // Function to scroll window to a specific milestone's segment
  const handleMilestoneClick = (index) => {
    if (!containerRef.current) return;
    const element = containerRef.current;
    const rect = element.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    // Total scrollable height of the wrapper
    const totalHeight = element.scrollHeight;
    const viewportHeight = window.innerHeight;
    const scrollDistance = totalHeight - viewportHeight;
    
    // Calculate the target scroll position
    const targetScroll = rect.top + scrollTop + (index / (milestones.length - 1)) * scrollDistance;
    
    window.scrollTo({
      top: targetScroll,
      behavior: 'smooth'
    });
  };

  return (
    <div 
      ref={containerRef} 
      className="relative h-[300vh] md:h-[400vh] w-full"
      id="journey-section"
    >
      {/* Sticky Inner Container */}
      <div className="sticky top-0 h-screen w-full flex flex-col justify-between md:justify-center bg-[#071324] overflow-hidden text-white">
        
        {/* Ambient background glows */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-gold/5 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-navy rounded-full blur-[140px] pointer-events-none" />

        {/* Section Header (Mobile friendly placement) */}
        <div className="w-full max-w-7xl mx-auto px-6 pt-[6vh] md:pt-0 md:absolute md:top-[8vh] md:left-1/2 md:-translate-x-1/2 z-20 flex flex-col md:flex-row md:items-end md:justify-between">
          <div>
            <span className="text-gold text-[11px] tracking-[0.2em] uppercase font-semibold mb-2 block">
              Our Journey
            </span>
            <h2 className="font-serif text-[28px] md:text-[40px] text-white font-bold leading-tight">
              A Walkthrough of Our Wins
            </h2>
          </div>
          <p className="text-white/40 text-[13px] md:text-[14px] mt-2 md:mt-0 max-w-sm hidden sm:block">
            Scroll down to explore how we built a legacy of trust and financial security over 15+ years.
          </p>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-center max-w-7xl mx-auto px-6 w-full z-10 gap-8 md:gap-16 pt-[2vh] md:pt-[10vh] pb-[6vh] md:pb-0 overflow-hidden">
          
          {/* Left Panel: Visual Glassmorphic Card */}
          <div className="w-full md:w-1/2 flex items-center justify-center h-[35vh] md:h-[48vh]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -30, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="relative bg-white/[0.03] backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col justify-between h-full w-full max-w-[420px] shadow-[0_20px_50px_rgba(0,0,0,0.3)] overflow-hidden"
              >
                {/* Visual decorative radial glow */}
                <div className="absolute -right-20 -top-20 w-44 h-44 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
                
                {/* Header Row */}
                <div className="flex items-start justify-between">
                  <div>
                    <span className="inline-flex items-center bg-gold/10 border border-gold/30 text-goldLight text-[10px] uppercase tracking-[0.15em] rounded-full px-3 py-[3px] font-medium mb-2">
                      {milestones[activeIndex].tag}
                    </span>
                    <h3 className="font-serif text-[18px] md:text-[22px] text-white font-bold leading-tight">
                      {milestones[activeIndex].title}
                    </h3>
                  </div>
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 shadow-inner">
                    {milestones[activeIndex].icon}
                  </div>
                </div>

                {/* Body Text */}
                <p className="text-white/70 text-[13px] md:text-[14px] leading-relaxed my-4 line-clamp-4 md:line-clamp-none">
                  {milestones[activeIndex].description}
                </p>

                {/* Bottom Row / Stats */}
                <div className="border-t border-white/10 pt-4 flex items-center justify-between mt-auto">
                  <div>
                    <div className="text-[10px] text-white/45 uppercase tracking-widest font-sans">Milestone Achieved</div>
                    <div className="text-[16px] md:text-[18px] text-gold font-semibold font-serif mt-0.5">
                      {milestones[activeIndex].stat}
                    </div>
                  </div>
                  <div className="text-[36px] md:text-[48px] font-serif font-black text-white/10 select-none tracking-tighter">
                    {milestones[activeIndex].year}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right Panel: Scroll track and text list */}
          <div className="w-full md:w-1/2 flex items-center md:h-[48vh] relative">
            
            {/* Scroll Indicator / Vertical Line */}
            <div className="absolute left-[15px] md:left-[24px] top-4 bottom-4 w-[2px] bg-white/10 z-0">
              <motion.div 
                className="absolute top-0 left-0 w-full bg-gold origin-top"
                style={{ 
                  height: "100%",
                  scaleY: smoothProgress
                }}
              />
            </div>

            {/* Scrolling Milestones List */}
            <div className="w-full pl-8 md:pl-16 flex flex-col justify-start gap-4 md:gap-8 max-h-[38vh] md:max-h-[46vh] overflow-y-hidden relative py-2">
              
              {/* Fade filters for smooth scrolling boundary transitions */}
              <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-[#071324] to-transparent z-10 pointer-events-none" />
              <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-[#071324] to-transparent z-10 pointer-events-none" />

              {/* Dynamic scroll offset container based on activeIndex to keep active item vertically centered */}
              <motion.div
                animate={{
                  y: activeIndex > 1 ? -((activeIndex - 1) * (window.innerWidth < 768 ? 64 : 84)) : 0
                }}
                transition={{ type: "spring", stiffness: 80, damping: 20 }}
                className="flex flex-col gap-4 md:gap-8"
              >
                {milestones.map((milestone, idx) => {
                  const isActive = idx === activeIndex;
                  return (
                    <div 
                      key={milestone.year}
                      onClick={() => handleMilestoneClick(idx)}
                      className={`relative flex items-center gap-4 cursor-pointer group select-none transition-all duration-300 h-12 md:h-[52px] ${
                        isActive ? 'opacity-100' : 'opacity-30 hover:opacity-50'
                      }`}
                    >
                      {/* Active glowing indicator node */}
                      <div className="absolute left-[-23px] md:left-[-46px] top-0 h-full z-20 flex items-center justify-center">
                        <div className={`w-[14px] h-[14px] rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                          isActive 
                            ? 'bg-[#071324] border-gold scale-125 shadow-[0_0_10px_rgba(201,146,42,0.8)]' 
                            : 'bg-[#071324] border-white/40 group-hover:border-white'
                        }`}>
                          {isActive && (
                            <div className="w-[6px] h-[6px] rounded-full bg-gold" />
                          )}
                        </div>
                      </div>

                      {/* Milestone Title & Year */}
                      <div className="flex items-center gap-4">
                        <span className={`font-serif text-[20px] md:text-[28px] font-bold tracking-tight transition-colors duration-300 ${
                          isActive ? 'text-gold' : 'text-white'
                        }`}>
                          {milestone.year}
                        </span>
                        <div className="flex flex-col">
                          <span className={`text-[13px] md:text-[15px] font-medium tracking-wide transition-colors duration-300 ${
                            isActive ? 'text-white font-semibold' : 'text-white/60'
                          }`}>
                            {milestone.title}
                          </span>
                          <span className="text-[11px] text-white/40 mt-0.5 line-clamp-1 max-w-[240px] md:max-w-[320px]">
                            {milestone.stat}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </motion.div>
            </div>
          </div>

        </div>

        {/* Scroll Progress Bar Indicator (At bottom) */}
        <div className="w-full h-[3px] bg-white/5 relative z-20 mt-auto">
          <motion.div 
            className="h-full bg-gradient-to-r from-gold/50 via-gold to-goldLight origin-left"
            style={{ 
              width: "100%",
              scaleX: smoothProgress 
            }}
          />
        </div>

      </div>
    </div>
  );
};

export default JourneyTimeline;
