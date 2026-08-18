import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';

const servicesList = [
  {
    id: 'mutual-funds',
    icon: '📈',
    category: 'Wealth Management',
    title: 'Mutual Fund Services',
    description: 'End-to-end management of your mutual fund journey, including KYC, risk profiling, fund selection, SIP setup, and regular portfolio reviews.',
    link: '/services/mutual-funds',
    badge: 'TOP CHOICE',
    stat: '₹750Cr+',
    statLabel: 'Assets Managed'
  },
  {
    id: 'insurance',
    icon: '🛡️',
    category: 'Security & Cover',
    title: 'Life & General Insurance',
    description: 'Comprehensive coverage including life, health, motor, and business insurance from trusted partners to protect your family and assets.',
    link: '/services/insurance',
    badge: 'FAMILY PROTECTION',
    stat: '500+',
    statLabel: 'Policies Active'
  },
  {
    id: 'travel-insurance',
    icon: '✈️',
    category: 'Travel Cover',
    title: 'Overseas Travel Insurance',
    description: 'Travel the world with peace of mind. Comprehensive coverage for medical emergencies, flight delays, and lost baggage anywhere in the world.',
    link: '/services/travel-insurance',
    badge: 'GLOBAL COVER',
    stat: '50+',
    statLabel: 'Countries Covered'
  },
  {
    id: 'nri-services',
    icon: '🌍',
    category: 'NRI Special',
    title: 'NRI Services',
    description: 'Specialized advisory for NRIs including NRE/NRO investing, remote KYC, repatriation planning, and health insurance for treatment in India.',
    link: '/nri',
    badge: 'CROSS-BORDER',
    stat: '100+',
    statLabel: 'NRI Clients'
  },
  {
    id: 'retirement',
    icon: '🛋️',
    category: 'Future Planning',
    title: 'Retirement Solutions',
    description: 'Structured retirement planning to ensure your golden years are comfortable, financially independent, and stress-free.',
    link: '/services/retirement',
    badge: 'GOLDEN YEARS',
    stat: '25+',
    statLabel: 'Years Corpus'
  },
  {
    id: 'goal-planning',
    icon: '🎯',
    category: 'Goal Based',
    title: 'Goal-Based Planning',
    description: 'Targeted investment strategies for child education, marriage, home buying, or any major life milestone.',
    link: '/services/goal-planning',
    badge: 'MILESTONE',
    stat: '100%',
    statLabel: 'Goal Focus'
  }
];

const ModernFramerServices = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeService = servicesList[activeIdx];

  return (
    <div className="w-full bg-[#071324] text-white py-16 px-4 select-none rounded-[36px] my-6 shadow-2xl border border-white/10">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-goldLight bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
            FRAMER INTERACTIVE BENTO STAGE
          </span>
          <h2 className="font-serif text-[32px] md:text-[44px] font-bold text-white leading-tight mt-3">
            Comprehensive Financial Solutions
          </h2>
        </div>

        {/* Bento Stage Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Interactive Service Selectors List (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            {servicesList.map((service, idx) => {
              const isSelected = idx === activeIdx;
              return (
                <motion.div
                  key={service.id}
                  onClick={() => setActiveIdx(idx)}
                  whileHover={{ x: 6 }}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all duration-300 flex items-center justify-between ${
                    isSelected
                      ? 'bg-gold/20 border-gold text-white shadow-lg ring-1 ring-gold/40'
                      : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{service.icon}</span>
                    <div>
                      <h4 className="font-serif font-bold text-[16px]">{service.title}</h4>
                      <span className="text-[11px] font-mono text-white/50">{service.category}</span>
                    </div>
                  </div>
                  <span className={`text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full border ${
                    isSelected ? 'bg-gold text-white border-gold' : 'bg-white/10 text-white/50 border-white/10'
                  }`}>
                    0{idx + 1}
                  </span>
                </motion.div>
              );
            })}
          </div>

          {/* Right Column: Dynamic Spotlight Card Preview (7 Cols) */}
          <div className="lg:col-span-7 bg-navy border border-gold/40 rounded-[32px] p-8 md:p-10 flex flex-col justify-between shadow-[0_25px_60px_rgba(7,19,36,0.6)] relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeService.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.35 }}
                className="space-y-6 z-10 my-auto"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-3">
                    <span className="text-4xl p-3 bg-white/10 rounded-2xl border border-white/15">
                      {activeService.icon}
                    </span>
                    <div>
                      <span className="text-[11px] font-mono text-goldLight tracking-widest uppercase block">
                        {activeService.category}
                      </span>
                      <h3 className="font-serif font-bold text-white text-[26px] md:text-[32px]">
                        {activeService.title}
                      </h3>
                    </div>
                  </div>
                  <span className="text-[10px] font-extrabold px-3 py-1 rounded-full bg-gold/20 text-goldLight border border-gold/40 uppercase">
                    {activeService.badge}
                  </span>
                </div>

                <p className="text-white/80 text-[15px] md:text-[16.5px] leading-relaxed font-sans">
                  {activeService.description}
                </p>

                <div className="grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl">
                    <span className="text-[10px] font-mono text-white/50 uppercase block">KEY METRIC</span>
                    <span className="text-[20px] font-serif font-bold text-gold font-mono">{activeService.stat}</span>
                    <span className="text-[11px] text-white/60 block">{activeService.statLabel}</span>
                  </div>

                  <div className="bg-white/5 border border-white/10 p-4 rounded-2xl flex flex-col justify-between">
                    <span className="text-[10px] font-mono text-white/50 uppercase block">PERSONALIZED ADVISORY</span>
                    <Link
                      to={activeService.link}
                      className="text-xs font-bold text-goldLight hover:text-white flex items-center gap-1.5 transition-colors mt-2"
                    >
                      <span>Explore Dedicated Desk</span>
                      <span>&rarr;</span>
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Ambient Background Glow */}
            <div className="absolute -bottom-10 -right-10 w-52 h-52 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModernFramerServices;
