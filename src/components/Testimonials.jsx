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
        
        {/* Header */}
        <div className="text-gold text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]">
          Client Stories
        </div>
        <h2 className="font-serif text-[28px] font-semibold mb-[2rem] text-textDark leading-tight">
          What Our Clients Say.
        </h2>

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
