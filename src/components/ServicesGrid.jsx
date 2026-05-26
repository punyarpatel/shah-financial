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
      <div className="max-w-7xl mx-auto py-[3.5rem] px-4">

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
              <div className="relative">
                {/* Subtle soft shadow glow background to make the image float beautifully */}
                <div className="absolute -inset-2 bg-gradient-to-r from-gold/5 to-navy/5 rounded-full blur-xl opacity-70"></div>
                <img
                  src="/media__1779815978182.png"
                  alt="Growth and Wealth Management Illustration"
                  className="relative max-w-[200px] sm:max-w-[240px] md:max-w-full h-auto object-contain animate-float drop-shadow-lg"
                />
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
