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
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const section = document.getElementById(sectionId);
      if (section) section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    { value: '3,000+', label: 'Clients' },
    { value: '₹500Cr+', label: 'AUM' },
    { value: '15+', label: 'Years' },
    { value: '100+', label: 'NRI Clients' }
  ];

  return (
    <section 
      className="w-full relative overflow-hidden"
    >
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

      {/* Dark Overlay to ensure text readability against the video */}
      <div 
        className="absolute inset-0 pointer-events-none" 
        style={{ 
          zIndex: 1,
          background: 'linear-gradient(135deg, rgba(10, 22, 40, 0.85) 0%, rgba(13, 31, 60, 0.75) 50%, rgba(10, 22, 40, 0.85) 100%)'
        }}
      />

      {/* Decorative Circles (Optional, kept for subtle texture) */}
      <div 
        className="absolute top-[-10%] right-[-5%] w-[400px] h-[400px] rounded-full border border-[#c9922a]/15 pointer-events-none"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      />
      <div 
        className="absolute top-[10%] right-[5%] w-[220px] h-[220px] rounded-full border border-[#c9922a]/10 pointer-events-none"
        style={{ zIndex: 2 }}
        aria-hidden="true"
      />

      {/* Inner Content */}
      <div className="max-w-7xl mx-auto pt-[4rem] md:pt-[6rem] pb-[4rem] px-4 relative z-10">
        <FadeIn>
          <div className="max-w-[680px] mx-auto text-center">
            {/* Badge */}
            <div 
              className="inline-flex items-center gap-[6px] rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]"
              style={{
                border: '1px solid #c9a84c',
                background: 'rgba(201, 168, 76, 0.1)'
              }}
            >
              <div 
                className="w-[6px] h-[6px] rounded-full" 
                style={{ backgroundColor: '#c9a84c' }}
              />
              <span 
                className="text-[11px] uppercase tracking-[0.12em]"
                style={{ color: '#c9a84c' }}
              >
                AMFI Registered Mutual Fund Distributor
              </span>
            </div>

            {/* Heading */}
            <h1 className="font-serif text-[42px] font-semibold leading-[1.2] text-white mb-[1.25rem]">
              Your Trusted Partner for <em className="text-[#c9922a] not-italic">Financial Growth</em>
            </h1>

            {/* Description */}
            <p className="text-white/65 text-[16px] font-light leading-[1.6] mb-[2.5rem]">
              We provide personalized wealth management, mutual fund advisory, and comprehensive financial planning for individuals, families, and NRIs globally.
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-[4rem]">
              <button 
                onClick={() => handleScrollToSection('contact')}
                className="w-full sm:w-auto bg-[#c9922a] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#f0c96a] transition-colors"
              >
                Start a SIP Today
              </button>
              <button 
                onClick={() => handleScrollToSection('calculator')}
                className="w-full sm:w-auto bg-transparent border border-white/20 text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-white/5 transition-colors"
              >
                Calculate SIP Returns
              </button>
            </div>
            
            {/* Stats */}
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
          </div>
        </FadeIn>
      </div>
    </section>
  );
};

export default HeroSection;
