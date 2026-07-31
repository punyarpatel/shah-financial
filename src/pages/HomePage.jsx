import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import ServicesGrid from '../components/ServicesGrid';
import WhyChooseUs from '../components/WhyChooseUs';
import SIPCalculator from '../components/SIPCalculator';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import FadeIn from '../components/animations/FadeIn';
import BlogSection from '../components/BlogSection';
import FAQSection from '../components/FAQSection';
import ScrollZoomReveal from '../components/ScrollZoomReveal';

const HomePage = () => {
  const ogImage = `${window.location.origin}/why_choose_us_mockup.png`;

  return (
    <div className="min-h-screen bg-cream flex flex-col relative">
      <Helmet>
        <title>Drishti Wealth: AMFI Registered MFD Ahmedabad</title>
        <meta 
          name="description" 
          content="Trusted mutual fund distributor and insurance advisor in Ahmedabad serving 6000 plus clients and NRI clients since 2001." 
        />
        <meta property="og:title" content="Drishti Wealth: AMFI Registered MFD Ahmedabad" />
        <meta property="og:description" content="Trusted mutual fund distributor and insurance advisor in Ahmedabad serving 6000 plus clients and NRI clients since 2001." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Drishti Wealth: AMFI Registered MFD Ahmedabad" />
        <meta name="twitter:description" content="Trusted mutual fund distributor and insurance advisor in Ahmedabad serving 6000 plus clients and NRI clients since 2001." />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>
      
      <Navbar />
      
      <HeroSection />
      
      <FadeIn delay={0.1}>
        <TrustBar />
      </FadeIn>
      
      <div id="services">
        <ServicesGrid />
      </div>
      
      <FadeIn>
        <div id="calculator">
          <SIPCalculator />
        </div>
      </FadeIn>

      <WhyChooseUs />

      {/* Scroll Zoom Reveal Section */}
      <div className="w-full">
        <ScrollZoomReveal
          leftText="Drishti Wealth"
          rightText="Established 2001"
          buttonText="Explore Wealth Planning"
          videoUrl="/Generate_an_animated_video_for.mp4"
          onButtonClick={() => {
            const contactSec = document.getElementById('contact');
            if (contactSec) contactSec.scrollIntoView({ behavior: 'smooth' });
          }}
        />
      </div>

      <FadeIn>
        <div id="blog-section">
          <BlogSection />
        </div>
      </FadeIn>

      {/* <FadeIn>
        <div id="testimonials">
          <Testimonials />
        </div>
      </FadeIn> */}

      <FadeIn>
        <div id="faq">
          <FAQSection />
        </div>
      </FadeIn>

      <FadeIn>
        <div id="contact">
          <ContactForm />
        </div>
      </FadeIn>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default HomePage;
