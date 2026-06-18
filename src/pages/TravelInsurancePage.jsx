import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { submitLead } from '../lib/leads';
import FadeIn from '../components/animations/FadeIn';

const TRAVEL_INSURANCE_FEATURES = [
  {
    id: 'medical',
    icon: '🏥',
    title: 'Medical Emergencies',
    description: 'Cashless hospitalization and coverage for accidents, illness, or emergency surgeries abroad.',
    detailedDescription: 'Healthcare overseas can cost millions of rupees. We ensure you get up to $500,000 in medical coverage with zero deductibles and seamless cashless claims in top international hospitals.'
  },
  {
    id: 'cancellation',
    icon: '❌',
    title: 'Trip Cancellation',
    description: 'Get reimbursed for non-refundable flights and hotels if you have to cancel your trip due to emergencies.',
    detailedDescription: 'If a sudden illness or family emergency forces you to cancel or cut your trip short, your prepaid bookings are fully covered so you don\'t lose your money.'
  },
  {
    id: 'baggage',
    icon: '🧳',
    title: 'Lost or Delayed Baggage',
    description: 'Compensation for lost check-in luggage or emergency funds if your bags are delayed by the airline.',
    detailedDescription: 'Arriving in a foreign country without your luggage is a nightmare. Our plans provide immediate emergency cash for essentials and full compensation for permanently lost bags.'
  },
  {
    id: 'flight',
    icon: '⏱️',
    title: 'Flight Delays & Missed Connections',
    description: 'Coverage for meals, accommodations, and rebooking costs if your flights are delayed or missed.',
    detailedDescription: 'Don\'t sleep on the airport floor. If weather or airline issues cause significant delays, we cover your hotel stays, meals, and alternative transport arrangements.'
  },
  {
    id: 'passport',
    icon: '🛂',
    title: 'Loss of Passport',
    description: 'Financial assistance and support to obtain a duplicate passport or emergency travel documents.',
    detailedDescription: 'Losing your passport abroad is terrifying. We cover the fees for emergency certificates, new passports, and even extend your hotel stay while you wait.'
  },
  {
    id: 'liability',
    icon: '⚖️',
    title: 'Personal Liability',
    description: 'Protection against third-party property damage or injuries caused by you during your travel.',
    detailedDescription: 'Accidents happen. If you accidentally damage property or injure someone abroad, you are protected from massive foreign legal and medical liabilities.'
  }
];

const TravelInsurancePage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [destination, setDestination] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleScrollToContact = () => {
    document.getElementById('travel-contact')?.scrollIntoView({ behavior: 'auto' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !destination) {
      setError('Please fill out all required fields');
      return;
    }
    setError('');
    setLoading(true);

    const res = await submitLead({
      name,
      phone,
      interest: `Overseas Travel Insurance - Destination: ${destination}`,
      message: 'Lead from Travel Insurance Page'
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
    setDestination('');
    setError('');
    setSuccess(false);
  };

  const labelStyles = "text-gold text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] text-textDark font-semibold mb-[2rem] leading-tight";
  const inputStyles = "w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-gold focus:bg-white/10 placeholder-white/35 transition-colors";
  const formLabelStyles = "block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]";

  const ogImage = `${window.location.origin}/travel_insurance_preview.png`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>Overseas Travel Insurance — Shah Financial Services</title>
        <meta name="description" content="Comprehensive overseas travel insurance covering medical emergencies, trip cancellations, lost baggage, and flight delays." />
        <meta property="og:title" content="Overseas Travel Insurance — Shah Financial Services" />
        <meta property="og:description" content="Comprehensive overseas travel insurance covering medical emergencies, trip cancellations, lost baggage, and flight delays." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
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
              <span className="text-goldLight text-[11px] uppercase tracking-[0.12em]">Overseas Travel Insurance</span>
            </div>

            <h1 className="font-serif text-[36px] md:text-[48px] text-white font-semibold leading-[1.2] mb-[1.25rem] max-w-4xl">
              Travel the World With Absolute Peace of Mind
            </h1>

            <p className="text-white/65 text-[16px] leading-[1.6] mb-[2rem] max-w-2xl">
              From minor flight delays to major medical emergencies abroad, our customized travel insurance ensures you're protected anywhere in the world.
            </p>

            <div className="flex flex-wrap gap-4 mt-[2rem]">
              <button
                onClick={handleScrollToContact}
                className="bg-gold text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-goldLight transition-colors shadow-lg shadow-gold/20"
              >
                Get a Quote for Your Trip
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Features Grid */}
      <section className="bg-cream py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>What We Cover</div>
            <h2 className={titleStyles}>Comprehensive Protection Abroad</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[3rem] relative">
              {TRAVEL_INSURANCE_FEATURES.map((feature, index) => {
                const isHovered = hoveredIndex === index;
                const isAnyHovered = hoveredIndex !== null;
                
                let xTranslate = 0;
                let yTranslate = 0;
                
                if (isAnyHovered && !isHovered) {
                  const columns = 3;
                  const r = Math.floor(index / columns);
                  const c = index % columns;
                  const hr = Math.floor(hoveredIndex / columns);
                  const hc = hoveredIndex % columns;
                  
                  const dr = r - hr;
                  const dc = c - hc;
                  
                  xTranslate = Math.sign(dc) * 30;
                  yTranslate = Math.sign(dr) * 30;
                }
                
                return (
                  <motion.div
                    key={feature.id}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    animate={{
                      scale: isHovered ? 1.04 : isAnyHovered ? 0.95 : 1,
                      x: xTranslate,
                      y: yTranslate,
                      opacity: isHovered ? 1 : isAnyHovered ? 0.3 : 1,
                      zIndex: isHovered ? 50 : 1,
                      borderColor: isHovered ? 'rgba(201, 146, 42, 0.4)' : 'rgba(13, 37, 69, 0.1)',
                      boxShadow: isHovered ? '0 20px 40px rgba(13, 37, 69, 0.08)' : '0 2px 4px rgba(0,0,0,0)'
                    }}
                    transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                    className="bg-white border border-navy/10 rounded-[16px] p-6 h-full flex flex-col cursor-pointer group"
                  >
                    <div className="text-[32px] mb-4">{feature.icon}</div>
                    <h3 className="font-serif text-[18px] text-navy font-bold mb-2 group-hover:text-gold transition-colors">{feature.title}</h3>
                    <p className="text-muted text-[14px] leading-[1.6] mb-4">{feature.description}</p>
                    
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: isHovered ? 'auto' : 0, 
                        opacity: isHovered ? 1 : 0,
                        marginTop: isHovered ? 12 : 0
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted text-[13px] leading-[1.6] border-t border-navy/5 pt-3">
                        {feature.detailedDescription}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Contact / Lead Form */}
      <section id="travel-contact" className="bg-navy py-[5rem] w-full border-t border-white/5">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">
                Secure Your Trip
              </h2>
              <p className="text-goldLight text-[18px] font-serif italic">
                "Pack your bags. Leave the worries to us."
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[16px] p-[2rem] md:p-[2.5rem] shadow-2xl backdrop-blur-sm">
              {success ? (
                <div className="bg-green-500/15 border border-green-500/30 rounded-[10px] p-[2rem] text-center text-[#4ade80] flex flex-col items-center gap-4">
                  <div className="text-[32px] mb-2">✅</div>
                  <h3 className="font-serif text-[24px] mb-2">Request Received</h3>
                  <p>Thank you! Our travel insurance specialist will contact you shortly with the best quotes for your destination.</p>
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
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputStyles} />
                  </div>

                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Destination Country</label>
                    <select value={destination} onChange={e => setDestination(e.target.value)} className={`${inputStyles} appearance-none cursor-pointer`}>
                      <option value="" className="bg-navy">Select Destination</option>
                      <option value="USA / Canada" className="bg-navy">USA / Canada</option>
                      <option value="Europe / Schengen" className="bg-navy">Europe / Schengen Area</option>
                      <option value="UK" className="bg-navy">United Kingdom</option>
                      <option value="Australia / New Zealand" className="bg-navy">Australia / New Zealand</option>
                      <option value="Asia" className="bg-navy">Asia</option>
                      <option value="Middle East" className="bg-navy">Middle East</option>
                      <option value="Worldwide" className="bg-navy">Worldwide Multi-Trip</option>
                    </select>
                  </div>

                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px] mt-2">
                      {error}
                    </div>
                  )}

                  <div className="md:col-span-2 mt-3">
                    <button type="submit" disabled={loading} className="w-full bg-gold text-white border-none py-[14px] rounded-[8px] text-[15px] font-medium hover:bg-goldLight transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gold/20">
                      {loading ? 'Generating Quotes...' : 'Get Travel Insurance Quotes'}
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

export default TravelInsurancePage;
