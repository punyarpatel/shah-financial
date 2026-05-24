import React from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import HeroSection from '../components/HeroSection';
import TrustBar from '../components/TrustBar';
import ServicesGrid from '../components/ServicesGrid';
import SIPCalculator from '../components/SIPCalculator';
import Testimonials from '../components/Testimonials';
import ContactForm from '../components/ContactForm';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import FadeIn from '../components/animations/FadeIn';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>Shah Financial Services — AMFI Registered MFD Ahmedabad</title>
        <meta 
          name="description" 
          content="Trusted mutual fund distributor and insurance advisor in Ahmedabad serving 3000 plus families and NRI clients since 2009." 
        />
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

      <FadeIn>
        <div id="testimonials">
          <Testimonials />
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
