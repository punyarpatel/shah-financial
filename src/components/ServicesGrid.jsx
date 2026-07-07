import React, { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, useScroll, useTransform } from 'framer-motion';
import FadeIn from './animations/FadeIn';
import StaggerGroup from './animations/StaggerGroup';
import StaggerItem from './animations/StaggerItem';
import ScrollStack, { ScrollStackItem } from './animations/ScrollStack';
import Masonry from './Masonry';

const servicesData = [
  {
    id: 'mutual-funds',
    icon: '📈',
    title: 'Mutual Fund Services',
    description: 'End-to-end management of your mutual fund journey, including KYC, risk profiling, fund selection, SIP setup, and regular portfolio reviews.',
    link: '/services/mutual-funds',
    isSpecial: false,
    cardGradient: 'from-indigo-600 via-purple-600 to-pink-500',
    cardText: 'MUTUAL FUNDS',
    cardIcon: (
      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941" />
      </svg>
    ),
    highlights: [
      'Personalized risk profiling & asset allocation',
      '100% paperless digital KYC & SIP setup',
      'Regular portfolio reviews & expert rebalancing'
    ]
  },
  {
    id: 'insurance',
    icon: '🛡️',
    title: 'Life & General Insurance',
    description: 'Comprehensive coverage including life, health, motor, and business insurance from trusted partners to protect your family and assets.',
    link: '/services/insurance',
    isSpecial: false,
    cardGradient: 'from-purple-900 via-indigo-800 to-indigo-600',
    cardText: 'INSURANCE',
    cardIcon: (
      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.57-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    highlights: [
      'Network hospitals pan India for cashless',
      'Hassle free process :  intimation to settlement',
      'Benefits beyond the basics  to  wellness & health benefits'
    ]
  },
  {
    id: 'travel-insurance',
    icon: '✈️',
    title: 'Overseas Travel Insurance',
    description: 'Travel the world with peace of mind. We provide comprehensive coverage for medical emergencies, flight delays, and lost baggage.',
    link: '/services/travel-insurance',
    isSpecial: false,
    cardGradient: 'from-sky-500 via-blue-500 to-indigo-500',
    cardText: 'TRAVEL',
    cardIcon: (
      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 01-1.125-1.125M3.375 19.5h7.5c.621 0 1.125-.504 1.125-1.125m-9.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-7.5A1.125 1.125 0 0112 18.375m9.75-12.75c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125m19.5 0v1.5c0 .621-.504 1.125-1.125 1.125M2.25 5.625v1.5c0 .621.504 1.125 1.125 1.125m0 0h17.25m-17.25 0h7.5c.621 0 1.125.504 1.125 1.125M3.375 8.25c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m17.25-3.75h-7.5c-.621 0-1.125.504-1.125 1.125m8.625-1.125c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M12 10.875v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125M13.125 12h7.5m-7.5 0c-.621 0-1.125.504-1.125 1.125M20.625 12c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h7.5M12 14.625v-1.5m0 1.5c0 .621-.504 1.125-1.125 1.125M12 14.625c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m0 1.5v-1.5m0 0c0-.621.504-1.125 1.125-1.125m0 0h7.5" />
      </svg>
    ),
    highlights: [
      'Cashless medical hospitalization abroad',
      'Trip cancellation & flight delay covers',
      'Loss of passport and baggage protection'
    ]
  },
  {
    id: 'nri-services',
    icon: '🌍',
    title: 'NRI Investment Services',
    description: 'Specialized advisory for NRIs including NRE/NRO investing, remote KYC, repatriation planning, and health insurance for treatment in India.',
    link: '/nri',
    isSpecial: true,
    cardGradient: 'from-teal-600 via-emerald-600 to-blue-600',
    cardText: 'NRI SERVICES',
    cardIcon: (
      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-.778.099-1.533.284-2.253" />
      </svg>
    ),
    highlights: [
      'Seamless NRE & NRO account integration',
      'End to end KYC, complianace & repatriation support',
      'personalised india focused investment guidance'
    ]
  },
  {
    id: 'retirement',
    icon: '🏖️',
    title: 'Retirement Planning',
    description: 'Build a realistic, inflation-adjusted retirement corpus with dedicated investment plans and annual reviews so you can truly live well.',
    link: '/services/retirement',
    isSpecial: false,
    cardGradient: 'from-amber-600 via-orange-600 to-red-500',
    cardText: 'RETIREMENT',
    cardIcon: (
      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1.5M12 18.75V21m-7.5-9h1.5m15 0h1.5M5.25 5.25l1.06 1.06m11.38 11.38l1.06 1.06M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 8.25a3.75 3.75 0 100 7.5 3.75 3.75 0 000-7.5z" />
      </svg>
    ),
    highlights: [
      'Inflation-adjusted retirement income planning',
      'Structured SWP solutions for regular monthly incomes',
      'Tax-efficient withdrawal strategies & estate setup'
    ]
  },
  {
    id: 'goals',
    icon: '🎯',
    title: 'Goal-Based Wealth Planning',
    description: 'Create dedicated investment buckets for your children’s education, home purchase, business capital, and dream vacations with tracked progress.',
    link: '/services/goal-planning',
    isSpecial: false,
    cardGradient: 'from-blue-600 via-cyan-600 to-teal-500',
    cardText: 'GOAL TRACKER',
    cardIcon: (
      <svg className="w-12 h-12 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="1" fill="currentColor" />
      </svg>
    ),
    highlights: [
      'Dedicated portfolios for education, home, & travel',
      'Target milestone tracking with progress reviews',
      'Dynamic asset rebalancing close to target date'
    ]
  }
];

const masonryBackgroundItems = [
  {
    id: 'm1',
    img: 'https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?q=80&w=600&auto=format&fit=crop', // plant growing out of coins
    url: '#',
    height: 450
  },
  {
    id: 'm2',
    img: 'https://images.unsplash.com/photo-1509099836639-18ba1795216d?q=80&w=600&auto=format&fit=crop', // happy family outdoors
    url: '#',
    height: 350
  },
  {
    id: 'm3',
    img: 'https://images.unsplash.com/photo-1531844755146-5c5e8c10e08f?q=80&w=600&auto=format&fit=crop', // active senior couple
    url: '#',
    height: 480
  },
  {
    id: 'm4',
    img: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?q=80&w=600&auto=format&fit=crop', // financial chart
    url: '#',
    height: 380
  },
  {
    id: 'm5',
    img: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?q=80&w=600&auto=format&fit=crop', // travel map / NRI
    url: '#',
    height: 420
  },
  {
    id: 'm6',
    img: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=600&auto=format&fit=crop', // house keys/planning
    url: '#',
    height: 320
  },
  {
    id: 'm7',
    img: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?q=80&w=600&auto=format&fit=crop', // education graduation
    url: '#',
    height: 400
  },
  {
    id: 'm8',
    img: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=600&auto=format&fit=crop', // gold coins stack
    url: '#',
    height: 300
  },
  {
    id: 'm9',
    img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=600&auto=format&fit=crop', // business advisory meeting
    url: '#',
    height: 440
  }
];

const Service3DGraphic = ({ title, cardGradient, cardText, cardIcon }) => {
  return (
    <div
      className="relative w-full max-w-[320px] aspect-[4/3] flex items-center justify-center select-none overflow-visible"
      style={{ perspective: '1000px', transformStyle: 'preserve-3d' }}
    >
      {/* Soft shadow under the pedestal */}
      <div className="absolute bottom-[6%] w-[75%] h-6 bg-navy/10 rounded-full blur-xl transform scale-x-110"></div>

      {/* 3D Pedestal Platform */}
      <svg viewBox="0 0 300 150" className="absolute bottom-[4%] w-full h-[65%] drop-shadow-[0_12px_24px_rgba(13,37,69,0.06)] overflow-visible">
        {/* Top Face */}
        <polygon points="150,55 275,90 150,125 25,90" fill="#ffffff" stroke="#f1f5f9" strokeWidth="0.5" />
        {/* Left Side Face */}
        <polygon points="25,90 150,125 150,140 25,105" fill="#f1f5f9" />
        {/* Right Side Face */}
        <polygon points="150,125 275,90 275,105 150,140" fill="#e2e8f0" />
      </svg>

      {/* Floating 3D Card Wrapper */}
      <div className="absolute top-[2%] w-[125px] h-[180px] animate-float z-10" style={{ transformStyle: 'preserve-3d' }}>
        <div
          className={`w-full h-full rounded-2xl bg-gradient-to-br ${cardGradient} p-4 text-white shadow-[0_15px_35px_rgba(0,0,0,0.22)] border border-white/20 flex flex-col justify-between overflow-hidden relative`}
          style={{
            transform: 'rotateX(52deg) rotateY(-10deg) rotateZ(-30deg)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* Card Gloss Effect */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/20 pointer-events-none"></div>

          {/* Logo & Brand text on the card */}
          <div className="flex justify-between items-center z-10">
            <span className="text-[7.5px] font-bold tracking-widest text-white/90 font-sans">
              {cardText}
            </span>
            <div className="w-2.5 h-2.5 rounded-full bg-white/40"></div>
          </div>

          {/* Central Icon */}
          <div className="my-auto flex justify-center items-center drop-shadow-[0_4px_10px_rgba(0,0,0,0.15)] z-10 scale-110">
            {cardIcon}
          </div>

          {/* Chip and brand text at the bottom */}
          <div className="flex justify-between items-end mt-auto z-10">
            {/* Small card chip representation */}
            <div className="w-5 h-4 bg-yellow-400/40 rounded-sm border border-yellow-200/20 relative overflow-hidden">
              <div className="absolute inset-[2px] grid grid-cols-2 gap-[1px]">
                <div className="border border-white/10"></div>
                <div className="border border-white/10"></div>
                <div className="border border-white/10"></div>
                <div className="border border-white/10"></div>
              </div>
            </div>

            {/* Brand text */}
            <div className="flex items-center gap-0.5">
              <span className="text-[10px] font-extrabold tracking-wider text-white font-sans">DRISHTI</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ServiceCard = ({ service, index, totalCards, onRef, isStack = false }) => {
  const localRef = useRef(null);
  const [isDesktop, setIsDesktop] = useState(true);

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Pass ref back to parent observer
  useEffect(() => {
    if (localRef.current && onRef) {
      onRef(localRef.current);
    }
  }, [onRef]);

  // Track scroll position of local card element
  const { scrollYProgress } = useScroll({
    target: localRef,
    offset: ["start start", "end start"]
  });

  const isLast = index === totalCards - 1;

  // Desktop only scroll-driven scale and fade transitions (with delay so cards don't shrink/fade prematurely)
  // Disabled when inside a stack since the stack container handles this
  const scale = isStack || isLast || !isDesktop ? 1 : useTransform(scrollYProgress, [0, 0.45, 1], [1, 1, 0.94]);
  const opacity = isStack || isLast || !isDesktop ? 1 : useTransform(scrollYProgress, [0, 0.45, 1], [1, 1, 0.65]);

  // Stepped stacking levels (desktop only)
  // Disabled when inside a stack
  const stickyTop = !isStack && isDesktop ? 120 + (index * 24) : 0;

  return (
    <div
      ref={(el) => {
        localRef.current = el;
        if (onRef) onRef(el);
      }}
      className="relative w-full h-full"
    >
      <motion.div
        style={{
          scale,
          opacity,
          top: !isStack && isDesktop ? `${stickyTop}px` : 'auto',
          zIndex: index + 10,
        }}
        className={`${!isStack ? 'lg:sticky mb-16 lg:mb-24 last:mb-0' : ''} relative w-full bg-white rounded-[32px] p-8 md:p-10 lg:p-12 shadow-[0_20px_50px_rgba(13,37,69,0.03)] border border-slate-100/90 hover:shadow-[0_30px_70px_rgba(13,37,69,0.06)] hover:border-slate-200/50 transition-all duration-500 flex flex-col md:flex-row items-center justify-between gap-10 group/card origin-top`}
      >
        {/* Left Side Content */}
        <div className="flex-1 text-left w-full md:pr-4">
          <h3 className="font-serif text-[28px] md:text-[34px] font-bold text-navy mb-6 leading-tight">
            {service.title}
          </h3>

          <ul className="space-y-4 mb-8">
            {service.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-6 h-6 rounded-full bg-gold text-white flex items-center justify-center mt-0.5 shadow-sm shadow-gold/20">
                  <svg className="w-3.5 h-3.5 stroke-[3.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="text-[15.5px] font-sans font-medium text-muted leading-relaxed">
                  {highlight}
                </span>
              </li>
            ))}
          </ul>

          <div>
            {service.link.startsWith('/') ? (
              <Link
                to={service.link}
                className="inline-flex items-center justify-center px-8 py-2.5 bg-[#111111] hover:bg-black text-white text-[14px] font-bold rounded-[12px] shadow-md hover:shadow-black/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Explore
              </Link>
            ) : (
              <a
                href={service.link}
                className="inline-flex items-center justify-center px-8 py-2.5 bg-[#111111] hover:bg-black text-white text-[14px] font-bold rounded-[12px] shadow-md hover:shadow-black/15 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
              >
                Explore
              </a>
            )}
          </div>
        </div>

        {/* Right Side Illustration */}
        <div className="w-full md:w-[320px] flex justify-center shrink-0">
          <Service3DGraphic
            title={service.title}
            cardGradient={service.cardGradient}
            cardText={service.cardText}
            cardIcon={service.cardIcon}
          />
        </div>
      </motion.div>
    </div>
  );
};

const ServicesGrid = () => {
  const servicesMode = 'stack';
  const [activeTab, setActiveTab] = useState(0);
  const [isDesktop, setIsDesktop] = useState(true);
  const cardRefs = useRef([]);
  const mobileTabRefs = useRef([]);

  useEffect(() => {
    const checkSize = () => {
      setIsDesktop(window.innerWidth >= 1024);
    };
    checkSize();
    window.addEventListener('resize', checkSize);
    return () => window.removeEventListener('resize', checkSize);
  }, []);

  // Scroll spy to update active tab based on wrapper positions
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          let newActiveIndex = activeTab;

          // Find the last card whose top is above the middle of the screen
          const triggerPoint = window.innerHeight * 0.4; // 40% from top

          for (let i = 0; i < cardRefs.current.length; i++) {
            const ref = cardRefs.current[i];
            if (ref) {
              const rect = ref.getBoundingClientRect();
              if (rect.top <= triggerPoint) {
                newActiveIndex = i;
              }
            }
          }

          if (newActiveIndex !== activeTab) {
            setActiveTab(newActiveIndex);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeTab]);

  // Scroll active tab trigger into view on mobile
  useEffect(() => {
    if (!isDesktop && mobileTabRefs.current[activeTab]) {
      mobileTabRefs.current[activeTab].scrollIntoView({
        behavior: 'auto',
        block: 'nearest',
        inline: 'center'
      });
    }
  }, [activeTab, isDesktop]);

  // Click scroll handler
  const scrollToCard = (index) => {
    const targetCard = cardRefs.current[index];
    if (targetCard) {
      const elementRect = targetCard.getBoundingClientRect();
      const absoluteElementTop = elementRect.top + window.scrollY;

      // Offset values based on sticky headers
      const stickyOffset = isDesktop ? (120 + (index * 24)) : 130;

      window.scrollTo({
        top: absoluteElementTop - stickyOffset - 16,
        behavior: 'auto'
      });
      setActiveTab(index);
    }
  };

  return (
    <section id="services" className="w-full bg-cream overflow-x-clip overflow-y-visible relative">
      <div className="max-w-7xl mx-auto py-[4.5rem] px-4 overflow-visible">

        {/* Website Overview Section */}
        <FadeIn delay={0.2}>
          {/* Subheading: ABOUT PLATFORM style */}
          <div className="w-full flex items-center justify-center gap-4 mb-12">
            <div className="h-[1px] flex-grow bg-navy/10 max-w-[200px] md:max-w-xs lg:max-w-sm"></div>
            <span className="text-gold text-[12px] tracking-[0.2em] uppercase font-bold text-center shrink-0">
              About Drishti Wealth
            </span>
            <div className="h-[1px] flex-grow bg-navy/10 max-w-[200px] md:max-w-xs lg:max-w-sm"></div>
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-24">
            {/* Left Column (Overview Text) */}
            <div className="flex flex-col justify-center">
              <h2 className="font-serif text-[28px] md:text-[38px] text-textDark font-bold leading-[1.2] mb-6">
                Wealth Creation is Only Half the Story. Discover the Power of Balanced Planning.
              </h2>
              <p className="text-[15.5px] leading-relaxed text-muted mb-4">
                At Drishti Wealth, we integrate wealth creation and risk protection into a single, comprehensive strategy. Whether building growth through personalized mutual fund portfolios, or safeguarding your family with robust life, health, and general insurance policies, we cover your entire financial landscape under one roof.
              </p>
              <p className="text-[15.5px] leading-relaxed text-muted mb-6">
                Your financial journey is unique. Whether you're securing your family's future, planning for retirement, or investing as an NRI, we pair certified guidance with the right insurance and mutual fund solutions, so every decision feels confident, not complicated.

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
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </Link>
              </div>
            </div>

            {/* Right Column (Platform Creative Graphic) */}
            <div className="flex justify-center" style={{ perspective: '1200px' }}>
              <div className="relative w-full max-w-[460px] aspect-[16/11] flex flex-col items-center justify-center group/card-container overflow-visible select-none">
                {/* Soft shadow under the floating card */}
                <div
                  className="absolute bottom-[-4%] w-[85%] h-6 bg-navy/15 rounded-full blur-xl transition-all duration-500 group-hover/card-container:scale-x-105 group-hover/card-container:blur-2xl group-hover/card-container:opacity-90 animate-shadow-pulse"
                ></div>

                {/* 1. Outer Entrance Motion Wrapper: Slides out from the left (text side) */}
                <motion.div
                  className="w-full h-full"
                  initial={{
                    opacity: 0,
                    x: isDesktop ? -260 : -60,
                    scale: 0.8,
                    rotateY: -20
                  }}
                  whileInView={{
                    opacity: 1,
                    x: 0,
                    scale: 1,
                    rotateY: 0
                  }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{
                    type: "spring",
                    stiffness: 55,
                    damping: 14,
                    delay: 0.35
                  }}
                >
                  {/* 2. Inner Floating & Hover Card */}
                  <motion.div
                    className="relative w-full h-full bg-[#f8fafc]/40 rounded-[24px] p-4 border border-slate-100/80 shadow-[0_15px_45px_rgba(13,37,69,0.03)] flex items-center justify-center backdrop-blur-sm"
                    style={{ transformStyle: 'preserve-3d' }}
                    animate={{ y: [0, -10, 0] }}
                    transition={{
                      repeat: Infinity,
                      duration: 6,
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      rotateX: 8,
                      rotateY: -8,
                      scale: 1.04,
                      boxShadow: "0 30px 60px rgba(13,37,69,0.08)"
                    }}
                  >
                    {/* Subtle soft shadow glow background behind card */}
                    <div className="absolute -inset-4 bg-gradient-to-r from-gold/10 to-navy/5 rounded-[28px] blur-2xl opacity-60 pointer-events-none"></div>

                    {/* Inner white card with the new balanced service overview image */}
                    <div
                      className="relative w-full h-full bg-white rounded-xl border border-navy/[0.02] overflow-hidden shadow-[0_5px_15px_rgba(13,37,69,0.02)]"
                      style={{ transform: 'translateZ(10px)' }}
                    >
                      {/* Dot grid background */}
                      <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#0d2545 1px, transparent 1px)', backgroundSize: '16px 16px' }}></div>
                      <img
                        src="/services_overview.png"
                        alt="Drishti Wealth Balanced Services Overview"
                        className="w-full h-full object-cover"
                      />

                      {/* Metallic sweep shine effect */}
                      <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-white/35 to-transparent -translate-x-full group-hover/card-container:animate-shine pointer-events-none"></div>

                      {/* Dark gradient overlay bottom */}
                      <div className="absolute inset-0 bg-gradient-to-t from-navy/5 to-transparent pointer-events-none"></div>
                    </div>
                  </motion.div>
                </motion.div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* Background Masonry Section wrapper */}
        <div className="relative w-full overflow-visible">
          {/* Background Masonry grid */}
          <div className="absolute left-1/2 -translate-x-1/2 w-screen -top-12 -bottom-16 z-0 opacity-50 pointer-events-none overflow-hidden select-none">
            <Masonry
              items={masonryBackgroundItems}
              ease="power3.out"
              duration={0.8}
              stagger={0.03}
              animateFrom="bottom"
              scaleOnHover={false}
              blurToFocus={true}
            />
          </div>

          {/* Foreground section content */}
          <div className="relative z-10">
            {servicesMode === 'stack' ? (
              /* ScrollStack Mode inside a single glassmorphic card tile */
              <div className="bg-[#fcfbf9]/85 backdrop-blur-[12px] p-8 md:p-10 rounded-[32px] border border-white/40 shadow-[0_15px_35px_rgba(13,37,69,0.02)] relative mt-8 overflow-visible">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start overflow-visible relative">
                  {/* Left Column: Sticky/Static Header */}
                  <div className="lg:col-span-4 sticky top-[150px] self-start text-left overflow-visible scroll-stack-left-col">
                    {/* Header */}
                    <div className="text-gold text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]">
                      Our Expertise
                    </div>
                    <h2 className="font-serif text-[28px] md:text-[34px] text-textDark font-semibold leading-[1.2] mb-[1rem]">
                      Comprehensive Financial Solutions
                    </h2>
                    <p className="text-[14.5px] text-muted leading-[1.7] mb-6">
                      We build personalised investment portfolios from scratch, designed around your goals, risk appetite, and timeline. From mutual funds and tax-saving strategies to life, health, motor, general, and SME insurance, we have everything you need under one roof.
                    </p>
                    <div>
                      <Link to="/blog" className="text-gold hover:text-goldLight font-medium inline-flex items-center group transition-colors text-[14px]">
                        Explore more
                        <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">...</span>
                      </Link>
                    </div>
                  </div>

                  {/* Right Column: ScrollStack */}
                  <div className="w-full lg:col-span-8 overflow-visible relative">
                    <ScrollStack useWindowScroll={true} itemDistance={60} itemScale={0.02} itemStackDistance={20}>
                      {servicesData.map((service, index) => (
                        <ScrollStackItem key={service.id}>
                          <ServiceCard
                            service={service}
                            index={index}
                            totalCards={servicesData.length}
                            onRef={() => {}}
                            isStack={true}
                          />
                        </ScrollStackItem>
                      ))}
                    </ScrollStack>
                  </div>
                </div>
              </div>
            ) : (
              /* Classic Interactive Sidebar Mode */
              <>
                {/* Header (rendered above in sidebar mode, with illustration removed) */}
                <div className="bg-[#fcfbf9]/85 backdrop-blur-[12px] p-8 md:p-10 rounded-[32px] border border-white/40 shadow-[0_15px_35px_rgba(13,37,69,0.02)] mb-[3rem]">
                  <div className="text-gold text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]">
                    Our Expertise
                  </div>
                  <h2 className="font-serif text-[28px] md:text-[36px] text-textDark font-semibold leading-[1.2] mb-[1rem]">
                    Comprehensive Financial Solutions
                  </h2>
                  <p className="text-[15px] text-muted leading-[1.7] max-w-4xl">
                    We build personalised investment portfolios from scratch, designed around your goals, risk appetite, and timeline. From mutual funds and tax-saving strategies to life, health, motor, general, and SME insurance, we have everything you need under one roof.{' '}
                    <Link to="/blog" className="text-gold hover:text-goldLight font-medium inline-flex items-center group transition-colors">
                      Explore more
                      <span className="ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">...</span>
                    </Link>
                  </p>
                </div>

                {/* Mobile Sticky Tab Bar (sticky horizontal menu at the top of the cards) */}
                <div className="lg:hidden sticky top-[68px] z-30 bg-cream/90 backdrop-blur-md py-3 px-4 border-b border-slate-100/80 -mx-4 mb-8 overflow-x-auto scrollbar-none flex gap-3 scroll-smooth">
                  {servicesData.map((service, idx) => (
                    <button
                      key={service.id}
                      ref={(el) => (mobileTabRefs.current[idx] = el)}
                      onClick={() => scrollToCard(idx)}
                      className={`whitespace-nowrap px-4 py-2 rounded-full text-[13px] font-bold transition-all duration-300 ${activeTab === idx
                        ? 'bg-gold text-white shadow-md shadow-gold/20'
                        : 'bg-white text-muted border border-slate-100 hover:border-slate-200 font-sans'
                        }`}
                    >
                      {service.icon} {service.title}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start overflow-visible relative">
                  {/* Left Column (Sticky Sidebar on Desktop) */}
                  <div className="hidden lg:block lg:col-span-4 sticky top-[150px] self-start text-left overflow-visible">
                    <div className="relative border-l-2 border-slate-100 flex flex-col gap-6">
                      {servicesData.map((service, idx) => (
                        <button
                          key={service.id}
                          onClick={() => scrollToCard(idx)}
                          className={`text-left pl-6 border-l-2 -ml-[2px] transition-all duration-300 py-1 ${activeTab === idx
                            ? 'border-gold text-gold font-bold opacity-100 scale-105'
                            : 'border-transparent text-muted font-medium opacity-65 hover:opacity-100'
                            }`}
                        >
                          <span className="text-[11px] tracking-[0.1em] uppercase block font-bold mb-1 opacity-70 font-sans">
                            {service.icon} {service.cardText}
                          </span>
                          <span className="text-[16px] font-serif block">
                            {service.title}
                          </span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Right Column (Stacking Cards) */}
                  <div className="w-full lg:col-span-8 flex flex-col gap-0 overflow-visible relative">
                    <StaggerGroup staggerDelay={0.15} className="flex flex-col gap-0 overflow-visible relative">
                      {servicesData.map((service, index) => (
                        <StaggerItem key={service.id} className="w-full overflow-visible">
                          <ServiceCard
                            service={service}
                            index={index}
                            totalCards={servicesData.length}
                            onRef={(el) => (cardRefs.current[index] = el)}
                          />
                        </StaggerItem>
                      ))}
                    </StaggerGroup>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};

export default ServicesGrid;
