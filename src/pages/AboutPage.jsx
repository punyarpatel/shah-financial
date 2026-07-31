import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import FadeIn from '../components/animations/FadeIn';
import CircularGallery from '../components/animations/CircularGallery';
import CoinCarousel from '../components/animations/CoinCarousel';
import AnimatedCounter from '../components/animations/AnimatedCounter';
import StaggerGroup from '../components/animations/StaggerGroup';
import StaggerItem from '../components/animations/StaggerItem';
import JourneyTimeline from '../components/JourneyTimeline';
import CredentialsShowcase from '../components/CredentialsShowcase';
import useDesignMode from '../hooks/useDesignMode';
import BorderGlow from '../components/animations/BorderGlow';

const AboutPage = () => {
  const location = useLocation();
  const labelStyles = "text-gold text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] md:text-[36px] text-textDark font-semibold mb-[2rem] leading-tight";
  const cardStyles = "premium-card";
  const ogImage = `${window.location.origin}/why_choose_us_mockup.png`;

  // Auto-scroll to section on hash change or route load
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace('#', '');
      const timer = setTimeout(() => {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 200);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [location]);

  const partnerItems = [
    { image: '/hdfc-partner.png', text: 'HDFC' },
    { image: '/sbi-partner.png', text: 'SBI' },
    { image: '/icici-partner.png', text: 'ICICI' },
    { image: '/kotak-partner.png', text: 'KOTAK' },
    { image: '/axis-partner.png', text: 'AXIS' },
    { image: '/nippon-partner.png', text: 'NIPPON' }
  ];

  const achievementsMode = useDesignMode('achievements-mode', 'classic');

  return (
    <div className="min-h-screen bg-cream flex flex-col relative">
      <Helmet>
        <title>About Us | Drishti Wealth Ahmedabad</title>
        <meta name="description" content="Drishti Wealth: trusted AMFI-registered MFD and IRDAI-licensed advisor in Ahmedabad since 2001. Serving 6,000+ clients and 100+ NRI clients across India and abroad." />
        <meta property="og:title" content="About Us | Drishti Wealth Ahmedabad" />
        <meta property="og:description" content="Drishti Wealth: trusted AMFI-registered MFD and IRDAI-licensed advisor in Ahmedabad since 2001. Serving 6,000+ clients and 100+ NRI clients across India and abroad." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Drishti Wealth Ahmedabad" />
        <meta name="twitter:description" content="Drishti Wealth: trusted AMFI-registered MFD and IRDAI-licensed advisor in Ahmedabad since 2001. Serving 6,000+ clients and 100+ NRI clients across India and abroad." />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Navbar />

      {/* Section 1: Hero */}
      <section id="story" className="bg-navy py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center gap-[6px] bg-gold/15 border border-gold/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-goldLight text-[11px] uppercase tracking-[0.12em]">Our Story</span>
            </div>
            <h1 className="font-serif text-[36px] md:text-[48px] text-white font-semibold leading-tight mb-[1.25rem] max-w-3xl">
              A Family Built on Trust
            </h1>
            <p className="text-white/65 text-[16px] leading-[1.6] max-w-2xl">
              Drishti Wealth was founded in 2001 in Ahmedabad by a family with a simple belief that every Indian family deserves access to honest, personalized financial guidance. What started as a small advisory practice has grown into a trusted firm serving 6,000 plus clients across India and abroad.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Section 2: Why Choose Us */}
      <section id="why-choose-us" className="bg-cream py-[3.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Why Choose Us</div>
            <h2 className={titleStyles}>What Makes Us Different</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <BorderGlow className="h-full" borderRadius={12} backgroundColor="#ffffff">
                <div className="p-[1.5rem]">
                  <div className="text-[24px] mb-3">🏛️</div>
                  <h3 className="font-serif text-[18px] text-navy font-semibold mb-2">Registered and Compliant</h3>
                  <p className="text-muted text-[14px] leading-[1.6]">AMFI registered MFD and IRDAI licensed insurance advisor. Full regulatory compliance.</p>
                </div>
              </BorderGlow>
              <BorderGlow className="h-full" borderRadius={12} backgroundColor="#ffffff">
                <div className="p-[1.5rem]">
                  <div className="text-[24px] mb-3">👤</div>
                  <h3 className="font-serif text-[18px] text-navy font-semibold mb-2">Personalized Advisory</h3>
                  <p className="text-muted text-[14px] leading-[1.6]">No generic advice. Every recommendation is tailored to your income goals and risk profile.</p>
                </div>
              </BorderGlow>
              <BorderGlow className="h-full" borderRadius={12} backgroundColor="#ffffff">
                <div className="p-[1.5rem]">
                  <div className="text-[24px] mb-3">🌍</div>
                  <h3 className="font-serif text-[18px] text-navy font-semibold mb-2">NRI Specialist</h3>
                  <p className="text-muted text-[14px] leading-[1.6]">Dedicated service for NRI clients with expertise in DTAA, KYC and cross-border investing.</p>
                </div>
              </BorderGlow>
              <BorderGlow className="h-full" borderRadius={12} backgroundColor="#ffffff">
                <div className="p-[1.5rem]">
                  <div className="text-[24px] mb-3">🤝</div>
                  <h3 className="font-serif text-[18px] text-navy font-semibold mb-2">Long Term Partnership</h3>
                  <p className="text-muted text-[14px] leading-[1.6]">We stay with you for decades. Your growth is our growth.</p>
                </div>
              </BorderGlow>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Section 3: Stats */}
      <section className="bg-white py-[3.5rem] w-full border-y border-navy/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
              <StaggerItem>
                <div>
                  <div className="font-serif text-[36px] text-navy font-semibold leading-none mb-2">
                    <AnimatedCounter value="6,000" suffix="+" />
                  </div>
                  <div className="text-muted text-[13px] uppercase tracking-wider">Clients</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div>
                  <div className="font-serif text-[36px] text-navy font-semibold leading-none mb-2">
                    <AnimatedCounter value="750" prefix="₹" suffix="Cr+" />
                  </div>
                  <div className="text-muted text-[13px] uppercase tracking-wider">AUM</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div>
                  <div className="font-serif text-[36px] text-navy font-semibold leading-none mb-2">
                    <AnimatedCounter value="25" suffix="+" />
                  </div>
                  <div className="text-muted text-[13px] uppercase tracking-wider">Years</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div>
                  <div className="font-serif text-[36px] text-navy font-semibold leading-none mb-2">
                    <AnimatedCounter value="100" suffix="+" />
                  </div>
                  <div className="text-muted text-[13px] uppercase tracking-wider">NRI Clients</div>
                </div>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </FadeIn>
      </section>

      {/* Section 3.5: Our Journey Timeline */}
      <JourneyTimeline />

      {/* Section 4: Our Team & Credentials Showcase */}
      <div id="team">
        <CredentialsShowcase />
      </div>

      {/* Section 4.5: Partners Gallery */}
      <section className="py-[4rem] w-full bg-navy overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-[1rem]">
          <h2 className="font-serif text-[28px] md:text-[36px] text-white font-semibold mb-2">
            Achievement & Partnership Showcase
          </h2>
          <p className="text-white/60 text-[15px] max-w-2xl mx-auto">
            Empanelled with leading national asset management companies and transactional platforms in India.
          </p>
        </div>

        {achievementsMode === 'circular' ? (
          <div className="relative w-full h-[500px]">
            <CircularGallery
              items={partnerItems}
              bend={3}
              textColor="#e2e8f0"
              borderRadius={0.05}
              scrollEase={0.05}
              scrollSpeed={2}
              autoplay={true}
              autoplaySpeed={10}
              interactive={false}
            />
          </div>
        ) : (
          <CoinCarousel />
        )}
      </section>

      {/* Section 5: Office Location Map */}
      <section id="office-location" className="bg-white py-[4.5rem] w-full border-t border-navy/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">

              {/* Left Side: Text and Address details */}
              <div className="lg:col-span-5 flex flex-col justify-center">
                <span className="text-gold text-[11px] tracking-[0.2em] uppercase font-semibold mb-2 block">
                  Find Us
                </span>
                <h2 className="font-serif text-[32px] md:text-[40px] text-navy font-bold leading-tight mb-6">
                  Visit Our Office
                </h2>

                <p className="text-muted text-[15.5px] leading-relaxed mb-8">
                  We welcome you to visit our primary office in Ahmedabad. Whether you'd like to discuss a portfolio review, plan a new investment journey, or consult on tax planning, our team is here to assist.
                </p>

                <div className="space-y-6">
                  {/* Address */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-[18px] text-gold shrink-0">
                      📍
                    </div>
                    <div>
                      <h4 className="font-serif text-[16px] text-navy font-semibold mb-1">Office Address</h4>
                      <p className="text-muted text-[14px] leading-relaxed">
                        <a
                          href="https://maps.google.com/?q=305,+Abhishilp+Complex,+Satellite,+Ahmedabad,+380015"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:text-gold hover:underline transition-colors"
                        >
                          305, Abhishilp Complex,<br />
                          Satellite, Ahmedabad, Gujarat - 380015
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-[18px] text-gold shrink-0">
                      📞
                    </div>
                    <div>
                      <h4 className="font-serif text-[16px] text-navy font-semibold mb-1">Phone Number</h4>
                      <p className="text-muted text-[14px] leading-relaxed">
                        <a href="tel:+919664977576" className="hover:text-gold transition-colors font-medium">
                          +91 96649 77576
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-[18px] text-gold shrink-0">
                      ✉️
                    </div>
                    <div>
                      <h4 className="font-serif text-[16px] text-navy font-semibold mb-1">Email Address</h4>
                      <p className="text-muted text-[14px] leading-relaxed">
                        <a href="mailto:officeinsurance2017@gmail.com" className="hover:text-gold transition-colors font-medium">
                          officeinsurance2017@gmail.com
                        </a>
                      </p>
                    </div>
                  </div>

                  {/* Office Hours */}
                  <div className="flex gap-4 items-start">
                    <div className="w-10 h-10 rounded-xl bg-gold/10 flex items-center justify-center text-[18px] text-gold shrink-0">
                      ⏰
                    </div>
                    <div>
                      <h4 className="font-serif text-[16px] text-navy font-semibold mb-1">Office Hours</h4>
                      <p className="text-muted text-[14px] leading-relaxed">
                        Monday – Saturday: 10:30 AM – 6:30 PM<br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex gap-4">
                  <a
                    href="https://maps.google.com/?q=Abhishilp+Complex,+Satellite,+Ahmedabad"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gold text-white px-6 py-3 rounded-lg font-medium hover:bg-goldLight transition-colors shadow-lg shadow-gold/10 text-[14px]"
                  >
                    Get Directions
                  </a>
                  <a
                    href="tel:+919664977576"
                    className="border border-navy/15 text-navy px-6 py-3 rounded-lg font-medium hover:bg-navy/5 transition-colors text-[14px]"
                  >
                    Call Us
                  </a>
                </div>
              </div>

              {/* Right Side: Map Container */}
              <div className="lg:col-span-7 relative">
                {/* Visual shadow decoration */}
                <div className="absolute -inset-4 bg-gradient-to-r from-gold/10 to-navy/5 rounded-[24px] blur-2xl opacity-60 pointer-events-none"></div>

                {/* Map Frame Card */}
                <div className="relative bg-white border border-navy/[0.08] p-4 rounded-3xl shadow-xl shadow-navy/[0.03] overflow-hidden group">
                  <div className="w-full aspect-[16/10] md:aspect-[16/9] rounded-2xl overflow-hidden border border-slate-100 relative">
                    <iframe
                      title="Drishti Wealth Office Location"
                      src="https://maps.google.com/maps?q=Abhishilp%20Complex,%20Satellite,%20Ahmedabad&t=&z=16&ie=UTF8&iwloc=&output=embed"
                      className="absolute inset-0 w-full h-full border-0 grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                      allowFullScreen=""
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default AboutPage;
