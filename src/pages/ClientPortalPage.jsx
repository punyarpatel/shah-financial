import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';

const ClientPortalPage = () => {
  const handleNJLogin = () => {
    window.open('https://www.njwealth.in', '_blank');
  };

  const handlePrudentLogin = () => {
    window.open('https://www.fundzbazar.com', '_blank');
  };

  const handleWhatsAppHelp = () => {
    const text = encodeURIComponent('Hi Shah Financial, I need help logging into my portfolio.');
    window.open(`https://wa.me/919XXXXXXXXX?text=${text}`, '_blank');
  };

  const labelStyles = "text-[#c9922a] text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] md:text-[36px] text-[#1a1a2e] font-semibold mb-[1rem] leading-tight";
  const cardStyles = "bg-white border-[1.5px] border-[#0d2545]/12 rounded-[14px] p-[2rem] text-center hover:border-[#c9922a] transition-colors cursor-pointer";
  const btnStyles = "inline-block bg-[#c9922a] text-white px-[20px] py-[10px] rounded-[6px] text-[14px] font-medium hover:bg-[#f0c96a] transition-colors";

  return (
    <div className="min-h-screen bg-[#faf8f4] flex flex-col relative">
      <Helmet>
        <title>Client Portfolio Login — Shah Financial Services.</title>
      </Helmet>

      <Navbar />

      <section className="flex-grow py-[4rem] w-full">
        <div className="max-w-[680px] mx-auto px-4">
          
          {/* Header */}
          <div className="text-center mb-[2rem]">
            <div className={labelStyles}>Portfolio Access</div>
            <h1 className={titleStyles}>Access Your Investment Portfolio</h1>
            <p className="text-[#5c6478] text-[15px] leading-[1.6]">
              Select your platform below to view your holdings and transaction history.
            </p>
          </div>

          {/* Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-[16px]">
            {/* Card 1: NJ Wealth */}
            <div className={cardStyles} onClick={handleNJLogin}>
              <div className="text-[40px] mb-[1rem]">🏦</div>
              <h2 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-[0.5rem]">NJ Wealth Portal</h2>
              <p className="text-[#5c6478] text-[13px] leading-[1.5] mb-[1.5rem]">
                For clients whose portfolio is managed through the NJ Wealth platform.
              </p>
              <button className={btnStyles}>
                Login to NJ Wealth
              </button>
            </div>

            {/* Card 2: Prudent FundzBazar */}
            <div className={cardStyles} onClick={handlePrudentLogin}>
              <div className="text-[40px] mb-[1rem]">📊</div>
              <h2 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-[0.5rem]">Prudent FundzBazar</h2>
              <p className="text-[#5c6478] text-[13px] leading-[1.5] mb-[1.5rem]">
                For clients on the Prudent FundzBazar platform.
              </p>
              <button className={btnStyles}>
                Login to FundzBazar
              </button>
            </div>
          </div>

          {/* Help Box */}
          <div className="mt-[2rem] bg-[#0d2545]/5 border border-[#0d2545]/10 rounded-[12px] p-[1.5rem] text-center">
            <p className="text-[#0d2545] text-[14px] font-medium mb-[1rem]">
              Not sure which platform you use? WhatsApp us and we will guide you in 2 minutes.
            </p>
            <button 
              onClick={handleWhatsAppHelp}
              className="inline-flex items-center gap-2 bg-[#25d366] text-white px-[20px] py-[10px] rounded-[6px] text-[14px] font-medium hover:bg-[#1db954] transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[18px] h-[18px]">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.251 2.924.185.049 3.158 4.842 7.659 6.792.822.358 1.465.57 1.968.73.826.26 1.579.223 2.169.135.66-.098 2.03-.83 2.316-1.631.286-.8.286-1.488.2-1.631-.086-.143-.314-.228-.611-.377L17.472 14.382z"/>
                <path d="M12.004 2A10.005 10.005 0 002 12.002c0 1.954.512 3.868 1.484 5.55L2 22l4.582-1.458C8.22 21.493 10.093 22 12.002 22 17.525 22 22 17.524 22 12.002 22 6.478 17.523 2 12.004 2zM12.002 20.315c-1.658 0-3.284-.446-4.71-1.29l-.337-.2-3.411 1.085 1.106-3.323-.22-.349a8.318 8.318 0 01-1.272-4.442c0-4.593 3.738-8.332 8.332-8.332 2.227 0 4.318.868 5.89 2.441a8.303 8.303 0 012.441 5.891c0 4.594-3.737 8.332-8.333 8.332z"/>
              </svg>
              Message on WhatsApp
            </button>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-[1.5rem]">
            <span className="text-[#5c6478] text-[13px]">New client? </span>
            <a 
              href="/#contact" 
              className="text-[#c9922a] text-[13px] font-medium hover:text-[#f0c96a] transition-colors"
            >
              Fill our enquiry form to get started &rarr;
            </a>
          </div>

        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default ClientPortalPage;
