import React from 'react';

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Started my first SIP with them 5 years ago. The guidance was patient, thorough, and completely jargon-free. My portfolio has grown steadily and I have never felt lost.",
      avatar: "RK",
      name: "Rahul K.",
      location: "Ahmedabad · Salaried professional"
    },
    {
      quote: "As an NRI based in the UAE I was worried about investing back home. Shah Financial made the entire process — KYC, DTAA, fund selection — completely smooth. Highly recommend.",
      avatar: "PS",
      name: "Priya S.",
      location: "Dubai, UAE · NRI Client"
    },
    {
      quote: "They called us proactively during the 2020 market crash and told us to stay invested. That one call saved our long-term returns. True advisors, not just distributors.",
      avatar: "SK",
      name: "Suresh & Kavita Shah",
      location: "Surat, Gujarat"
    },
    {
      quote: "Managing repatriation from Canada was confusing until I found Shah Financial. They handled everything — NRE account setup, fund selection, tax implications. Outstanding service.",
      avatar: "MD",
      name: "Mihir D.",
      location: "Toronto, Canada · NRI Client"
    }
  ];

  return (
    <section className="w-full bg-cream">
      <div className="max-w-7xl mx-auto py-[3.5rem] px-4">
        
        {/* Header with Google Reviews Badge */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-[2.5rem] gap-5">
          <div>
            <div className="text-gold text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]">
              Client Stories
            </div>
            <h2 className="font-serif text-[28px] md:text-[32px] font-semibold text-textDark leading-tight">
              What Our Clients Say.
            </h2>
          </div>
          
          {/* Google Reviews Badge */}
          <div className="flex items-center gap-3 bg-white border border-navy/10 px-4 py-3 rounded-xl shadow-sm w-fit transition-transform hover:-translate-y-1 duration-300">
            <svg viewBox="0 0 24 24" className="w-7 h-7 shrink-0" xmlns="http://www.w3.org/2000/svg">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex flex-col">
              <div className="flex items-center gap-1 text-[#FBBC05] text-[13px] tracking-widest leading-none mb-1">
                ★★★★★
              </div>
              <div className="text-[12px] font-medium text-textDark leading-none">
                <span className="font-bold">4.9/5</span> based on 150+ reviews
              </div>
            </div>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="flex flex-col sm:grid sm:grid-cols-2 gap-[12px]">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white border border-navy/12 rounded-[12px] p-[1.25rem]">
              <div className="text-gold text-[12px] mb-[0.5rem] tracking-widest">
                ★★★★★
              </div>
              <div className="text-textDark text-[14px] leading-[1.6] font-light italic mb-[0.75rem]">
                "{t.quote}"
              </div>
              <div className="flex items-center gap-[10px]">
                <div className="w-[32px] h-[32px] rounded-full bg-navy flex items-center justify-center text-goldLight text-[11px] font-medium shrink-0">
                  {t.avatar}
                </div>
                <div className="flex flex-col">
                  <div className="text-[13px] font-medium text-textDark leading-tight">
                    {t.name}
                  </div>
                  <div className="text-[11px] text-muted leading-tight mt-[2px]">
                    {t.location}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Testimonials;
