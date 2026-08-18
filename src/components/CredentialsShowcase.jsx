import React from 'react';
import TeamMemberCardCarousel from './TeamMemberCardCarousel';

const CredentialsShowcase = () => {
  return (
    <section id="credentials" className="bg-[#faf8f4] py-[4.5rem] w-full overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-[2.5rem] max-w-2xl mx-auto">
          <span className="text-gold text-[11px] tracking-[0.2em] uppercase font-semibold mb-2 block">
            Our Team
          </span>
          <h2 className="font-serif text-[32px] md:text-[40px] text-navy font-bold leading-tight mb-4">
            The People Behind Your Wealth
          </h2>
          <p className="text-muted text-[15px] md:text-[16px] leading-relaxed">
            Meet the dedicated team members and relationship managers focused on protecting and growing your assets.
          </p>
        </div>

        {/* Expandable Accordion Carousel */}
        <div className="py-4">
          <TeamMemberCardCarousel />
        </div>
      </div>
    </section>
  );
};

export default CredentialsShowcase;
