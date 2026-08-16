import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const CookieConsent = () => {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already given cookie consent
    const consent = localStorage.getItem('dw_cookie_consent');
    if (!consent) {
      // Delay showing popup by 1.5s for clean initial page load experience
      const timer = setTimeout(() => {
        setShowConsent(true);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    localStorage.setItem('dw_cookie_consent', 'accepted_all');
    setShowConsent(false);
  };

  const handleEssentialOnly = () => {
    localStorage.setItem('dw_cookie_consent', 'essential_only');
    setShowConsent(false);
  };

  return (
    <AnimatePresence>
      {showConsent && (
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 30, scale: 0.95 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-4 left-4 right-4 md:left-auto md:right-6 md:max-w-[420px] z-[9999]"
        >
          <div className="bg-[#0d2545] border border-[#c9922a]/30 rounded-[16px] p-5 shadow-[0_10px_35px_rgba(0,0,0,0.3)] text-white relative backdrop-blur-md overflow-hidden">
            {/* Ambient Gold Glow */}
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-[#c9922a]/15 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start gap-3 mb-3">
              <span className="text-[22px] flex-shrink-0">🍪</span>
              <div>
                <h4 className="font-serif text-[16px] font-bold text-white leading-tight">
                  Cookie & Privacy Preferences
                </h4>
                <p className="text-[#a0aabf] text-[12.5px] leading-[1.5] mt-1">
                  We use cookies to enhance your browsing experience, secure your session, and analyze site performance. By continuing, you agree to our policies.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-2.5 pt-2 border-t border-white/10 mt-3">
              <Link
                to="/privacy-policy"
                className="text-[12px] text-[#c9922a] hover:underline font-medium self-start sm:self-center"
              >
                Privacy Policy →
              </Link>
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                <button
                  type="button"
                  onClick={handleEssentialOnly}
                  className="px-3 py-1.5 rounded-[8px] border border-white/20 text-white/80 hover:text-white hover:bg-white/10 text-[12px] font-medium transition-all duration-200"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-4 py-1.5 rounded-[8px] bg-[#c9922a] hover:bg-[#d4af37] text-[#0d2545] text-[12px] font-bold transition-all duration-200 shadow-md shadow-[#c9922a]/20"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
