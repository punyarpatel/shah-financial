import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import FadeIn from '../components/animations/FadeIn';
import StaggerGroup from '../components/animations/StaggerGroup';
import StaggerItem from '../components/animations/StaggerItem';

const servicesList = [
  {
    id: 'mutual-funds',
    icon: '📈',
    category: 'Wealth Management',
    title: 'Mutual Fund Advisory',
    description: 'End-to-end management of your mutual fund journey, including KYC, risk profiling, fund selection, SIP setup, and regular portfolio reviews.',
    link: '/services/mutual-funds'
  },
  {
    id: 'insurance',
    icon: '🛡️',
    category: 'Security & Cover',
    title: 'Life & General Insurance',
    description: 'Comprehensive coverage including life, health, motor, and business insurance from trusted partners to protect your family and assets.',
    link: '/services/insurance'
  },
  {
    id: 'nri-services',
    icon: '🌍',
    category: 'NRI Special',
    title: 'NRI Investment Services',
    description: 'Specialized advisory for NRIs including NRE/NRO investing, remote KYC, repatriation planning, and health insurance for treatment in India.',
    link: '/nri'
  },
  {
    id: 'retirement',
    icon: '🏖️',
    category: 'Long-Term Goals',
    title: 'Retirement Planning',
    description: 'Build a realistic, inflation-adjusted retirement corpus with dedicated investment plans and annual reviews so you can truly live well.',
    link: '/services/retirement'
  },
  {
    id: 'elss',
    icon: '💰',
    category: 'Tax Optimization',
    title: 'Tax Saving — ELSS',
    description: 'Save up to ₹46,800 in tax every year under Section 80C while building wealth with equity-level returns and a short 3-year lock-in.',
    link: '/services/elss'
  },
  {
    id: 'goals',
    icon: '🎯',
    category: 'Goal Tracking',
    title: 'Goal-Based Wealth Planning',
    description: 'Create dedicated investment buckets for your children’s education, home purchase, business capital, and dream vacations with tracked progress.',
    link: '/services/goal-planning'
  }
];

const ServicesPage = () => {
  const ogImage = `${window.location.origin}/why_choose_us_mockup.png`;

  return (
    <div className="min-h-screen bg-cream flex flex-col relative">
      <Helmet>
        <title>Our Services — Shah Financial Services Ahmedabad</title>
        <meta name="description" content="Explore comprehensive wealth management, mutual fund advisory, life and health insurance, NRI investment planning, retirement setups, and tax-saving ELSS." />
        <meta property="og:title" content="Our Services — Shah Financial Services Ahmedabad" />
        <meta property="og:description" content="Explore comprehensive wealth management, mutual fund advisory, life and health insurance, NRI investment planning, retirement setups, and tax-saving ELSS." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Our Services — Shah Financial Services Ahmedabad" />
        <meta name="twitter:description" content="Explore comprehensive wealth management, mutual fund advisory, life and health insurance, NRI investment planning, retirement setups, and tax-saving ELSS." />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Navbar />

      <section className="flex-grow py-[4rem] w-full">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Header */}
          <FadeIn>
            <div className="text-center mb-[3.5rem]">
              <div className="inline-block bg-gold/10 text-gold text-[11px] uppercase tracking-[0.15em] font-medium px-[12px] py-[4px] rounded-[20px] mb-[1rem]">
                What We Offer
              </div>
              <h1 className="font-serif text-[36px] md:text-[44px] text-textDark font-semibold mb-[1rem] leading-tight">
                Our Services
              </h1>
              <p className="text-muted text-[15px] md:text-[16px] leading-[1.6] max-w-[560px] mx-auto">
                Discover our range of wealth management and protection solutions, customized by certified professionals to suit your lifestyle and financial goals.
              </p>
            </div>
          </FadeIn>

          {/* Grid */}
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
            {servicesList.map((service) => (
              <StaggerItem key={service.id}>
                <div className="bg-white border border-navy/10 rounded-[14px] p-[2rem] hover:-translate-y-1 hover:border-gold/50 transition-all duration-300 h-full flex flex-col group">
                  <div className="flex items-center justify-between mb-[1.25rem]">
                    <span className="text-gold text-[11px] uppercase tracking-wider font-semibold bg-gold/10 px-[8px] py-[3px] rounded-[4px]">
                      {service.category}
                    </span>
                    <span className="text-[24px] transform group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </span>
                  </div>
                  
                  <h2 className="font-serif text-navy text-[22px] font-semibold mb-[1rem] leading-tight group-hover:text-gold transition-colors duration-300">
                    {service.title}
                  </h2>
                  
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
