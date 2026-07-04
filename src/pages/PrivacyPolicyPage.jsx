import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import FadeIn from '../components/animations/FadeIn';

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    { id: 'introduction', label: '1. Introduction' },
    { id: 'data-collection', label: '2. Information We Collect' },
    { id: 'data-usage', label: '3. How We Use Your Data' },
    { id: 'data-sharing', label: '4. Sharing & Disclosures' },
    { id: 'data-security', label: '5. Security & Protection' },
    { id: 'user-rights', label: '6. Your Rights & Options' },
    { id: 'updates', label: '7. Updates to This Policy' },
    { id: 'contact', label: '8. Contact Information' }
  ];

  const handleScroll = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col relative">
      <Helmet>
        <title>Privacy Policy | Drishti Wealth Ahmedabad</title>
        <meta 
          name="description" 
          content="Privacy Policy of Drishti Wealth. Understand how we collect, use, store, and protect your personal and financial information in accordance with Indian regulatory standards." 
        />
      </Helmet>

      <Navbar />

      {/* Hero Header */}
      <section className="bg-navy py-[4rem] w-full text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-[6px] bg-gold/15 border border-gold/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
            <span className="text-goldLight text-[11px] uppercase tracking-[0.12em]">Legal Framework</span>
          </div>
          <h1 className="font-serif text-[36px] md:text-[48px] text-white font-semibold leading-tight mb-[0.75rem]">
            Privacy Policy
          </h1>
          <p className="text-white/65 text-[15px] max-w-xl">
            Effective Date: July 2, 2026. This policy outlines our commitment to protecting your personal and financial data.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <section className="flex-grow py-[4rem] w-full">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Sticky Sidebar Navigation (Desktop) */}
            <aside className="lg:col-span-4 lg:sticky lg:top-28 bg-white border border-navy/5 p-6 rounded-[12px] shadow-sm hidden lg:block">
              <h2 className="font-serif text-navy text-[16px] font-semibold mb-4 border-b border-navy/10 pb-2">
                Table of Contents
              </h2>
              <nav className="flex flex-col gap-3">
                {sections.map((sec) => (
                  <button
                    key={sec.id}
                    onClick={() => handleScroll(sec.id)}
                    className="text-left text-muted text-[13.5px] hover:text-gold transition-colors font-medium cursor-pointer"
                  >
                    {sec.label}
                  </button>
                ))}
              </nav>
            </aside>

            {/* Content Column */}
            <div className="lg:col-span-8 bg-white border border-navy/10 rounded-[16px] p-8 md:p-12 shadow-sm">
              <FadeIn>
                
                <div id="introduction" className="mb-10 scroll-mt-28">
                  <h2 className="font-serif text-navy text-[22px] font-semibold mb-4 border-b border-gold/20 pb-2">
                    1. Introduction
                  </h2>
                  <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                    Drishti Wealth (referred to as "we", "us", or "our") values the trust you place in us. In line with the Information Technology Act, 2000, and the Digital Personal Data Protection (DPDP) Act, 2023, this Privacy Policy explains how we collect, use, process, store, and protect your personal, financial, and demographic data when you access our website or engage our mutual fund distribution and insurance advisory services.
                  </p>
                  <p className="text-muted text-[14.5px] leading-relaxed">
                    By accessing our platforms and subscribing to our services, you consent to the collection and use of your information as described in this policy. If you do not agree with these terms, please do not use our services.
                  </p>
                </div>

                <div id="data-collection" className="mb-10 scroll-mt-28">
                  <h2 className="font-serif text-navy text-[22px] font-semibold mb-4 border-b border-gold/20 pb-2">
                    2. Information We Collect
                  </h2>
                  <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                    We collect only the information necessary to fulfill our roles as an AMFI-registered Mutual Fund Distributor (MFD) and an IRDAI-licensed insurance advisor. This includes:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted text-[14.5px] leading-relaxed mb-4">
                    <li><strong>Personal Identity Data:</strong> Full Name, Date of Birth, Gender, Father’s/Spouse’s Name, Signature, and Photograph.</li>
                    <li><strong>Contact & Address Data:</strong> Email Address, Phone Number, Mailing Address, Permanent Address, and WhatsApp contact handle.</li>
                    <li><strong>Government IDs & Financial Identifiers:</strong> Permanent Account Number (PAN), Aadhaar Card details (securely processed for KYC), bank account details (including account numbers, bank name, IFSC, and MICR for transaction processing).</li>
                    <li><strong>Investment Details:</strong> Current investments, investment goals, risk appetites, portfolio value, transaction history, and NRI-specific documents (FEMA declaration, passport copy, NRE/NRO account statements).</li>
                    <li><strong>Medical & Health Data:</strong> Pre-existing medical conditions, family health history, and medical check-up reports (only when applying for life or health insurance policies).</li>
                    <li><strong>Technical Device & Tracking Data:</strong> IP Address, browser type, pages visited, operating system, and cookie data to improve website navigation and performance.</li>
                  </ul>
                </div>

                <div id="data-usage" className="mb-10 scroll-mt-28">
                  <h2 className="font-serif text-navy text-[22px] font-semibold mb-4 border-b border-gold/20 pb-2">
                    3. How We Use Your Data
                  </h2>
                  <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                    The data collected is processed to deliver custom financial services and ensure statutory compliance. Specifically, we use your data to:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted text-[14.5px] leading-relaxed">
                    <li>Complete KYC registry checks (CAMS KRA, NDML KRA, etc.) required for mutual fund investments.</li>
                    <li>Facilitate the processing of investment instructions (buying, selling, switching schemes) via digital platforms, including the NJ Wealth Client Desk portal.</li>
                    <li>Solicit and execute life, health, and general insurance policies on your behalf.</li>
                    <li>Send you regular portfolio updates, account statements, annual transaction reports, and performance charts.</li>
                    <li>Respond to your queries, request feedback, and address service issues through phone, email, and WhatsApp communications.</li>
                    <li>Detect, prevent, and address technical errors, fraudulent transactions, or security breaches.</li>
                    <li>Comply with regulatory obligations set by SEBI, AMFI, IRDAI, RBI, and other statutory bodies in India.</li>
                  </ul>
                </div>

                <div id="data-sharing" className="mb-10 scroll-mt-28">
                  <h2 className="font-serif text-navy text-[22px] font-semibold mb-4 border-b border-gold/20 pb-2">
                    4. Sharing & Disclosures
                  </h2>
                  <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                    We respect your privacy and do not sell, rent, or trade your personal data. Your data is only shared with authorized partners under strict confidentiality:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted text-[14.5px] leading-relaxed mb-4">
                    <li><strong>Asset Management Companies (AMCs) & RTAs:</strong> Sharing personal and KYC details with Mutual Fund Houses (AMCs) and Registrar and Transfer Agents (RTAs) like CAMS and KFintech to process investment transactions.</li>
                    <li><strong>Insurance Companies:</strong> Sharing medical profiles and proposal details with licensed life and general insurers (e.g., Star Health, Care Health, HDFC Ergo) for premium underwriting and policy issuance.</li>
                    <li><strong>Platform Partners:</strong> Sharing transactions via backend systems like NJ India Invest Private Ltd (NJ Wealth) under strict secure access.</li>
                    <li><strong>Regulatory Authorities:</strong> Disclosing information to SEBI, AMFI, IRDAI, tax authorities (Income Tax Department for FATCA compliance), or judicial organs if legally mandated or requested under applicable law.</li>
                  </ul>
                </div>

                <div id="data-security" className="mb-10 scroll-mt-28">
                  <h2 className="font-serif text-navy text-[22px] font-semibold mb-4 border-b border-gold/20 pb-2">
                    5. Security & Protection
                  </h2>
                  <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                    Drishti Wealth implements reasonable industrial security measures to prevent unauthorized access, alteration, disclosure, or destruction of your personal data. We utilize:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted text-[14.5px] leading-relaxed">
                    <li>SSL encryption for data transmission across our websites and forms.</li>
                    <li>Secure databases with restricted user login access.</li>
                    <li>Strict operational procedures and confidentiality agreements with our employees and developers.</li>
                  </ul>
                  <p className="text-muted text-[14.5px] leading-relaxed mt-4">
                    While we take the highest precautions, no digital transmission over the internet or storage method is 100% secure. Therefore, we cannot guarantee absolute safety from unforeseen cyber-attacks beyond our reasonable control.
                  </p>
                </div>

                <div id="user-rights" className="mb-10 scroll-mt-28">
                  <h2 className="font-serif text-navy text-[22px] font-semibold mb-4 border-b border-gold/20 pb-2">
                    6. Your Rights & Options
                  </h2>
                  <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                    Under the Digital Personal Data Protection Act, 2023, you have certain rights regarding your data:
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted text-[14.5px] leading-relaxed">
                    <li><strong>Right to Access:</strong> You can request a summary of the personal data we hold and the processing activities undertaken.</li>
                    <li><strong>Right to Correction/Erasure:</strong> You can request correction of inaccurate data or deletion of data no longer needed for regulatory compliance.</li>
                    <li><strong>Right to Withdraw Consent:</strong> You can withdraw your consent for processing at any time. However, withdrawing consent may limit our ability to provide mutual fund distribution or insurance servicing.</li>
                  </ul>
                </div>

                <div id="updates" className="mb-10 scroll-mt-28">
                  <h2 className="font-serif text-navy text-[22px] font-semibold mb-4 border-b border-gold/20 pb-2">
                    7. Updates to This Policy
                  </h2>
                  <p className="text-muted text-[14.5px] leading-relaxed">
                    We may update our Privacy Policy from time to time to align with legal, regulatory, or business changes. We encourage you to review this page periodically. Any modifications will be posted here with an updated "Effective Date."
                  </p>
                </div>

                <div id="contact" className="scroll-mt-28">
                  <h2 className="font-serif text-navy text-[22px] font-semibold mb-4 border-b border-gold/20 pb-2">
                    8. Contact Information
                  </h2>
                  <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                    If you have any questions, feedback, or grievance regarding our data privacy policy, please contact our Grievance Redressal Desk at:
                  </p>
                  <div className="bg-navy/5 p-6 rounded-[8px] border-l-4 border-gold">
                    <p className="text-navy text-[15px] font-semibold mb-1">Drishti Wealth Grievance Officer</p>
                    <p className="text-muted text-[13.5px] mb-1">
                      📍 Address:{' '}
                      <a 
                        href="https://maps.google.com/?q=305,+Abhishilp+Complex,+Satellite,+Ahmedabad,+380015" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="hover:text-gold hover:underline transition-colors"
                      >
                        305, Abhishilp Complex, Satellite, Ahmedabad, 380015
                      </a>
                    </p>
                    <p className="text-muted text-[13.5px] mb-1">📞 Phone: +91 96649 77576</p>
                    <p className="text-muted text-[13.5px]">✉️ Email: officeinsurance2017@gmail.com</p>
                  </div>
                </div>

              </FadeIn>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default PrivacyPolicyPage;
