import React from 'react';

// 1. LIC of India Logo
const LicLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <rect x="0" y="0" width="32" height="32" rx="4" fill="#0054A6" />
      {/* LIC Hands protecting flame symbol */}
      <circle cx="16" cy="11" r="3.5" fill="#FCE303" />
      <path d="M 9 22 C 9 15, 14 14, 16 14 C 18 14, 23 15, 23 22 Z" fill="#FCE303" opacity="0.9" />
      <path d="M 7 24 C 11 20, 21 20, 25 24 L 23 27 C 18 24, 14 24, 9 27 Z" fill="#FCE303" />
    </g>
    <text x="42" y="22" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="17" fill="#0054A6" letterSpacing="-0.02em">LIC</text>
    <text x="74" y="22" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="10" fill="#CA922A" letterSpacing="0.06em">OF INDIA</text>
  </svg>
);

// 2. ICICI Prudential Life Insurance Logo
const IciciPruLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <circle cx="16" cy="16" r="14" fill="#800020" />
      <path d="M 8 16 C 8 10, 14 8, 20 12" stroke="#F99D27" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 12 21 C 16 23, 22 20, 24 16" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" fill="none" />
    </g>
    <text x="42" y="18" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="12" fill="#800020" letterSpacing="-0.01em">ICICI PRUDENTIAL</text>
    <text x="42" y="29" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="9" fill="#005B75" letterSpacing="0.05em" style={{ textTransform: 'uppercase' }}>Life Insurance</text>
  </svg>
);

// 3. Tata AIA Life Insurance Logo
const TataAiaLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <rect x="0" y="0" width="32" height="32" rx="4" fill="#005A9C" />
      <polygon points="16,6 26,26 6,26" fill="#D32F2F" />
      <polygon points="16,11 22,23 10,23" fill="#FFFFFF" />
    </g>
    <text x="42" y="19" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="13" fill="#005A9C" letterSpacing="0.04em">TATA AIA</text>
    <text x="42" y="30" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="9" fill="#D32F2F" letterSpacing="0.04em" style={{ textTransform: 'uppercase' }}>LIFE INSURANCE</text>
  </svg>
);

// 4. HDFC Life Logo
const HdfcLifeLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <rect x="1" y="1" width="30" height="30" rx="3" stroke="#004C8F" strokeWidth="2" fill="none" />
      <rect x="11" y="11" width="10" height="10" fill="#004C8F" />
      <polygon points="4,4 10,4 10,6 6,6 6,10 4,10" fill="#ED232A" />
      <polygon points="28,4 22,4 22,6 26,6 26,10 28,10" fill="#ED232A" />
      <polygon points="4,28 10,28 10,26 6,26 6,22 4,22" fill="#ED232A" />
      <polygon points="28,28 22,28 22,26 26,26 26,22 28,22" fill="#ED232A" />
    </g>
    <text x="42" y="24" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="14" fill="#004C8F" letterSpacing="-0.02em">HDFC</text>
    <text x="84" y="24" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="14" fill="#ED232A" letterSpacing="-0.02em">LIFE</text>
  </svg>
);

// 5. Bajaj Life Insurance Logo
const BajajLifeLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <path d="M 6 4 L 16 2 L 26 4 L 26 18 C 26 24, 21 28, 16 30 C 11 28, 6 24, 6 18 Z" fill="#004DA8" />
      <path d="M 11 11 L 16 13 L 21 11 M 11 17 L 16 19 L 21 17 M 16 13 L 16 24" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
    <text x="42" y="18" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="12" fill="#004DA8" letterSpacing="0.03em">BAJAJ Allianz</text>
    <text x="42" y="29" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="9" fill="#5C687E" letterSpacing="0.06em" style={{ textTransform: 'uppercase' }}>Life Insurance</text>
  </svg>
);

// 6. HDFC Ergo Logo
const HdfcErgoLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <rect x="1" y="1" width="30" height="30" rx="3" stroke="#004C8F" strokeWidth="2" fill="none" />
      <rect x="11" y="11" width="10" height="10" fill="#004C8F" />
      <polygon points="4,4 10,4 10,6 6,6 6,10 4,10" fill="#ED232A" />
      <polygon points="28,4 22,4 22,6 26,6 26,10 28,10" fill="#ED232A" />
      <polygon points="4,28 10,28 10,26 6,26 6,22 4,22" fill="#ED232A" />
      <polygon points="28,28 22,28 22,26 26,26 26,22 28,22" fill="#ED232A" />
    </g>
    <text x="42" y="24" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="13" fill="#004C8F" letterSpacing="-0.02em">HDFC</text>
    <text x="84" y="24" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="13" fill="#EE0138" letterSpacing="-0.02em">ERGO</text>
  </svg>
);

// 7. ICICI Lombard Logo
const IciciLombardLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <circle cx="16" cy="16" r="14" stroke="#F99D27" strokeWidth="3" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="16" r="9" stroke="#800020" strokeWidth="2.5" fill="none" />
      <circle cx="16" cy="16" r="3.5" fill="#800020" />
    </g>
    <text x="42" y="19" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="13" fill="#800020" letterSpacing="-0.01em">ICICI</text>
    <text x="42" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="10" fill="#005B75" letterSpacing="0.05em" style={{ textTransform: 'uppercase' }}>Lombard</text>
  </svg>
);

// 8. Tata AIG Logo
const TataAigLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <circle cx="16" cy="16" r="14" fill="#005A9C" />
      <path d="M 16 6 C 12 11, 10 18, 11.5 24 C 13.5 18, 15.5 12, 16 6 Z" fill="white" />
      <path d="M 16 6 C 20 11, 22 18, 20.5 24 C 18.5 18, 16.5 12, 16 6 Z" fill="white" />
    </g>
    <text x="42" y="20" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="13" fill="#005A9C" letterSpacing="0.04em">TATA AIG</text>
    <text x="42" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="8" fill="#5C687E" letterSpacing="0.12em" style={{ textTransform: 'uppercase' }}>Insurance</text>
  </svg>
);

// 9. GoDigit Logo
const GoDigitLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <circle cx="16" cy="16" r="14" fill="#24D366" fillOpacity="0.15" />
      <circle cx="16" cy="16" r="10" fill="#24D366" />
      <path d="M 11 16 L 15 20 L 21 13" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
    <text x="42" y="25" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="20" fill="#0D2545" letterSpacing="-0.03em">digit</text>
    <circle cx="73" cy="13.5" r="2.5" fill="#24D366" />
  </svg>
);

// 10. IndusInd Bank / Insurance Partner Logo
const IndusIndLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <rect x="0" y="0" width="32" height="32" rx="4" fill="#800020" />
      {/* Zebu Bull emblem outline */}
      <path d="M 8 20 C 8 14, 12 10, 16 10 C 20 10, 24 14, 24 20 L 22 22 L 10 22 Z" fill="#FFFFFF" />
      <circle cx="16" cy="14" r="2" fill="#800020" />
    </g>
    <text x="42" y="20" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="14" fill="#800020" letterSpacing="-0.01em">IndusInd</text>
    <text x="42" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="8" fill="#005B75" letterSpacing="0.08em" style={{ textTransform: 'uppercase' }}>PARTNER INSURER</text>
  </svg>
);

// 11. Bajaj General Insurance Logo
const BajajGeneralLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <path d="M 6 4 L 16 2 L 26 4 L 26 18 C 26 24, 21 28, 16 30 C 11 28, 6 24, 6 18 Z" fill="#004DA8" />
      <path d="M 11 11 L 16 13 L 21 11 M 11 17 L 16 19 L 21 17 M 16 13 L 16 24" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
    <text x="42" y="18" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="12" fill="#004DA8" letterSpacing="0.03em">BAJAJ Allianz</text>
    <text x="42" y="29" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="9" fill="#003781" letterSpacing="0.04em" style={{ textTransform: 'uppercase' }}>General Insurance</text>
  </svg>
);

// 12. Edelweiss Zuno General Insurance Logo
const ZunoLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="zunoGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF2E93" />
        <stop offset="100%" stopColor="#FF8A00" />
      </linearGradient>
    </defs>
    <g transform="translate(4, 4)">
      <circle cx="16" cy="16" r="14" fill="url(#zunoGrad2)" />
      <path d="M 10 11 L 22 11 L 10 21 L 22 21" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
    <text x="42" y="14" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="8" fill="#7A8293" letterSpacing="0.08em" style={{ textTransform: 'uppercase' }}>EDELWEISS</text>
    <text x="42" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="18" fill="url(#zunoGrad2)" letterSpacing="-0.03em">zuno</text>
  </svg>
);

// 13. Niva Bupa Health Insurance Logo
const NivaBupaLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <circle cx="16" cy="16" r="14" fill="#0A3C6B" />
      <path d="M 10 16 L 14 20 L 22 12" stroke="#FF4D4D" strokeWidth="2.8" strokeLinecap="round" fill="none" />
    </g>
    <text x="42" y="25" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="16" fill="#0A3C6B" letterSpacing="-0.02em">niva</text>
    <text x="80" y="25" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="16" fill="#FF4D4D" letterSpacing="-0.02em">bupa</text>
  </svg>
);

// 14. Star Health Insurance Logo
const StarHealthLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <circle cx="16" cy="16" r="14" fill="#005EA6" />
      <polygon points="16,7 18.8,12.5 25,13.5 20.5,18 21.8,24 16,21 10.2,24 11.5,18 7,13.5 13.2,12.5" fill="white" />
    </g>
    <text x="42" y="20" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="14" fill="#005EA6" letterSpacing="0.05em">STAR</text>
    <text x="42" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="8" fill="#5C687E" letterSpacing="0.08em" style={{ textTransform: 'uppercase' }}>Health Insurance</text>
  </svg>
);

// 15. Care Health Insurance Logo
const CareHealthLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(4, 4)">
      <rect x="2" y="2" width="28" height="28" rx="7" fill="#00A2A6" />
      <path d="M 10 16 Q 16 10, 22 16" stroke="white" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="16" cy="20" r="3.5" fill="white" />
    </g>
    <text x="42" y="20" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="15" fill="#00A2A6" letterSpacing="0.02em">care</text>
    <text x="42" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="8" fill="#5C687E" letterSpacing="0.08em" style={{ textTransform: 'uppercase' }}>Health Insurance</text>
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
