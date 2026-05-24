import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const headingStyles = "text-white font-medium text-[14px] mb-4";
  const linkStyles = "block text-white/40 text-[13px] hover:text-[#c9922a] transition-colors mb-3 cursor-pointer";
  const textStyles = "block text-white/40 text-[13px] mb-3";

  return (
    <footer className="bg-navy py-16 w-full border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 flex flex-col gap-16">
        
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* Left Side: Columns (Spans 8 cols on large screens) */}
          <div className="lg:col-span-8 grid grid-cols-2 md:grid-cols-4 gap-8">
            {/* Column 1 */}
            <div>
              <h3 className={headingStyles}>Company</h3>
              <Link to="/" className={linkStyles}>Home</Link>
              <Link to="/about" className={linkStyles}>About</Link>
              <a href="#services" className={linkStyles}>Services</a>
              <Link to="/blog" className={linkStyles}>Blog</Link>
            </div>
            
            {/* Column 2 */}
            <div>
              <h3 className={headingStyles}>Services</h3>
              <a href="#services" className={linkStyles}>Mutual Funds</a>
              <Link to="/nri" className={linkStyles}>NRI Investment</Link>
              <a href="#services" className={linkStyles}>Insurance</a>
              <a href="#services" className={linkStyles}>Portfolio Review</a>
            </div>

            {/* Column 3 */}
            <div>
              <h3 className={headingStyles}>Contact</h3>
              <a href="#contact" className={linkStyles}>Get in Touch</a>
              <span className={textStyles}>+91 98XXX XXXXX</span>
              <span className={textStyles}>contact@shahfinancial.in</span>
              <span className={textStyles}>Ahmedabad, Gujarat</span>
            </div>

            {/* Column 4 */}
            <div>
              <h3 className={headingStyles}>Legal</h3>
              <span className={linkStyles}>Privacy Policy</span>
              <span className={linkStyles}>Terms of Service</span>
              <span className={linkStyles}>Disclosures</span>
            </div>
          </div>

          {/* Right Side: Copyright & Badges (Spans 4 cols on large screens) */}
          <div className="lg:col-span-4 flex flex-col items-start lg:items-end justify-between gap-8 lg:gap-0">
            <div className="text-white/40 text-[12px]">
              &copy; 2026 Shah Financial Services. All rights reserved.
            </div>
            
            <div className="flex gap-4 items-center">
              {/* Badge 1 (Circular) */}
              <div className="w-24 h-24 rounded-full border-[3px] border-white/20 flex flex-col items-center justify-center text-center p-2 bg-white/5">
                <span className="text-[#f0c96a] font-bold text-[10px] leading-tight">AMFI</span>
                <span className="text-white font-bold text-[11px] leading-tight mt-1">REGISTERED</span>
                <span className="text-white/60 text-[9px] mt-1">MUTUAL FUNDS</span>
              </div>
              
              {/* Badge 2 (Circular) */}
              <div className="w-24 h-24 rounded-full border-[3px] border-white/20 flex flex-col items-center justify-center text-center p-2 bg-white/5">
                <span className="text-[#f0c96a] font-bold text-[10px] leading-tight">IRDAI</span>
                <span className="text-white font-bold text-[11px] leading-tight mt-1">LICENSE</span>
                <span className="text-white/60 text-[9px] mt-1">INSURANCE</span>
              </div>

              {/* Badge 3 (Square - matching Forbes style) */}
              <div className="w-24 h-24 border border-[#c9922a] flex flex-col items-center justify-center text-center p-2 bg-navy relative">
                <div className="absolute inset-1 border border-white/10"></div>
                <span className="text-white/80 font-serif italic text-[10px] leading-tight z-10">Partner</span>
                <span className="text-white font-bold text-[14px] leading-tight mt-1 z-10">NJ WEALTH</span>
                <span className="bg-[#c9922a] text-navy font-bold text-[10px] px-2 py-0.5 mt-2 z-10">2026</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Section: Disclaimer */}
        <div className="text-white/30 text-[11px] leading-relaxed text-justify">
          Mutual fund investments are subject to market risks. Please read all scheme-related documents carefully before investing. Past performance is not indicative of future returns. The content found on this website should not be interpreted as providing legal, tax, or investment advice. Shah Financial Services and its representatives may only transact business or provide investment advice in those jurisdictions where it is registered or otherwise excluded or exempted from registration requirements. Insurance is the subject matter of solicitation. AMFI Reg. No: ARN-XXXXX &middot; IRDAI License No: XXXXXXXXX.
        </div>
        
      </div>
    </footer>
  );
};

export default Footer;
