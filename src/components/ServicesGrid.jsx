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
    isSpecial: false,
    benefits: [
      'Tailored portfolio selection matching your risk profile',
      'Seamless online KYC and automatic monthly SIP setup',
      'Regular portfolio tracking and quarterly performance reviews'
    ],
    image: '/mutual_funds_preview.png'
  },
  {
    id: 'insurance',
    icon: '🛡️',
    title: 'Life & General Insurance',
    description: 'Comprehensive coverage including life, health, motor, and business insurance from trusted partners to protect your family and assets.',
    link: '/services/insurance',
    isSpecial: false,
    benefits: [
      'Term life and comprehensive health coverages',
      'Motor, travel, and business insurance plans',
      'End-to-end guidance and claims settlement support'
    ],
    image: '/insurance_preview.png'
  },
  {
    id: 'nri-services',
    icon: '🌍',
    title: 'NRI Investment Services',
    description: 'Specialized advisory for NRIs including NRE/NRO investing, remote KYC, repatriation planning, and health insurance for treatment in India.',
    link: '/nri',
    isSpecial: true,
    benefits: [
      'NRE & NRO investment account configuration',
      'Remote KYC compliance and tax residency advisory',
      'Repatriation coordination and Indian health coverage'
    ],
    image: '/nri_services_preview.png'
  },
  {
    id: 'retirement',
    icon: '🏖️',
    title: 'Retirement Planning',
    description: 'Build a realistic, inflation-adjusted retirement corpus with dedicated investment plans and annual reviews so you can truly live well.',
    link: '/services/retirement',
    isSpecial: false,
    benefits: [
      'Inflation-adjusted corpus target calculations',
      'Diversified high-yield investment allocations',
      'Annual retirement strategy reviews and rebalancing'
    ],
    image: '/retirement_preview.png'
  },
  {
    id: 'elss',
    icon: '💰',
    title: 'Tax Saving — ELSS',
    description: 'Save up to ₹46,800 in tax every year under Section 80C while building wealth with equity-level returns and a short 3-year lock-in.',
    link: '/services/elss',
    isSpecial: false,
    benefits: [
      'Up to ₹46,800 annual tax savings under Sec 80C',
      'Lowest 3-year lock-in compared to PPF or FDs',
      'Wealth compounding through equity exposure'
    ],
    image: '/elss_preview.png'
  },
  {
    id: 'goals',
    icon: '🎯',
    title: 'Goal-Based Wealth Planning',
    description: 'Create dedicated investment buckets for your children’s education, home purchase, business capital, and dream vacations with tracked progress.',
    link: '/services/goal-planning',
    isSpecial: false,
    benefits: [
      'Dedicated portfolios for child education & home purchase',
      'Custom timeframe planning and milestone tracking',
      'Dynamic asset allocation based on target closeness'
    ],
    image: '/goals_preview.png'
  }
];

const ServicesGrid = () => {
  const [hoveredId, setHoveredId] = React.useState(null);

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
          <div className="mb-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold/10 text-gold rounded-full text-[12px] tracking-[0.15em] uppercase font-bold border border-gold/20 shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
              Our Expertise
            </span>
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
                {/* Subtle soft shadow glow background to make the image float beautifully */}
                <div className="absolute -inset-4 bg-gradient-to-r from-gold/10 to-navy/5 rounded-full blur-2xl opacity-60"></div>
                
                {/* Custom Leaf/Teardrop shaped image frame */}
                <div className="relative w-[240px] sm:w-[280px] md:w-[320px] aspect-[4/3] bg-white rounded-tl-[60px] rounded-br-[60px] rounded-tr-[10px] rounded-bl-[10px] p-4 border border-navy/5 shadow-[0_15px_35px_rgba(13,37,69,0.06)] overflow-hidden transition-all duration-700 hover:scale-[1.03]">
                  <img
                    src="/media__1779815978182.png"
                    alt="Growth and Wealth Management Illustration"
                    className="w-full h-full object-cover rounded-tl-[45px] rounded-br-[45px] rounded-tr-[6px] rounded-bl-[6px]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/5 to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Stack vertically (one card per row, full width) */}
        <StaggerGroup className="flex flex-col gap-10 w-full">
          {servicesData.map((service, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <StaggerItem key={service.id}>
                <div
                  onMouseEnter={() => setHoveredId(service.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="group w-full bg-white rounded-[16px] p-[40px] transition-all duration-500 hover:-translate-y-1.5 shadow-[0_10px_35px_rgba(13,37,69,0.06),0_3px_10px_rgba(0,0,0,0.02)] hover:shadow-[0_30px_60px_rgba(13,37,69,0.12),0_10px_20px_rgba(0,0,0,0.04)] border border-navy/5 hover:border-gold/20"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-stretch">
                    {/* Left Column (50%) - Alternates order on desktop */}
                    <div className={`flex flex-col justify-between h-full ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                      <div>
                        {/* Soft colored square box icon container with double border & hover rotation */}
                        <div className="relative w-14 h-14 mb-6 group/icon">
                          <div className="absolute inset-0 bg-gold/10 rounded-xl transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:bg-gold/15"></div>
                          <div className="absolute inset-1 bg-white rounded-lg shadow-sm border border-gold/10 flex items-center justify-center text-2xl transition-all duration-300 group-hover/icon:rotate-6">
                            {service.icon}
                          </div>
                        </div>

                        {/* Title */}
                        <h3 className="font-serif text-[24px] md:text-[26px] font-bold text-textDark mb-3 group-hover:text-navy transition-colors duration-300">
                          {service.title}
                        </h3>

                        {/* Description */}
                        <p className="text-[15px] leading-relaxed text-muted mb-6">
                          {service.description}
                        </p>

                        {/* 3 key benefit points with a premium gold checkmark */}
                        <ul className="space-y-3.5 mb-8">
                          {service.benefits.map((benefit, benefitIdx) => (
                            <li key={benefitIdx} className="flex items-start text-[14.5px] text-muted">
                              <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center mr-3 mt-[2px] transition-transform duration-300 group-hover:scale-110">
                                <svg className="w-2.5 h-2.5 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3.5">
                                  <path strokeLinecap="round" strokeLinejoin="round" stroke="M5 13l4 4L19 7" />
                                </svg>
                              </span>
                              <span className="leading-relaxed text-[#4e5566] group-hover:text-textDark transition-colors duration-300">
                                {benefit}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Learn more -> link in gold at the bottom */}
                      <div className="mt-auto pt-4">
                        {service.link.startsWith('/') ? (
                          <Link
                            to={service.link}
                            className="inline-flex items-center text-[14px] font-bold text-gold hover:text-goldLight group/link transition-colors duration-300"
                          >
                            <span className="relative py-1">
                              Learn more
                              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover/link:w-full transition-all duration-300"></span>
                            </span>
                            <svg className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" stroke="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </Link>
                        ) : (
                          <a
                            href={service.link}
                            className="inline-flex items-center text-[14px] font-bold text-gold hover:text-goldLight group/link transition-colors duration-300"
                          >
                            <span className="relative py-1">
                              Learn more
                              <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover/link:w-full transition-all duration-300"></span>
                            </span>
                            <svg className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" stroke="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                          </a>
                        )}
                      </div>
                    </div>

                    {/* Right Column (50%) - Tilted 3D Preview Box */}
                    <div className={`relative w-full h-full min-h-[320px] md:min-h-full ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                      {/* Outer container: Soft light colored rounded rectangle box */}
                      <div className="relative w-full h-full bg-[#f4f7fa] rounded-[16px] flex flex-col justify-between border border-slate-100 shadow-inner overflow-hidden group/right">
                        
                        {/* Top Area (Approx 80% height): Tilted 3D Preview container */}
                        <div className="relative flex-grow flex items-center justify-center p-8 pb-4" style={{ perspective: '1000px' }}>
                          <div 
                            className="relative w-[90%] aspect-[16/10] bg-white rounded-xl border border-slate-100 overflow-hidden"
                            style={{ 
                              transform: hoveredId === service.id 
                                ? 'rotateX(4deg) rotateY(-6deg) rotateZ(1deg) scale(1.02)' 
                                : 'rotateX(8deg) rotateY(-12deg) rotateZ(2deg)',
                              transformStyle: 'preserve-3d',
                              transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
                              boxShadow: hoveredId === service.id
                                ? '0 30px 60px rgba(13,37,69,0.12), 0 10px 20px rgba(0,0,0,0.04)'
                                : '0 20px 40px rgba(13,37,69,0.06), 0 5px 15px rgba(0,0,0,0.02)'
                            }}
                          >
                            <img 
                              src={service.image} 
                              alt={service.title}
                              className="w-full h-full object-cover"
                            />
                            {/* Ambient bottom shadow overlay gradient inside preview card */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-lg"></div>
                          </div>
                        </div>

                        {/* Bottom Bar: White background, service name label and green indicator dot */}
                        <div className="bg-white border-t border-slate-100/80 px-6 py-4 flex items-center justify-between">
                          <span className="text-[13px] font-semibold text-[#5c687e] tracking-wide">
                            {service.title}
                          </span>
                          {/* Pulsing Green indicator dot */}
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </StaggerItem>
            );
          })}
        </StaggerGroup>

      </div>
    </section>
  );
};

export default ServicesGrid;
