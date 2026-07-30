import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonialsData = [
  {
    quote: "Started my first SIP with them 5 years ago. The guidance was patient, thorough, and completely jargon-free. My portfolio has grown steadily and I have never felt lost.",
    avatar: "RK",
    name: "Rahul K.",
    location: "Ahmedabad · Salaried professional",
    role: "Mutual Fund Investor",
    tag: "VERIFIED INVESTOR",
    stars: 5,
    highlight: "Patient, thorough, and completely jargon-free guidance."
  },
  {
    quote: "As an NRI based in the UAE I was worried about investing back home. Drishti Wealth made the entire process: KYC, DTAA, fund selection: completely smooth. Highly recommend.",
    avatar: "PS",
    name: "Priya S.",
    location: "Dubai, UAE · NRI Client",
    role: "NRI Desk Client",
    tag: "GLOBAL NRI",
    stars: 5,
    highlight: "Cross-border KYC & tax handling made 100% paperless."
  },
  {
    quote: "They called us proactively during the 2020 market crash and told us to stay invested. That one call saved our long-term returns. True advisors, not just distributors.",
    avatar: "SK",
    name: "Suresh & Kavita Shah",
    location: "Surat, Gujarat",
    role: "Retirement Investors",
    tag: "CLIENT SINCE 2012",
    stars: 5,
    highlight: "Saved our returns during the 2020 market crash."
  },
  {
    quote: "Managing repatriation from Canada was confusing until I found Drishti Wealth. They handled everything: NRE account setup, fund selection, tax implications. Outstanding service.",
    avatar: "MD",
    name: "Mihir D.",
    location: "Toronto, Canada · NRI Client",
    role: "Cross-Border Wealth",
    tag: "CANADA NRI",
    stars: 5,
    highlight: "Handled NRE accounts and repatriation end-to-end."
  }
];

const ModernFramerTestimonials = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const activeReview = testimonialsData[activeIdx];

  const goNext = () => setActiveIdx((prev) => (prev + 1) % testimonialsData.length);
  const goPrev = () => setActiveIdx((prev) => (prev - 1 + testimonialsData.length) % testimonialsData.length);

  return (
    <div className="w-full bg-[#071324] text-white py-16 px-4 select-none">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-goldLight bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
              FRAMER 3D REVIEW CAROUSEL
            </span>
            <h2 className="font-serif text-[32px] md:text-[44px] font-bold text-white leading-tight mt-3">
              Trusted by 6,000+ Investors Worldwide
            </h2>
          </div>

          {/* Controls & Rating Badge */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-white/10 border border-white/15 px-4 py-2.5 rounded-full backdrop-blur-md">
              <span className="text-amber-400 text-sm">★★★★★</span>
              <span className="text-xs font-bold text-white">4.9/5 Rating</span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={goPrev}
                className="w-10 h-10 rounded-full bg-navy border border-white/20 text-white flex items-center justify-center hover:bg-gold hover:border-gold transition-colors cursor-pointer"
              >
                &#8592;
              </button>
              <button
                onClick={goNext}
                className="w-10 h-10 rounded-full bg-navy border border-white/20 text-white flex items-center justify-center hover:bg-gold hover:border-gold transition-colors cursor-pointer"
              >
                &#8594;
              </button>
            </div>
          </div>
        </div>

        {/* 3D Testimonial Spotlight Card */}
        <div className="relative min-h-[380px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIdx}
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -30, scale: 0.96 }}
              transition={{ type: 'spring', stiffness: 220, damping: 25 }}
              className="w-full bg-navy/90 border border-white/15 rounded-[36px] p-8 md:p-12 shadow-[0_30px_90px_rgba(7,19,36,0.5)] relative overflow-hidden flex flex-col justify-between"
            >
              {/* Top Quote & Badge */}
              <div className="flex justify-between items-start mb-6">
                <span className="text-4xl text-gold font-serif opacity-60 font-bold">&ldquo;</span>
                <span className="text-[10px] font-mono font-bold tracking-widest text-goldLight bg-gold/15 px-3 py-1 rounded-full border border-gold/30 uppercase">
                  {activeReview.tag}
                </span>
              </div>

              {/* Main Review Quote */}
              <div className="my-auto py-2">
                <h3 className="font-serif text-[22px] md:text-[30px] font-medium text-white leading-relaxed mb-4">
                  {activeReview.quote}
                </h3>
                <p className="text-goldLight font-mono text-[13px] italic bg-white/5 border border-white/10 px-4 py-2 rounded-xl inline-block">
                  Key Takeaway: {activeReview.highlight}
                </p>
              </div>

              {/* Author Row */}
              <div className="border-t border-white/15 pt-6 mt-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-gold/20 border border-gold/40 text-gold font-serif font-bold text-lg flex items-center justify-center shadow-md">
                    {activeReview.avatar}
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-white text-[17px]">{activeReview.name}</h4>
                    <p className="text-[12.5px] text-white/60 font-sans">{activeReview.location}</p>
                  </div>
                </div>

                <div className="hidden sm:flex items-center gap-1">
                  {testimonialsData.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      onClick={() => setActiveIdx(dotIdx)}
                      className={`h-2 rounded-full transition-all ${
                        dotIdx === activeIdx ? 'w-8 bg-gold' : 'w-2 bg-white/20'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Ambient Glow */}
              <div className="absolute -bottom-10 -right-10 w-44 h-44 bg-gold/10 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default ModernFramerTestimonials;
