import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from './animations/FadeIn';
import StaggerGroup from './animations/StaggerGroup';
import StaggerItem from './animations/StaggerItem';

const servicesData = [
  {
    id: 'mutual-funds',
    icon: '📈',
    title: 'Mutual Fund Advisory',
    description: 'End-to-end management of your mutual fund journey, including KYC, risk profiling, fund selection, SIP setup, and regular portfolio reviews.',
    link: '/services/mutual-funds',
    isSpecial: false
  },
  {
    id: 'insurance',
    icon: '🛡️',
    title: 'Life & General Insurance',
    description: 'Comprehensive coverage including life, health, motor, and business insurance from trusted partners to protect your family and assets.',
    link: '/services/insurance',
    isSpecial: false
  },
  {
    id: 'nri-services',
    icon: '🌍',
    title: 'NRI Investment Services',
    description: 'Specialized advisory for NRIs including NRE/NRO investing, remote KYC, repatriation planning, and health insurance for treatment in India.',
    link: '/nri',
    isSpecial: true
  },
  {
    id: 'retirement',
    icon: '🏖️',
    title: 'Retirement Planning',
    description: 'Build a realistic, inflation-adjusted retirement corpus with dedicated investment plans and annual reviews so you can truly live well.',
    link: '/services/retirement',
    isSpecial: false
  },
  {
    id: 'elss',
    icon: '💰',
    title: 'Tax Saving — ELSS',
    description: 'Save up to ₹46,800 in tax every year under Section 80C while building wealth with equity-level returns and a short 3-year lock-in.',
    link: '/services/elss',
    isSpecial: false
  },
  {
    id: 'goals',
    icon: '🎯',
    title: 'Goal-Based Wealth Planning',
    description: 'Create dedicated investment buckets for your children’s education, home purchase, business capital, and dream vacations with tracked progress.',
    link: '/services/goal-planning',
    isSpecial: false
  }
];

const ServicesGrid = () => {
  return (
    <section id="services" className="w-full bg-cream overflow-hidden">
      <div className="max-w-7xl mx-auto py-[4.5rem] px-4">

        {/* Website Overview Section */}
        <FadeIn>
          {/* Subheading: ABOUT PLATFORM style */}
          <div className="w-full flex items-center justify-center gap-4 mb-12">
            <div className="h-[1px] flex-grow bg-navy/10 max-w-[200px] md:max-w-xs lg:max-w-sm"></div>
            <span className="text-gold text-[12px] tracking-[0.2em] uppercase font-bold text-center shrink-0">
              About Shah Financial
            </span>
            <div className="h-[1px] flex-grow bg-navy/10 max-w-[200px] md:max-w-xs lg:max-w-sm"></div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
            {/* Left Column (Overview Text) */}
            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-[28px] md:text-[38px] text-textDark font-bold leading-[1.2] mb-6">
                Experience Personalized Wealth Management Designed for Your Future
              </h2>
              <p className="text-[15.5px] leading-relaxed text-muted mb-4">
                At Shah Financial Services, we centralize your entire investment and protection planning into one seamless, research-backed journey. By combining certified expertise with real-time portfolio management and digital ease, we empower you to focus on your long-term life milestones with confidence.
              </p>
              <p className="text-[15.5px] leading-relaxed text-muted mb-6">
                Designed for families and NRI clients alike, our bespoke wealth architecture ensures your money works as hard as you do. Join a growing community of over 3,000 forward-thinking clients who trust us to navigate the market's complexities and deliver clear, consistent pathways to financial freedom.
              </p>
              
              <div>
                <Link 
                  to="/about" 
                  className="inline-flex items-center text-[14px] font-bold text-gold hover:text-goldLight group/readmore transition-colors duration-300"
                >
                  <span className="relative py-1">
                    Read more
                    <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover/readmore:w-full transition-all duration-300"></span>
                  </span>
                  <svg className="w-4 h-4 ml-1.5 transform group-hover/readmore:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" stroke="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Column (Platform Creative Graphic) */}
            <div className="flex justify-center">
              {/* Outer soft box background wrapper */}
              <div className="relative w-full max-w-[460px] aspect-[16/11] bg-[#f8fafc]/50 rounded-[20px] p-6 border border-slate-100 flex items-center justify-center shadow-inner">
                {/* Dashboard mock card */}
                <div className="relative w-full h-full bg-white rounded-xl shadow-[0_15px_35px_rgba(13,37,69,0.04),0_5px_15px_rgba(0,0,0,0.02)] border border-navy/[0.02] p-8 flex flex-col justify-between overflow-hidden group/graphic hover:scale-[1.02] transition-transform duration-500">
                  {/* Glowing background circles */}
                  <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0d2545 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                  
                  {/* Gold target center & concentric waves */}
                  <div className="relative mx-auto my-auto w-full flex flex-col items-center">
                    <div className="relative w-16 h-16 rounded-full bg-gold/10 border border-gold/20 flex items-center justify-center mb-6">
                      <div className="w-4 h-4 rounded-full bg-gold animate-pulse"></div>
                      {/* Decorative outer waves */}
                      <div className="absolute inset-0 rounded-full border border-gold/10 scale-150 animate-ping opacity-25" style={{ animationDuration: '4s' }}></div>
                      <div className="absolute inset-0 rounded-full border border-gold/10 scale-[2.2] opacity-15"></div>
                    </div>

                    {/* Skeletons */}
                    <div className="w-3/5 h-3 bg-slate-100 rounded-full mb-3.5 group-hover/graphic:w-[65%] transition-all duration-500"></div>
                    <div className="w-2/5 h-2 bg-slate-50 rounded-full mb-6 group-hover/graphic:w-[45%] transition-all duration-500"></div>
                  </div>

                  {/* 3 cards at the bottom */}
                  <div className="grid grid-cols-3 gap-3 w-full mt-auto">
                    <div className="h-14 bg-[#f8fafc] border border-slate-100/50 rounded-lg flex items-center justify-center text-lg hover:shadow-md transition-shadow duration-300">📈</div>
                    <div className="h-14 bg-[#f8fafc] border border-slate-100/50 rounded-lg flex items-center justify-center text-lg hover:shadow-md transition-shadow duration-300">🛡️</div>
                    <div className="h-14 bg-[#f8fafc] border border-slate-100/50 rounded-lg flex items-center justify-center text-lg hover:shadow-md transition-shadow duration-300">🌍</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        <FadeIn>
          {/* Header */}
          <div className="text-gold text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]">
            Our Expertise
          </div>
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 md:gap-12 mb-[3rem]">
            <div className="flex-1 max-w-3xl">
              <h2 className="font-serif text-[28px] md:text-[36px] text-textDark font-semibold leading-[1.2] mb-[1rem]">
                Comprehensive Financial Solutions
              </h2>
              <p className="text-[15px] text-muted leading-[1.7]">
                We provide holistic wealth management services tailored to your unique goals. From mutual fund advisory and dedicated goal planning to tax saving strategies and comprehensive insurance coverage, our certified experts guide you at every step. Our focus is on transparent, research-backed strategies to ensure your financial future is secure and your wealth grows steadily.{' '}
                <Link to="/blog" className="text-gold hover:text-goldLight font-medium inline-flex items-center group transition-colors">
                  Explore more
                  <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">...</span>
                </Link>
              </p>
            </div>

            <div className="flex-shrink-0 w-full md:w-[280px] lg:w-[350px] flex justify-center md:justify-end">
              <div className="relative group/header-img animate-float">
                {/* Subtle soft shadow glow background */}
                <div className="absolute -inset-4 bg-gradient-to-r from-gold/10 to-navy/5 rounded-full blur-2xl opacity-60"></div>
                
                {/* Matching shape from About section — soft outer box + inner white card */}
                <div className="relative w-[280px] sm:w-[320px] md:w-[350px] aspect-[16/11] bg-[#f8fafc]/50 rounded-[20px] p-6 border border-slate-100 flex items-center justify-center shadow-inner">
                  <div className="relative w-full h-full bg-white rounded-xl shadow-[0_15px_35px_rgba(13,37,69,0.04),0_5px_15px_rgba(0,0,0,0.02)] border border-navy/[0.02] overflow-hidden group/graphic hover:scale-[1.02] transition-transform duration-500">
                    {/* Dot grid background */}
                    <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0d2545 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                    <img
                      src="/media__1779815978182.png"
                      alt="Growth and Wealth Management Illustration"
                      className="w-full h-full object-contain p-4"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/5 to-transparent pointer-events-none"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Grid */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[16px]">
          {servicesData.map((service) => (
            <StaggerItem key={service.id}>
              <div
                className="group flex flex-col h-full rounded-[14px] p-[2rem] transition-all duration-300 hover:-translate-y-2 bg-white text-textDark border border-navy/10 hover:bg-navy hover:border-navy hover:shadow-xl"
              >
                <div className="text-[32px] mb-[1.25rem]">{service.icon}</div>

                <h3 className="font-serif text-[18px] font-semibold mb-[0.75rem] text-navy group-hover:text-white transition-colors duration-300">
                  {service.title}
                </h3>

                <p className="text-[14px] leading-[1.6] mb-[1.5rem] text-muted group-hover:text-white/75 transition-colors duration-300 flex-grow">
                  {service.description}
                </p>

                {service.link.startsWith('/') ? (
                  <Link
                    to={service.link}
                    className="inline-flex items-center text-[13px] font-medium tracking-[0.02em] text-gold group-hover:text-goldLight transition-colors duration-300 mt-auto"
                  >
                    Learn more <span className="ml-1 text-[16px] group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </Link>
                ) : (
                  <a
                    href={service.link}
                    className="inline-flex items-center text-[13px] font-medium tracking-[0.02em] text-gold group-hover:text-goldLight transition-colors duration-300 mt-auto"
                  >
                    Learn more <span className="ml-1 text-[16px] group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                  </a>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

      </div>
    </section>
  );
};

export default ServicesGrid;
