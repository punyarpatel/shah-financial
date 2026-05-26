import React from 'react';

const TrustBar = () => {
  const trustItems = [
    'AMFI Reg: ARN',
    'SBI Mutual Fund',
    'HDFC Mutual Fund',
    'ICICI Prudential',
    'Nippon India',
    'NJ Wealth Partner',
    'Prudent Partner'
  ];

  // Repeat the core items to ensure they fill the screen, then duplicate exactly once 
  // to create the two identical halves needed for the -50% translation loop.
  const baseItems = [...trustItems, ...trustItems, ...trustItems];
  const marqueeContent = [...baseItems, ...baseItems];

  return (
    <div className="w-full bg-white border-b border-navy/10 py-[1rem] overflow-hidden relative flex whitespace-nowrap">
      {/* Edge Fades for a premium look */}
      <div className="absolute left-0 top-0 bottom-0 w-[40px] md:w-[120px] bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-[40px] md:w-[120px] bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Marquee Container */}
      <div className="animate-marquee flex flex-row items-center w-max">
        {marqueeContent.map((item, idx) => (
          <div key={idx} className="flex flex-row items-center gap-[8px] mx-[2rem] sm:mx-[3.5rem] shrink-0">
            {/* SVG Checkmark/Shield Icon */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="w-[16px] h-[16px] opacity-60 text-navy shrink-0"
            >
              <path
                fillRule="evenodd"
                d="M12.516 2.17a.75.75 0 00-1.032 0 11.209 11.209 0 01-7.877 3.08.75.75 0 00-.722.515A12.74 12.74 0 002.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 00.374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 00-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08zm3.094 8.016a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                clipRule="evenodd"
              />
            </svg>

            <span className="text-navy text-[12px] sm:text-[13px] font-semibold tracking-[0.03em] leading-tight">
              {item}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBar;
