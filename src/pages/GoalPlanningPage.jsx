import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import supabase from '../lib/supabase';
import FadeIn from '../components/animations/FadeIn';

const GoalPlanningPage = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');



  const handleScrollToContact = () => {
    document.getElementById('goal-contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleWhatsApp = () => {
    window.open('https://wa.me/919800000000?text=Hi!%20I%20would%20like%20to%20plan%20my%20financial%20goals%20with%20you.%20Can%20we%20book%20a%20goal%20planning%20session%3F', '_blank');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !primaryGoal) { 
      setError('Please fill out all required fields'); 
      return; 
    }
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Phone number must have at least 10 digits');
      return;
    }
    setError(''); setLoading(true);
    const { error: sbError } = await supabase
      .from('leads')
      .insert([{
        name,
        phone,
        interest: `Goal Planning - ${primaryGoal || 'Not Specified'}`,
        city: '',
        is_nri: '',
        nri_country: '',
        message: 'Lead from Goal Planning Page',
        status: 'new',
        created_at: new Date().toISOString()
      }]);

    if (sbError) {
      console.error('Full error:', sbError);
      setError(sbError.message);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const labelStyles = "text-[#c9922a] text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]";
  const titleStyles = "font-serif text-[28px] text-[#1a1a2e] font-semibold mb-[2rem] leading-tight";
  const cardStyles = "bg-white border border-[#0d2545]/12 rounded-[12px] p-[1.5rem] h-full transition-transform hover:-translate-y-1";
  const inputStyles = "w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-[#c9922a] focus:bg-white/10 placeholder-white/35 transition-colors";
  const formLabelStyles = "block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]";



  const steps = [
    { num: '01', icon: '🗣️', title: 'List Every Goal', desc: 'We sit with you and list every financial goal — big and small, near and far.' },
    { num: '02', icon: '🎯', title: 'Put a Number On It', desc: 'We put a realistic rupee figure and timeline on each one, adjusted for inflation.' },
    { num: '03', icon: '🪣', title: 'Separate Buckets', desc: 'We create dedicated investment buckets for each goal — nothing gets mixed up.' },
    { num: '04', icon: '🔄', title: 'Track & Correct', desc: 'We track progress every year and course-correct if needed due to life changes.' },
    { num: '05', icon: '✅', title: 'Goal Achieved', desc: 'When the goal arrives — the money is ready. No scrambling, no shortfall.' },
  ];

  const commonGoals = [
    { icon: '🎓', title: "Child's Higher Education", detail: 'Plan for college fees 10–15 years out, inflation-adjusted' },
    { icon: '💍', title: "Child's Marriage", detail: 'Build a dedicated corpus well in advance' },
    { icon: '🏠', title: 'Down Payment for a Home', detail: 'Hit your target without disturbing other savings' },
    { icon: '🚀', title: 'Business Startup Capital', detail: 'Accumulate capital systematically over 3–7 years' },
    { icon: '✈️', title: 'Dream Vacation or Sabbatical', detail: 'Short-term goal with liquid instruments' },
    { icon: '🏖️', title: 'Early Retirement', detail: 'Retire at 45 or 50 with a properly sized corpus' },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col relative">
      <Helmet>
        <title>Goal-Based Wealth Planning — Shah Financial Services</title>
        <meta name="description" content="Plan for every financial goal — education, home, business, retirement. Dedicated investment buckets, tracked annually." />
      </Helmet>

      <Navbar />

      {/* Hero */}
      <section className="bg-[#0d2545] py-[4rem] w-full">
        <FadeIn delay={0.1}>
          <div className="max-w-7xl mx-auto px-4">
            <div className="inline-flex items-center gap-[6px] bg-[#c9922a]/15 border border-[#c9922a]/30 rounded-[20px] px-[14px] py-[4px] mb-[1.5rem]">
              <span className="text-[#f0c96a] text-[11px] uppercase tracking-[0.12em]">Goal-Based Wealth Planning</span>
            </div>
            <h1 className="font-serif text-[36px] md:text-[48px] text-white font-semibold leading-[1.2] mb-[1.25rem] max-w-4xl">
              Every Dream Has a Price Tag. Let's Make Sure You Can Afford It.
            </h1>
            <p className="text-white/65 text-[16px] leading-[1.6] mb-[2rem] max-w-2xl">
              Whether it's your child's education in 10 years, a home in 7 years, or your own business in 5 — every goal needs a dedicated plan. Ad-hoc investing rarely gets you there.
            </p>
            <div className="flex flex-wrap gap-4 mt-[2rem]">
              <button onClick={handleScrollToContact}
                className="bg-[#c9922a] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#f0c96a] transition-colors shadow-lg shadow-[#c9922a]/20">
                📅 Book a Goal Planning Session
              </button>
              <button onClick={handleWhatsApp}
                className="bg-[#25D366] text-white px-[24px] py-[12px] rounded-[8px] font-medium hover:bg-[#22c35e] transition-colors flex items-center gap-2 shadow-lg shadow-[#25D366]/20">
                <span className="text-[18px]">💬</span> WhatsApp Us
              </button>

            </div>
          </div>
        </FadeIn>
      </section>

      {/* Key Message Banner */}
      <section className="bg-white py-[2.5rem] w-full border-b border-[#0d2545]/10">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <p className="text-[#5c6478] text-[15px] leading-[1.7] italic border-l-4 border-[#c9922a] pl-5 max-w-3xl">
              "Your goals are personal. Your plan should be too." — Ad-hoc investing rarely gets you where you want to go. A dedicated bucket for each goal does.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* How It Works — 5 Steps */}
      <section className="bg-[#faf8f4] py-[4.5rem] w-full">
        <FadeIn>
          <div className="max-w-7xl mx-auto px-4">
            <div className={labelStyles}>How It Works</div>
            <h2 className={titleStyles}>Goal-Based Planning in 5 Steps</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-[2rem]">
              {steps.map((step) => (
                <div key={step.num} className={cardStyles}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="text-[32px]">{step.icon}</div>
                    <div className="font-serif text-[32px] text-[#0d2545]/15 font-bold leading-none">{step.num}</div>
                  </div>
                  <h3 className="font-serif text-[18px] text-[#0d2545] font-semibold mb-2">{step.title}</h3>
                  <p className="text-[#5c6478] text-[14px] leading-[1.6]">{step.desc}</p>
                </div>
              ))}
              {/* CTA card */}
              <div className="bg-[#0d2545] rounded-[12px] p-[1.5rem] flex flex-col justify-between relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#c9922a] rounded-full blur-[60px] opacity-20 pointer-events-none transform translate-x-1/2 -translate-y-1/2"></div>
                <div className="relative z-10">
                  <div className="text-[32px] mb-3">🗺️</div>
                  <h3 className="font-serif text-[18px] text-white font-semibold mb-2">Ready to Map Your Goals?</h3>
                  <p className="text-white/60 text-[14px] leading-[1.6] mb-6">Book a free session and we'll build your personalised goal map together.</p>
                </div>
                <button onClick={handleScrollToContact}
                  className="bg-[#c9922a] text-white py-[10px] px-[20px] rounded-[8px] text-[14px] font-medium hover:bg-[#f0c96a] transition-colors w-full relative z-10">
                  Book Free Session →
                </button>
              </div>
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
                <div key={g.title} className="flex items-start gap-4 p-5 bg-[#faf8f4] border border-[#0d2545]/8 rounded-[14px] hover:border-[#c9922a]/40 transition-colors group">
                  <div className="text-[36px] flex-shrink-0 group-hover:scale-110 transition-transform duration-200">{g.icon}</div>
                  <div>
                    <h3 className="font-serif text-[16px] text-[#0d2545] font-semibold mb-1">{g.title}</h3>
                    <p className="text-[#5c6478] text-[13px] leading-[1.5]">{g.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>
      </section>


      {/* Contact / Lead Form */}
      <section id="goal-contact" className="bg-[#0d2545] py-[5rem] w-full border-t border-white/5">
        <FadeIn>
          <div className="max-w-3xl mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="font-serif text-[32px] text-white font-semibold mb-3">Book Your Free Goal Planning Session</h2>
              <p className="text-[#f0c96a] text-[19px] font-serif italic">"A goal without a plan is just a wish."</p>
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
                      <option value="" className="bg-[#0d2545]">Select your goal</option>
                      <option value="Child's Education" className="bg-[#0d2545]">Child's Education</option>
                      <option value="Child's Marriage" className="bg-[#0d2545]">Child's Marriage</option>
                      <option value="Home Down Payment" className="bg-[#0d2545]">Home Down Payment</option>
                      <option value="Business Capital" className="bg-[#0d2545]">Business Startup Capital</option>
                      <option value="Dream Vacation" className="bg-[#0d2545]">Dream Vacation / Sabbatical</option>
                      <option value="Early Retirement" className="bg-[#0d2545]">Early Retirement</option>
                      <option value="Multiple Goals" className="bg-[#0d2545]">Multiple Goals</option>
                    </select>
                  </div>
                  {error && (
                    <div className="md:col-span-2 bg-red-500/10 border border-red-500/30 text-[#f87171] py-2 px-3 rounded-[6px] text-[13px] mt-2">{error}</div>
                  )}
                  <div className="md:col-span-2 mt-3">
                    <button type="submit" disabled={loading} className="w-full bg-[#c9922a] text-white border-none py-[14px] rounded-[8px] text-[15px] font-medium hover:bg-[#f0c96a] transition-colors disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-[#c9922a]/20">
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
