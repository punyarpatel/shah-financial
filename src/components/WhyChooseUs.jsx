import React from 'react';
import FadeIn from './animations/FadeIn';

const whyChooseUsData = [
  {
    id: 1,
    title: '20+ Years of Proven Track Record',
    description: 'Founded in 2009 by Rajesh Shah, we have guided families and businesses through diverse market cycles with research-backed, stable advice.'
  },
  {
    id: 2,
    title: '₹750+ Crore AUM & 4,000+ Families',
    description: 'Trusted by over 4,000 families in India and 100+ NRI clients globally to safeguard and steadily compound their hard-earned wealth.'
  },
  {
    id: 3,
    title: 'Fully Regulated & Compliant Partners',
    description: 'AMFI-registered Mutual Fund Distributor (ARN) and IRDAI-licensed advisor empanelled with top platforms like NJ Wealth and Prudent.'
  },
  {
    id: 4,
    title: 'Conflict-Free, Tailored Strategy',
    description: 'Zero generic templates. Receive custom asset allocation matching your tax saving targets, retirement horizons, or education milestones.'
  }
];

const WhyChooseUs = () => {
  const [hoveredIdx, setHoveredIdx] = React.useState(null);

  return (
    <section className="w-full bg-[#fdfcfa] py-[5rem] overflow-hidden border-t border-navy/5">
      <div className="max-w-7xl mx-auto px-4">
        
        <FadeIn>
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-gold/10 text-gold rounded-full text-[12px] tracking-[0.15em] uppercase font-bold border border-gold/20 shadow-sm mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse"></span>
              Our Advantages
            </span>
            <h2 className="font-serif text-[32px] md:text-[42px] text-textDark font-bold leading-[1.2] mb-4">
              Why Choose Shah Financial
            </h2>
            <p className="text-[15px] text-muted leading-relaxed">
              We combine professional expertise, robust technologies, and deep market insights to protect and compound your wealth over generations.
            </p>
          </div>
        </FadeIn>

        {/* 2-Column Content Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column (Points): 58.3% width (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            {whyChooseUsData.map((item, idx) => (
              <FadeIn key={item.id} delay={idx * 0.1}>
                <div 
                  onMouseEnter={() => setHoveredIdx(idx)}
                  onMouseLeave={() => setHoveredIdx(null)}
                  className="flex items-start p-4 rounded-xl transition-all duration-300 hover:bg-white hover:shadow-[0_8px_30px_rgba(13,37,69,0.04)] border border-transparent hover:border-navy/5 cursor-default group"
                >
                  {/* Styled Checkmark Dot */}
                  <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-4 mt-1 transition-all duration-300 border ${
                    hoveredIdx === idx 
                      ? 'bg-gold border-gold scale-110 shadow-sm' 
                      : 'bg-gold/10 border-gold/20'
                  }`}>
                    <svg className={`w-3.5 h-3.5 transition-colors duration-300 ${
                      hoveredIdx === idx ? 'text-white' : 'text-gold'
                    }`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" stroke="M5 13l4 4L19 7" />
                    </svg>
                  </div>

                  {/* Text Content */}
                  <div>
                    <h3 className="font-sans text-[17px] font-bold text-textDark mb-1.5 transition-colors duration-300 group-hover:text-navy">
                      {item.title}
                    </h3>
                    <p className="text-[14.5px] leading-relaxed text-muted transition-colors duration-300 group-hover:text-[#4e5566]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {/* Right Column (3D tilted leaf card): 41.7% width (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <FadeIn delay={0.3}>
              <div className="relative w-full max-w-[420px] px-4" style={{ perspective: '1200px' }}>
                {/* Background Shadow & Light Accent Glows */}
                <div className="absolute -inset-4 bg-gradient-to-tr from-gold/15 to-navy/5 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
                
                {/* 3D Tilted Custom Leaf Card Container */}
                <div 
                  className="relative w-full aspect-square bg-white rounded-tl-[80px] rounded-br-[80px] rounded-tr-[12px] rounded-bl-[12px] p-6 flex flex-col justify-between border border-slate-100 transition-all duration-700 ease-out hover:scale-[1.03] group/mockup cursor-pointer"
                  style={{ 
                    transform: hoveredIdx !== null
                      ? `rotateX(${6 + hoveredIdx * 1}deg) rotateY(${-10 - hoveredIdx * 1}deg) rotateZ(1deg) scale(1.02)`
                      : 'rotateX(8deg) rotateY(-12deg) rotateZ(2deg)',
                    transformStyle: 'preserve-3d',
                    boxShadow: hoveredIdx !== null
                      ? '0 35px 70px rgba(13,37,69,0.15), 0 10px 25px rgba(0,0,0,0.05)'
                      : '0 25px 50px rgba(13,37,69,0.1), 0 5px 15px rgba(0,0,0,0.03)'
                  }}
                >
                  {/* Inner Card (Soft light background matching teardrop structure) */}
                  <div className="w-full h-full bg-[#f8fafd] rounded-tl-[60px] rounded-br-[60px] rounded-tr-[8px] rounded-bl-[8px] p-6 flex flex-col justify-between border border-slate-100/50 relative overflow-hidden">
                    
                    {/* Background radial glow */}
                    <div className="absolute -right-10 -top-10 w-32 h-32 rounded-full bg-gold/5 blur-xl"></div>
                    
                    {/* Top Header Mockup */}
                    <div className="space-y-2.5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 rounded-full bg-gold/15 flex items-center justify-center text-[14px]">
                            📊
                          </div>
                          <div>
                            <div className="h-2 w-20 bg-navy/20 rounded"></div>
                            <div className="h-1.5 w-12 bg-navy/10 rounded mt-1"></div>
                          </div>
                        </div>
                        <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">
                          +18.4%
                        </span>
                      </div>
                      
                      {/* Decorative stats text lines */}
                      <div className="h-1.5 w-full bg-navy/5 rounded mt-4"></div>
                      <div className="h-1.5 w-5/6 bg-navy/5 rounded"></div>
                    </div>

                    {/* Central Visual: Wealth Growth Line Chart */}
                    <div className="flex-grow flex items-center justify-center my-4">
                      <svg className="w-full h-24 overflow-visible" viewBox="0 0 200 80">
                        <defs>
                          <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#c9922a" stopOpacity="0.25" />
                            <stop offset="100%" stopColor="#c9922a" stopOpacity="0.0" />
                          </linearGradient>
                        </defs>
                        {/* Grid lines */}
                        <line x1="0" y1="60" x2="200" y2="60" stroke="#0d2545" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.1" />
                        <line x1="0" y1="30" x2="200" y2="30" stroke="#0d2545" strokeWidth="0.5" strokeDasharray="3 3" opacity="0.1" />
                        
                        {/* Area fill */}
                        <path d="M 0 70 Q 40 50 80 55 T 160 20 L 200 15 L 200 80 L 0 80 Z" fill="url(#chartGrad)" />
                        
                        {/* Glow Line */}
                        <path 
                          d="M 0 70 Q 40 50 80 55 T 160 20 L 200 15" 
                          fill="none" 
                          stroke="#c9922a" 
                          strokeWidth="3" 
                          strokeLinecap="round"
                        />
                        
                        {/* Pulse Dot */}
                        <circle cx="200" cy="15" r="4" fill="#c9922a" />
                        <circle cx="200" cy="15" r="8" fill="#c9922a" opacity="0.3" className="animate-ping" />
                      </svg>
                    </div>

                    {/* Bottom Dashed Container (Matches mockup dashed box) */}
                    <div className="border border-dashed border-gold/40 bg-gold/[0.02] rounded-2xl p-4 flex items-center justify-between shadow-inner">
                      <div>
                        <div className="text-[10px] uppercase tracking-wider text-gold font-bold">Estimated Wealth</div>
                        <div className="text-[16px] font-bold text-textDark font-serif mt-0.5">₹2.4 Crores</div>
                      </div>
                      <div className="text-xl">📈</div>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
