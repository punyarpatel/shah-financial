import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { submitLead } from '../lib/leads';
import FadeIn from '../components/animations/FadeIn';

const InsurancePage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hovered, setHovered] = useState(false);

  const handleScrollToContact = () => {
    document.getElementById('ins-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open("https://wa.me/919664977576?text=Hi!%20I%20am%20interested%20in%20buying%20insurance.%20Can%20you%20help%20me%20choose%20the%20right%20plan%3F", '_blank');
  };

  const handleNriWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'm interested in buying a health insurance policy in India. I currently live in [country] and would like coverage for when I visit India for medical treatment or procedures. Can you help me understand my options?");
    window.open(`https://wa.me/919664977576?text=${message}`, '_blank');
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
      interest: `Insurance Advisory - ${interest || 'Not Specified'}`,
      message: 'Lead from Insurance Page'
    });

    if (!res.success) {
      setError(res.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const labelStyles = "text-gold text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] text-textDark font-semibold mb-[2rem] leading-tight";
  const cardStyles = "premium-card-interactive";
  const inputStyles = "w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-gold focus:bg-white/10 placeholder-white/35 transition-colors";
  const formLabelStyles = "block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]";

  const insuranceTypes = [
    {
      icon: '🛡️',
      title: 'Life Insurance',
      description: 'Term plans, ULIPs, endowment — we compare and recommend what genuinely suits you, not what pays the highest commission.',
    },
    {
      icon: '🏥',
      title: 'Health Insurance',
      description: 'Individual, family floater, senior citizen plans, top-up covers. We help you understand waiting periods, exclusions, and claim processes before you buy.',
    },
    {
      icon: '🚗',
      title: 'Motor Insurance',
      description: 'Car and two-wheeler — comprehensive and third party. Quick renewals, claim support included.',
    },
    {
      icon: '🏠',
      title: 'Fire & Burglary',
      description: 'Protect your home, shop, or office against fire, theft, and natural calamities.',
    },
    {
      icon: '🚢',
      title: 'Marine Insurance',
      description: 'Cargo and transit coverage for businesses moving goods.',
    },
    {
      icon: '👷',
      title: 'Workmen\'s Compensation (WC)',
      description: 'Mandatory coverage for businesses with workers — we handle compliance too.',
    },
    {
      icon: '👥',
      title: 'Group Health Insurance',
      description: 'Affordable employee health covers for SMEs and corporates. We handle the entire group policy setup and renewals.',
    },
    {
      icon: '➕',
      title: 'And More',
      description: 'Liability, shop owner policies, professional indemnity, and whatever your specific situation needs.',
    },
  ];

  const partners = ['HDFC Ergo', 'ICICI Lombard', 'Go Digit', 'Tata AIG', 'Bajaj Allianz', 'Reliance General', 'Edelweiss Zuno'];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>Life & General Insurance — Shah Financial Services</title>
        <meta name="description" content="Term life, health, motor, fire, marine, and group insurance from India's most trusted insurers. Compare and get covered today." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-navy py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center gap-[6px] bg-gold/15 border border-gold/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-goldLight text-[11px] uppercase tracking-[0.12em]">Life & General Insurance</span>
            </div>

            <h1 className="font-serif text-[36px] md:text-[48px] text-white font-semibold leading-[1.2] mb-[1.25rem] max-w-4xl">
              Every Insurance You'll Ever Need — Under One Roof
            </h1>

            <p className="text-white/65 text-[16px] leading-[1.6] mb-[2rem] max-w-2xl">
              Insurance is not a product — it's a promise to your family. We work with India's most trusted insurers so you always get the right cover at the right price.
            </p>

            <div className="flex flex-wrap gap-4 mt-[2rem]">
              <a
                href="tel:+919664977576"
                className="bg-white/10 text-white border border-white/20 px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-white/20 transition-colors flex items-center gap-2"
              >
                <span className="text-[18px]">📞</span> Call Us
              </a>
              <button
                onClick={handleWhatsApp}
                className="bg-[#25D366] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#22c35e] transition-colors flex items-center gap-2 shadow-lg shadow-[#25D366]/20"
              >
                <span className="text-[18px]">💬</span> WhatsApp for a Free Quote
              </button>
              <button
                onClick={handleScrollToContact}
                className="bg-gold text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-goldLight transition-colors shadow-lg shadow-gold/20"
              >
                Get Covered Today
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Partners Trust Badges Section */}
      <section className="bg-white py-[2.5rem] w-full border-b border-navy/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-muted text-[12px] uppercase tracking-[0.15em] font-medium mb-[1.25rem]">Our Insurance Partners</p>
            <div className="flex flex-wrap gap-3 items-center">
              {partners.map((partner, idx) => (
                <div
                  key={idx}
                  className="bg-cream border border-navy/10 rounded-[8px] px-[16px] py-[8px] text-navy text-[13px] font-semibold shadow-sm select-none"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Insurance Types Grid */}
      <section className="bg-cream py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>What We Cover</div>
            <h2 className={titleStyles}>Complete Insurance Solutions</h2>

            <div className="mt-[3rem] w-full premium-feature-card group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-stretch">
                {/* Left Column (50%) */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    {/* Soft colored square box icon container */}
                    <div className="relative w-14 h-14 mb-6 group/icon">
                      <div className="absolute inset-0 bg-gold/10 rounded-xl transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:bg-gold/15"></div>
                      <div className="absolute inset-1 bg-white rounded-lg shadow-sm border border-gold/10 flex items-center justify-center text-2xl transition-all duration-300 group-hover/icon:rotate-6">
                        🛡️
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-[24px] md:text-[26px] font-bold text-textDark mb-3 group-hover:text-navy transition-colors duration-300">
                      Life & General Insurance
                    </h3>

                    {/* Description */}
                    <p className="text-[15px] leading-relaxed text-muted mb-6">
                      Comprehensive coverage including life, health, motor, and business insurance from trusted partners to protect your family and assets.
                    </p>

                    {/* 3 key benefit points with a gold checkmark */}
                    <ul className="space-y-3.5 mb-8">
                      {[
                        'Term life and comprehensive health coverages',
                        'Motor, travel, and business insurance plans',
                        'End-to-end guidance and claims settlement support'
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
                        Learn more
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
                          src="/insurance_preview.png" 
                          alt="Life & General Insurance"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-lg"></div>
                      </div>
                    </div>

                    {/* Bottom Bar: White background, service name label and green indicator dot */}
                    <div className="bg-white border-t border-slate-100/80 px-6 py-4 flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-[#5c687e] tracking-wide">
                        Life & General Insurance
                      </span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Original Grid of Insurance types */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-[4rem]">
              {insuranceTypes.map((type) => (
                <div key={type.title} className={cardStyles}>
                  <div className="text-[32px] mb-3">{type.icon}</div>
                  <h3 className="font-serif text-[17px] text-navy font-semibold mb-2">{type.title}</h3>
                  <p className="text-muted text-[13px] leading-[1.6]">{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* NRI Health Insurance Callout */}
      <section className="bg-white py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className="bg-navy rounded-[20px] p-8 md:p-12 relative overflow-hidden">
              {/* Background accent */}
              <div className="absolute top-0 right-0 w-72 h-72 bg-gold rounded-full blur-[100px] opacity-10 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-8 justify-between">
                <div className="max-w-2xl">
                  <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-[14px] py-[4px] mb-4">
                    <span className="text-goldLight text-[11px] uppercase tracking-[0.12em]">🌍 NRI Special</span>
                  </div>
                  <h3 className="font-serif text-[26px] md:text-[32px] text-white font-semibold mb-3 leading-tight">
                    NRI Health Insurance in India
                  </h3>
                  <p className="text-white/70 text-[15px] leading-[1.7]">
                    Visiting India for medical treatment or procedures? We help NRIs get the right health insurance coverage in India — so you can access world-class care without worrying about costs.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <button
                    onClick={handleNriWhatsApp}
                    className="bg-[#25D366] text-white px-[28px] py-[14px] rounded-[10px] font-semibold hover:bg-[#22c35e] transition-colors flex items-center gap-3 shadow-xl shadow-[#25D366]/20 whitespace-nowrap text-[15px]"
                  >
                    <span className="text-[20px]">💬</span>
                    WhatsApp Us About NRI Cover
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Contact / Lead Form */}
      <section id="ins-contact" className="bg-navy py-[5rem] w-full border-t border-white/5">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">
                Get Covered Today
              </h2>
              <p className="text-goldLight text-[19px] font-serif italic">
                "One call is all it takes. We assess, compare, and get you covered."
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[16px] p-[2rem] md:p-[2.5rem] shadow-2xl backdrop-blur-sm">
              {success ? (
                <div className="bg-green-500/15 border border-green-500/30 rounded-[10px] p-[2rem] text-center text-[#4ade80]">
                  <div className="text-[32px] mb-2">✅</div>
                  <h3 className="font-serif text-[24px] mb-2">Request Received</h3>
                  <p>Thank you! Our insurance advisor will contact you within 24 hours.</p>
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
                    <label className={formLabelStyles}>Insurance Type</label>
                    <select value={interest} onChange={e => setInterest(e.target.value)} className={`${inputStyles} appearance-none cursor-pointer`}>
                      <option value="" className="bg-navy">Select an option</option>
                      <option value="Life Insurance" className="bg-navy">Life Insurance</option>
                      <option value="Health Insurance" className="bg-navy">Health Insurance</option>
                      <option value="Motor Insurance" className="bg-navy">Motor Insurance</option>
                      <option value="Fire & Burglary" className="bg-navy">Fire & Burglary</option>
                      <option value="Marine Insurance" className="bg-navy">Marine Insurance</option>
                      <option value="Workmen's Compensation" className="bg-navy">Workmen's Compensation</option>
                      <option value="Group Health Insurance" className="bg-navy">Group Health Insurance</option>
                      <option value="NRI Health Insurance" className="bg-navy">NRI Health Insurance</option>
                      <option value="Not Sure" className="bg-navy">Not Sure — Help Me Decide</option>
                    </select>
                  </div>

                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px] mt-2">
                      {error}
                    </div>
                  )}

                  <div className="md:col-span-2 mt-3">
                    <button type="submit" disabled={loading} className="w-full bg-gold text-white border-none py-[14px] rounded-[8px] text-[15px] font-medium hover:bg-goldLight transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gold/20">
                      {loading ? 'Submitting...' : 'Request a Free Quote'}
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

export default InsurancePage;
