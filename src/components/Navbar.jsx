import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { submitLead } from '../lib/leads';
import { countriesList } from '../lib/countries';
import EyeFollowButton from './EyeFollowButton';
import ModernNavbar from './ModernNavbar';

const navData = {
  home: [
    { icon: '🏠', title: 'Welcome', desc: 'Return to the top of the homepage.', link: '/' },
    { icon: '🧮', title: 'SIP Calculator', desc: 'Direct link to the interactive SIP calculator.', link: '/#calculator' },
    { icon: '⭐', title: 'Client Testimonials', desc: 'Hear from our happy families.', link: '/#testimonials' },
    { icon: '❓', title: 'FAQs', desc: 'Frequently asked financial questions.', link: '/#faq' },
    { icon: '💬', title: 'Contact Us', desc: 'Jump straight to the enquiry form.', link: '/#contact' },
  ],
  services: [
    { icon: '📊', title: 'Mutual Fund Services', desc: 'End-to-end management of your mutual fund journey from KYC to portfolio reviews.', link: '/services/mutual-funds' },
    { icon: '🛡️', title: 'Life & General Insurance', desc: 'Comprehensive coverage from trusted partners to protect your family and assets.', link: '/services/insurance' },
    { icon: '✈️', title: 'Overseas Travel Insurance', desc: 'Comprehensive coverage for medical emergencies, trip cancellations, and lost baggage while traveling abroad.', link: '/services/travel-insurance' },
    { icon: '🌍', title: 'NRI Investment Services', desc: 'Specialized advisory for NRIs including NRE/NRO investing, health insurance, and repatriation.', link: '/nri' },
    { icon: '🎯', title: 'Retirement Planning', desc: 'Build a realistic, inflation-adjusted retirement corpus with dedicated plans and annual reviews.', link: '/services/retirement' },
    { icon: '🎯', title: 'Goal-Based Wealth Planning', desc: 'Create dedicated investment buckets for education, home, business, and vacations.', link: '/services/goal-planning' },
  ],
  about: [
    { icon: '📖', title: 'Our Story', desc: 'A family built on trust since 2001.', link: '/about#story' },
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
  const [navMode, setNavMode] = useState('classic');
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenus, setMobileMenus] = useState({
    home: false,
    services: false,
    about: false,
    blog: false
  });

  const location = useLocation();
  const navigate = useNavigate();

  // Contact Modal States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [interest, setInterest] = useState('Portfolio Review');
  const [isNri, setIsNri] = useState('No');
  const [nriCountry, setNriCountry] = useState('');
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const filteredCountries = countriesList.filter(country =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleCountryChange = (e) => {
    const val = e.target.value;
    setCountrySearch(val);
    setShowCountryDropdown(true);
    
    // Check if the typed value matches a country exactly
    const match = countriesList.find(c => c.toLowerCase() === val.trim().toLowerCase());
    if (match) {
      setNriCountry(match);
    } else {
      setNriCountry('');
    }
  };

  const resetForm = () => {
    setName('');
    setPhone('');
    setCity('');
    setInterest('Portfolio Review');
    setIsNri('No');
    setNriCountry('');
    setCountrySearch('');
    setShowCountryDropdown(false);
    setMessage('');
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !interest || !isNri) {
      setError('Please fill out all required fields');
      return;
    }
    if (isNri === 'No' && !city) {
      setError('Please enter your city');
      return;
    }
    if (isNri === 'Yes' && !nriCountry) {
      setError('Please select your country of residence');
      return;
    }
    setError('');
    setLoading(true);

    const res = await submitLead({
      name,
      phone,
      interest,
      city: isNri === 'No' ? city : '',
      is_nri: isNri === 'Yes' ? 'Yes' : 'No',
      nri_country: isNri === 'Yes' ? nriCountry : '',
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
      blog: false
    });
  };

  const handleLinkClick = (e, link) => {
    e.preventDefault();
    closeMenu();

    if (link === '/') {
      if (location.pathname === '/') {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else {
        navigate('/');
      }
    } else if (link.includes('#')) {
      const [path, hash] = link.split('#');
      if (location.pathname !== path) {
        navigate(link);
        setTimeout(() => {
          const section = document.getElementById(hash);
          if (section) section.scrollIntoView({ behavior: 'auto' });
        }, 100);
      } else {
        const section = document.getElementById(hash);
        if (section) section.scrollIntoView({ behavior: 'auto' });
      }
    } else {
      if (location.pathname === link) {
        window.scrollTo({ top: 0, behavior: 'auto' });
      } else {
        navigate(link);
      }
    }
  };

  // Keep this specifically for the CTA button which might not pass an event
  const handleScrollToContact = () => {
    closeMenu();
    if (location.pathname !== '/') {
      navigate('/#contact');
      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) contactSection.scrollIntoView({ behavior: 'auto' });
      }, 100);
    } else {
      const contactSection = document.getElementById('contact');
      if (contactSection) contactSection.scrollIntoView({ behavior: 'auto' });
    }
  };

  const handleLogoClick = () => {
    closeMenu();
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  };

  const mobileMenuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '/' },
    { label: 'Services', ariaLabel: 'View our services', link: '/services' },
    { label: 'About Us', ariaLabel: 'Learn about us', link: '/about' },
    { label: 'Blog', ariaLabel: 'Read our blog', link: '/blog' },
    { label: 'Get Free Review', ariaLabel: 'Request a free review', link: '#free-review' }
  ];

  const mobileSocialItems = [
    { label: '📞 +91 96649 77576', link: 'tel:+919664977576' },
    { label: '📧 officeinsurance2017@gmail.com', link: 'https://mail.google.com/mail/?view=cm&fs=1&to=officeinsurance2017@gmail.com' },
    { label: '📍 305, Abhishilp Complex, Satellite, Ahmedabad', link: 'https://maps.google.com/?q=305,+Abhishilp+Complex,+Satellite,+Ahmedabad,+380015' }
  ];

  const handleStaggeredMenuClick = (e, item) => {
    if (item.link === '#free-review') {
      e.preventDefault();
      resetForm();
      setIsModalOpen(true);
    } else {
      handleLinkClick(e, item.link);
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
        {navMode === 'staggered' ? (
          <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
            <div className="w-full h-full flex items-center justify-between">
              <StaggeredMenu
                position="right"
                isFixed={true}
                items={mobileMenuItems}
                socialItems={mobileSocialItems}
                displaySocials={true}
                displayItemNumbering={true}
                menuButtonColor="#fff"
                openMenuButtonColor="#fff"
                changeMenuColorOnOpen={false}
                colors={['#c9922a', '#0d2545']}
                accentColor="#c9922a"
                onItemClick={handleStaggeredMenuClick}
                logo={
                  <Link to="/" className="flex flex-col justify-center" onClick={handleLogoClick}>
                    <span className="font-serif text-white text-[17px] font-semibold leading-tight">
                      Drishti Wealth
                    </span>
                    <span className="text-goldLight text-[10px] uppercase tracking-[0.12em] leading-tight mt-0.5">
                      Your Trusted Partner for Financial Growth
                    </span>
                  </Link>
                }
              />
            </div>
          </div>
        ) : (
          <>
            <div className="max-w-7xl mx-auto px-4 h-full flex items-center justify-between">
              {/* Left Side: Logo */}
              <Link to="/" className="flex flex-col justify-center" onClick={handleLogoClick}>
                <span className="font-serif text-white text-[17px] font-semibold leading-tight">
                  Drishti Wealth
                </span>
                <span className="text-goldLight text-[10px] uppercase tracking-[0.12em] leading-tight mt-0.5">
                  Your Trusted Partner for Financial Growth
                </span>
              </Link>

              {/* Right Side: Desktop Nav */}
              <div className="hidden md:flex items-center gap-6 h-full">
                <DesktopNavItem title="Home" mainLink="/" items={navData.home} handleLinkClick={handleLinkClick} />
                <DesktopNavItem title="Services" mainLink="/services" items={navData.services} handleLinkClick={handleLinkClick} />
                <DesktopNavItem title="About Us" mainLink="/about" items={navData.about} handleLinkClick={handleLinkClick} />
                <DesktopNavItem title="Blog" mainLink="/blog" items={navData.blog} handleLinkClick={handleLinkClick} />

                {/* CTA Button with Eye Follow animation */}
                <EyeFollowButton
                  text="Get Free Review"
                  onClick={() => { resetForm(); setIsModalOpen(true); }}
                  buttonColor="#c9922a"
                  textColor="#ffffff"
                  eyeColor="#ffffff"
                  pupilColor="#0d2545"
                  className="py-2 px-4 text-[13px] font-semibold tracking-wide ml-2"
                />
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
                <div className="flex flex-col px-4 py-4 space-y-4 items-center">
                  <MobileNavItem title="Home" mainLink="/" items={navData.home} isOpen={mobileMenus.home} toggleOpen={() => toggleMobileMenu('home')} handleLinkClick={handleLinkClick} />
                  <MobileNavItem title="Services" mainLink="/services" items={navData.services} isOpen={mobileMenus.services} toggleOpen={() => toggleMobileMenu('services')} handleLinkClick={handleLinkClick} />
                  <MobileNavItem title="About Us" mainLink="/about" items={navData.about} isOpen={mobileMenus.about} toggleOpen={() => toggleMobileMenu('about')} handleLinkClick={handleLinkClick} />
                  <MobileNavItem title="Blog" mainLink="/blog" items={navData.blog} isOpen={mobileMenus.blog} toggleOpen={() => toggleMobileMenu('blog')} handleLinkClick={handleLinkClick} />

                  <EyeFollowButton
                    text="Get Free Review"
                    onClick={() => { closeMenu(); resetForm(); setIsModalOpen(true); }}
                    buttonColor="#c9922a"
                    textColor="#ffffff"
                    eyeColor="#ffffff"
                    pupilColor="#0d2545"
                    className="w-full justify-center mt-2 py-2.5"
                  />
                </div>
              </div>
            )}
          </>
        )}
      </nav>

      {/* Get Free Review Contact Form Modal */}
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
                <span className="text-[#c9922a] text-[10px] tracking-[0.15em] uppercase font-semibold mb-1 block">Get Free Review</span>
                <h3 className="font-serif text-[22px] text-[#0d2545] font-bold">Start Your Financial Journey</h3>
                <p className="text-[#5c6478] text-[13px] mt-1">Fill in your details and we will call you within 24 hours.</p>
              </div>

              {success ? (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-6 text-center text-emerald-600">
                  <div className="text-[32px] mb-2">✅</div>
                  <h4 className="font-serif text-[18px] font-bold mb-1">Request Submitted!</h4>
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
                    {isNri === 'No' ? (
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
                    ) : (
                      <div className="relative">
                        <label className="block text-[11px] text-[#0d2545]/70 uppercase tracking-[0.05em] font-medium mb-1">Country of Residence *</label>
                        <input 
                          type="text" 
                          placeholder="Search and select country..." 
                          value={countrySearch}
                          onFocus={() => setShowCountryDropdown(true)}
                          onBlur={() => {
                            const match = countriesList.find(c => c.toLowerCase() === countrySearch.trim().toLowerCase());
                            if (match) {
                              setNriCountry(match);
                              setCountrySearch(match);
                            } else if (!nriCountry) {
                              setCountrySearch('');
                            } else {
                              setCountrySearch(nriCountry);
                            }
                            setShowCountryDropdown(false);
                          }}
                          onChange={handleCountryChange}
                          className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[13.5px] font-sans text-navy bg-slate-50/50 outline-none focus:border-[#c9922a] focus:bg-white transition-colors placeholder-slate-400"
                        />
                        {showCountryDropdown && (
                          <div className="absolute z-20 left-0 right-0 mt-1 max-h-[150px] overflow-y-auto bg-white border border-slate-200 rounded-lg shadow-xl py-1 scrollbar-thin scrollbar-thumb-slate-200">
                            {filteredCountries.length > 0 ? (
                              filteredCountries.map((country) => (
                                <div
                                  key={country}
                                  onMouseDown={() => {
                                    setNriCountry(country);
                                    setCountrySearch(country);
                                    setShowCountryDropdown(false);
                                  }}
                                  className="px-3 py-2 text-[13px] text-[#0d2545] hover:bg-[#c9922a]/10 cursor-pointer transition-colors"
                                >
                                  {country}
                                </div>
                              ))
                            ) : (
                              <div className="px-3 py-2 text-[12px] text-slate-400 italic text-center">
                                No countries found
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[11px] text-[#0d2545]/70 uppercase tracking-[0.05em] font-medium mb-1">I am interested in</label>
                      <select 
                        value={interest} 
                        onChange={(e) => setInterest(e.target.value)}
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[13.5px] font-sans text-navy bg-slate-50/50 outline-none focus:border-[#c9922a] focus:bg-white transition-colors cursor-pointer"
                      >
                        <option value="Portfolio Review">Portfolio Review</option>
                        <option value="Mutual Fund SIP">Mutual Fund SIP</option>
                        <option value="Insurance Planning">Insurance Planning</option>
                        <option value="NRI Investment Services">NRI Investment Services</option>
                        <option value="Tax Saving ELSS">Tax Saving ELSS</option>
                        <option value="General Enquiry">General Enquiry</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[11px] text-[#0d2545]/70 uppercase tracking-[0.05em] font-medium mb-1">Are you an NRI?</label>
                      <select 
                        value={isNri} 
                        onChange={(e) => {
                          setIsNri(e.target.value);
                          if (e.target.value === 'Yes') {
                            setCity('');
                          } else {
                            setNriCountry('');
                            setCountrySearch('');
                          }
                        }}
                        className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-[13.5px] font-sans text-navy bg-slate-50/50 outline-none focus:border-[#c9922a] focus:bg-white transition-colors cursor-pointer"
                      >
                        <option value="No">No, I am based in India</option>
                        <option value="Yes">Yes, I am an NRI</option>
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
                    {loading ? 'Submitting...' : 'Submit Request'}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
