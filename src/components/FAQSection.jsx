import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const faqData = [
  {
    question: "What financial services does Shah Financial Services provide?",
    answer: "We offer a fully integrated financial planning ecosystem. This includes Mutual Fund Advisory (KYC setup, risk profiling, SIP registration, portfolio management), Life & General Insurance (Health, Term Life, Motor, and Corporate policies), specialized Retirement Planning, Tax-Saving ELSS investments, and Goal-Based wealth architecture (for educational funds, property purchase, etc.)."
  },
  {
    question: "Are there any upfront fees or hidden charges for your advisory services?",
    answer: "No. At Shah Financial Services, we prioritize absolute transparency. As an AMFI-registered Mutual Fund Distributor, our compensation is received through standard distribution commissions directly from fund houses. There are no hidden charges or hourly advisory fees for your consultations or portfolio checkups."
  },
  {
    question: "How do I sign up for a free portfolio and insurance review?",
    answer: "Getting started is simple. Click the 'Get Free Review' button in the navigation bar from any page on our site. Enter your basic contact information in the pop-up modal, and one of our experts will call you within 24 hours to schedule a detailed online or in-person review."
  },
  {
    question: "Do you offer remote KYC onboarding and account setups for NRI clients?",
    answer: "Yes, we specialize in NRI Investment Services. We provide a completely digital, paperless remote KYC compliance service for NRIs residing in the USA, Canada, UAE, UK, Europe, Australia, and Singapore. We also guide you on NRE/NRO account integration, tax compliance under DTAA, and repatriation planning."
  },
  {
    question: "How can I monitor my mutual funds and insurance holdings?",
    answer: "Every client gets access to dedicated, secure online client desks. Depending on your portfolio setup, you can log in through the NJ Client Desk or Prudent Client Desk platforms via our Client Login page. Both platforms offer robust web interfaces and mobile apps to track real-time valuations, returns, and transaction histories."
  },
  {
    question: "What is your investment philosophy and recommendation process?",
    answer: "We employ a research-backed, goal-oriented approach. Rather than chasing short-term market trends, we analyze asset historical performance, fund manager consistency, expense ratios, and risk metrics. We then match these products directly to your risk tolerance, liquidity requirements, and specific life goals (like tax-savings, capital preservation, or aggressive growth)."
  }
];

const FAQItem = ({ question, answer, isOpen, onToggle }) => {
  return (
    <div className="border border-slate-100 bg-white rounded-2xl overflow-hidden shadow-[0_4px_20px_rgba(13,37,69,0.015)] hover:shadow-[0_10px_30px_rgba(13,37,69,0.035)] transition-all duration-300">
      <button
        onClick={onToggle}
        className="w-full px-6 py-5 text-left flex items-center justify-between gap-4 cursor-pointer focus:outline-none bg-transparent border-none"
      >
        <span className="font-serif text-[16px] md:text-[18px] font-bold text-navy hover:text-gold transition-colors">
          {question}
        </span>
        <span className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 bg-[#faf8f4] transition-all duration-300 ${isOpen ? 'rotate-180 bg-gold text-white shadow-md shadow-gold/20' : 'text-navy'}`}>
          <svg className="w-4.5 h-4.5 stroke-[2.5]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
          >
            <div className="px-6 pb-6 text-[14.5px] leading-relaxed text-muted font-sans border-t border-slate-50 pt-4">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-cream py-[4.5rem] px-4 overflow-visible relative">
      <div className="max-w-4xl mx-auto overflow-visible">
        
        {/* Subheading decorative line */}
        <div className="w-full flex items-center justify-center gap-4 mb-6">
          <div className="h-[1px] flex-grow bg-navy/10 max-w-[100px] md:max-w-xs"></div>
          <span className="text-gold text-[12px] tracking-[0.2em] uppercase font-bold text-center shrink-0">
            Frequently Asked Questions
          </span>
          <div className="h-[1px] flex-grow bg-navy/10 max-w-[100px] md:max-w-xs"></div>
        </div>

        {/* Title */}
        <div className="text-center mb-12">
          <h2 className="font-serif text-[28px] md:text-[38px] text-textDark font-bold leading-[1.2] mb-4">
            Have Questions? We Have Answers.
          </h2>
          <p className="text-[15px] text-muted leading-relaxed max-w-2xl mx-auto">
            Find quick answers to common questions about our wealth advisory, insurance setup, digital onboarding, and investor desk solutions.
          </p>
        </div>

        {/* FAQ Accordion List */}
        <div className="flex flex-col gap-4">
          {faqData.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onToggle={() => handleToggle(index)}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default FAQSection;
