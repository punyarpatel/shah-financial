import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import FadeIn from '../components/animations/FadeIn';

const TermsOfServicePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream flex flex-col relative">
      <Helmet>
        <title>Terms of Service | Drishti Wealth Ahmedabad</title>
        <meta
          name="description"
          content="Terms of Service of Drishti Wealth. Read the rules, obligations, and legal agreements governing the use of our financial advisory website and platforms."
        />
      </Helmet>

      <Navbar />

      {/* Hero Header */}
      <section className="bg-navy py-[4rem] w-full text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-[6px] bg-gold/15 border border-gold/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
            <span className="text-goldLight text-[11px] uppercase tracking-[0.12em]">Legal Agreement</span>
          </div>
          <h1 className="font-serif text-[36px] md:text-[48px] text-white font-semibold leading-tight mb-[0.75rem]">
            Terms of Service
          </h1>
          <p className="text-white/65 text-[15px] max-w-xl">
            Effective Date: September 1, 2026. Please read these terms carefully before using our digital platforms or services.
          </p>
        </div>
      </section>

      {/* Main Body */}
      <section className="flex-grow py-[4rem] w-full">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white border border-navy/10 rounded-[16px] p-8 md:p-12 shadow-sm">
            <FadeIn>

              <div className="mb-10">
                <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                  These Terms of Service ("Terms") constitute a legally binding electronic agreement between you ("User", "Client", "Investor", or "you") and Drishti Wealth ("we", "us", or "our"), governing your access to and use of this website (drishtiwealth.com, www.drishtiwealth.com or similar), mobile applications, and online portals (collectively, the "Platform") and any physical or digital financial services provided by us.
                </p>
                <p className="text-muted text-[14.5px] leading-relaxed">
                  By browsing, accessing, registering, or transacting on this Platform, you acknowledge that you have read, understood, and agreed to be bound by these Terms and our Privacy Policy. If you do not accept these terms, you must discontinue your use of our Platform immediately.
                </p>
              </div>

              <div className="mb-10">
                <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                  The services offered on this Platform are intended only for individuals who are competent to form legally binding contracts under the Indian Contract Act, 1872. Specifically:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted text-[14.5px] leading-relaxed">
                  <li>You must be at least 18 years of age.</li>
                  <li>If you are registering on behalf of a corporate body, HUF, or trust, you declare that you have the requisite corporate authority to bind such entity to these Terms.</li>
                  <li>NRI (Non-Resident Indian) users represent that they are compliant with the Foreign Exchange Management Act (FEMA) guidelines and all applicable taxation laws of India and their respective country of residence before investing.</li>
                </ul>
              </div>

              <div className="mb-10">
                <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                  Drishti Wealth operates as:
                </p>
                <ol className="list-decimal pl-5 space-y-3 text-muted text-[14.5px] leading-relaxed">
                  <li>An AMFI-registered Mutual Fund Distributor (MFD). We facilitate mutual fund investment transactions, client onboarding, KYC verification support, and portfolio tracking. We distribute mutual fund schemes from multiple AMCs.</li>
                  <li>An IRDAI-licensed Insurance Advisor / Agent. We solicit and facilitate the issuance of life, health, general, and travel insurance products on behalf of licensed insurance providers in India.</li>
                </ol>
                <p className="text-muted text-[14.5px] leading-relaxed mt-4">
                  Please note that we represent various fund houses and insurance partners and act strictly as distributors. The services are facilitation-based, and any calculations, calculators, or reports provided are for illustrative purposes and do not represent guaranteed projections.
                </p>
              </div>

              <div className="mb-10">
                <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                  As a user of this Platform, you agree to:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted text-[14.5px] leading-relaxed">
                  <li>Provide accurate, current, and complete personal, financial, and KYC details during onboarding and declaration.</li>
                  <li>Maintain the confidentiality of your login credentials (username, passwords, OTPs) for any transactional platform we provide. You are solely responsible for all activities occurring under your account.</li>
                  <li>Not use the Platform for any fraudulent or illegal transactions, including money laundering, or in violation of SEBI/RBI regulations.</li>
                  <li>Not copy, crawl, scrape, reverse-engineer, or deface any graphics, design systems, code, or logos of Drishti Wealth.</li>
                </ul>
              </div>

              <div className="mb-10">
                <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                  Drishti Wealth does not charge any direct advisory fees to retail clients for mutual fund distribution services.
                </p>
                <p className="text-muted text-[14.5px] leading-relaxed">
                  Any transaction charges levied by banks, registrar transfer agencies, or payment gateways for investments/premiums are borne directly by the client.
                </p>
              </div>

              <div className="mb-10">
                <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-[8px] mb-4">
                  <p className="text-navy text-[14.5px] font-semibold mb-2">⚠️ Regulatory Disclaimers (Read Carefully):</p>
                  <ul className="list-disc pl-5 space-y-2 text-muted text-[13.5px] leading-relaxed">
                    <li><strong>Market Risk:</strong> Mutual fund investments and securities are subject to market risks, including the potential loss of principal. Past performance is not indicative of future returns. Please read all scheme-related offer documents carefully before investing.</li>
                    <li><strong>Insurance Solicitations:</strong> Insurance is the subject matter of solicitation. Policy issuance is subject to underwriting checks, terms, conditions, and exclusions of the respective insurance carrier. Drishti Wealth does not guarantee claims approval or settlement.</li>
                    <li><strong>Non-Advisory Status:</strong> Drishti Wealth acts as a distributor. The content, planning calculators (e.g., SIP Calculators), and reviews provided on this Platform are for informational and illustrative guidance and should not be construed as legal, tax, or paid investment advice.</li>
                  </ul>
                </div>
              </div>

              <div className="mb-10">
                <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                  To the maximum extent permitted by applicable law, Drishti Wealth, its partners, employees, and affiliates shall not be liable for:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted text-[14.5px] leading-relaxed">
                  <li>Any direct, indirect, incidental, special, or consequential damages resulting from your investment choices, portfolio losses, or volatility in the market.</li>
                  <li>Any delay, failure, or interruption in transaction executions arising out of system failures, network outages, AMC page crashes, bank payment gateway timeouts, or force majeure events.</li>
                  <li>Decisions made by insurers regarding health loadings, claim rejections, or premium modifications based on declarations.</li>
                </ul>
              </div>

              <div className="mb-10">
                <p className="text-muted text-[14.5px] leading-relaxed">
                  All contents on this Platform, including text, graphics, logos, layouts, buttons, audio-visual elements, and software code, are the intellectual property of Drishti Wealth or its licensed technology partners (including AMCs, etc.) and are protected by Indian copyright, trademark, and intellectual property laws. Unauthorized distribution or copying of any content is strictly prohibited.
                </p>
              </div>

              <div className="mb-10">
                <p className="text-muted text-[14.5px] leading-relaxed">
                  These Terms shall be governed by, interpreted, and construed in accordance with the laws of India. Any legal dispute, action, claim, or proceeding arising out of or related to these Terms, the Platform, or our services shall be subject to the exclusive jurisdiction of the courts.
                </p>
              </div>

              <div>
                <p className="text-muted text-[14.5px] leading-relaxed">
                  We reserve the right, at our sole discretion, to modify, update, or replace these Terms at any time without prior individual notice. Your continued use of the Platform after any revisions are posted constitutes your explicit acceptance of the new Terms. We may terminate, suspend, or restrict your access to all or part of our Platform at any time if we believe you are in breach of these Terms or applicable SEBI/IRDAI guidelines.
                </p>
              </div>

            </FadeIn>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default TermsOfServicePage;
