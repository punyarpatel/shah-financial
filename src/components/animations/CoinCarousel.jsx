import React from 'react';

const partners = [
  { name: 'LIC MDRT 2023', image: '/WhatsApp Image 2026-08-11 at 21.33.57.jpeg' },
  { name: 'IndusInd Star Club', image: '/WhatsApp Image 2026-08-11 at 21.33.57 (1).jpeg' },
  { name: 'Abu Dhabi Convention', image: '/WhatsApp Image 2026-08-11 at 21.33.57 (2).jpeg', cropPosition: 'center 67%' },
  { name: 'HDFC ERGO Award', image: '/WhatsApp Image 2026-08-11 at 21.33.57 (3).jpeg' },
  { name: 'PBT Jaipur', image: '/WhatsApp Image 2026-08-11 at 21.33.57 (4).jpeg', cropPosition: 'center 68%' },
  { name: 'HDFC ERGO Top 25', image: '/WhatsApp Image 2026-08-11 at 21.33.57 (5).jpeg' },
  { name: 'PBT Delhi', image: '/WhatsApp Image 2026-08-11 at 21.33.57 (6).jpeg', cropPosition: 'center 68%' },
  { name: 'No. 1 Advisor', image: '/WhatsApp Image 2026-08-11 at 21.33.57 (7).jpeg' },
  { name: 'Lakshya Ki Udaan', image: '/WhatsApp Image 2026-08-11 at 21.33.57 (8).jpeg', cropPosition: 'center 68%' },
  { name: 'Baku Convention', image: '/WhatsApp Image 2026-08-11 at 21.33.57 (9).jpeg', cropPosition: 'center 66%' },
  { name: 'ICICI Gold Club', image: '/WhatsApp Image 2026-08-11 at 21.33.57 (10).jpeg', cropPosition: 'center 74%' },
  { name: 'ICICI Prulife', image: '/WhatsApp Image 2026-08-11 at 21.33.57 (11).jpeg', cropPosition: 'center 74%' },
];

const CoinCarousel = () => {
  return (
    <div className="w-full flex justify-center items-center py-[4rem]" style={{ perspective: '1200px' }}>
      <div 
        className="relative w-[180px] h-[180px] animate-spin-y"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {partners.map((partner, index) => {
          const angle = index * (360 / partners.length);
          
          return (
            <div 
              key={partner.name}
              className="absolute top-0 left-0 w-full h-full rounded-full border-[6px] border-[#cbd5e1] flex flex-col items-center justify-center group"
              style={{
                transform: `rotateY(${angle}deg) translateZ(430px)`,
                backfaceVisibility: 'visible',
                // Adding a complex box shadow to simulate 3D coin edge and metallic reflection
                boxShadow: `
                  inset 0 0 20px rgba(0,0,0,0.8), 
                  inset 0 0 5px rgba(255,255,255,0.2), 
                  0 0 15px rgba(0,0,0,0.5),
                  -5px 0 10px rgba(255,255,255,0.1)
                `,
                background: `linear-gradient(135deg, #1e293b, #0f172a)`
              }}
            >
              {/* Circular image crop inside the existing coin rim */}
              <div className="absolute inset-[4px] overflow-hidden rounded-full border-[2px] border-white/10 bg-slate-900">
                <img
                  src={partner.image}
                  alt={partner.name}
                  className="h-full w-full object-cover"
                  style={{ objectPosition: partner.cropPosition || 'center' }}
                  loading="lazy"
                />
              </div>
              
              {/* Fake 3D Edge (visible when rotated) */}
              <div 
                className="absolute inset-[-6px] rounded-full pointer-events-none"
                style={{
                  transform: 'translateZ(-4px)',
                  border: '6px solid #94a3b8',
                  boxShadow: '0 0 10px rgba(0,0,0,0.5)',
                  zIndex: -1
                }}
              />
              <div 
                className="absolute inset-[-6px] rounded-full pointer-events-none"
                style={{
                  transform: 'translateZ(-8px)',
                  border: '6px solid #64748b',
                  background: '#0f172a',
                  zIndex: -2
                }}
              />
              <div className="absolute left-1/2 top-[calc(100%+10px)] -translate-x-1/2 whitespace-nowrap rounded-full bg-navy/95 px-3 py-1 text-center text-[9px] font-bold uppercase tracking-[0.1em] text-white shadow-lg">
                {partner.name}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoinCarousel;
