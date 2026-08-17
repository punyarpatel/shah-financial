import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import FadeIn from '../components/animations/FadeIn';

const DisclosuresPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-cream flex flex-col relative">
      <Helmet>
        <title>Regulatory Disclosures | Drishti Wealth</title>
        <meta
          name="description"
          content="Official regulatory disclosures for Drishti Wealth in compliance with SEBI, AMFI, and IRDAI regulations."
        />
        <link rel="canonical" href="https://drishtiwealth.com/disclosures" />
      </Helmet>

      <Navbar />

      {/* Hero Header */}
      <section className="bg-navy py-[4rem] w-full text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="inline-flex items-center gap-[6px] bg-gold/15 border border-gold/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
            <span className="text-goldLight text-[11px] uppercase tracking-[0.12em]">Compliance Desk</span>
          </div>
          <h1 className="font-serif text-[36px] md:text-[48px] text-white font-semibold leading-tight mb-[0.75rem]">
            Regulatory Disclosures
          </h1>
          <p className="text-white/65 text-[15px] max-w-xl">
            Transparency is our core value. In compliance with SEBI, AMFI, and IRDAI regulations, we disclose our regulatory credentials.
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
                  Drishti Wealth is fully registered and compliant with the regulatory bodies governing financial services in India. Our registration credentials are as follows:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="p-5 border border-navy/10 rounded-[10px] bg-cream/30">
                    <p className="text-gold text-[11px] uppercase tracking-wider font-semibold mb-1">Mutual Fund Distribution</p>
                    <h4 className="font-serif text-navy text-[16px] font-bold mb-2">AMFI Registered MFD</h4>
                    <p className="text-muted text-[13px] mb-1"><strong>ARN Code:</strong> ARN-XXXXX</p>
                    <p className="text-muted text-[13px] mb-1"><strong>Status:</strong> Active & Fully Registered</p>
                    <p className="text-muted text-[13px]"><strong>Incidental Services:</strong> Mutual Fund Distribution</p>
                  </div>

                  <div className="p-5 border border-navy/10 rounded-[10px] bg-cream/30">
                    <p className="text-gold text-[11px] uppercase tracking-wider font-semibold mb-1">Insurance Solicitations</p>
                    <h4 className="font-serif text-navy text-[16px] font-bold mb-2">IRDAI Licensed Advisor</h4>
                    <p className="text-muted text-[13px] mb-1"><strong>License Code:</strong> IRDAI / XXXXXXXXX</p>
                    <p className="text-muted text-[13px] mb-1"><strong>Role:</strong> Life, Health, and General Insurance Solicitor</p>
                    <p className="text-muted text-[13px]"><strong>Partners:</strong> Empanelled with leading Indian Insurers</p>
                  </div>
                </div>
              </div>

              <div className="mb-10">
                <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                  Under the SEBI (Investment Advisers) Regulations, 2013, we make the following mandatory declaration to all our prospective clients and investors:
                </p>
                <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-[8px] mb-4">
                  <p className="text-navy text-[14.5px] font-semibold mb-2">Notice to Investors:</p>
                  <p className="text-muted text-[13.5px] leading-relaxed">
                    Drishti Wealth and its representatives act strictly as **Mutual Fund Distributors (MFDs)**. We do **not** provide SEBI-registered fee-based Investment Advisory services. Any product reviews, asset classifications, SIP calculators, and incidental suggestions provided on this website or in discussion are provided free-of-cost as distributor support and are incidental to our primary distribution activities. Investors are requested to make independent evaluations before taking investment decisions.
                  </p>
                </div>
              </div>

              <div className="mb-10">
                <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                  We are dedicated to maintaining the highest service standards. If you have any complaint or dispute regarding a mutual fund investment transaction or insurance solicitation, please follow our grievance channel:
                </p>

                <ol className="list-decimal pl-5 space-y-4 text-muted text-[14.5px] leading-relaxed mb-6">
                  <li>
                    <strong>Level 1: Grievance Desk</strong><br />
                    Submit your concern to our support desk via email at <a href="mailto:officeinsurance2017@gmail.com" className="text-gold hover:underline">officeinsurance2017@gmail.com</a> or phone at <strong>+91 96649 77576</strong>. Most operational issues are resolved within 3 business days.
                  </li>
                  <li>
                    <strong>Level 2: Compliance Officer</strong><br />
                    If you are not satisfied with the Level 1 resolution, you can escalate the matter to our Principal Compliance Officer, Piyush Shah, at <a href="https://maps.google.com/?q=305,+Abhishilp+Complex,+Satellite,+Ahmedabad,+380015" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">305, Abhishilp Complex, Satellite, Ahmedabad, 380015</a>.
                  </li>
                  <li>
                    <strong>Level 3: Regulatory Redressal (SEBI/IRDAI)</strong><br />
                    If your query remains unresolved after 15 days, you may lodge a complaint on the official SEBI SCORES portal, AMFI Grievance desk, or contact the IRDAI grievance call centre.
                  </li>
                </ol>
              </div>

              <div>
                <p className="text-muted text-[14.5px] leading-relaxed mb-4">
                  For investor education and to submit online grievances, please refer to the following official government and regulatory platforms:
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <a
                    href="https://scores.sebi.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border border-navy/10 rounded-[8px] hover:border-gold hover:bg-cream/10 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-serif text-navy text-[14.5px] font-bold group-hover:text-gold transition-colors">SEBI SCORES Portal</h4>
                      <p className="text-muted text-[12px] mt-1">Lodge grievances online with SEBI</p>
                    </div>
                    <span className="text-gold text-[16px] group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>

                  <a
                    href="https://www.amfiindia.com/investor-corner"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border border-navy/10 rounded-[8px] hover:border-gold hover:bg-cream/10 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-serif text-navy text-[14.5px] font-bold group-hover:text-gold transition-colors">AMFI Investor Corner</h4>
                      <p className="text-muted text-[12px] mt-1">Mutual Fund resources & educational guidelines</p>
                    </div>
                    <span className="text-gold text-[16px] group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>

                  <a
                    href="https://www.irdai.gov.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border border-navy/10 rounded-[8px] hover:border-gold hover:bg-cream/10 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-serif text-navy text-[14.5px] font-bold group-hover:text-gold transition-colors">IRDAI Portal</h4>
                      <p className="text-muted text-[12px] mt-1">Insurance Regulatory and Development Authority</p>
                    </div>
                    <span className="text-gold text-[16px] group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>

                  <a
                    href="https://scores.sebi.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border border-navy/10 rounded-[8px] hover:border-gold hover:bg-cream/10 transition-colors flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-serif text-navy text-[14.5px] font-bold group-hover:text-gold transition-colors">SEBI Saa₹thi App</h4>
                      <p className="text-muted text-[12px] mt-1">Download the official mobile app for investor awareness</p>
                    </div>
                    <span className="text-gold text-[16px] group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>
                </div>
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

export default DisclosuresPage;
