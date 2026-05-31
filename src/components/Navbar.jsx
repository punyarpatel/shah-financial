import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const navData = {
  home: [
    { icon: '🏠', title: 'Welcome', desc: 'Return to the top of the homepage.', link: '/' },
    { icon: '🧮', title: 'SIP Calculator', desc: 'Direct link to the interactive SIP calculator.', link: '/#calculator' },
    { icon: '⭐', title: 'Client Testimonials', desc: 'Hear from our happy families.', link: '/#testimonials' },
    { icon: '💬', title: 'Contact Us', desc: 'Jump straight to the enquiry form.', link: '/#contact' },
  ],
  services: [
    { icon: '📊', title: 'Mutual Fund Advisory', desc: 'End-to-end management of your mutual fund journey from KYC to portfolio reviews.', link: '/services/mutual-funds' },
    { icon: '🛡️', title: 'Life & General Insurance', desc: 'Comprehensive coverage from trusted partners to protect your family and assets.', link: '/services/insurance' },
    { icon: '🌍', title: 'NRI Investment Services', desc: 'Specialized advisory for NRIs including NRE/NRO investing, health insurance, and repatriation.', link: '/nri' },
    { icon: '🎯', title: 'Retirement Planning', desc: 'Build a realistic, inflation-adjusted retirement corpus with dedicated plans and annual reviews.', link: '/services/retirement' },
    { icon: '💰', title: 'Tax Saving — ELSS', desc: 'Save tax under Section 80C while building wealth with equity-level returns.', link: '/services/elss' },
    { icon: '🎯', title: 'Goal-Based Wealth Planning', desc: 'Create dedicated investment buckets for education, home, business, and vacations.', link: '/services/goal-planning' },
  ],
  about: [
    { icon: '📖', title: 'Our Story', desc: 'A family built on trust since 2009.', link: '/about#story' },
    { icon: '🎯', title: 'Why Choose Us', desc: 'Personalized advisory and compliance.', link: '/about#why-choose-us' },
    { icon: '📜', title: 'Credentials', desc: 'AMFI, IRDAI, and partner registrations.', link: '/about#credentials' },
    { icon: '👥', title: 'Our Team', desc: 'Meet the people behind your wealth.', link: '/about#team' },
  ],
  blog: [
    { icon: '📈', title: 'What is a SIP?', desc: 'Learn how SIP builds wealth through compounding.', link: '/blog/what-is-sip' },
    { icon: '🛡️', title: 'Term vs Endowment', desc: 'Choose the right protection for your family.', link: '/blog/term-vs-endowment' },
    { icon: '🌍', title: 'NRI Investing Guide', desc: 'DTAA benefits and NRE account setup.', link: '/blog/nri-guide-investing' },
    { icon: '💰', title: 'Save Tax with ELSS', desc: 'Maximize Section 80C deductions.', link: '/blog/elss-tax-saving' },
    { icon: '🎯', title: 'Goal-Based Planning', desc: 'Align your investments with life goals.', link: '/blog/goal-based-wealth-planning' },
  ],
  client: [
    { icon: '🏦', title: 'NJ Client Desk', desc: 'Login for NJ Client Desk managed portfolios.', link: '/client-portal' },
    { icon: '📊', title: 'Prudent Client Desk', desc: 'Login for Prudent Client Desk platform.', link: '/client-portal' },
    { icon: '💬', title: 'Need Help?', desc: 'WhatsApp us if you are unsure which platform to use.', link: '/client-portal' },
  ]
};

const DesktopNavItem = ({ title, mainLink, items, handleLinkClick }) => (
  <div className="relative group h-full flex items-center">
    <button 
      onClick={(e) => handleLinkClick(e, mainLink)}
      className="text-white/75 group-hover:text-white text-[13px] transition-colors flex items-center gap-1 cursor-pointer"
    >
      {title}
      <svg xmlns="http://www.w3.org/2000/svg" className="h-[14px] w-[14px] opacity-70 group-hover:rotate-180 transition-transform duration-200" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      </svg>
    </button>
    
    <div className="absolute top-[64px] left-1/2 -translate-x-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 ease-out z-[100]">
      <div className="h-4 w-full absolute -top-4"></div>
      <div className={`bg-white rounded-[12px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-gray-100 p-4 mt-2 ${items.length > 4 ? 'w-[650px]' : 'w-[500px]'}`}>
        <div className={`grid gap-2 ${items.length > 3 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {items.map((item, idx) => (
            <a 
              key={idx}
              href={item.link}
              onClick={(e) => handleLinkClick(e, item.link)}
              className="flex items-start gap-3 p-3 rounded-[8px] hover:bg-gray-50 transition-colors border border-transparent hover:border-gray-100 group/card"
            >
              <span className="text-[20px] leading-none mt-0.5">{item.icon}</span>
              <div>
                <div className="text-navy text-[13px] font-semibold group-hover/card:text-gold transition-colors">{item.title}</div>
                <div className="text-muted text-[11px] mt-1 leading-snug">{item.desc}</div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  </div>
);

const MobileNavItem = ({ title, mainLink, items, isOpen, toggleOpen, handleLinkClick }) => (
  <div className="flex flex-col">
    <div className="flex items-center justify-between py-2">
      <button 
        onClick={(e) => handleLinkClick(e, mainLink)}
        className="text-white/75 hover:text-white text-[14px] transition-colors text-left flex-grow"
      >
        {title}
      </button>
      <button 
        onClick={toggleOpen}
        className="p-1 -mr-1 text-white/75 hover:text-white"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
    </div>
    
    {isOpen && (
      <div className="flex flex-col pl-4 mt-3 space-y-4 border-l border-white/10 ml-2">
        {items.map((item, idx) => (
          <a 
            key={idx}
            href={item.link}
            onClick={(e) => handleLinkClick(e, item.link)}
            className="flex items-start gap-3 group"
          >
            <span className="text-[16px] leading-none mt-0.5">{item.icon}</span>
            <div className="flex flex-col">
              <span className="text-white/75 group-hover:text-white text-[13px] font-medium transition-colors">{item.title}</span>
            </div>
          </a>
        ))}
      </div>
    )}
  </div>
);

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenus, setMobileMenus] = useState({
    home: false,
    services: false,
    about: false,
    blog: false,
    client: false
  });
  
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // If mobile menu is open, don't hide the navbar
      if (isOpen) {
        setLastScrollY(currentScrollY);
        return;
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down and past threshold
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isOpen]);

  const toggleMobileMenu = (key) => {
    setMobileMenus(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const closeMenu = () => {
    setIsOpen(false);
    setMobileMenus({
      home: false,
      services: false,
      about: false,
      blog: false,
      client: false
    });
  };

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    closeMenu();
    
    if (link === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
      }
    } else if (link.includes('#')) {
      const [path, hash] = link.split('#');
      if (location.pathname !== path) {
        navigate(link);
        setTimeout(() => {
          const section = document.getElementById(hash);
          if (section) section.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        const section = document.getElementById(hash);
        if (section) section.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(link);
    }
  };

  // Keep this specifically for the CTA button which might not pass an event
  const handleScrollToContact = () => {
    closeMenu();
    if (location.pathname !== '/') {
      navigate('/#contact');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogoClick = () => {
    closeMenu();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Invisible hover zone to reveal navbar when hovering at top edge */}
      {!isVisible && (
        <div 
          className="fixed top-0 left-0 w-full h-[20px] z-[150]"
          onMouseEnter={() => setIsVisible(true)}
        />
      )}

      <nav className={`sticky top-0 bg-navy h-[64px] z-[100] w-full shadow-md transition-transform duration-300 ease-in-out ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}>
        <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
        {/* Left Side: Logo */}
        <Link to="/" className="flex flex-col justify-center" onClick={handleLogoClick}>
          <span className="font-serif text-white text-[17px] font-semibold leading-tight">
            Shah Financial Services
          </span>
          <span className="text-goldLight text-[10px] uppercase tracking-[0.15em] leading-tight mt-0.5">
            AMFI Registered &middot; Est. 2009
          </span>
        </Link>

        {/* Right Side: Desktop Nav */}
        <div className="hidden md:flex items-center gap-6 h-full">
          <DesktopNavItem title="Home" mainLink="/" items={navData.home} handleLinkClick={handleLinkClick} />
          <DesktopNavItem title="Services" mainLink="/services" items={navData.services} handleLinkClick={handleLinkClick} />
          <DesktopNavItem title="About" mainLink="/about" items={navData.about} handleLinkClick={handleLinkClick} />
          <DesktopNavItem title="Blog" mainLink="/blog" items={navData.blog} handleLinkClick={handleLinkClick} />
          <DesktopNavItem title="Client Login" mainLink="/client-portal" items={navData.client} handleLinkClick={handleLinkClick} />
          
          {/* CTA Button */}
          <button 
            onClick={handleScrollToContact}
            className="bg-gold text-white px-[18px] py-[8px] rounded-[6px] text-[13px] font-medium hover:bg-goldLight transition-colors ml-2"
          >
            Get Free Review
          </button>
        </div>

        {/* Mobile Hamburger Icon */}
        <button 
          className="md:hidden text-white p-2" 
          onClick={() => setIsOpen(!isOpen)} 
          aria-label="Toggle menu"
        >
          {isOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 12h18M3 6h18M3 18h18" />
            </svg>
          )}
        </button>
      </div>

      {/* Mobile Dropdown Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-[64px] left-0 w-full bg-navy border-t border-white/10 shadow-lg max-h-[calc(100vh-64px)] overflow-y-auto">
          <div className="flex flex-col px-4 py-4 space-y-4">
            <MobileNavItem title="Home" mainLink="/" items={navData.home} isOpen={mobileMenus.home} toggleOpen={() => toggleMobileMenu('home')} handleLinkClick={handleLinkClick} />
            <MobileNavItem title="Services" mainLink="/services" items={navData.services} isOpen={mobileMenus.services} toggleOpen={() => toggleMobileMenu('services')} handleLinkClick={handleLinkClick} />
            <MobileNavItem title="About" mainLink="/about" items={navData.about} isOpen={mobileMenus.about} toggleOpen={() => toggleMobileMenu('about')} handleLinkClick={handleLinkClick} />
            <MobileNavItem title="Blog" mainLink="/blog" items={navData.blog} isOpen={mobileMenus.blog} toggleOpen={() => toggleMobileMenu('blog')} handleLinkClick={handleLinkClick} />
            <MobileNavItem title="Client Login" mainLink="/client-portal" items={navData.client} isOpen={mobileMenus.client} toggleOpen={() => toggleMobileMenu('client')} handleLinkClick={handleLinkClick} />
            
            <button 
              onClick={handleScrollToContact}
              className="bg-gold text-white px-[18px] py-[10px] rounded-[6px] text-[14px] font-medium hover:bg-goldLight transition-colors w-full text-center mt-2"
            >
              Get Free Review
            </button>
          </div>
        </div>
      )}
    </nav>
    </>
  );
};

export default Navbar;
