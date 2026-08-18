import React from 'react';

// 1. LIC of India Official Logo
const LicLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      {/* Official LIC Deep Blue Rectangle Container */}
      <rect x="0" y="0" width="36" height="36" rx="4" fill="#0054A6" />
      {/* Yellow Flame & Protecting Hands Symbol */}
      <circle cx="18" cy="12" r="4" fill="#FCE303" />
      <path d="M 10 24 C 10 16, 16 15, 18 15 C 20 15, 26 16, 26 24 Z" fill="#FCE303" opacity="0.9" />
      <path d="M 7 26 C 12 21, 24 21, 29 26 L 27 30 C 21 26, 15 26, 9 30 Z" fill="#FCE303" />
    </g>
    <text x="44" y="24" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="18" fill="#0054A6" letterSpacing="-0.02em">LIC</text>
    <text x="78" y="24" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="10" fill="#CA922A" letterSpacing="0.06em">OF INDIA</text>
    <text x="44" y="34" fontFamily="Inter, system-ui, sans-serif" fontWeight="600" fontSize="7.5" fill="#5C687E" letterSpacing="0.02em">भारतीय जीवन बीमा निगम</text>
  </svg>
);

// 2. ICICI Prudential Life Insurance Official Logo
const IciciPruLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      {/* Official ICICI Maroon Box with Orange Swoosh */}
      <rect x="0" y="0" width="36" height="36" rx="4" fill="#800020" />
      <path d="M 8 18 C 8 10, 16 8, 24 14" stroke="#F99D27" strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 12 24 C 18 26, 26 22, 28 17" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="18" cy="18" r="3.5" fill="#F99D27" />
    </g>
    <text x="44" y="19" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="12" fill="#800020" letterSpacing="-0.01em">ICICI PRUDENTIAL</text>
    <text x="44" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="9.5" fill="#005B75" letterSpacing="0.06em" style={{ textTransform: 'uppercase' }}>LIFE INSURANCE</text>
  </svg>
);

// 3. Tata AIA Life Insurance Official Logo
const TataAiaLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      {/* TATA Blue Rhombus + AIA Red Triangle */}
      <rect x="0" y="0" width="18" height="36" rx="3" fill="#005A9C" />
      <text x="9" y="23" fontFamily="Inter, sans-serif" fontWeight="900" fontSize="8" fill="white" textAnchor="middle">TATA</text>
      <rect x="18" y="0" width="18" height="36" rx="3" fill="#D32F2F" />
      <polygon points="27,8 33,28 21,28" fill="white" />
      <polygon points="27,14 31,26 23,26" fill="#D32F2F" />
    </g>
    <text x="44" y="20" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="13.5" fill="#005A9C" letterSpacing="0.04em">TATA AIA</text>
    <text x="44" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="8.5" fill="#D32F2F" letterSpacing="0.06em" style={{ textTransform: 'uppercase' }}>LIFE INSURANCE</text>
  </svg>
);

// 4. HDFC Life Official Logo
const HdfcLifeLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      {/* HDFC Red/Navy Square Emblem */}
      <rect x="1" y="1" width="34" height="34" rx="3" stroke="#004C8F" strokeWidth="2" fill="none" />
      <rect x="12" y="12" width="12" height="12" fill="#004C8F" />
      <polygon points="4,4 11,4 11,6 6,6 6,11 4,11" fill="#ED232A" />
      <polygon points="32,4 25,4 25,6 30,6 30,11 32,11" fill="#ED232A" />
      <polygon points="4,32 11,32 11,30 6,30 6,25 4,25" fill="#ED232A" />
      <polygon points="32,32 25,32 25,30 30,30 30,25 32,25" fill="#ED232A" />
    </g>
    <text x="44" y="23" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="14" fill="#004C8F" letterSpacing="-0.02em">HDFC</text>
    <text x="86" y="23" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="14" fill="#ED232A" letterSpacing="-0.02em">LIFE</text>
    <text x="44" y="33" fontFamily="Inter, system-ui, sans-serif" fontWeight="600" fontSize="7.5" fill="#5C687E" letterSpacing="0.04em">Sar Utha Ke Jiyo</text>
  </svg>
);

// 5. Bajaj Life Insurance Official Logo
const BajajLifeLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      {/* Bajaj Blue Shield Emblem */}
      <path d="M 6 4 L 18 2 L 30 4 L 30 20 C 30 27, 24 32, 18 34 C 12 32, 6 27, 6 20 Z" fill="#004DA8" />
      <path d="M 12 12 L 18 15 L 24 12 M 12 19 L 18 22 L 24 19 M 18 15 L 18 27" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </g>
    <text x="44" y="19" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="12.5" fill="#004DA8" letterSpacing="0.03em">BAJAJ Allianz</text>
    <text x="44" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="9" fill="#003781" letterSpacing="0.06em" style={{ textTransform: 'uppercase' }}>LIFE INSURANCE</text>
  </svg>
);

// 6. HDFC ERGO General Insurance Official Logo
const HdfcErgoLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      <rect x="1" y="1" width="34" height="34" rx="3" stroke="#004C8F" strokeWidth="2" fill="none" />
      <rect x="12" y="12" width="12" height="12" fill="#004C8F" />
      <polygon points="4,4 11,4 11,6 6,6 6,11 4,11" fill="#ED232A" />
      <polygon points="32,4 25,4 25,6 30,6 30,11 32,11" fill="#ED232A" />
      <polygon points="4,32 11,32 11,30 6,30 6,25 4,25" fill="#ED232A" />
      <polygon points="32,32 25,32 25,30 30,30 30,25 32,25" fill="#ED232A" />
    </g>
    <text x="44" y="23" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="13.5" fill="#004C8F" letterSpacing="-0.02em">HDFC</text>
    <text x="86" y="23" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="13.5" fill="#EE0138" letterSpacing="-0.02em">ERGO</text>
    <text x="44" y="33" fontFamily="Inter, system-ui, sans-serif" fontWeight="600" fontSize="7.5" fill="#5C687E" letterSpacing="0.04em">GENERAL INSURANCE</text>
  </svg>
);

// 7. ICICI Lombard General Insurance Official Logo
const IciciLombardLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      <circle cx="18" cy="18" r="16" stroke="#F99D27" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <circle cx="18" cy="18" r="10" stroke="#800020" strokeWidth="2.5" fill="none" />
      <circle cx="18" cy="18" r="4" fill="#800020" />
    </g>
    <text x="44" y="19" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="13.5" fill="#800020" letterSpacing="-0.01em">ICICI</text>
    <text x="44" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="10.5" fill="#005B75" letterSpacing="0.05em" style={{ textTransform: 'uppercase' }}>Lombard</text>
  </svg>
);

// 8. TATA AIG General Insurance Official Logo
const TataAigLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      <circle cx="18" cy="18" r="16" fill="#005A9C" />
      <path d="M 18 6 C 13 12, 11 20, 13 27 C 15 20, 17.5 13, 18 6 Z" fill="white" />
      <path d="M 18 6 C 23 12, 25 20, 23 27 C 21 20, 18.5 13, 18 6 Z" fill="white" />
    </g>
    <text x="44" y="20" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="13.5" fill="#005A9C" letterSpacing="0.04em">TATA AIG</text>
    <text x="44" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="8.5" fill="#5C687E" letterSpacing="0.1em" style={{ textTransform: 'uppercase' }}>INSURANCE</text>
  </svg>
);

// 9. Go Digit (digit.) Official Logo
const GoDigitLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      <circle cx="18" cy="18" r="16" fill="#24D366" fillOpacity="0.15" />
      <circle cx="18" cy="18" r="11" fill="#24D366" />
      <path d="M 12 18 L 16 22 L 23 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
    <text x="44" y="26" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="22" fill="#0D2545" letterSpacing="-0.03em">digit</text>
    <circle cx="78" cy="13.5" r="2.8" fill="#24D366" />
  </svg>
);

// 10. IndusInd Bank / Partner Insurance Official Logo
const IndusIndLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      <rect x="0" y="0" width="36" height="36" rx="4" fill="#800020" />
      {/* Indus Zebu Bull Emblem */}
      <path d="M 9 22 C 9 15, 13 11, 18 11 C 23 11, 27 15, 27 22 L 25 24 L 11 24 Z" fill="#FFFFFF" />
      <circle cx="18" cy="15" r="2" fill="#800020" />
    </g>
    <text x="44" y="20" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="14.5" fill="#800020" letterSpacing="-0.01em">IndusInd</text>
    <text x="44" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="8" fill="#005B75" letterSpacing="0.08em" style={{ textTransform: 'uppercase' }}>PARTNER INSURER</text>
  </svg>
);

// 11. Bajaj General Insurance Official Logo
const BajajGeneralLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      <path d="M 6 4 L 18 2 L 30 4 L 30 20 C 30 27, 24 32, 18 34 C 12 32, 6 27, 6 20 Z" fill="#004DA8" />
      <path d="M 12 12 L 18 15 L 24 12 M 12 19 L 18 22 L 24 19 M 18 15 L 18 27" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </g>
    <text x="44" y="19" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="12.5" fill="#004DA8" letterSpacing="0.03em">BAJAJ Allianz</text>
    <text x="44" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="9" fill="#003781" letterSpacing="0.04em" style={{ textTransform: 'uppercase' }}>GENERAL INSURANCE</text>
  </svg>
);

// 12. Edelweiss Zuno General Insurance Official Logo
const ZunoLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="zunoGradOfficial" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF2E93" />
        <stop offset="100%" stopColor="#FF8A00" />
      </linearGradient>
    </defs>
    <g transform="translate(2, 3)">
      <circle cx="18" cy="18" r="16" fill="url(#zunoGradOfficial)" />
      <path d="M 11 12 L 25 12 L 11 24 L 25 24" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
    <text x="44" y="14" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="8" fill="#7A8293" letterSpacing="0.08em" style={{ textTransform: 'uppercase' }}>EDELWEISS</text>
    <text x="44" y="32" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="19" fill="url(#zunoGradOfficial)" letterSpacing="-0.03em">zuno</text>
  </svg>
);

// 13. Niva Bupa Health Insurance Official Logo
const NivaBupaLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      <circle cx="18" cy="18" r="16" fill="#0A3C6B" />
      <path d="M 11 18 L 15 22 L 25 13" stroke="#FF4D4D" strokeWidth="3" strokeLinecap="round" fill="none" />
    </g>
    <text x="44" y="26" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="17" fill="#0A3C6B" letterSpacing="-0.02em">niva</text>
    <text x="82" y="26" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="17" fill="#FF4D4D" letterSpacing="-0.02em">bupa</text>
  </svg>
);

// 14. Star Health Insurance Official Logo
const StarHealthLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      <circle cx="18" cy="18" r="16" fill="#005EA6" />
      <polygon points="18,8 21,14 27.5,15 22.5,20 24,26.5 18,23 12,26.5 13.5,20 8.5,15 15,14" fill="white" />
    </g>
    <text x="44" y="20" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="14.5" fill="#005EA6" letterSpacing="0.05em">STAR</text>
    <text x="44" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="8.5" fill="#5C687E" letterSpacing="0.08em" style={{ textTransform: 'uppercase' }}>Health Insurance</text>
  </svg>
);

// 15. Care Health Insurance Official Logo
const CareHealthLogo = () => (
  <svg viewBox="0 0 170 42" className="h-9 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(2, 3)">
      <rect x="2" y="2" width="32" height="32" rx="8" fill="#00A2A6" />
      <path d="M 11 18 Q 18 11, 25 18" stroke="white" strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <circle cx="18" cy="22" r="3.5" fill="white" />
    </g>
    <text x="44" y="20" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="15.5" fill="#00A2A6" letterSpacing="0.02em">care</text>
    <text x="44" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="8.5" fill="#5C687E" letterSpacing="0.08em" style={{ textTransform: 'uppercase' }}>HEALTH INSURANCE</text>
  </svg>
);

const InsurerLogo = ({ name }) => {
  switch (name) {
    case 'LIC of India':
    case 'LIC':
      return <LicLogo />;
    case 'ICICI Prudential Life':
    case 'ICICI Prudential':
      return <IciciPruLogo />;
    case 'Tata AIA':
    case 'Tata AIA Life':
      return <TataAiaLogo />;
    case 'HDFC Life':
      return <HdfcLifeLogo />;
    case 'Bajaj Life':
    case 'Bajaj Allianz Life':
      return <BajajLifeLogo />;
    case 'HDFC Ergo':
    case 'HDFC ERGO':
      return <HdfcErgoLogo />;
    case 'ICICI Lombard':
      return <IciciLombardLogo />;
    case 'Tata AIG':
    case 'TATA AIG':
      return <TataAigLogo />;
    case 'Go Digit':
    case 'GoDigit':
    case 'Digit':
      return <GoDigitLogo />;
    case 'IndusInd':
    case 'IndusInd Bank':
      return <IndusIndLogo />;
    case 'Bajaj General':
    case 'Bajaj Allianz General':
      return <BajajGeneralLogo />;
    case 'Edelweiss Zuno':
    case 'Zuno':
      return <ZunoLogo />;
    case 'Niva Bupa':
    case 'Niva Bupa Star':
      return <NivaBupaLogo />;
    case 'Star Health':
    case 'Star':
      return <StarHealthLogo />;
    case 'Care Health':
    case 'Care':
      return <CareHealthLogo />;
    default:
      return <span className="font-semibold text-navy">{name}</span>;
  }
};

export default InsurerLogo;
