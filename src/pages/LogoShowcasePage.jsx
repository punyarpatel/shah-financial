import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Sun, Moon, Info, Check } from 'lucide-react';

export default function LogoShowcasePage() {
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedLogo, setSelectedLogo] = useState(null);

  // Logo Concepts Data
  const logoConcepts = [
    {
      id: 1,
      name: "Concept 1: The Visionary Eye & Growth Arrow",
      description: "A sleek combination of the eye (representing 'Drishti' or vision) and an ascending trend line (representing 'Wealth' and compounding growth) breaking through the eye contour.",
      philosophy: "Perfect blend of insight and action. Tells the story of seeing opportunities and growing wealth.",
      svg: (bgColor, strokeColor, accentColor, highlightColor) => (
        <svg className="w-48 h-20" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Logo Mark */}
          <g transform="translate(10, 10)">
            <path d="M10,30 C25,10 55,10 70,30 C55,50 25,50 10,30 Z" stroke={accentColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <circle cx="40" cy="30" r="10" fill={highlightColor} />
            <path d="M22,35 L38,20 L50,28 L68,10" stroke={strokeColor} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
            <polygon points="68,10 58,10 68,20" fill={strokeColor} />
          </g>
          {/* Text Branding */}
          <text x="95" y="42" fill={strokeColor} fontFamily="Playfair Display, serif" fontSize="22" fontWeight="bold">Drishti Wealth</text>
          <text x="95" y="58" fill={accentColor} fontFamily="DM Sans, sans-serif" fontSize="9" letterSpacing="0.18em" fontWeight="bold">AMFI REGISTERED MFD</text>
        </svg>
      )
    },
    {
      id: 2,
      name: "Concept 2: The Prosperity Lotus (Cultural Elegance)",
      description: "A clean geometric lotus motif. The lotus represents traditional prosperity and wealth (Lakshmi), while the clean modern overlapping lines represent structural asset allocation.",
      philosophy: "Establishes a deep cultural trust combined with ultra-modern premium geometry.",
      svg: (bgColor, strokeColor, accentColor, highlightColor) => (
        <svg className="w-48 h-20" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Logo Mark */}
          <g transform="translate(15, 10)">
            <path d="M40,10 C45,25 40,45 40,50 C40,45 35,25 40,10 Z" fill={highlightColor} />
            <path d="M40,25 C55,30 60,45 55,50 C45,48 45,35 40,25 Z" fill={accentColor} opacity="0.9" />
            <path d="M40,25 C25,30 20,45 25,50 C35,48 35,35 40,25 Z" fill={accentColor} opacity="0.9" />
            <path d="M40,35 C63,40 65,50 60,52 C50,52 45,45 40,35 Z" fill={strokeColor} opacity="0.7" />
            <path d="M40,35 C17,40 15,50 20,52 C30,52 35,45 40,35 Z" fill={strokeColor} opacity="0.7" />
            <path d="M22,52 C30,58 50,58 58,52" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
          </g>
          {/* Text Branding */}
          <text x="95" y="42" fill={strokeColor} fontFamily="Playfair Display, serif" fontSize="22" fontWeight="bold">Drishti Wealth</text>
          <text x="95" y="58" fill={accentColor} fontFamily="DM Sans, sans-serif" fontSize="9" letterSpacing="0.18em" fontWeight="bold">AMFI REGISTERED MFD</text>
        </svg>
      )
    },
    {
      id: 3,
      name: "Concept 3: The Compounding Infinity 'D'",
      description: "A monogram 'D' designed as a continuous infinity loop, representing perpetual compounding returns and generational legacy.",
      philosophy: "Perfect for a wealth advisory focusing on long-term compound interest and life goals.",
      svg: (bgColor, strokeColor, accentColor, highlightColor) => (
        <svg className="w-48 h-20" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Logo Mark */}
          <g transform="translate(15, 10)">
            <path d="M20,12 V48" stroke={strokeColor} strokeWidth="5" strokeLinecap="round" />
            <path d="M20,12 C35,12 55,20 55,30 C55,40 35,48 20,48 C38,48 58,38 58,30 C58,22 38,12 20,12 Z" fill={accentColor} />
            <path d="M30,22 C40,22 46,26 46,30 C46,34 40,38 30,38" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" />
            <circle cx="20" cy="12" r="3.5" fill={highlightColor} />
            <circle cx="20" cy="48" r="3.5" fill={highlightColor} />
          </g>
          {/* Text Branding */}
          <text x="95" y="42" fill={strokeColor} fontFamily="Playfair Display, serif" fontSize="22" fontWeight="bold">Drishti Wealth</text>
          <text x="95" y="58" fill={accentColor} fontFamily="DM Sans, sans-serif" fontSize="9" letterSpacing="0.18em" fontWeight="bold">AMFI REGISTERED MFD</text>
        </svg>
      )
    },
    {
      id: 4,
      name: "Concept 4: The Precision Focus Compass (Aperture)",
      description: "An elegant circular camera lens/compass aperture. Symbolizes targeted financial planning, sharp focus on goals, and crystal-clear clarity.",
      philosophy: "Conveys high intelligence, precision planning, and scientific wealth management.",
      svg: (bgColor, strokeColor, accentColor, highlightColor) => (
        <svg className="w-48 h-20" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Logo Mark */}
          <g transform="translate(20, 15)">
            <circle cx="25" cy="25" r="22" stroke={strokeColor} strokeWidth="3" />
            <path d="M25,3 L25,47" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3 3" />
            <path d="M3,25 L47,25" stroke={accentColor} strokeWidth="1.5" strokeDasharray="3 3" />
            <circle cx="25" cy="25" r="10" stroke={highlightColor} strokeWidth="2.5" />
            <path d="M25,25 L38,12" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" />
            <polygon points="38,12 30,12 38,20" fill={highlightColor} />
          </g>
          {/* Text Branding */}
          <text x="95" y="42" fill={strokeColor} fontFamily="Playfair Display, serif" fontSize="22" fontWeight="bold">Drishti Wealth</text>
          <text x="95" y="58" fill={accentColor} fontFamily="DM Sans, sans-serif" fontSize="9" letterSpacing="0.18em" fontWeight="bold">AMFI REGISTERED MFD</text>
        </svg>
      )
    },
    {
      id: 5,
      name: "Concept 5: The Shield of Trust & Charts",
      description: "A premium corporate shield built of three vertical compounding chart bars that curve inwards to form a protecting silhouette.",
      philosophy: "Communicates safety, wealth preservation, and risk management, crucial for retirement and insurance planning.",
      svg: (bgColor, strokeColor, accentColor, highlightColor) => (
        <svg className="w-48 h-20" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Logo Mark */}
          <g transform="translate(20, 12)">
            <path d="M12,10 C25,8 35,10 40,14 C45,10 55,8 68,10 C65,30 52,48 40,54 C28,48 15,30 12,10 Z" stroke={strokeColor} strokeWidth="3.5" strokeLinejoin="round" fill="none" />
            {/* Chart Bars */}
            <rect x="23" y="28" width="6" height="16" rx="2" fill={accentColor} />
            <rect x="33" y="22" width="6" height="22" rx="2" fill={highlightColor} />
            <rect x="43" y="16" width="6" height="28" rx="2" fill={strokeColor} />
          </g>
          {/* Text Branding */}
          <text x="95" y="42" fill={strokeColor} fontFamily="Playfair Display, serif" fontSize="22" fontWeight="bold">Drishti Wealth</text>
          <text x="95" y="58" fill={accentColor} fontFamily="DM Sans, sans-serif" fontSize="9" letterSpacing="0.18em" fontWeight="bold">AMFI REGISTERED MFD</text>
        </svg>
      )
    },
    {
      id: 6,
      name: "Concept 6: The Golden Sunburst (Radiant Dawn)",
      description: "A geometric sunburst made of radiating bars forming a circular rising sun, representing positive growth, warmth, clarity of vision, and bright future.",
      philosophy: "Evokes optimism, new horizons, and holistic wealth expansion.",
      svg: (bgColor, strokeColor, accentColor, highlightColor) => (
        <svg className="w-48 h-20" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Logo Mark */}
          <g transform="translate(20, 12)">
            <circle cx="25" cy="28" r="8" fill={highlightColor} />
            {/* Sun rays of compounding heights */}
            <line x1="25" y1="14" x2="25" y2="8" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="37" y1="20" x2="43" y2="15" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="42" y1="32" x2="48" y2="35" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="13" y1="20" x2="7" y2="15" stroke={accentColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="8" y1="32" x2="2" y2="35" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="17" y1="42" x2="13" y2="48" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" />
            <line x1="33" y1="42" x2="37" y2="48" stroke={highlightColor} strokeWidth="3" strokeLinecap="round" />
          </g>
          {/* Text Branding */}
          <text x="95" y="42" fill={strokeColor} fontFamily="Playfair Display, serif" fontSize="22" fontWeight="bold">Drishti Wealth</text>
          <text x="95" y="58" fill={accentColor} fontFamily="DM Sans, sans-serif" fontSize="9" letterSpacing="0.18em" fontWeight="bold">AMFI REGISTERED MFD</text>
        </svg>
      )
    },
    {
      id: 7,
      name: "Concept 7: The Royal Monogram DW",
      description: "An elegant serif ligature intersecting the letters 'D' and 'W'. Highlights Drishti Wealth's prestige and 15+ years establishment.",
      philosophy: "Perfect for high-net-worth (HNI) and elite NRI client-facing portals, offering classic prestige.",
      svg: (bgColor, strokeColor, accentColor, highlightColor) => (
        <svg className="w-48 h-20" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Logo Mark */}
          <g transform="translate(18, 8)">
            <text x="5" y="42" fill={strokeColor} fontFamily="Playfair Display, serif" fontSize="38" fontWeight="bold" letterSpacing="-0.08em">D</text>
            <text x="26" y="46" fill={highlightColor} fontFamily="Playfair Display, serif" fontSize="28" fontWeight="bold" opacity="0.9">W</text>
            <path d="M12,46 L48,46" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" />
          </g>
          {/* Text Branding */}
          <text x="95" y="42" fill={strokeColor} fontFamily="Playfair Display, serif" fontSize="22" fontWeight="bold">Drishti Wealth</text>
          <text x="95" y="58" fill={accentColor} fontFamily="DM Sans, sans-serif" fontSize="9" letterSpacing="0.18em" fontWeight="bold">AMFI REGISTERED MFD</text>
        </svg>
      )
    },
    {
      id: 8,
      name: "Concept 8: The Soaring Phoenix (Rising Wings)",
      description: "Three overlapping curved paths that sweep upwards in a wing silhouette. Symbolizes rising portfolio valuations and NRI global reach.",
      philosophy: "Conveys rapid upward momentum, dynamic energy, and global perspective.",
      svg: (bgColor, strokeColor, accentColor, highlightColor) => (
        <svg className="w-48 h-20" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Logo Mark */}
          <g transform="translate(15, 10)">
            <path d="M15,45 C20,25 35,15 55,10 C45,22 42,35 45,45 Z" fill={highlightColor} />
            <path d="M25,48 C30,32 42,24 58,20 C50,30 48,40 50,48 Z" fill={accentColor} opacity="0.85" />
            <path d="M35,51 C38,40 48,34 62,30 C55,38 54,46 55,51 Z" fill={strokeColor} opacity="0.7" />
          </g>
          {/* Text Branding */}
          <text x="95" y="42" fill={strokeColor} fontFamily="Playfair Display, serif" fontSize="22" fontWeight="bold">Drishti Wealth</text>
          <text x="95" y="58" fill={accentColor} fontFamily="DM Sans, sans-serif" fontSize="9" letterSpacing="0.18em" fontWeight="bold">AMFI REGISTERED MFD</text>
        </svg>
      )
    },
    {
      id: 9,
      name: "Concept 9: The Zen Wealth Cycle (Sprout)",
      description: "An elegant, circular open stroke encapsulating a growing financial sprout. Represents peace of mind, sustainable organic growth, and asset security.",
      philosophy: "Evokes the calmness of financial freedom, simplicity, and natural progression.",
      svg: (bgColor, strokeColor, accentColor, highlightColor) => (
        <svg className="w-48 h-20" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Logo Mark */}
          <g transform="translate(20, 14)">
            <path d="M42,25 C42,12 30,3 18,5 C8,7 2,17 3,28 C4,38 15,46 27,43 C36,41 42,32 42,25" stroke={strokeColor} strokeWidth="3" strokeLinecap="round" strokeDasharray="110 15" fill="none" />
            <path d="M18,34 C18,25 24,18 28,14 C25,18 23,24 23,34 Z" fill={highlightColor} />
            <path d="M23,34 C23,26 17,20 13,17 C16,21 18,26 18,34 Z" fill={accentColor} />
          </g>
          {/* Text Branding */}
          <text x="95" y="42" fill={strokeColor} fontFamily="Playfair Display, serif" fontSize="22" fontWeight="bold">Drishti Wealth</text>
          <text x="95" y="58" fill={accentColor} fontFamily="DM Sans, sans-serif" fontSize="9" letterSpacing="0.18em" fontWeight="bold">AMFI REGISTERED MFD</text>
        </svg>
      )
    },
    {
      id: 10,
      name: "Concept 10: The Pillar of Trust (Legacy Stability)",
      description: "A geometric, modern pillar constructed of three bar-chart blocks. It expresses heritage, structural stability, and AMFI registered security.",
      philosophy: "Perfect for displaying institutional strength and structural financial security.",
      svg: (bgColor, strokeColor, accentColor, highlightColor) => (
        <svg className="w-48 h-20" viewBox="0 0 300 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Logo Mark */}
          <g transform="translate(20, 12)">
            {/* Top lintel */}
            <path d="M12,12 H48 V16 H12 Z" fill={strokeColor} />
            {/* 3 Pillars as charts */}
            <rect x="16" y="20" width="6" height="24" fill={accentColor} />
            <rect x="27" y="24" width="6" height="20" fill={highlightColor} />
            <rect x="38" y="18" width="6" height="26" fill={strokeColor} />
            {/* Base */}
            <path d="M10,48 H50 V51 H10 Z" fill={strokeColor} />
          </g>
          {/* Text Branding */}
          <text x="95" y="42" fill={strokeColor} fontFamily="Playfair Display, serif" fontSize="22" fontWeight="bold">Drishti Wealth</text>
          <text x="95" y="58" fill={accentColor} fontFamily="DM Sans, sans-serif" fontSize="9" letterSpacing="0.18em" fontWeight="bold">AMFI REGISTERED MFD</text>
        </svg>
      )
    }
  ];

  // Colors based on theme toggling
  // Dark mode (Navy background): Navy='#0d2545', Gold='#c9922a', LightGold='#f0c96a', Cream='#faf8f4'
  const strokeColor = isDarkMode ? '#faf8f4' : '#0d2545';
  const bgColor = isDarkMode ? '#0d2545' : '#faf8f4';
  const accentColor = '#c9922a';
  const highlightColor = '#f0c96a';

  return (
    <div className={`min-h-screen transition-colors duration-300 font-sans ${isDarkMode ? 'bg-[#0d2545] text-[#faf8f4]' : 'bg-[#faf8f4] text-[#0d2545]'}`}>
      
      {/* Header */}
      <header className="border-b border-opacity-10 border-gray-500 py-6 px-6 max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 text-sm font-medium hover:opacity-85 transition-opacity">
          <ArrowLeft className="w-4 h-4" /> Back to Website
        </Link>
        <h1 className="font-serif text-2xl font-bold">Logo Concepts Pitch</h1>
        <button 
          onClick={() => setIsDarkMode(!isDarkMode)} 
          className="flex items-center gap-2 px-4 py-2 rounded-full border border-opacity-20 border-gray-500 hover:bg-black hover:bg-opacity-5 transition-all text-xs font-semibold"
        >
          {isDarkMode ? (
            <>
              <Sun className="w-4 h-4 text-[#f0c96a]" /> Preview Light Mode
            </>
          ) : (
            <>
              <Moon className="w-4 h-4" /> Preview Dark Mode
            </>
          )}
        </button>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="text-center mb-12 max-w-2xl mx-auto">
          <span className="text-xs uppercase tracking-[0.2em] text-[#c9922a] font-bold">Concept Showcase</span>
          <h2 className="font-serif text-4xl font-semibold mt-2 mb-4">10 Premium Logo Concepts</h2>
          <p className="opacity-80 text-sm leading-relaxed">
            We designed these concepts specifically for Drishti Wealth. They integrate the navy-and-gold aesthetic, traditional financial motifs, and contemporary visual designs. Click on any design to select it as your candidate.
          </p>
        </div>

        {/* Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {logoConcepts.map((concept) => {
            const isSelected = selectedLogo === concept.id;
            return (
              <div 
                key={concept.id}
                onClick={() => setSelectedLogo(concept.id)}
                className={`border rounded-2xl p-6 transition-all duration-300 cursor-pointer flex flex-col justify-between ${
                  isSelected 
                    ? 'border-[#c9922a] shadow-[0_0_15px_rgba(201,146,42,0.25)] scale-[1.01]' 
                    : 'border-opacity-10 border-gray-500 hover:border-opacity-30'
                }`}
              >
                <div>
                  {/* Title & Selection indicator */}
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="font-serif text-lg font-bold">{concept.name}</h3>
                    <div className={`w-6 h-6 rounded-full border flex items-center justify-center transition-all ${
                      isSelected ? 'bg-[#c9922a] border-[#c9922a]' : 'border-opacity-30 border-gray-500'
                    }`}>
                      {isSelected && <Check className="w-4 h-4 text-white" />}
                    </div>
                  </div>

                  {/* Logo Render Container */}
                  <div className={`rounded-xl p-8 flex items-center justify-center mb-6 shadow-inner ${
                    isDarkMode ? 'bg-[#163359] border border-white border-opacity-5' : 'bg-white border border-gray-100'
                  }`}>
                    {concept.svg(bgColor, strokeColor, accentColor, highlightColor)}
                  </div>

                  {/* Description */}
                  <p className="text-sm opacity-90 leading-relaxed mb-4">{concept.description}</p>
                </div>

                {/* Design Philosophy tag */}
                <div className="mt-4 pt-4 border-t border-opacity-10 border-gray-500 flex items-start gap-2 bg-black bg-opacity-5 p-3 rounded-lg">
                  <Info className="w-4 h-4 text-[#c9922a] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="text-[11px] font-bold uppercase tracking-wider text-[#c9922a]">Design Philosophy</span>
                    <p className="text-xs opacity-75 mt-0.5">{concept.philosophy}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Logo Action Box */}
        {selectedLogo && (
          <div className="mt-16 p-8 rounded-2xl border border-[#c9922a] bg-black bg-opacity-10 text-center max-w-xl mx-auto">
            <span className="text-xs uppercase tracking-widest text-[#c9922a] font-bold">Your Current Favorite</span>
            <h3 className="font-serif text-2xl font-bold mt-2 mb-4">
              {logoConcepts.find(c => c.id === selectedLogo)?.name}
            </h3>
            <p className="text-xs opacity-80 mb-6">
              Copy this option name and let me know in the chat if you'd like to finalize this design or customize it further!
            </p>
            <button 
              onClick={() => alert(`Great choice! Copy this concept name: "${logoConcepts.find(c => c.id === selectedLogo)?.name}" and let me know in the chat.`)}
              className="bg-[#c9922a] hover:bg-[#f0c96a] text-white font-medium px-8 py-3 rounded-lg transition-colors text-sm shadow-md cursor-pointer"
            >
              Select & Tell Agent
            </button>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-opacity-10 border-gray-500 py-8 text-center text-xs opacity-60">
        &copy; {new Date().getFullYear()} Drishti Wealth &middot; Conceptualized Logo Designs
      </footer>
    </div>
  );
}
