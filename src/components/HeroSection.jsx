import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import FadeIn from './animations/FadeIn';

const HeroSection = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const heroMode = 'classic';

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

      {/* Base Dark Overlay */}
      <div className="absolute inset-0 z-[1] bg-navy/80 mix-blend-multiply pointer-events-none" />

      {/* Elegant Aurora Effect */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none opacity-60 mix-blend-screen">
        {/* Golden Aurora */}
        <motion.div
          className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] rounded-full opacity-30"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(201, 146, 42, 0.5) 0%, transparent 60%)',
            filter: 'blur(80px)'
          }}
          animate={{
            x: ['-10%', '10%', '-10%'],
            y: ['0%', '10%', '0%'],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Deep Navy/Teal Aurora */}
        <motion.div
          className="absolute top-[-30%] right-[-20%] w-[150%] h-[150%] rounded-full opacity-40"
          style={{
            background: 'radial-gradient(ellipse at center, rgba(13, 37, 69, 0.8) 0%, transparent 60%)',
            filter: 'blur(100px)'
          }}
          animate={{
            x: ['10%', '-10%', '10%'],
            y: ['-5%', '15%', '-5%'],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />

        {/* Soft Center Glow */}
        <motion.div
          className="absolute top-[20%] left-[20%] w-[60%] h-[60%] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle at center, rgba(240, 201, 106, 0.4) 0%, transparent 70%)',
            filter: 'blur(60px)'
          }}
          animate={{
            x: ['0%', '5%', '0%'],
            y: ['5%', '-5%', '5%'],
            opacity: [0.1, 0.4, 0.1]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Inner Content */}
      <div className="max-w-7xl mx-auto pt-[4rem] md:pt-[6rem] pb-[4rem] px-4 relative z-10">
        <div className="max-w-[680px] mx-auto text-center">
          {/* Badge */}
          <FadeIn delay={0.2}>
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
          </FadeIn>

          {/* Heading */}
          {heroMode === 'blurtext' ? (
            <h1 className="font-serif text-[42px] font-semibold leading-[1.2] text-white mb-[1.25rem] flex flex-wrap justify-center gap-x-3">
              <BlurText
                text="Your Trusted Partner for"
                delay={80}
                animateBy="words"
                direction="top"
                as="span"
              />
              <BlurText
                text="Financial Growth"
                delay={80}
                animateBy="words"
                direction="bottom"
                className="text-[#c9922a] not-italic"
                as="span"
              />
            </h1>
          ) : heroMode === 'decrypted' ? (
            <h1 className="font-serif text-[42px] font-semibold leading-[1.2] text-white mb-[1.25rem] flex flex-wrap justify-center gap-x-3">
              <DecryptedText
                text="Your Trusted Partner for"
                animateOn="view"
                speed={80}
                sequential={true}
                parentClassName="inline-block"
              />
              <DecryptedText
                text="Financial Growth"
                animateOn="view"
                speed={80}
                sequential={true}
                className="text-[#c9922a] not-italic"
                parentClassName="inline-block"
              />
            </h1>
          ) : (
            <FadeIn delay={0.35}>
              <h1 className="font-serif text-[42px] font-semibold leading-[1.2] text-white mb-[1.25rem]">
                Your Trusted Partner for <em className="text-[#c9922a] not-italic">Financial Growth</em>
              </h1>
            </FadeIn>
          )}

          {/* Description */}
          <FadeIn delay={0.5}>
            <p className="text-white/65 text-[16px] font-light leading-[1.6] mb-[2.5rem]">
              Our focus is on building long-term relationships by offering personalized investment solutions, comprehensive insurance protection, and goal-based financial planning tailored to every stage of life.            </p>
          </FadeIn>

          {/* Buttons */}
          <FadeIn delay={0.65}>
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
