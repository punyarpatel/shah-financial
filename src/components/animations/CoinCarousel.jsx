import React from 'react';

const partners = [
  { name: 'HDFC', logo: 'H', color: 'from-[#0d2545] to-[#1a365d]', textColor: 'text-white' },
  { name: 'SBI', logo: 'S', color: 'from-[#1a365d] to-[#2c5282]', textColor: 'text-white' },
  { name: 'ICICI', logo: 'I', color: 'from-[#2c5282] to-[#2b6cb0]', textColor: 'text-white' },
  { name: 'KOTAK', logo: 'K', color: 'from-[#0d2545] to-[#1a365d]', textColor: 'text-white' },
  { name: 'AXIS', logo: 'A', color: 'from-[#1a365d] to-[#2c5282]', textColor: 'text-white' },
  { name: 'NIPPON', logo: 'N', color: 'from-[#2c5282] to-[#2b6cb0]', textColor: 'text-white' },
];

const CoinCarousel = () => {
  return (
    <div className="w-full flex justify-center items-center py-[4rem]" style={{ perspective: '1200px' }}>
      <div 
        className="relative w-[180px] h-[180px] animate-spin-y"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {partners.map((partner, index) => {
          const angle = index * 60; // 360 / 6 items
          
          return (
            <div 
              key={partner.name}
              className="absolute top-0 left-0 w-full h-full rounded-full border-[6px] border-[#cbd5e1] flex flex-col items-center justify-center group"
              style={{
                transform: `rotateY(${angle}deg) translateZ(220px)`,
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
              {/* Inner metallic rim */}
              <div className="absolute inset-[4px] rounded-full border-[2px] border-white/10 bg-gradient-to-br from-white/10 to-transparent flex flex-col items-center justify-center">
                <div className="text-[#e2e8f0] text-6xl font-serif font-bold mb-1 drop-shadow-lg opacity-90">
                  {partner.logo}
                </div>
                <div className="text-[#94a3b8] text-[11px] uppercase font-bold tracking-[0.2em]">
                  {partner.name}
                </div>
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
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CoinCarousel;
