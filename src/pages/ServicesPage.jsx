import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import StaggerGroup from '../components/animations/StaggerGroup';
import StaggerItem from '../components/animations/StaggerItem';
import BorderGlow from '../components/animations/BorderGlow';
import FadeIn from '../components/animations/FadeIn';
import CardSwap, { Card } from '../components/CardSwap';

const servicesList = [
  {
    id: 'mutual-funds',
    icon: '📈',
    category: 'Wealth Management',
    title: 'Mutual Fund Services',
    description: 'End-to-end management of your mutual fund journey, including KYC, risk profiling, fund selection, SIP setup, and regular portfolio reviews.',
    link: '/services/mutual-funds',
    gradient: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 50%, #ec4899 100%)',
    accent: '#7c3aed',
    stat: '₹2Cr+',
    statLabel: 'Assets Managed'
  },
  {
    id: 'insurance',
    icon: '🛡️',
    category: 'Security & Cover',
    title: 'Life & General Insurance',
    description: 'Comprehensive coverage including life, health, motor, and business insurance from trusted partners to protect your family and assets.',
    link: '/services/insurance',
    gradient: 'linear-gradient(135deg, #1e3a5f 0%, #3730a3 50%, #4f46e5 100%)',
    accent: '#3730a3',
    stat: '500+',
    statLabel: 'Policies Active'
  },
  {
    id: 'property-insurance',
    icon: '🏠',
    category: 'Asset Protection',
    title: 'Property & Home Insurance',
    description: 'Comprehensive coverage for residential homes, building structures, home contents, offices, and commercial property against fire, theft, and natural hazards.',
    link: '/services/property-insurance',
    gradient: 'linear-gradient(135deg, #b45309 0%, #d97706 50%, #f59e0b 100%)',
    accent: '#d97706',
    stat: '100%',
    statLabel: 'Asset Protection'
  },
  {
    id: 'travel-insurance',
    icon: '✈️',
    category: 'Travel Cover',
    title: 'Overseas Travel Insurance',
    description: 'Travel the world with peace of mind. Comprehensive coverage for medical emergencies, flight delays, and lost baggage anywhere in the world.',
    link: '/services/travel-insurance',
    gradient: 'linear-gradient(135deg, #0ea5e9 0%, #2563eb 50%, #4f46e5 100%)',
    accent: '#2563eb',
    stat: '50+',
    statLabel: 'Countries Covered'
  },
  {
    id: 'nri-services',
    icon: '🌍',
    category: 'NRI Special',
    title: 'NRI Services',
    description: 'Specialized advisory for NRIs including NRE/NRO investing, remote KYC, repatriation planning, and health insurance for treatment in India.',
    link: '/nri',
    gradient: 'linear-gradient(135deg, #0d9488 0%, #059669 50%, #2563eb 100%)',
    accent: '#059669',
    stat: '100+',
    statLabel: 'NRI Clients'
  },
  {
    id: 'retirement',
    icon: '🏖️',
    category: 'Long-Term Goals',
    title: 'Retirement Planning',
    description: 'Build a realistic, inflation-adjusted retirement corpus with dedicated investment plans and annual reviews so you can truly live well.',
    link: '/services/retirement',
    gradient: 'linear-gradient(135deg, #d97706 0%, #ea580c 50%, #dc2626 100%)',
    accent: '#ea580c',
    stat: '15+ Yrs',
    statLabel: 'Planning Horizon'
  },
  {
    id: 'goals',
    icon: '🎯',
    category: 'Goal Tracking',
    title: 'Goal-Based Wealth Planning',
    description: 'Create dedicated investment buckets for your children\'s education, home purchase, business capital, and dream vacations with tracked progress.',
    link: '/services/goal-planning',
    gradient: 'linear-gradient(135deg, #2563eb 0%, #0891b2 50%, #0d9488 100%)',
    accent: '#0891b2',
    stat: '₹1Cr+',
    statLabel: 'Goals Achieved'
  },
];

const ServicesPage = () => {
  const ogImage = `${window.location.origin}/why_choose_us_mockup.png`;

  return (
    <div className="min-h-screen bg-cream flex flex-col relative">
      <Helmet>
        <title>Our Services | Drishti Wealth Ahmedabad</title>
        <meta name="description" content="Explore comprehensive wealth management, mutual fund advisory, life and health insurance, NRI investment planning, and retirement setups." />
        <link rel="canonical" href="https://drishtiwealth.com/services" />
        <meta property="og:title" content="Our Services | Drishti Wealth Ahmedabad" />
        <meta property="og:description" content="Explore comprehensive wealth management, mutual fund advisory, life and health insurance, NRI investment planning, and retirement setups." />
        <meta property="og:image" content="https://drishtiwealth.com/og-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://drishtiwealth.com/services" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Services | Drishti Wealth Ahmedabad" />
        <meta name="twitter:description" content="Explore comprehensive wealth management, mutual fund advisory, life and health insurance, NRI investment planning, and retirement setups." />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Navbar />

      {/* ── Hero Section ── */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          background: '#2d3f5e',
          minHeight: '640px',
        }}
      >
        {/* Subtle dot-grid texture */}
        <div
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.9) 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />

        {/* Radial glow behind card stack */}
        <div
          className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(212,175,55,0.08) 0%, rgba(100,140,200,0.06) 40%, transparent 70%)',
            filter: 'blur(50px)',
          }}
        />

        <div className="max-w-7xl mx-auto px-4 h-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 items-stretch gap-0" style={{ minHeight: '640px' }}>

            {/* LEFT — Text content */}
            <div className="flex flex-col justify-center py-16 lg:py-20 z-10 relative">
              <FadeIn delay={0.1}>
                {/* Badge */}
                <div className="inline-flex items-center gap-2 mb-6">
                  <div
                    className="px-4 py-1.5 rounded-full text-[11px] uppercase tracking-[0.18em] font-semibold"
                    style={{
                      background: 'rgba(212,175,55,0.15)',
                      color: '#D4AF37',
                      border: '1px solid rgba(212,175,55,0.3)',
                    }}
                  >
                    What We Offer
                  </div>
                </div>

                {/* Heading */}
                <h1
                  className="font-serif text-[38px] md:text-[52px] font-bold leading-[1.1] mb-6"
                  style={{ color: '#ffffff' }}
                >
                  Our{' '}
                  <span style={{ color: '#D4AF37' }}>Services</span>
                </h1>

                {/* Description */}
                <p
                  className="text-[15.5px] leading-[1.75] mb-8 max-w-[440px]"
                  style={{ color: 'rgba(255,255,255,0.65)' }}
                >
                  Discover our range of wealth management and protection solutions,
                  customized by certified professionals to suit your lifestyle and
                  financial goals.
                </p>



                {/* CTA */}
                <div className="flex items-center gap-4">
                  <a
                    href="#services-grid"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-[12px] font-bold text-[14px] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
                    style={{
                      background: '#D4AF37',
                      color: '#0d2545',
                    }}
                  >
                    Explore All Services
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                </div>
              </FadeIn>
            </div>

            {/* RIGHT — CardSwap animation (full-height fill) */}
            <div
              className="relative hidden lg:block"
              style={{ minHeight: '640px' }}
            >
              <CardSwap
                width={598}
                height={391}
                cardDistance={80}
                verticalDistance={92}
                delay={3500}
                pauseOnHover={true}
                skewAmount={5}
                easing="elastic"
              >
                {servicesList.map((service) => (
                  <Card key={service.id} style={{ background: service.gradient }}>
                    {/* Card content */}
                    <div className="relative w-full h-full flex flex-col justify-between p-8 overflow-hidden select-none">
                      {/* Gloss overlay */}
                      <div
                        className="absolute inset-0 pointer-events-none"
                        style={{
                          background: 'linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, transparent 100%)',
                          borderRadius: '20px',
                        }}
                      />

                      {/* Top row */}
                      <div className="flex items-start justify-between z-10 relative">
                        <div>
                          <span
                            className="text-[11px] uppercase tracking-[0.22em] font-bold block mb-2"
                            style={{ color: 'rgba(255,255,255,0.65)' }}
                          >
                            {service.category}
                          </span>
                          <span className="text-[30px]">{service.icon}</span>
                        </div>
                        {/* Decorative circle */}
                        <div
                          className="w-14 h-14 rounded-full"
                          style={{
                            background: 'rgba(255,255,255,0.12)',
                            border: '1px solid rgba(255,255,255,0.2)',
                          }}
                        />
                      </div>

                      {/* Middle — Title + description */}
                      <div className="z-10 relative">
                        <h3
                          className="font-serif text-[26px] font-bold leading-tight mb-2"
                          style={{ color: '#ffffff' }}
                        >
                          {service.title}
                        </h3>
                        <p
                          className="text-[13.5px] leading-relaxed line-clamp-2"
                          style={{ color: 'rgba(255,255,255,0.6)' }}
                        >
                          {service.description}
                        </p>
                      </div>

                      {/* Bottom — Stat + brand */}
                      <div className="flex items-end justify-between z-10 relative">
                        <div>
                          <div className="text-[26px] font-bold font-serif" style={{ color: '#ffffff' }}>
                            {service.stat}
                          </div>
                          <div className="text-[11px] uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.5)' }}>
                            {service.statLabel}
                          </div>
                        </div>
                        <div
                          className="text-[12px] font-bold tracking-widest"
                          style={{ color: 'rgba(255,255,255,0.7)' }}
                        >
                          DRISHTI
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </CardSwap>
            </div>

          </div>
        </div>
      </section>

      {/* ── Services Grid Section ── */}
      <section id="services-grid" className="flex-grow py-[4rem] w-full">
        <div className="max-w-7xl mx-auto px-4">

          {/* Section label */}
          <FadeIn>
            <div className="text-center mb-[3.5rem]">
              <div className="inline-block bg-gold/10 text-gold text-[11px] uppercase tracking-[0.15em] font-medium px-[12px] py-[4px] rounded-[20px] mb-[1rem]">
                All Services
              </div>
              <h2 className="font-serif text-[28px] md:text-[36px] text-textDark font-semibold mb-[1rem] leading-tight">
                Find the Right Solution for You
              </h2>
              <p className="text-muted text-[15px] md:text-[16px] leading-[1.6] max-w-[560px] mx-auto">
                From wealth building to protection — every service is crafted around your unique financial journey.
              </p>
            </div>
          </FadeIn>

          {/* Grid */}
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {servicesList.map((service) => (
              <StaggerItem key={service.id}>
                <BorderGlow className="h-full hover:-translate-y-1 transition-all duration-300" borderRadius={14} backgroundColor="#ffffff">
                  <div className="p-[2rem] h-full flex flex-col group">
                    <div className="flex items-center justify-between mb-[1.25rem]">
                      <span className="text-gold text-[11px] uppercase tracking-wider font-semibold bg-gold/10 px-[8px] py-[3px] rounded-[4px]">
                        {service.category}
                      </span>
                      <span className="text-[24px] transform group-hover:scale-110 transition-transform duration-300">
                        {service.icon}
                      </span>
                    </div>

                    <h3 className="font-serif text-navy text-[22px] font-semibold mb-[1rem] leading-tight group-hover:text-gold transition-colors duration-300">
                      {service.title}
                    </h3>

                    <p className="text-muted text-[14px] leading-[1.6] mb-[2rem] flex-grow">
                      {service.description}
                    </p>

                    <Link
                      to={service.link}
                      className="inline-flex items-center text-gold text-[13px] font-semibold tracking-wide hover:text-navy transition-colors mt-auto"
                    >
                      Explore Service &rarr;
                    </Link>
                  </div>
                </BorderGlow>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default ServicesPage;
