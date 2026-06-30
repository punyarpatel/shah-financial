import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { submitLead } from '../lib/leads';

const ClientPortalPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [interest, setInterest] = useState('Portfolio Review');
  const [isNri, setIsNri] = useState('No — I am based in India');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const resetForm = () => {
    setName('');
    setPhone('');
    setCity('');
    setInterest('Portfolio Review');
    setIsNri('No — I am based in India');
    setMessage('');
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !city || !interest || !isNri) {
      setError('Please fill out all required fields');
      return;
    }
    setError('');
    setLoading(true);

    const res = await submitLead({
      name,
      phone,
      interest,
      city,
      is_nri: isNri,
      message
    });

    if (!res.success) {
      setError(res.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleNJLogin = () => {
    window.open('https://www.njwealth.in', '_blank');
  };

  const handlePrudentLogin = () => {
    window.open('https://www.prudentcorporate.com/ccd/index.aspx', '_blank');
  };

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent('Hi Drishti Wealth, I need help logging into my portfolio.');
    window.open(`https://wa.me/919664977576?text=${text}`, '_blank');
  };

  const labelStyles = "text-[#c9922a] text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] md:text-[36px] text-[#1a1a2e] font-semibold mb-[1rem] leading-tight";
  const cardStyles = "bg-white border-[1.5px] border-[#0d2545]/12 rounded-[14px] p-[2rem] text-center hover:border-[#c9922a] transition-colors cursor-pointer";
  const btnStyles = "inline-block bg-[#c9922a] text-white px-[20px] py-[10px] rounded-[6px] text-[14px] font-medium hover:bg-[#f0c96a] transition-colors";

  const ogImage = `${window.location.origin}/why_choose_us_mockup.png`;

  return (
    <div className="min-h-screen bg-[#faf8f4] flex flex-col relative">
      <Helmet>
        <title>Client Portfolio Login — Drishti Wealth</title>
        <meta name="description" content="Access your NJ Client Desk and FundzBazar Prudent Client Desk portfolios to monitor your mutual fund holdings and transactions." />
        <meta property="og:title" content="Client Portfolio Login — Drishti Wealth" />
        <meta property="og:description" content="Access your NJ Client Desk and FundzBazar Prudent Client Desk portfolios to monitor your mutual fund holdings and transactions." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Client Portfolio Login — Drishti Wealth" />
        <meta name="twitter:description" content="Access your NJ Client Desk and FundzBazar Prudent Client Desk portfolios to monitor your mutual fund holdings and transactions." />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Navbar />

      <section className="flex-grow py-[4rem] w-full">
        <div className="max-w-[680px] mx-auto px-4">

          {/* Header */}
          <div className="text-center mb-[2rem]">
            <div className={labelStyles}>Portfolio Access</div>
            <h1 className={titleStyles}>Access Your Investment Portfolio</h1>
            <p className="text-[#5c6478] text-[15px] leading-[1.6]">
              Select your platform below to view your holdings and transaction history.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            {/* Card 1: NJ Client Desk */}
            <div className={cardStyles} onClick={handleNJLogin}>
              <div className="text-[40px] mb-[1rem]">🏦</div>
              <h2 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-[0.5rem]">NJ Client Desk</h2>
              <p className="text-[#5c6478] text-[13px] leading-[1.5] mb-[1.5rem]">
                For clients whose portfolio is managed through the NJ Client Desk.
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); handleNJLogin(); }}
                className={btnStyles}
              >
                Login to NJ Client Desk
              </button>
            </div>

            {/* Card 2: Prudent Client Desk */}
            <div className={cardStyles} onClick={handlePrudentLogin}>
              <div className="text-[40px] mb-[1rem]">📊</div>
              <h2 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-[0.5rem]">Prudent Client Desk</h2>
              <p className="text-[#5c6478] text-[13px] leading-[1.5] mb-[1.5rem]">
                For clients on the Prudent Client Desk platform.
              </p>
              <button
                onClick={(e) => { e.stopPropagation(); handlePrudentLogin(); }}
                className={btnStyles}
              >
                Login to Prudent Client Desk
              </button>
            </div>
          </div>

          {/* Help Box */}
          <div className="mt-[2rem] bg-[#0d2545]/5 border border-[#0d2545]/10 rounded-[12px] p-[1.5rem] text-center">
            <p className="text-[#0d2545] text-[14px] font-medium mb-[1rem]">
              Not sure which platform you use? WhatsApp us and we will guide you in 2 minutes.
            </p>
            <button
              onClick={handleWhatsAppHelp}
              className="inline-flex items-center gap-2 bg-[#25d366] text-white px-[20px] py-[10px] rounded-[6px] text-[14px] font-medium hover:bg-[#1db954] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.251 2.924.185.049 3.158 4.842 7.659 6.792.822.358 1.465.57 1.968.73.826.26 1.579.223 2.169.135.66-.098 2.03-.83 2.316-1.631.286-.8.286-1.488.2-1.631-.086-.143-.314-.228-.611-.377L17.472 14.382z" />
                <path d="M12.004 2A10.005 10.005 0 002 12.002c0 1.954.512 3.868 1.484 5.55L2 22l4.582-1.458C8.22 21.493 10.093 22 12.002 22 17.525 22 22 17.524 22 12.002 22 6.478 17.523 2 12.004 2zM12.002 20.315c-1.658 0-3.284-.446-4.71-1.29l-.337-.2-3.411 1.085 1.106-3.323-.22-.349a8.318 8.318 0 01-1.272-4.442c0-4.593 3.738-8.332 8.332-8.332 2.227 0 4.318.868 5.89 2.441a8.303 8.303 0 012.441 5.891c0 4.594-3.737 8.332-8.333 8.332z" />
              </svg>
              Message on WhatsApp
            </button>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-[1.5rem]">
            <span className="text-[#5c6478] text-[13px]">New client? </span>
            <button
              onClick={() => { resetForm(); setIsModalOpen(true); }}
              className="text-[#c9922a] text-[13px] font-medium hover:text-[#f0c96a] transition-colors cursor-pointer bg-transparent border-none p-0 inline-flex items-center gap-1"
            >
              Fill our enquiry form to get started &rarr;
            </button>
          </div>

        </div>
      </section>

      <Footer />
      <WhatsAppFloat />

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-[#0d2545]/60 backdrop-blur-sm"
            />

            {/* Modal Card */}
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative w-full max-w-[500px] bg-white rounded-2xl border border-[#0d2545]/12 shadow-[0_20px_50px_rgba(13,37,69,0.25)] p-6 md:p-8 z-10 overflow-hidden"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsModalOpen(false)}
                className="absolute top-4 right-4 text-slate-400 hover:text-[#0d2545] transition-colors bg-transparent border-none p-1 cursor-pointer"
                aria-label="Close modal"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="mb-6 text-left">
                <span className="text-[#c9922a] text-[10px] tracking-[0.15em] uppercase font-semibold mb-1 block">New Client Enquiry</span>
                <h3 className="font-serif text-[22px] text-[#0d2545] font-bold">Start Your Financial Journey</h3>
                <p className="text-[#5c6478] text-[13px] mt-1">Fill in your details and we will call you within 24 hours.</p>
              </div>

              {success ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center text-emerald-600">
                  <div className="text-[32px] mb-2">✅</div>
                  <h4 className="font-serif text-[18px] font-bold mb-1">Enquiry Submitted!</h4>
                  <p className="text-[13px]">Thank you for reaching out. Our team will contact you within 24 hours.</p>
                  <div className="flex gap-3 justify-center mt-5">
                    <button
                      onClick={resetForm}
                      className="bg-[#0d2545]/10 hover:bg-[#0d2545]/20 text-[#0d2545] border border-[#0d2545]/20 px-4 py-2 rounded-lg text-[13.5px] font-medium transition-colors cursor-pointer"
                    >
                      Back to form
                    </button>
                    <button
                      onClick={() => setIsModalOpen(false)}
                      className="bg-[#0d2545] text-white px-6 py-2 rounded-lg text-[13.5px] font-medium hover:bg-[#0d2545]/95 transition-colors cursor-pointer border-none"
                    >
                      Close Window
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-left">
                  <div>
                    <label className="block text-[11px] text-[#0d2545]/70 uppercase tracking-[0.05em] font-medium mb-1">Full Name</label>
                    <input
                      type="text"
                      placeholder="Your name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[13.5px] font-sans text-navy bg-slate-50/50 outline-none focus:border-[#c9922a] focus:bg-white transition-colors placeholder-slate-400"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-[#0d2545]/70 uppercase tracking-[0.05em] font-medium mb-1">Phone / WhatsApp</label>
                      <input
                        type="tel"
                        placeholder="+91 XXXXX XXXXX"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[13.5px] font-sans text-navy bg-slate-50/50 outline-none focus:border-[#c9922a] focus:bg-white transition-colors placeholder-slate-400"
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#0d2545]/70 uppercase tracking-[0.05em] font-medium mb-1">City</label>
                      <input
                        type="text"
                        placeholder="Ahmedabad"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[13.5px] font-sans text-navy bg-slate-50/50 outline-none focus:border-[#c9922a] focus:bg-white transition-colors placeholder-slate-400"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-[#0d2545]/70 uppercase tracking-[0.05em] font-medium mb-1">I am interested in</label>
                      <select
                        value={interest}
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[13.5px] font-sans text-navy bg-slate-50/50 outline-none focus:border-[#c9922a] focus:bg-white transition-colors cursor-pointer"
                      >
                        <option value="Mutual Fund SIP">Mutual Fund SIP</option>
                        <option value="Insurance Planning">Insurance Planning</option>
                        <option value="NRI Investment Services">NRI Investment Services</option>
                        <option value="Portfolio Review">Portfolio Review</option>
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#0d2545]/70 uppercase tracking-[0.05em] font-medium mb-1">Are you an NRI?</label>
                      <select
                        value={isNri}
                        onChange={(e) => setIsNri(e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[13.5px] font-sans text-navy bg-slate-50/50 outline-none focus:border-[#c9922a] focus:bg-white transition-colors cursor-pointer"
                      >
                        <option value="No — I am based in India">No — I am based in India</option>
                        <option value="Yes — USA or Canada">Yes — USA or Canada</option>
                        <option value="Yes — UAE or Middle East">Yes — UAE or Middle East</option>
                        <option value="Yes — UK or Europe">Yes — UK or Europe</option>
                        <option value="Yes — Australia or New Zealand">Yes — Australia or New Zealand</option>
                        <option value="Yes — Singapore or SE Asia">Yes — Singapore or SE Asia</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] text-[#0d2545]/70 uppercase tracking-[0.05em] font-medium mb-1">Message (optional)</label>
                    <textarea
                      placeholder="Tell us a little about your goals"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[13.5px] font-sans text-navy bg-slate-50/50 outline-none focus:border-[#c9922a] focus:bg-white transition-colors placeholder-slate-400 h-[65px] resize-none leading-normal"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-500/10 border border-red-500/30 text-red-500 py-2 px-3 rounded-lg text-[12px] font-medium">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#c9922a] text-white border-none py-3 rounded-lg text-[14px] font-medium cursor-pointer font-sans hover:bg-[#f0c96a] transition-all duration-200 mt-2 disabled:opacity-75 disabled:cursor-not-allowed shadow-md shadow-gold/15"
                  >
                    {loading ? 'Submitting...' : 'Submit Enquiry'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ClientPortalPage;
