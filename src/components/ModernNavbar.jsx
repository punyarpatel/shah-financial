import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import EyeFollowButton from './EyeFollowButton';

const ModernNavbar = ({ onOpenContactModal, handleLinkClick, handleLogoClick, activeVariant = 'classic' }) => {
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();

  const links = [
    { label: 'Home', path: '/' },
    { label: 'Services', path: '/services' },
    { label: 'About Us', path: '/about' },
    { label: 'Blog', path: '/blog' }
  ];

  return (
    <div className="w-full flex justify-center py-3 px-4">
      {/* Floating Pill Floating Container matching Framer Modern Navbar */}
      <div className="w-full max-w-6xl bg-navy/90 backdrop-blur-xl border border-white/15 rounded-full px-6 py-2.5 shadow-[0_15px_35px_rgba(13,37,69,0.35)] flex items-center justify-between transition-all duration-300">
        
        {/* Brand Logo */}
        <Link to="/" className="flex flex-col justify-center" onClick={handleLogoClick}>
          <span className="font-serif text-white text-[16px] font-bold leading-tight">
            Drishti Wealth
          </span>
          <span className="text-goldLight text-[9.5px] uppercase tracking-[0.12em] leading-tight">
            Your Trusted Partner for Financial Growth
          </span>
        </Link>

        {/* Center Pill Nav Links with Floating Active Indicator */}
        <div className="hidden md:flex items-center gap-1 bg-white/5 border border-white/10 rounded-full p-1.5 shadow-inner">
          {links.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => handleLinkClick(e, link.path)}
                className={`relative px-4 py-1.5 text-[13px] font-medium rounded-full transition-colors duration-200 cursor-pointer ${
                  isActive ? 'text-white font-semibold' : 'text-white/70 hover:text-white'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePill"
                    className="absolute inset-0 bg-white/15 border border-white/20 rounded-full z-0"
                    transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </a>
            );
          })}
        </div>

        {/* Right CTA Button with Eye Follow animation */}
        <div className="hidden md:flex items-center gap-3">
          <EyeFollowButton
            text="Get Free Review"
            onClick={onOpenContactModal}
            buttonColor="#c9922a"
            textColor="#ffffff"
            eyeColor="#ffffff"
            pupilColor="#0d2545"
            className="py-1.5 px-4 text-[12.5px] font-semibold"
          />
        </div>

        {/* Mobile Hamburger Trigger */}
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="md:hidden text-white p-1.5 focus:outline-none"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {isMobileOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Slide-down Menu */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed top-[75px] left-4 right-4 bg-navy border border-white/15 rounded-3xl p-5 shadow-2xl z-[150] flex flex-col gap-4"
          >
            {links.map((link) => (
              <a
                key={link.path}
                href={link.path}
                onClick={(e) => {
                  setIsMobileOpen(false);
                  handleLinkClick(e, link.path);
                }}
                className="text-white/80 hover:text-white font-medium text-[15px] py-1 border-b border-white/5"
              >
                {link.label}
              </a>
            ))}
            <EyeFollowButton
              text="Get Free Review"
              onClick={() => {
                setIsMobileOpen(false);
                onOpenContactModal();
              }}
              buttonColor="#c9922a"
              textColor="#ffffff"
              eyeColor="#ffffff"
              pupilColor="#0d2545"
              className="w-full justify-center py-2.5 mt-2"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ModernNavbar;
