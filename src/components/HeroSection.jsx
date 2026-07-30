import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import FadeIn from './animations/FadeIn';

const HeroSection = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleScrollToSection = (sectionId) => {
    if (location.pathname !== '/') {
      navigate(`/#${sectionId}`);
      setTimeout(() => {
        const section = document.getElementById(sectionId);
        if (section) section.scrollIntoView({ behavior: 'auto' });
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: 'auto' });
    }
  };

  const stats = [
    { value: '6,000+', label: 'Clients' },
    { value: '₹750Cr+', label: 'AUM' },
    { value: '25+', label: 'Years' },
    { value: '100+', label: 'NRI Clients' }
  ];

  return (
    <section className="w-full relative overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        poster="/hero-bg.png"
        aria-hidden="true"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0,
          pointerEvents: 'none',
          filter: 'drop-shadow(0 0 20px rgba(201, 168, 76, 0.3))',
        }}
      >
        <source src="/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* Base Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-navy/80 mix-blend-multiply pointer-events-none" />

      {/* Golden Ambient Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/15 blur-[120px] rounded-full z-[1] pointer-events-none" />

      <div className="max-w-[1200px] mx-auto px-[24px] pt-[7rem] pb-[5rem] relative z-[2]">
        <div className="max-w-[800px] mx-auto text-center">
          {/* Badge */}
          <FadeIn delay={0.2}>
            <div className="inline-flex items-center gap-[8px] bg-navy/40 border border-white/10 px-[16px] py-[6px] rounded-full text-[12px] text-white/80 backdrop-blur-sm mb-[2rem]">
              <span className="w-[6px] h-[6px] rounded-full bg-gold animate-pulse"></span>
              AMFI Registered Mutual Fund Distributor
            </div>
          </FadeIn>

          {/* Title & Tagline */}
          <FadeIn delay={0.35}>
            <div className="mb-[1.5rem]">
              <h1 className="font-serif text-[42px] sm:text-[54px] md:text-[64px] font-normal leading-[1.1] text-white tracking-[-0.02em] mb-2">
                Drishti Wealth
              </h1>
              <p className="text-[#f0c96a] text-[13px] sm:text-[15px] font-sans font-medium uppercase tracking-[0.16em] leading-snug">
                Your Trusted Partner for Financial Growth
              </p>
            </div>
          </FadeIn>

          {/* Description */}
          <FadeIn delay={0.5}>
            <p className="text-white/65 text-[16px] font-light leading-[1.6] mb-[2.5rem]">
              Our focus is on building long-term relationships by offering personalized investment solutions, comprehensive insurance protection, and goal-based financial planning tailored to every stage of life.
            </p>
          </FadeIn>

          {/* Buttons */}
          <FadeIn delay={0.65}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-[4rem]">
              <button
                onClick={() => handleScrollToSection('contact')}
                className="w-full sm:w-auto bg-[#c9922a] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#f0c96a] transition-colors cursor-pointer"
              >
                Start a SIP Today
              </button>
              <button
                onClick={() => handleScrollToSection('calculator')}
                className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-white/5 transition-colors cursor-pointer"
              >
                Calculate SIP Returns
              </button>
            </div>
          </FadeIn>

          {/* Stats */}
          <FadeIn delay={0.8}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-[2rem] border-t border-white/10">
              {stats.map((stat, index) => (
                <div key={index}>
                  <div className="font-serif text-[28px] md:text-[32px] font-semibold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-white/50 text-[12px] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
