import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import supabase from '../lib/supabase';
import FadeIn from '../components/animations/FadeIn';

const MutualFundPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [interest, setInterest] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

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
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Phone number must have at least 10 digits');
      return;
    }
    setError('');
    setLoading(true);

    const { error: sbError } = await supabase
      .from('leads')
      .insert([{
        name,
        phone,
        interest: `Mutual Fund Advisory - ${interest || 'Not Specified'}`,
        city: '',
        is_nri: '',
        nri_country: '',
        message: 'Lead from Mutual Funds Page',
        status: 'new',
        created_at: new Date().toISOString()
      }]);

    if (sbError) {
      console.error('Full error:', sbError);
      setError(sbError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const labelStyles = "text-[#c9922a] text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] text-[#1a1a2e] font-semibold mb-[2rem] leading-tight";
  const cardStyles = "bg-white border border-[#0d2545]/12 rounded-[12px] p-[1.5rem] h-full transition-transform hover:-translate-y-1";
  const inputStyles = "w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-[#c9922a] focus:bg-white/10 placeholder-white/35 transition-colors";
  const formLabelStyles = "block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]";

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>Mutual Fund Advisory — Shah Financial Services</title>
        <meta name="description" content="Expert mutual fund advisory, SIP setups, portfolio reviews, and goal-based investing." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-[#0d2545] py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center gap-[6px] bg-[#c9922a]/15 border border-[#c9922a]/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-[#f0c96a] text-[11px] uppercase tracking-[0.12em]">Mutual Fund Advisory</span>
            </div>
            
            <h1 className="font-serif text-[36px] md:text-[48px] text-white font-semibold leading-[1.2] mb-[1.25rem] max-w-4xl">
              We Handle Your Entire Mutual Fund Journey — Start to Finish
            </h1>
            
            <p className="text-white/65 text-[16px] leading-[1.6] mb-[2rem] max-w-2xl">
              Most people know they should invest in mutual funds. Very few have the time to actually manage it properly. That's exactly where we come in.
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
                <span className="text-[18px]">💬</span> WhatsApp Us
              </button>
              <button 
                onClick={handleScrollToContact}
                className="bg-[#c9922a] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#f0c96a] transition-colors shadow-lg shadow-[#c9922a]/20"
              >
                Start Your Investment
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Partners / Trust Badges Section */}
      <section className="bg-white py-[2.5rem] w-full border-b border-[#0d2545]/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center gap-8">
            <p className="text-[#5c6478] text-[15px] max-w-2xl leading-[1.6]">
              We are registered sub-brokers with <strong className="text-[#0d2545]">Prudent Corporate Advisory Services</strong> and operate through the <strong className="text-[#0d2545]">FundzBazar</strong> platform — one of India's most trusted mutual fund distribution networks.
            </p>
            <div className="flex items-center gap-6 opacity-60 grayscale ml-auto">
              {/* Trust Badges (Unlinked as per global rules) */}
              <div className="font-serif text-[20px] font-bold text-[#0d2545]">Prudent</div>
              <div className="h-8 w-px bg-gray-300"></div>
              <div className="font-sans text-[18px] font-bold tracking-tight text-[#0d2545]">FundzBazar</div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Services Grid ("What we do for you") */}
      <section className="bg-[#faf8f4] py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Our Services</div>
            <h2 className={titleStyles}>What We Do For You</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[3rem]">
              <div className={cardStyles}>
                <div className="text-[32px] mb-3">📝</div>
                <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">Paperwork & KYC</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">Complete KYC and PAN-Aadhaar linking — we sort all paperwork so you don't have to.</p>
              </div>
              
              <div className={cardStyles}>
                <div className="text-[32px] mb-3">🎯</div>
                <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">Risk Profiling</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">In-depth analysis to understand exactly what kind of investor you are and your tolerance for risk.</p>
              </div>

              <div className={cardStyles}>
                <div className="text-[32px] mb-3">📊</div>
                <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">Fund Selection</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">Strategic fund selection tailored perfectly to your specific goals, timeline, and risk appetite.</p>
              </div>

              <div className={cardStyles}>
                <div className="text-[32px] mb-3">📈</div>
                <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">Investment Execution</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">Seamless SIP setup, strategic lumpsum investments, and timely top-ups to maximize returns.</p>
              </div>

              <div className={cardStyles}>
                <div className="text-[32px] mb-3">🔄</div>
                <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">Portfolio Reviews</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">Regular portfolio reviews — conducted quarterly or whenever market movements demand action.</p>
              </div>

              <div className={cardStyles}>
                <div className="text-[32px] mb-3">🔀</div>
                <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">Fund Switches</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">Proactive fund switches deployed automatically whenever a better, more efficient option exists.</p>
              </div>

              <div className={cardStyles}>
                <div className="text-[32px] mb-3">💰</div>
                <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">Redemption Guidance</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">Tax-efficient redemption guidance designed for when you actually need to access your money.</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Form Section */}
      <section id="mf-contact" className="bg-[#0d2545] py-[5rem] w-full border-t border-white/5">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">
                Let's Build Your Wealth
              </h2>
              <p className="text-[#f0c96a] text-[20px] font-serif italic">
                "No jargon. No confusion. Just clear advice and execution."
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-[16px] p-[2rem] md:p-[2.5rem] shadow-2xl backdrop-blur-sm">
              {success ? (
                <div className="bg-green-500/15 border border-green-500/30 rounded-[10px] p-[2rem] text-center text-[#4ade80]">
                  <div className="text-[32px] mb-2">✅</div>
                  <h3 className="font-serif text-[24px] mb-2">Request Received</h3>
                  <p>Thank you! Our advisory team will contact you shortly.</p>
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
                    <label className={formLabelStyles}>Looking to start with</label>
                    <select value={interest} onChange={e => setInterest(e.target.value)} className={`${inputStyles} appearance-none cursor-pointer`}>
                      <option value="" className="bg-[#0d2545]">Select an option</option>
                      <option value="SIP (Under 10k/mo)" className="bg-[#0d2545]">SIP (Under 10k/mo)</option>
                      <option value="SIP (10k-25k/mo)" className="bg-[#0d2545]">SIP (10k-25k/mo)</option>
                      <option value="SIP (25k+/mo)" className="bg-[#0d2545]">SIP (25k+/mo)</option>
                      <option value="Lumpsum Investment" className="bg-[#0d2545]">Lumpsum Investment</option>
                      <option value="Portfolio Review" className="bg-[#0d2545]">Existing Portfolio Review</option>
                    </select>
                  </div>

                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px] mt-2">
                      {error}
                    </div>
                  )}

                  <div className="md:col-span-2 mt-3">
                    <button type="submit" disabled={loading} className="w-full bg-[#c9922a] text-white border-none py-[14px] rounded-[8px] text-[15px] font-medium hover:bg-[#f0c96a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#c9922a]/20">
                      {loading ? 'Submitting...' : 'Request Advisory Call'}
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
