import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);
  const [showCustomize, setShowCustomize] = useState(false);
  const [analytics, setAnalytics] = useState(true);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem('drishti_cookie_consent');
    if (!consent) {
      // Show banner after a slight delay for smooth entrance
      const timer = setTimeout(() => setVisible(true), 800);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const preference = {
      essential: true,
      analytics: true,
      marketing: true,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('drishti_cookie_consent', JSON.stringify(preference));
    setVisible(false);
  };

  const handleEssentialOnly = () => {
    const preference = {
      essential: true,
      analytics: false,
      marketing: false,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('drishti_cookie_consent', JSON.stringify(preference));
    setVisible(false);
  };

  const handleSavePreferences = () => {
    const preference = {
      essential: true,
      analytics,
      marketing,
      timestamp: new Date().toISOString()
    };
    localStorage.setItem('drishti_cookie_consent', JSON.stringify(preference));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div 
      id="cookie-consent-banner" 
      className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-[460px] z-50 bg-[#0d2545] text-white p-5 rounded-[16px] shadow-2xl border border-white/10 animate-fade-in font-sans"
    >
      {!showCustomize ? (
        <>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[20px]">🍪</span>
            <h3 className="font-serif text-[16px] font-semibold text-white">Cookie & Privacy Preferences</h3>
          </div>
          <p className="text-white/70 text-[12px] leading-relaxed mb-4">
            We use cookies to enhance your browsing experience, analyze site traffic, and personalize content in accordance with our{' '}
            <Link to="/privacy-policy" className="text-[#c9922a] hover:underline font-medium">
              Privacy Policy
            </Link>.
          </p>
          <div className="flex flex-wrap items-center gap-2">
            <button
              id="cookie-accept-all"
              onClick={handleAcceptAll}
              className="bg-[#c9922a] hover:bg-[#b07f21] text-white text-[12px] font-medium py-2 px-4 rounded-[8px] cursor-pointer transition-colors"
            >
              Accept All
            </button>
            <button
              id="cookie-essential-only"
              onClick={handleEssentialOnly}
              className="bg-white/10 hover:bg-white/20 text-white text-[12px] font-medium py-2 px-4 rounded-[8px] cursor-pointer transition-colors"
            >
              Essential Only
            </button>
            <button
              id="cookie-customize"
              onClick={() => setShowCustomize(true)}
              className="text-white/60 hover:text-white text-[12px] font-medium py-2 px-2 cursor-pointer transition-colors bg-transparent border-none"
            >
              Customize
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-serif text-[15px] font-semibold text-white">Customize Preferences</h3>
            <button 
              onClick={() => setShowCustomize(false)} 
              className="text-white/50 hover:text-white bg-transparent border-none text-[18px] cursor-pointer"
            >
              &times;
            </button>
          </div>
          
          <div className="space-y-2 mb-4 text-[12px]">
            <div className="flex items-center justify-between p-2 bg-white/5 rounded-[6px]">
              <div>
                <span className="font-medium text-white block">Essential Cookies</span>
                <span className="text-white/50 text-[10px]">Required for core site functions</span>
              </div>
              <span className="text-[#c9922a] text-[11px] font-semibold">Always Active</span>
            </div>

            <div className="flex items-center justify-between p-2 bg-white/5 rounded-[6px]">
              <div>
                <span className="font-medium text-white block">Analytics Cookies</span>
                <span className="text-white/50 text-[10px]">Helps us improve performance</span>
              </div>
              <input
                type="checkbox"
                checked={analytics}
                onChange={(e) => setAnalytics(e.target.checked)}
                className="w-4 h-4 accent-[#c9922a] cursor-pointer"
              />
            </div>

            <div className="flex items-center justify-between p-2 bg-white/5 rounded-[6px]">
              <div>
                <span className="font-medium text-white block">Marketing Cookies</span>
                <span className="text-white/50 text-[10px]">Tailored communications</span>
              </div>
              <input
                type="checkbox"
                checked={marketing}
                onChange={(e) => setMarketing(e.target.checked)}
                className="w-4 h-4 accent-[#c9922a] cursor-pointer"
              />
            </div>
          </div>

          <button
            onClick={handleSavePreferences}
            className="w-full bg-[#c9922a] hover:bg-[#b07f21] text-white text-[12px] font-medium py-2 rounded-[8px] cursor-pointer transition-colors"
          >
            Save Preferences
          </button>
        </>
      )}
    </div>
  );
};

export default CookieConsent;
