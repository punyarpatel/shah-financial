import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import FadeIn from '../components/animations/FadeIn';
import CoinCarousel from '../components/animations/CoinCarousel';
import AnimatedCounter from '../components/animations/AnimatedCounter';
import StaggerGroup from '../components/animations/StaggerGroup';
import StaggerItem from '../components/animations/StaggerItem';

const AboutPage = () => {
  const labelStyles = "text-[#c9922a] text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] md:text-[36px] text-[#1a1a2e] font-semibold mb-[2rem] leading-tight";
  const cardStyles = "bg-white border border-[#0d2545]/12 rounded-[12px] p-[1.5rem]";

  return (
    <div className="min-h-screen bg-[#faf8f4] flex flex-col relative">
      <Helmet>
        <title>About Us — Shah Financial Services Ahmedabad</title>
      </Helmet>

      <Navbar />

      {/* Section 1: Hero */}
      <section id="story" className="bg-[#0d2545] py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center gap-[6px] bg-[#c9922a]/15 border border-[#c9922a]/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-[#f0c96a] text-[11px] uppercase tracking-[0.12em]">Our Story</span>
            </div>
            <h1 className="font-serif text-[36px] md:text-[48px] text-white font-semibold leading-tight mb-[1.25rem] max-w-3xl">
              A Family Built on Trust
            </h1>
            <p className="text-white/65 text-[16px] leading-[1.6] max-w-2xl">
              Shah Financial Services was founded in 2009 in Ahmedabad by a family with a simple belief — every Indian family deserves access to honest, personalized financial guidance. What started as a small advisory practice has grown into a trusted firm serving 3,000 plus families across India and abroad.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Section 2: Why Choose Us */}
      <section id="why-choose-us" className="bg-[#faf8f4] py-[3.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Why Choose Us</div>
            <h2 className={titleStyles}>What Makes Us Different</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className={cardStyles}>
                <div className="text-[24px] mb-3">🏛️</div>
                <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">Registered and Compliant</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">AMFI registered MFD and IRDAI licensed insurance advisor. Full regulatory compliance.</p>
              </div>
              <div className={cardStyles}>
                <div className="text-[24px] mb-3">👤</div>
                <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">Personalized Advisory</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">No generic advice. Every recommendation is tailored to your income goals and risk profile.</p>
              </div>
              <div className={cardStyles}>
                <div className="text-[24px] mb-3">🌍</div>
                <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">NRI Specialist</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">Dedicated service for NRI clients with expertise in DTAA, KYC and cross-border investing.</p>
              </div>
              <div className={cardStyles}>
                <div className="text-[24px] mb-3">🤝</div>
                <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">Long Term Partnership</h3>
                <p className="text-[#5c6478] text-[14px] leading-[1.6]">We stay with you for decades. Your growth is our growth.</p>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Section 3: Stats */}
      <section className="bg-white py-[3.5rem] w-full border-y border-[#0d2545]/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <StaggerGroup className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center md:text-left">
              <StaggerItem>
                <div>
                  <div className="font-serif text-[36px] text-[#0d2545] font-semibold leading-none mb-2">
                    <AnimatedCounter value="3,000" suffix="+" />
                  </div>
                  <div className="text-[#5c6478] text-[13px] uppercase tracking-wider">Clients</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div>
                  <div className="font-serif text-[36px] text-[#0d2545] font-semibold leading-none mb-2">
                    <AnimatedCounter value="500" prefix="₹" suffix="Cr+" />
                  </div>
                  <div className="text-[#5c6478] text-[13px] uppercase tracking-wider">AUM</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div>
                  <div className="font-serif text-[36px] text-[#0d2545] font-semibold leading-none mb-2">
                    <AnimatedCounter value="15" suffix="+" />
                  </div>
                  <div className="text-[#5c6478] text-[13px] uppercase tracking-wider">Years</div>
                </div>
              </StaggerItem>
              <StaggerItem>
                <div>
                  <div className="font-serif text-[36px] text-[#0d2545] font-semibold leading-none mb-2">
                    <AnimatedCounter value="100" suffix="+" />
                  </div>
                  <div className="text-[#5c6478] text-[13px] uppercase tracking-wider">NRI Clients</div>
                </div>
              </StaggerItem>
            </StaggerGroup>
          </div>
        </FadeIn>
      </section>

      {/* Section 4: Registrations */}
      <section id="credentials" className="bg-[#faf8f4] py-[3.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Registrations</div>
            <h2 className={titleStyles}>Our Credentials</h2>
            
            <div className={`${cardStyles} max-w-3xl`}>
              <ul className="space-y-4">
                <li className="flex items-start gap-3">
                  <span className="text-[#c9922a] mt-0.5">✅</span>
                  <span className="text-[#5c6478] text-[15px]"><strong className="text-[#0d2545]">AMFI Registration No:</strong> ARN-XXXXX</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9922a] mt-0.5">✅</span>
                  <span className="text-[#5c6478] text-[15px]"><strong className="text-[#0d2545]">IRDAI License No:</strong> XXXXXXXXX</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9922a] mt-0.5">✅</span>
                  <span className="text-[#5c6478] text-[15px]"><strong className="text-[#0d2545]">NJ Wealth Empanelled Partner:</strong> since 2010</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9922a] mt-0.5">✅</span>
                  <span className="text-[#5c6478] text-[15px]"><strong className="text-[#0d2545]">Prudent Corporate FundzBazar:</strong> Partner</span>
                </li>
              </ul>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Section 4.5: Partners Carousel */}
      <section className="py-[4rem] w-full bg-[#0d2545] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 text-center mb-[2rem]">
           <h2 className="font-serif text-[28px] md:text-[36px] text-white font-semibold mb-2">
              Explore 5,000+ Mutual Funds & ETFs
           </h2>
           <p className="text-white/60 text-[15px] max-w-2xl mx-auto">
             Unrestricted access to every major Asset Management Company in India.
           </p>
        </div>

        <CoinCarousel />
      </section>

      {/* Section 5: Our Team */}
      <section id="team" className="bg-white py-[3.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Our Team</div>
            <h2 className={titleStyles}>The People Behind Your Wealth</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className={`${cardStyles} text-center flex flex-col items-center`}>
                <div className="w-[64px] h-[64px] rounded-full bg-[#0d2545] text-[#f0c96a] flex items-center justify-center font-serif text-[24px] mb-4 shadow-md">
                  RS
                </div>
                <h3 className="font-serif text-[16px] text-[#0d2545] font-semibold mb-1">Rajesh Shah</h3>
                <div className="text-[#c9922a] text-[12px] font-medium uppercase tracking-wider mb-3">Founder and Principal Advisor</div>
                <p className="text-[#5c6478] text-[13px] leading-[1.6]">15 plus years in mutual funds and insurance advisory.</p>
              </div>

              <div className={`${cardStyles} text-center flex flex-col items-center`}>
                <div className="w-[64px] h-[64px] rounded-full bg-[#0d2545] text-[#f0c96a] flex items-center justify-center font-serif text-[24px] mb-4 shadow-md">
                  NS
                </div>
                <h3 className="font-serif text-[16px] text-[#0d2545] font-semibold mb-1">Nisha Shah</h3>
                <div className="text-[#c9922a] text-[12px] font-medium uppercase tracking-wider mb-3">NRI Services Head</div>
                <p className="text-[#5c6478] text-[13px] leading-[1.6]">Specialist in cross-border investments and DTAA planning.</p>
              </div>

              <div className={`${cardStyles} text-center flex flex-col items-center`}>
                <div className="w-[64px] h-[64px] rounded-full bg-[#0d2545] text-[#f0c96a] flex items-center justify-center font-serif text-[24px] mb-4 shadow-md">
                  AS
                </div>
                <h3 className="font-serif text-[16px] text-[#0d2545] font-semibold mb-1">Arjun Shah</h3>
                <div className="text-[#c9922a] text-[12px] font-medium uppercase tracking-wider mb-3">Client Relations</div>
                <p className="text-[#5c6478] text-[13px] leading-[1.6]">Ensuring every client gets timely support and portfolio updates.</p>
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
