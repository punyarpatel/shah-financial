import React from 'react';
import { motion } from 'framer-motion';

const servicesList = [
  {
    id: '01',
    title: 'Mutual Funds & SIP Planning',
    badge: 'WEALTH GROWTH',
    description: 'Customized equity, debt, and hybrid mutual fund portfolios tailored for long-term wealth compounding and systematic monthly investing (SIPs).',
    bullets: ['Personalized Asset Allocation', 'Risk-Adjusted Portfolio Rebalancing', 'Paperless Onboarding & Tracking'],
    bgColor: 'bg-[#0d2545]',
    textColor: 'text-white',
    accentColor: 'text-goldLight',
    badgeStyle: 'bg-gold/20 text-goldLight border-gold/40'
  },
  {
    id: '02',
    title: 'Comprehensive Insurance Solutions',
    badge: 'RISK PROTECTION',
    description: 'Conflict-free term life, health, and travel insurance coverage strategies for families to ensure financial protection against unforeseen losses.',
    bullets: ['Family Health & Critical Illness Coverage', 'Term Life Risk Assessment', 'International Travel Insurance'],
    bgColor: 'bg-[#0f2c38]',
    textColor: 'text-white',
    accentColor: 'text-emerald-300',
    badgeStyle: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
  },
  {
    id: '03',
    title: 'NRI Investment Desk',
    badge: 'CROSS-BORDER',
    description: 'Personalized wealth planning and compliance support for NRI investors in US, UK, UAE & Singapore seeking growth opportunities in India.',
    bullets: ['NRE / NRO Bank Account Integration', 'FEMA & Tax Compliance Assistance', 'Repatriable & Non-Repatriable Funds'],
    bgColor: 'bg-[#1e1b4b]',
    textColor: 'text-white',
    accentColor: 'text-blue-300',
    badgeStyle: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
  },
  {
    id: '04',
    title: 'Retirement & Life Goal Planning',
    badge: 'FINANCIAL FREEDOM',
    description: 'Structured wealth preservation and annuity models to guarantee financial independence, child education funds, and peaceful retirement years.',
    bullets: ['Inflation-Indexed Pension Planning', 'Child Education & Marriage Corpus', 'Capital Preservation Models'],
    bgColor: 'bg-[#1d2736]',
    textColor: 'text-white',
    accentColor: 'text-amber-300',
    badgeStyle: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  }
];

const StackScrollServices = () => {
  return (
    <div className="w-full py-16 px-4 bg-[#faf8f4] select-none">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 px-3 py-1 rounded-full border border-gold/20">
            FRAMER STACK SCROLL REVEAL
          </span>
          <h2 className="font-serif text-[32px] md:text-[44px] text-navy font-bold leading-tight mt-3">
            Our Core Financial Solutions
          </h2>
          <p className="text-muted text-[15px] md:text-[16px] max-w-xl mx-auto mt-2">
            Scroll down to watch our services stack over each other with sticky 3D depth effect.
          </p>
        </div>

        {/* Sticky Stacking Cards */}
        <div className="space-y-12 relative pb-20">
          {servicesList.map((service, idx) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className={`sticky top-[100px] w-full rounded-[32px] p-8 md:p-12 ${service.bgColor} ${service.textColor} border border-white/15 shadow-[0_25px_60px_rgba(7,19,36,0.35)] flex flex-col justify-between min-h-[380px] md:min-h-[420px] transition-all`}
              style={{
                top: `${100 + idx * 25}px`,
                zIndex: 10 + idx
              }}
            >
              {/* Card Top Bar */}
              <div className="flex justify-between items-center mb-6">
                <span className="font-mono text-[14px] font-bold text-white/50 tracking-widest">
                  SERVICE // {service.id}
                </span>
                <span className={`text-[10px] font-extrabold px-3 py-1 rounded-full border uppercase tracking-wider ${service.badgeStyle}`}>
                  {service.badge}
                </span>
              </div>

              {/* Title & Description */}
              <div className="my-auto py-2">
                <h3 className="font-serif font-bold text-[26px] md:text-[36px] text-white leading-tight mb-4">
                  {service.title}
                </h3>
                <p className="text-[14px] md:text-[16px] text-white/80 leading-relaxed font-sans max-w-2xl">
                  {service.description}
                </p>
              </div>

              {/* Bullets & Footer */}
              <div className="border-t border-white/15 pt-6 mt-6 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap gap-3">
                  {service.bullets.map((bullet, bIdx) => (
                    <span
                      key={bIdx}
                      className="text-[11.5px] font-medium text-white/90 bg-white/10 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10 flex items-center gap-1.5"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-gold"></span>
                      {bullet}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="text-xs font-semibold text-goldLight hover:text-white flex items-center gap-1 transition-colors group"
                >
                  <span>Learn More</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackScrollServices;
