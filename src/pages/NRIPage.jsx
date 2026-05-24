import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import api from '../lib/api';
import FadeIn from '../components/animations/FadeIn';

const NRIPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [nriCountry, setNriCountry] = useState('');
  const [timezone, setTimezone] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleScrollToContact = () => {
    document.getElementById('nri-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919800000000?text=Hi!%20I%20am%20an%20NRI%20and%20would%20like%20to%20discuss%20my%20investment%20and%20insurance%20options%20in%20India.', '_blank');
  };

  const handleNriHealthWhatsApp = () => {
    const message = encodeURIComponent("Hello! I'm interested in buying a health insurance policy in India. I currently live in [country] and would like coverage for when I visit India for medical treatment or procedures. Can you help me understand my options?");
    window.open(`https://wa.me/919800000000?text=${message}`, '_blank');
  };

  const handleEmail = () => {
    window.location.href = 'mailto:info@shahfinancial.in?subject=NRI%20Investment%20%26%20Insurance%20Enquiry';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) { setError('Please enter your name and phone number'); return; }
    setError(''); setLoading(true);
    try {
      await api.post('/api/leads', {
        name, phone,
        interest: `NRI Services - ${interest || 'Not Specified'}`,
        isNri: `Yes - ${nriCountry || 'Not Specified'}`,
        message: `Timezone: ${timezone || 'Not Specified'} | Lead from NRI Page`,
      });
      setSuccess(true);
    } catch { setError('Something went wrong. Please try again'); }
    finally { setLoading(false); }
  };

  const labelStyles = "text-[#c9922a] text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] text-[#1a1a2e] font-semibold mb-[2rem] leading-tight";
  const cardStyles = "bg-white border border-[#0d2545]/12 rounded-[12px] p-[1.5rem] h-full transition-transform hover:-translate-y-1";
  const inputStyles = "w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-[#c9922a] focus:bg-white/10 placeholder-white/35 transition-colors";
  const formLabelStyles = "block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]";

  const mfServices = [
    'NRE / NRO account-based mutual fund investments',
    'DTAA (Double Tax Avoidance Agreement) guidance',
    'KYC and re-KYC for NRIs',
    'PAN card application and Aadhaar linking support',
    'Repatriation planning — moving money back abroad smoothly',
    'SIP setup and portfolio management remotely',
  ];

  const procedures = [
    { icon: '🦴', label: 'Orthopaedic surgeries (knee/hip replacement)' },
    { icon: '❤️', label: 'Cardiac procedures' },
    { icon: '🎗️', label: 'Cancer treatment' },
    { icon: '👁️', label: 'Eye surgeries (cataract, LASIK)' },
    { icon: '🦷', label: 'Dental and cosmetic procedures' },
    { icon: '🧬', label: 'Fertility treatments (IVF)' },
    { icon: '🩺', label: 'General health checkups and diagnostics' },
  ];

  const insurerPartners = ['HDFC Ergo', 'ICICI Lombard', 'Go Digit', 'Tata AIG', 'Bajaj Allianz', 'Edelweiss Zuno'];

  const policyChecks = [
    { icon: '⏳', title: 'Waiting Period Clauses', desc: "So you're covered when you actually need it — not after a long wait." },
    { icon: '🏥', title: 'Pre-existing Disease Terms', desc: 'We review coverage for pre-existing conditions so there are no surprises at claim time.' },
    { icon: '🗺️', title: 'Cashless Hospital Network', desc: 'We verify the cashless network covers the hospitals in your home city in India.' },
    { icon: '📋', title: 'Age & Sum Insured Fit', desc: 'We ensure the policy covers your age bracket and provides adequate sum insured.' },
    { icon: '🔄', title: 'Portability Options', desc: 'Options to port the policy if you return to India permanently later.' },
  ];

  const countries = ['🇺🇸 USA', '🇬🇧 UK', '🇦🇪 UAE', '🇦🇺 Australia', '🇨🇦 Canada', '🇸🇬 Singapore', '🇩🇪 Germany', '🇳🇿 New Zealand'];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>NRI Investment Services India — Shah Financial Services</title>
        <meta name="description" content="NRI mutual fund investments, NRI health insurance in India, DTAA guidance, KYC, repatriation planning. Serving NRIs across USA, UK, UAE, Canada, Australia, Singapore." />
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="bg-[#0d2545] py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center gap-[6px] bg-[#c9922a]/15 border border-[#c9922a]/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-[#f0c96a] text-[11px] uppercase tracking-[0.12em]">NRI Investment Services</span>
            </div>
            <h1 className="font-serif text-[34px] md:text-[46px] text-white font-semibold leading-[1.2] mb-[1.25rem] max-w-4xl">
              Your India Investments & Insurance — Managed Professionally, Even From Abroad
            </h1>
            <p className="text-white/65 text-[16px] leading-[1.6] mb-[2rem] max-w-2xl">
              You've built a life abroad. Your India investments and insurance deserve the same attention. We specialise in helping NRIs invest, stay compliant, grow their wealth back home — and stay protected every time they visit India.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={handleScrollToContact}
                className="bg-[#c9922a] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#f0c96a] transition-colors shadow-lg shadow-[#c9922a]/20">
                📅 Schedule a Call
              </button>
              <button onClick={handleWhatsApp}
                className="bg-[#25D366] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#22c35e] transition-colors flex items-center gap-2 shadow-lg shadow-[#25D366]/20">
                <span className="text-[18px]">💬</span> WhatsApp Us
              </button>
              <button onClick={handleEmail}
                className="bg-white/10 text-white border border-white/20 px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                ✉️ Email Us
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Countries We Serve */}
      <section className="bg-white py-[2.5rem] w-full border-b border-[#0d2545]/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-[#5c6478] text-[12px] uppercase tracking-[0.15em] font-medium mb-3">Serving NRIs Across</p>
            <div className="flex flex-wrap gap-3">
              {countries.map(c => (
                <div key={c} className="bg-[#faf8f4] border border-[#0d2545]/10 rounded-full px-[16px] py-[8px] text-[14px] text-[#0d2545] font-medium shadow-sm">{c}</div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* NRI Mutual Fund Investments */}
      <section className="bg-[#faf8f4] py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Mutual Fund Investments</div>
            <h2 className={titleStyles}>NRI Mutual Fund Investments</h2>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
              <div>
                <ul className="space-y-4">
                  {mfServices.map((s, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#c9922a] font-bold mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-[#5c6478] text-[15px] leading-[1.6]">{s}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 bg-[#0d2545]/5 border-l-4 border-[#c9922a] p-4 rounded-r-lg">
                  <p className="text-[#0d2545] text-[14px] font-semibold mb-1">100% Digital Process</p>
                  <p className="text-[#5c6478] text-[13px] leading-[1.5]">You don't need to fly down for any of this. Everything is handled digitally with proper compliance.</p>
                </div>
              </div>

              {/* NRE vs NRO mini comparison */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className={cardStyles}>
                  <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-3">NRE Account</h3>
                  <ul className="space-y-2 text-[#5c6478] text-[13px]">
                    <li>• Funded by foreign earnings</li>
                    <li>• Fully repatriable</li>
                    <li>• Interest tax-free in India</li>
                    <li>• Ideal for long-term SIPs</li>
                  </ul>
                </div>
                <div className={cardStyles}>
                  <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-3">NRO Account</h3>
                  <ul className="space-y-2 text-[#5c6478] text-[13px]">
                    <li>• Funded by India-sourced income</li>
                    <li>• Partially repatriable (up to $1M/yr)</li>
                    <li>• Interest taxable in India</li>
                    <li>• Ideal for local Indian earnings</li>
                  </ul>
                </div>
                <div className="sm:col-span-2 bg-[#0d2545] rounded-[12px] p-5 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-[#c9922a] rounded-full blur-[50px] opacity-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
                  <p className="text-white/60 text-[11px] uppercase tracking-wider mb-1">DTAA Coverage</p>
                  <p className="text-white font-serif text-[16px] font-semibold leading-snug">India has active DTAA treaties with 90+ countries — so you don't pay tax twice.</p>
                  <button onClick={handleScrollToContact} className="mt-3 text-[#f0c96a] text-[13px] font-medium hover:text-white transition-colors">
                    Ask us about your country →
                  </button>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* NRI Health Insurance — Full Section */}
      <section className="bg-white py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>NRI Health Insurance</div>
            <h2 className="font-serif text-[28px] text-[#1a1a2e] font-semibold mb-4 leading-tight max-w-3xl">
              Get World-Class Treatment in India, at a Fraction of the Cost
            </h2>
            <p className="text-[#5c6478] text-[15px] leading-[1.7] max-w-3xl mb-10">
              Healthcare abroad is expensive. A surgery that costs ₹3–5 lakhs in India can cost 10–20× more in the US, UK, or Gulf countries. Many NRIs now fly back to India for planned procedures — and the smart ones are covered with an Indian health insurance policy before they land.
            </p>

            {/* Cost Comparison Banner */}
            <div className="bg-[#0d2545] rounded-[20px] p-6 md:p-8 mb-10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#c9922a] rounded-full blur-[100px] opacity-10 pointer-events-none transform translate-x-1/3 -translate-y-1/3"></div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                <div className="text-center md:text-left">
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">Knee Replacement in India</p>
                  <p className="font-serif text-[36px] text-[#f0c96a] font-bold">₹3–5L</p>
                </div>
                <div className="text-center flex items-center justify-center">
                  <div className="text-white/30 text-[40px] font-serif">vs</div>
                </div>
                <div className="text-center md:text-right">
                  <p className="text-white/50 text-[12px] uppercase tracking-wider mb-1">Same Procedure Abroad</p>
                  <p className="font-serif text-[36px] text-white/70 font-bold line-through">₹30–60L</p>
                </div>
              </div>
              <p className="text-white/50 text-[13px] text-center mt-4 relative z-10">With Indian health insurance, your ₹3–5L surgery is fully covered.</p>
            </div>

            {/* What's covered */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-12">
              <div>
                <h3 className="font-serif text-[20px] text-[#0d2545] font-semibold mb-5">We help NRIs so that…</h3>
                <ul className="space-y-3">
                  {[
                    'Planned surgeries, procedures, and hospitalisation in India are fully covered',
                    "You're not paying out of pocket when you visit family and need medical care",
                    "You get access to India's best hospitals — Apollo, Fortis, AIIMS, Kokilaben — at insured rates",
                    'Premium costs a fraction of what international health cover charges',
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="text-[#c9922a] font-bold mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-[#5c6478] text-[15px] leading-[1.6]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Procedures grid */}
              <div>
                <h3 className="font-serif text-[20px] text-[#0d2545] font-semibold mb-5">Procedures NRI clients come back for</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {procedures.map((p) => (
                    <div key={p.label} className="flex items-center gap-3 bg-[#faf8f4] border border-[#0d2545]/8 rounded-[10px] px-4 py-3">
                      <span className="text-[22px]">{p.icon}</span>
                      <span className="text-[#5c6478] text-[13px] leading-snug">{p.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Insurer Partners (trust badges — no links) */}
            <div className="mb-10">
              <p className="text-[#5c6478] text-[12px] uppercase tracking-[0.15em] font-medium mb-3">Our Insurer Partners for NRI Health Covers</p>
              <div className="flex flex-wrap gap-3">
                {insurerPartners.map((p) => (
                  <div key={p} className="bg-[#faf8f4] border border-[#0d2545]/10 rounded-[8px] px-[16px] py-[8px] text-[#0d2545] text-[13px] font-semibold shadow-sm select-none">{p}</div>
                ))}
              </div>
            </div>

            {/* Policy Checks */}
            <div className="mb-10">
              <h3 className="font-serif text-[22px] text-[#0d2545] font-semibold mb-6">Important things we check for you</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {policyChecks.map((c) => (
                  <div key={c.title} className={cardStyles}>
                    <div className="text-[28px] mb-3">{c.icon}</div>
                    <h4 className="font-serif text-[16px] text-[#0d2545] font-semibold mb-2">{c.title}</h4>
                    <p className="text-[#5c6478] text-[13px] leading-[1.6]">{c.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* ROI highlight */}
            <div className="bg-[#c9922a]/10 border border-[#c9922a]/30 rounded-[14px] px-6 py-5 flex flex-col md:flex-row items-start md:items-center gap-5 justify-between">
              <p className="text-[#7a5520] text-[15px] leading-[1.6] font-medium max-w-2xl">
                💡 This is one of the most underutilised financial decisions an NRI can make. <strong>One planned surgery can recover the entire premium cost many times over.</strong>
              </p>
              <button onClick={handleNriHealthWhatsApp}
                className="flex-shrink-0 bg-[#25D366] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#22c35e] transition-colors flex items-center gap-2 shadow-lg shadow-[#25D366]/20 whitespace-nowrap">
                💬 WhatsApp About NRI Cover
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* KYC Process */}
      <section className="bg-[#faf8f4] py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>KYC Process</div>
            <h2 className={titleStyles}>Get Started in 3 Simple Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { num: '1', title: 'Submit Documents Online', desc: 'Provide your passport, overseas address proof, and PAN card through our secure digital process.' },
                { num: '2', title: 'Video Call Verification', desc: 'A quick 15-minute video KYC call scheduled entirely at your convenience, in your timezone.' },
                { num: '3', title: 'Account Activated', desc: 'Your NRI mutual fund account is activated within 48 hours and ready for investment.' },
              ].map((step) => (
                <div key={step.num} className={cardStyles}>
                  <div className="text-[#c9922a] font-serif text-[48px] leading-none mb-2 opacity-40">{step.num}</div>
                  <h3 className="font-semibold text-[#0d2545] text-[16px] mb-2">{step.title}</h3>
                  <p className="text-[#5c6478] text-[14px] leading-[1.6]">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Contact / Lead Form */}
      <section id="nri-contact" className="bg-[#0d2545] py-[5rem] w-full border-t border-white/5">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">Book Your Free NRI Consultation</h2>
              <p className="text-[#f0c96a] text-[18px] font-serif italic">"Leave your details and mention your time zone — we'll call you at a time that works."</p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10">
              <button onClick={handleWhatsApp}
                className="flex items-center justify-center gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-[#4ade80] px-6 py-3 rounded-[8px] font-medium transition-colors border border-[#25D366]/30">
                <span className="text-[18px]">💬</span> WhatsApp Us
              </button>
              <button onClick={handleEmail}
                className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-[8px] font-medium transition-colors border border-white/15">
                ✉️ Email Us
              </button>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[16px] p-[2rem] md:p-[2.5rem] shadow-2xl backdrop-blur-sm">
              {success ? (
                <div className="bg-green-500/15 border border-green-500/30 rounded-[10px] p-[2rem] text-center text-[#4ade80]">
                  <div className="text-[32px] mb-2">✅</div>
                  <h3 className="font-serif text-[24px] mb-2">Request Received</h3>
                  <p>Thank you! Our NRI investment specialist will contact you at your preferred time.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className={formLabelStyles}>Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className={inputStyles} />
                  </div>
                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Phone / WhatsApp</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 (XXX) XXX-XXXX" className={inputStyles} />
                  </div>
                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Country of Residence</label>
                    <input type="text" value={nriCountry} onChange={e => setNriCountry(e.target.value)} placeholder="e.g. USA, UAE, UK" className={inputStyles} />
                  </div>
                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Your Time Zone</label>
                    <input type="text" value={timezone} onChange={e => setTimezone(e.target.value)} placeholder="e.g. EST, GST, BST" className={inputStyles} />
                  </div>
                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Primary Interest</label>
                    <select value={interest} onChange={e => setInterest(e.target.value)} className={`${inputStyles} appearance-none cursor-pointer`}>
                      <option value="" className="bg-[#0d2545]">Select an option</option>
                      <option value="NRI Mutual Fund SIP" className="bg-[#0d2545]">NRI Mutual Fund SIP</option>
                      <option value="NRI Health Insurance" className="bg-[#0d2545]">NRI Health Insurance</option>
                      <option value="KYC / Account Setup" className="bg-[#0d2545]">KYC / Account Setup</option>
                      <option value="Portfolio Review" className="bg-[#0d2545]">Existing Portfolio Review</option>
                      <option value="Repatriation Planning" className="bg-[#0d2545]">Repatriation Planning</option>
                      <option value="General Enquiry" className="bg-[#0d2545]">General Enquiry</option>
                    </select>
                  </div>
                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px] mt-2">{error}</div>
                  )}
                  <div className="md:col-span-2 mt-3">
                    <button type="submit" disabled={loading} className="w-full bg-[#c9922a] text-white border-none py-[14px] rounded-[8px] text-[15px] font-medium hover:bg-[#f0c96a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#c9922a]/20">
                      {loading ? 'Submitting...' : 'Schedule My Free NRI Consultation'}
                    </button>
                    <p className="text-white/30 text-[11px] text-center mt-3">Mention your time zone and we'll call you at a convenient time.</p>
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

export default NRIPage;
