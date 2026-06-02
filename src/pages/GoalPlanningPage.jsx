import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { submitLead } from '../lib/leads';
import FadeIn from '../components/animations/FadeIn';

const STEPS = [
  { 
    id: 'step1',
    num: '01', 
    icon: '🗣️', 
    title: 'List Every Goal', 
    description: 'We sit with you and list every financial goal — big and small, near and far.',
    detailedDescription: 'We detail all your aspirations, from purchasing a home to funding higher education, categorizing them by priority and time horizon.'
  },
  { 
    id: 'step2',
    num: '02', 
    icon: '🎯', 
    title: 'Put a Number On It', 
    description: 'We put a realistic rupee figure and timeline on each one, adjusted for inflation.',
    detailedDescription: 'An education that costs ₹10L today will cost ₹20L+ in 10 years. We run detailed inflation calculations so you save for the actual future cost.'
  },
  { 
    id: 'step3',
    num: '03', 
    icon: '🪣', 
    title: 'Separate Buckets', 
    description: 'We create dedicated investment buckets for each goal — nothing gets mixed up.',
    detailedDescription: 'Each goal gets a specific portfolio of mutual funds matching its timeline. You\'ll know exactly which investment is for which dream.'
  },
  { 
    id: 'step4',
    num: '04', 
    icon: '🔄', 
    title: 'Track & Correct', 
    description: 'We track progress every year and course-correct if needed due to life changes.',
    detailedDescription: 'If you get a salary hike or your goals change, we adjust your monthly allocations so your plans stay aligned with your evolving life.'
  },
  { 
    id: 'step5',
    num: '05', 
    icon: '✅', 
    title: 'Goal Achieved', 
    description: 'When the goal arrives — the money is ready. No scrambling, no shortfall.',
    detailedDescription: 'We gradually shift your money to safer, liquid funds as your target date approaches, protecting your profits from sudden market drops.'
  },
  {
    id: 'cta',
    num: '🗺️',
    icon: '🗺️',
    title: 'Ready to Map Your Goals?',
    description: 'Book a free session and we\'ll build your personalised goal map together.',
    detailedDescription: 'Let\'s sit down and convert your dreams into an actionable financial blueprint. Click below to book your consultation.',
    isCta: true
  }
];

const GoalPlanningPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [hovered, setHovered] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleScrollToContact = () => {
    document.getElementById('goal-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919664977576?text=Hi!%20I%20would%20like%20to%20plan%20my%20financial%20goals%20with%20you.%20Can%20we%20book%20a%20goal%20planning%20session%3F', '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !primaryGoal) { 
      setError('Please fill out all required fields'); 
      return; 
    }
    setError(''); setLoading(true);

    const res = await submitLead({
      name,
      phone,
      interest: `Goal Planning - ${primaryGoal || 'Not Specified'}`,
      message: 'Lead from Goal Planning Page'
    });

    if (!res.success) {
      setError(res.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const labelStyles = "text-gold text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] text-textDark font-semibold mb-[2rem] leading-tight";
  const cardStyles = "premium-card-interactive";
  const inputStyles = "w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-gold focus:bg-white/10 placeholder-white/35 transition-colors";
  const formLabelStyles = "block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]";



  const commonGoals = [
    { icon: '🎓', title: "Child's Higher Education", detail: 'Plan for college fees 10–15 years out, inflation-adjusted' },
    { icon: '💍', title: "Child's Marriage", detail: 'Build a dedicated corpus well in advance' },
    { icon: '🏠', title: 'Down Payment for a Home', detail: 'Hit your target without disturbing other savings' },
    { icon: '🚀', title: 'Business Startup Capital', detail: 'Accumulate capital systematically over 3–7 years' },
    { icon: '✈️', title: 'Dream Vacation or Sabbatical', detail: 'Short-term goal with liquid instruments' },
    { icon: '🏖️', title: 'Early Retirement', detail: 'Retire at 45 or 50 with a properly sized corpus' },
  ];

  const ogImage = `${window.location.origin}/goals_preview.png`;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>Goal-Based Wealth Planning — Shah Financial Services</title>
        <meta name="description" content="Plan for every financial goal — education, home, business, retirement. Dedicated investment buckets, tracked annually." />
        <meta property="og:title" content="Goal-Based Wealth Planning — Shah Financial Services" />
        <meta property="og:description" content="Plan for every financial goal — education, home, business, retirement. Dedicated investment buckets, tracked annually." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Goal-Based Wealth Planning — Shah Financial Services" />
        <meta name="twitter:description" content="Plan for every financial goal — education, home, business, retirement. Dedicated investment buckets, tracked annually." />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="bg-navy py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="mb-6">
              <Link to="/services" className="text-gold/85 hover:text-gold font-medium text-[14px] inline-flex items-center gap-1.5 transition-colors">
                &larr; Back to Services
              </Link>
            </div>
            <div className="inline-flex items-center gap-[6px] bg-gold/15 border border-gold/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-goldLight text-[11px] uppercase tracking-[0.12em]">Goal-Based Wealth Planning</span>
            </div>
            <h1 className="font-serif text-[36px] md:text-[48px] text-white font-semibold leading-[1.2] mb-[1.25rem] max-w-4xl">
              Every Dream Has a Price Tag. Let's Make Sure You Can Afford It.
            </h1>
            <p className="text-white/65 text-[16px] leading-[1.6] mb-[2rem] max-w-2xl">
              Whether it's your child's education in 10 years, a home in 7 years, or your own business in 5 — every goal needs a dedicated plan. Ad-hoc investing rarely gets you there.
            </p>
            <div className="flex flex-wrap gap-4 mt-[2rem]">
              <a href="tel:+919664977576"
                className="bg-white/10 text-white border border-white/20 px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-white/20 transition-colors flex items-center gap-2">
                <span className="text-[18px]">📞</span> Call Us
              </a>
              <button onClick={handleScrollToContact}
                className="bg-gold text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-goldLight transition-colors shadow-lg shadow-gold/20">
                📅 Book a Goal Planning Session
              </button>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Key Message Banner */}
      <section className="bg-white py-[2.5rem] w-full border-b border-navy/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-muted text-[15px] leading-[1.7] italic border-l-4 border-gold pl-5 max-w-3xl">
              "Your goals are personal. Your plan should be too." — Ad-hoc investing rarely gets you where you want to go. A dedicated bucket for each goal does.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* How It Works — 5 Steps */}
      <section className="bg-cream py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>How It Works</div>
            <h2 className={titleStyles}>Goal-Based Planning in 5 Steps</h2>
            
            <div className="mt-[3rem] w-full premium-feature-card group">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-16 items-stretch">
                {/* Left Column (50%) */}
                <div className="flex flex-col justify-between h-full">
                  <div>
                    {/* Soft colored square box icon container */}
                    <div className="relative w-14 h-14 mb-6 group/icon">
                      <div className="absolute inset-0 bg-gold/10 rounded-xl transition-all duration-300 group-hover/icon:scale-110 group-hover/icon:bg-gold/15"></div>
                      <div className="absolute inset-1 bg-white rounded-lg shadow-sm border border-gold/10 flex items-center justify-center text-2xl transition-all duration-300 group-hover/icon:rotate-6">
                        🎯
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-[24px] md:text-[26px] font-bold text-textDark mb-3 group-hover:text-navy transition-colors duration-300">
                      Goal-Based Wealth Planning
                    </h3>

                    {/* Description */}
                    <p className="text-[15px] leading-relaxed text-muted mb-6">
                      Create dedicated investment buckets for your children’s education, home purchase, business capital, and dream vacations with tracked progress.
                    </p>

                    {/* 3 key benefit points with a gold checkmark */}
                    <ul className="space-y-3.5 mb-8">
                      {[
                        'Dedicated portfolios for child education & home purchase',
                        'Custom timeframe planning and milestone tracking',
                        'Dynamic asset allocation based on target closeness'
                      ].map((benefit, idx) => (
                        <li key={idx} className="flex items-start text-[14.5px] text-muted">
                          <span className="flex-shrink-0 w-5 h-5 rounded-full bg-gold/15 flex items-center justify-center mr-3 mt-[2px] transition-transform duration-300 group-hover:scale-110">
                            <span className="text-gold text-[10px] font-bold">✓</span>
                          </span>
                          <span className="leading-relaxed text-[#4e5566] group-hover:text-textDark transition-colors duration-300">
                            {benefit}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Learn more -> link in gold at the bottom */}
                  <div className="mt-auto pt-4">
                    <button
                      onClick={handleScrollToContact}
                      className="inline-flex items-center text-[14px] font-bold text-gold hover:text-goldLight group/link transition-colors duration-300"
                    >
                      <span className="relative py-1">
                        Learn more
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-gold group-hover/link:w-full transition-all duration-300"></span>
                      </span>
                      <svg className="w-4 h-4 ml-1.5 transform group-hover/link:translate-x-1.5 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Right Column (50%) - Tilted 3D Preview Box */}
                <div className="relative w-full h-full min-h-[320px] md:min-h-full">
                  <div className="relative w-full h-full bg-[#f4f7fa] rounded-[16px] flex flex-col justify-between border border-slate-100 shadow-inner overflow-hidden group/right">
                    
                    {/* Top Area (Approx 80% height): Tilted 3D Preview container */}
                    <div 
                      className="relative flex-grow flex items-center justify-center p-8 pb-4" 
                      style={{ perspective: '1000px' }}
                      onMouseEnter={() => setHovered(true)}
                      onMouseLeave={() => setHovered(false)}
                    >
                      <div 
                        className="relative w-[90%] aspect-[16/10] bg-white rounded-xl border border-slate-100 overflow-hidden"
                        style={{ 
                          transform: hovered 
                            ? 'rotateX(4deg) rotateY(-6deg) rotateZ(1deg) scale(1.02)' 
                            : 'rotateX(8deg) rotateY(-12deg) rotateZ(2deg)',
                          transformStyle: 'preserve-3d',
                          transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.6s ease',
                          boxShadow: hovered
                            ? '0 30px 60px rgba(13,37,69,0.12), 0 10px 20px rgba(0,0,0,0.04)'
                            : '0 20px 40px rgba(13,37,69,0.06), 0 5px 15px rgba(0,0,0,0.02)'
                        }}
                      >
                        <img 
                          src="/goals_preview.png" 
                          alt="Goal-Based Wealth Planning"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none rounded-lg"></div>
                      </div>
                    </div>

                    {/* Bottom Bar: White background, service name label and green indicator dot */}
                    <div className="bg-white border-t border-slate-100/80 px-6 py-4 flex items-center justify-between">
                      <span className="text-[13px] font-semibold text-[#5c687e] tracking-wide">
                        Goal-Based Wealth Planning
                      </span>
                      <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[4rem] relative">
              {STEPS.map((step, index) => {
                const isHovered = hoveredIndex === index;
                const isAnyHovered = hoveredIndex !== null;
                
                // Calculate slide translations based on relative position in a 3-column layout
                let xTranslate = 0;
                let yTranslate = 0;
                
                if (isAnyHovered && !isHovered) {
                  const columns = 3;
                  const r = Math.floor(index / columns);
                  const c = index % columns;
                  const hr = Math.floor(hoveredIndex / columns);
                  const hc = hoveredIndex % columns;
                  
                  const dr = r - hr;
                  const dc = c - hc;
                  
                  // Translate outwards away from the hovered card
                  xTranslate = Math.sign(dc) * 60;
                  yTranslate = Math.sign(dr) * 60;
                }
                
                if (step.isCta) {
                  return (
                    <motion.div
                      key={step.id}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                      style={{
                        originX: 0.5,
                        originY: 0.5,
                      }}
                      animate={{
                        scale: isHovered ? 1.06 : isAnyHovered ? 0.92 : 1,
                        x: xTranslate,
                        y: yTranslate,
                        opacity: isHovered ? 1 : isAnyHovered ? 0.2 : 1,
                        zIndex: isHovered ? 50 : 1,
                        boxShadow: isHovered 
                          ? '0 20px 40px rgba(13, 37, 69, 0.12), 0 8px 16px rgba(201, 146, 42, 0.15)' 
                          : '0 4px 6px rgba(13, 37, 69, 0.02)',
                        borderColor: isHovered ? 'rgba(201, 146, 42, 0.4)' : 'rgba(201, 146, 42, 0.15)',
                      }}
                      transition={{
                        type: 'spring',
                        stiffness: 260,
                        damping: 24,
                      }}
                      className="bg-navy rounded-[12px] p-[1.5rem] h-full flex flex-col justify-between relative overflow-hidden cursor-pointer"
                    >
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gold rounded-full blur-[60px] opacity-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
                      <div className="relative z-10">
                        <div className="text-[32px] mb-3 select-none">🗺️</div>
                        <h3 className="font-serif text-[18px] text-white font-semibold mb-2">{step.title}</h3>
                        <p className="text-white/60 text-[14px] leading-[1.6]">{step.description}</p>
                      </div>

                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ 
                          height: isHovered ? 'auto' : 0, 
                          opacity: isHovered ? 1 : 0,
                          marginTop: isHovered ? 16 : 0
                        }}
                        transition={{ 
                          duration: 0.35, 
                          ease: [0.16, 1, 0.3, 1] 
                        }}
                        className="overflow-hidden relative z-10 w-full"
                      >
                        <p className="text-white/50 text-[13.5px] leading-[1.6] border-t border-white/10 pt-3 mb-4">
                          {step.detailedDescription}
                        </p>
                        <button onClick={handleScrollToContact}
                          className="bg-gold text-white py-[10px] px-[20px] rounded-[8px] text-[14px] font-medium hover:bg-goldLight transition-colors w-full relative z-10">
                          Book Free Session →
                        </button>
                      </motion.div>
                    </motion.div>
                  );
                }

                return (
                  <motion.div
                    key={step.id}
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      originX: 0.5,
                      originY: 0.5,
                    }}
                    animate={{
                      scale: isHovered ? 1.06 : isAnyHovered ? 0.92 : 1,
                      x: xTranslate,
                      y: yTranslate,
                      opacity: isHovered ? 1 : isAnyHovered ? 0.2 : 1,
                      zIndex: isHovered ? 50 : 1,
                      boxShadow: isHovered 
                        ? '0 20px 40px rgba(13, 37, 69, 0.12), 0 8px 16px rgba(201, 146, 42, 0.15)' 
                        : '0 4px 6px rgba(13, 37, 69, 0.02)',
                      borderColor: isHovered ? 'rgba(201, 146, 42, 0.4)' : 'rgba(13, 37, 69, 0.12)',
                    }}
                    transition={{
                      type: 'spring',
                      stiffness: 260,
                      damping: 24,
                    }}
                    className="bg-white border rounded-[12px] p-[1.5rem] h-full flex flex-col justify-between cursor-pointer transition-colors duration-300"
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-4 select-none">
                        <div className="text-[32px]">{step.icon}</div>
                        <div className="font-serif text-[32px] text-navy/15 font-bold leading-none">{step.num}</div>
                      </div>
                      <h3 className="font-serif text-[18px] text-navy font-semibold mb-2">{step.title}</h3>
                      <p className="text-muted text-[14px] leading-[1.6]">{step.description}</p>
                    </div>

                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ 
                        height: isHovered ? 'auto' : 0, 
                        opacity: isHovered ? 1 : 0,
                        marginTop: isHovered ? 16 : 0
                      }}
                      transition={{ 
                        duration: 0.35, 
                        ease: [0.16, 1, 0.3, 1] 
                      }}
                      className="overflow-hidden"
                    >
                      <p className="text-muted text-[13.5px] leading-[1.6] border-t border-navy/5 pt-3">
                        {step.detailedDescription}
                      </p>
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Common Goals Grid */}
      <section className="bg-white py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>Goals We Plan For</div>
            <h2 className={titleStyles}>What We Commonly Help You Achieve</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {commonGoals.map((g) => (
                <div key={g.title} className="flex items-start gap-4 p-5 bg-cream border border-navy/8 rounded-[14px] hover:border-gold/40 transition-colors group">
                  <div className="text-[36px] flex-shrink-0 group-hover:scale-110 transition-transform duration-200">{g.icon}</div>
                  <div>
                    <h3 className="font-serif text-[16px] text-navy font-semibold mb-1">{g.title}</h3>
                    <p className="text-muted text-[13px] leading-[1.5]">{g.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>


      {/* Contact / Lead Form */}
      <section id="goal-contact" className="bg-navy py-[5rem] w-full border-t border-white/5">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">Book Your Free Goal Planning Session</h2>
              <p className="text-goldLight text-[19px] font-serif italic">"A goal without a plan is just a wish."</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-[16px] p-[2rem] md:p-[2.5rem] shadow-2xl backdrop-blur-sm">
              {success ? (
                <div className="bg-green-500/15 border border-green-500/30 rounded-[10px] p-[2rem] text-center text-[#4ade80]">
                  <div className="text-[32px] mb-2">✅</div>
                  <h3 className="font-serif text-[24px] mb-2">Request Received</h3>
                  <p>Thank you! Our advisor will reach out to book your goal planning session.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="md:col-span-2">
                    <label className={formLabelStyles}>Full Name</label>
                    <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your Name" className={inputStyles} />
                  </div>
                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Phone / WhatsApp</label>
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+91 XXXXX XXXXX" className={inputStyles} />
                  </div>
                  <div className="md:col-span-1">
                    <label className={formLabelStyles}>Primary Goal</label>
                    <select value={primaryGoal} onChange={e => setPrimaryGoal(e.target.value)} className={`${inputStyles} appearance-none cursor-pointer`}>
                      <option value="" className="bg-navy">Select your goal</option>
                      <option value="Child's Education" className="bg-navy">Child's Education</option>
                      <option value="Child's Marriage" className="bg-navy">Child's Marriage</option>
                      <option value="Home Down Payment" className="bg-navy">Home Down Payment</option>
                      <option value="Business Capital" className="bg-navy">Business Startup Capital</option>
                      <option value="Dream Vacation" className="bg-navy">Dream Vacation / Sabbatical</option>
                      <option value="Early Retirement" className="bg-navy">Early Retirement</option>
                      <option value="Multiple Goals" className="bg-navy">Multiple Goals</option>
                    </select>
                  </div>
                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px] mt-2">{error}</div>
                  )}
                  <div className="md:col-span-2 mt-3">
                    <button type="submit" disabled={loading} className="w-full bg-gold text-white border-none py-[14px] rounded-[8px] text-[15px] font-medium hover:bg-goldLight transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-gold/20">
                      {loading ? 'Submitting...' : 'Book My Goal Planning Session'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </FadeIn>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default GoalPlanningPage;
