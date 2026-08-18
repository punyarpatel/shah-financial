import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { submitLead } from '../lib/leads';
import FadeIn from '../components/animations/FadeIn';
import PhoneNumberField from '../components/PhoneNumberField';
import ServiceCardGraphic from '../components/ServiceCardGraphic';
import BorderGlow from '../components/animations/BorderGlow';

const SUB_SERVICES = [
  {
    id: 'kyc',
    icon: '📝',
    title: 'Paperwork & KYC',
    description: "Complete KYC and PAN-Aadhaar linking: we sort all paperwork so you don't have to.",
    detailedDescription: "We handle the entire onboarding process, including digital signatures, document verification, FATCA compliance for NRI accounts, and seamless linkage of bank mandates for direct auto-debit of SIPs."
  },
  {
    id: 'risk',
    icon: '🎯',
    title: 'Risk Profiling',
    description: 'In-depth analysis to understand exactly what kind of investor you are and your tolerance for risk.',
    detailedDescription: 'We assess your investment horizon, financial goals, and emotional tolerance for market volatility. This ensures we never place you in funds that make you anxious or mismatch your timelines.'
  },
  {
    id: 'selection',
    icon: '📊',
    title: 'Fund Selection',
    description: 'Strategic fund selection tailored perfectly to your specific goals, timeline, and risk appetite.',
    detailedDescription: 'Out of 2,500+ active schemes, we filter and choose the top 5–6 funds across various categories (Large, Mid, Small, Flexi, Debt) using rigorous historical and risk-adjusted return metrics.'
  },
  {
    id: 'execution',
    icon: '📈',
    title: 'Investment Execution',
    description: 'Seamless SIP setup, strategic lumpsum investments, and timely top-ups to maximize returns.',
    detailedDescription: 'We configure your monthly SIPs on chosen dates, process bulk lump-sum deployments during market dips, and execute automated top-ups to accelerate your wealth accumulation path.'
  },
  {
    id: 'reviews',
    icon: '🔄',
    title: 'Portfolio Reviews',
    description: 'Regular portfolio reviews: conducted quarterly or whenever market movements demand action.',
    detailedDescription: 'We monitor fund performance against benchmarks and peer groups. If a fund underperforms consistently for two quarters, or if your asset allocation drifts, we prepare rebalancing recommendations.'
  }
];

const MutualFundPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hovered, setHovered] = useState(false);
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleScrollToContact = () => {
    const contactSection = document.getElementById('mf-contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleWhatsApp = () => {
    // Note: This is the general WhatsApp link since this isn't specifically the NRI health insurance lead.
    window.open('https://wa.me/919664977576?text=Hi!%20I%20am%20interested%20in%20starting%20a%20Mutual%20Fund%20investment.', '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !interest) {
      setError('Please fill out all required fields');
      return;
    }
    setError('');
    setLoading(true);

    const res = await submitLead({
      name,
      phone,
      interest: `Mutual Fund Advisory - ${interest || 'Not Specified'}`,
      source: 'Mutual Funds Page'
    });

    if (!res.success) {
      setError(res.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setInterest('');
    setError('');
    setSuccess(false);
  };

  const labelStyles = "text-gold text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] text-textDark font-semibold mb-[2rem] leading-tight";
  const cardStyles = "premium-card-interactive";
  const inputStyles = "w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-gold focus:bg-white/10 placeholder-white/35 transition-colors";
  const formLabelStyles = "block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]";

  const ogImage = `${window.location.origin}/mutual_funds_preview.png`;

  return (
    <div className="min-h-screen bg-cream flex flex-col relative">
      <Helmet>
        <title>Mutual Fund Distributor in Ahmedabad | Drishti Wealth</title>
        <meta name="description" content="Top AMFI-registered mutual fund distributor in Ahmedabad. Goal-based SIP planning, portfolio reviews, lumpsum investments, and expert fund selection." />
        <link rel="canonical" href="https://drishtiwealth.com/services/mutual-funds" />
        <meta property="og:title" content="Mutual Fund Distributor in Ahmedabad | Drishti Wealth" />
        <meta property="og:description" content="Top AMFI-registered mutual fund distributor in Ahmedabad. Goal-based SIP planning, portfolio reviews, lumpsum investments, and fund selection." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Mutual Fund Distributor in Ahmedabad | Drishti Wealth" />
        <meta name="twitter:description" content="Top AMFI-registered mutual fund distributor in Ahmedabad for SIP investments & portfolio reviews." />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-navy py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-6">
              <Link to="/services" className="text-gold/85 hover:text-gold font-medium text-[14px] inline-flex items-center gap-1.5 transition-colors">
                &larr; Back to Services
              </Link>
            </div>
            <div className="inline-flex items-center gap-[6px] bg-gold/15 border border-gold/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-goldLight text-[11px] uppercase tracking-[0.12em]">AMFI Registered Mutual Fund Distributor</span>
            </div>

            <h1 className="font-serif text-[36px] md:text-[48px] text-white font-semibold leading-[1.2] mb-[1.25rem] max-w-4xl">
              Mutual Fund Distributor in Ahmedabad
            </h1>

            <p className="text-white/65 text-[16px] leading-[1.6] mb-[2rem] max-w-2xl">
              We handle your entire mutual fund journey: from risk profiling and fund selection to seamless monthly SIP execution and quarterly portfolio reviews.
            </p>

            <div className="flex flex-wrap gap-4 mt-[2rem]">
              <a
                href="tel:+919664977576"
                className="bg-white/10 text-white border border-white/20 px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <span className="text-[18px]">📞</span> Call Us
              </a>
              <button
                onClick={handleScrollToContact}
                className="bg-gold text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-goldLight transition-colors shadow-lg shadow-gold/20"
              >
                Start Your Investment
              </button>
            </div>
          </div>
        </FadeIn>
      </section>
      {/* Services Section ("What we do for you") */}
      <section className="bg-[#faf8f4] py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Our Services</div>
            <h2 className={titleStyles}>What We Do For You</h2>

            <BorderGlow className="mt-[3rem] w-full group" borderRadius={16} backgroundColor="#ffffff">
              <div className="p-[40px] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-stretch">
                {/* Left Column (50%) */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    {/* Soft colored square box icon container */}
                    <div className="relative w-14 h-14 mb-6 group/icon">
                      <div className="absolute inset-0 bg-gold/10 rounded-xl transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:bg-gold/15"></div>
                      <div className="absolute inset-1 bg-white rounded-lg shadow-sm border border-gold/10 flex items-center justify-center text-2xl transition-all duration-300 group-hover/icon:rotate-6">
                        📈
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-[24px] md:text-[26px] font-bold text-textDark mb-3 group-hover:text-navy transition-colors duration-300">
                      Mutual Fund Services
                    </h3>

                    {/* Description */}
                    <p className="text-[15px] leading-relaxed text-muted mb-6">
                      End-to-end management of your mutual fund journey, including account setup, KYC, risk profiling, fund selection, SIP setup, and regular portfolio reviews.
                    </p>

                    {/* 3 key benefit points with a gold checkmark */}
                    <ul className="space-y-3.5 mb-8">
                      {[
                        'Tailored portfolio selection matching your risk profile',
                        'Seamless online KYC and automatic monthly SIP setup',
                        'Regular portfolio tracking and performance reviews'
                      ].map((benefit, idx) => (
                        <li key={idx} className="flex items-start text-[14.5px] text-muted">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center mr-3 mt-[2px] transition-transform duration-300 group-hover:scale-110">
                            <span className="text-gold text-[10px] font-bold">✓</span>
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
                    <button
                      onClick={handleScrollToContact}
                      className="inline-flex items-center text-[14px] font-bold text-gold hover:text-goldLight group/link transition-colors duration-300"
                    >
                      <span className="relative py-1">
                        Start with us
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <svg className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right Column (50%) - Tilted 3D Preview Box */}
                <div className="relative w-full h-full min-h-[320px] md:min-h-full">
                  <div className="relative w-full h-full bg-[#f4f7fa] rounded-[16px] flex flex-col justify-between border border-slate-100 shadow-inner overflow-hidden group/right">

                    {/* Top Area (Approx 80% height): Tilted 3D Preview container */}
                    <div
                      className="relative flex-grow flex items-center justify-center p-8 pb-4"
                      style={{ perspective: '1000px' }}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <div
                        className="relative w-[90%] aspect-[16/10] bg-white rounded-xl border border-slate-100 overflow-hidden"
                        style={{
                          transform: hovered
                            ? 'rotateX(4deg) rotateY(-6deg) rotateZ(1deg) scale(1.02)'
                            : 'rotateX(8deg) rotateY(-12deg) rotateZ(2deg)',
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
                          boxShadow: hovered
                            ? '0 30px 60px rgba(13,37,69,0.12), 0 10px 20px rgba(0,0,0,0.04)'
                            : '0 20px 40px rgba(13,37,69,0.06), 0 5px 15px rgba(0,0,0,0.02)'
                        }}
                      >
                        <img
                          src="/mutual_funds_preview.png"
                          alt="Mutual Fund Services"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-lg"></div>
                      </div>
                    </div>

                    {/* Bottom Bar: White background, service name label and green indicator dot */}
                    <div className="bg-white border-t border-slate-100/80 px-6 py-4 flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-[#5c687e] tracking-wide">
                        Mutual Fund Services
                      </span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </BorderGlow>

            {/* Interactive sub-services cards grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[4rem] relative">
              {expandedIndex !== null && (
                <div 
                  className="fixed inset-0 z-40 bg-transparent cursor-default" 
                  onClick={() => setExpandedIndex(null)}
                />
              )}
              {SUB_SERVICES.map((item, index) => {
                const isExpanded = expandedIndex === index;
                const isAnyExpanded = expandedIndex !== null;

                // Calculate slide translations based on relative position in a 3-column layout
                let xTranslate = 0;
                let yTranslate = 0;

                if (isAnyExpanded && !isExpanded) {
                  const r = Math.floor(index / 3);
                  const c = index % 3;
                  const hr = Math.floor(expandedIndex / 3);
                  const hc = expandedIndex % 3;

                  const dr = r - hr;
                  const dc = c - hc;

                  // Translate outwards away from the expanded card
                  xTranslate = Math.sign(dc) * 60;
                  yTranslate = Math.sign(dr) * 60;
                }

                return (
                  <motion.div
                    key={item.id}
                    onClick={() => setExpandedIndex(isExpanded ? null : index)}
                    style={{
                      originX: 0.5,
                      originY: 0.5,
                    }}
                    animate={{
                      scale: isExpanded ? 1.06 : isAnyExpanded ? 0.92 : 1,
                      x: xTranslate,
                      y: yTranslate,
                      opacity: isExpanded ? 1 : isAnyExpanded ? 0.2 : 1,
                      zIndex: isExpanded ? 50 : 1,
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 150,
                      damping: 25,
                      mass: 0.8,
                    }}
                    className="relative cursor-pointer h-full min-h-[180px]"
                  >
                    <BorderGlow
                      className="h-full w-full"
                      borderRadius={16}
                      backgroundColor="#ffffff"
                      glowColor="45 85 50"
                      glowIntensity={isExpanded ? 1.5 : 1.0}
                    >
                      <div className="p-6 h-full flex flex-col justify-between group">
                        <div className="relative pr-16">
                          <h3 className={`font-serif text-[18px] font-bold mb-2 transition-colors ${isExpanded ? 'text-gold' : 'text-navy group-hover:text-gold'}`}>{item.title}</h3>
                          <p className="text-muted text-[14px] leading-[1.6]">{item.description}</p>

                          {/* Image Graphic in top right */}
                          <div className={`absolute -top-1 -right-2 w-14 h-14 md:w-16 md:h-16 pointer-events-none transform transition-transform duration-500 ease-out ${isExpanded ? 'scale-110 -rotate-3' : 'group-hover:scale-105'}`}>
                            <ServiceCardGraphic id={item.id} />
                          </div>
                        </div>

                        <div>
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{
                              height: isExpanded ? 'auto' : 0,
                              opacity: isExpanded ? 1 : 0,
                              marginTop: isExpanded ? 16 : 0
                            }}
                            transition={{
                              duration: 0.35,
                              ease: [0.16, 1, 0.3, 1]
                            }}
                            className="overflow-hidden"
                          >
                            <p className="text-muted text-[13.5px] leading-[1.6] border-t border-navy/5 pt-3">
                              {item.detailedDescription}
                            </p>
                          </motion.div>
                        </div>

                        {/* Expand/Collapse Indicator */}
                        <div className="absolute bottom-4 right-4 flex items-center justify-center w-6 h-6 rounded-full border border-gold/20 bg-gold/5 group-hover:border-gold/50 group-hover:bg-gold/10 transition-colors">
                          <motion.svg
                            animate={{ rotate: isExpanded ? 45 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="w-3 h-3 text-gold"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth={3}
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                          </motion.svg>
                        </div>
                      </div>
                    </BorderGlow>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Form Section */}
      <section id="mf-contact" className="bg-navy py-[5rem] w-full border-t border-white/5">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">
                Let's Build Your Wealth
              </h2>
              <p className="text-goldLight text-[20px] font-serif italic">
                "No jargon. No confusion. Just clear advice and execution."
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[16px] p-[2rem] md:p-[2.5rem] shadow-2xl backdrop-blur-sm">
              {success ? (
                <div className="form-success-reveal bg-green-500/15 border border-green-500/30 rounded-[10px] p-[2rem] text-center text-[#4ade80] flex flex-col items-center gap-4">
                  <div className="text-[32px] mb-2">✅</div>
                  <h3 className="font-serif text-[24px] mb-2">Request Received</h3>
                  <p>Thank you! Our team will contact you shortly.</p>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 py-[8px] px-[16px] rounded-[6px] text-[13px] font-medium cursor-pointer transition-all"
                  >
                    Back to form
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className={formLabelStyles}>Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className={inputStyles} />
                  </div>

                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Phone / WhatsApp</label>
                    <PhoneNumberField value={phone} onChange={setPhone} />
                  </div>

                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Looking to start with</label>
                    <select value={interest} onChange={e => setInterest(e.target.value)} className={`${inputStyles} appearance-none cursor-pointer`}>
                      <option value="" className="bg-navy">Select an option</option>
                      <option value="SIP (Under 10k/mo)" className="bg-navy">SIP (Under 10k/mo)</option>
                      <option value="SIP (10k-25k/mo)" className="bg-navy">SIP (10k-25k/mo)</option>
                      <option value="SIP (25k+/mo)" className="bg-navy">SIP (25k+/mo)</option>
                      <option value="Lumpsum Investment" className="bg-navy">Lumpsum Investment</option>
                      <option value="Portfolio Review" className="bg-navy">Existing Portfolio Review</option>
                    </select>
                  </div>

                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px] mt-2">
                      {error}
                    </div>
                  )}

                  <div className="md:col-span-2 mt-3">
                    <button type="submit" disabled={loading} className="w-full bg-gold text-white border-none py-[14px] rounded-[8px] text-[15px] font-medium hover:bg-goldLight transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gold/20">
                      {loading ? 'Submitting...' : 'Request a Call'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default MutualFundPage;
