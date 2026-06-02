import React from 'react';

const HdfcErgoLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(5, 5)">
      <rect x="1" y="1" width="28" height="28" rx="2" stroke="#004C8F" strokeWidth="1.5" fill="none" />
      <rect x="11" y="11" width="8" height="8" fill="#004C8F" />
      <polygon points="4,4 10,4 10,6 6,6 6,10 4,10" fill="#ED232A" />
      <polygon points="26,4 20,4 20,6 24,6 24,10 26,10" fill="#ED232A" />
      <polygon points="4,26 10,26 10,24 6,24 6,20 4,20" fill="#ED232A" />
      <polygon points="26,26 20,26 20,24 24,24 24,20 26,20" fill="#ED232A" />
    </g>
    <text x="44" y="24" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="13" fill="#004C8F" letterSpacing="-0.02em">HDFC</text>
    <text x="86" y="24" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="13" fill="#EE0138" letterSpacing="-0.02em">ERGO</text>
  </svg>
);

const IciciLombardLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(5, 5)">
      <path d="M 15 2 C 22 2, 28 8, 28 15 C 28 22, 22 28, 15 28 C 8 28, 2 22, 2 15" stroke="#F99D27" strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 15 7 C 19 7, 23 11, 23 15 C 23 19, 19 23, 15 23 C 11 23, 7 19, 7 15" stroke="#B02A30" strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <circle cx="15" cy="15" r="3.5" fill="#B02A30" />
    </g>
    <text x="44" y="19" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="13" fill="#B02A30" letterSpacing="-0.01em">ICICI</text>
    <text x="44" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="10" fill="#005B75" letterSpacing="0.05em" textTransform="uppercase">Lombard</text>
  </svg>
);

const GoDigitLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(5, 5)">
      <circle cx="15" cy="15" r="13" fill="#24D366" fillOpacity="0.15" />
      <circle cx="15" cy="15" r="9" fill="#24D366" />
      <path d="M 11 15 L 14 18 L 19 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
    <text x="44" y="25" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="20" fill="#0D2545" letterSpacing="-0.03em">digit</text>
    <circle cx="74" cy="13.5" r="2.5" fill="#24D366" />
  </svg>
);

const TataAigLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(5, 5)">
      <circle cx="15" cy="15" r="13" fill="#005A9C" />
      <path d="M 15 6 C 11 10, 9 17, 10.5 23 C 12.5 17, 14.5 11, 15 6 Z" fill="white" />
      <path d="M 15 6 C 19 10, 21 17, 19.5 23 C 17.5 17, 15.5 11, 15 6 Z" fill="white" />
      <circle cx="15" cy="15" r="2.5" fill="#005A9C" />
    </g>
    <text x="44" y="20" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="13" fill="#005A9C" letterSpacing="0.04em">TATA AIG</text>
    <text x="44" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="8" fill="#5C687E" letterSpacing="0.12em" textTransform="uppercase">Insurance</text>
  </svg>
);

const BajajAllianzLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(5, 5)">
      <path d="M 6 6 L 15 3 L 24 6 L 24 18 C 24 23, 20 26, 15 28 C 10 26, 6 23, 6 18 Z" fill="#004DA8" />
      <path d="M 10 11 L 15 13 L 20 11 M 10 16 L 15 18 L 20 16 M 15 13 L 15 23" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
    </g>
    <text x="44" y="20" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="13" fill="#004DA8" letterSpacing="0.04em">BAJAJ</text>
    <text x="44" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="11" fill="#003781" letterSpacing="0.02em">Allianz</text>
  </svg>
);

const RelianceGeneralLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g transform="translate(5, 5)">
      <circle cx="15" cy="15" r="13" fill="#D12E2F" />
      <path d="M 15 6 L 23 20 L 7 20 Z" fill="white" />
      <circle cx="15" cy="15" r="3.5" fill="#D12E2F" />
    </g>
    <text x="44" y="19" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="12" fill="#003366" letterSpacing="0.04em">RELIANCE</text>
    <text x="44" y="30" fontFamily="Inter, system-ui, sans-serif" fontWeight="800" fontSize="7" fill="#D12E2F" letterSpacing="0.06em">GENERAL INSURANCE</text>
  </svg>
);

const EdelweissZunoLogo = () => (
  <svg viewBox="0 0 160 40" className="h-8 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="zunoGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#FF2E93" />
        <stop offset="100%" stopColor="#FF8A00" />
      </linearGradient>
    </defs>
    <g transform="translate(5, 5)">
      <circle cx="15" cy="15" r="13" fill="url(#zunoGrad)" />
      <path d="M 10 10 L 20 10 L 10 20 L 20 20" stroke="white" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
    <text x="44" y="14" fontFamily="Inter, system-ui, sans-serif" fontWeight="700" fontSize="8" fill="#7A8293" letterSpacing="0.08em" textTransform="uppercase">Edelweiss</text>
    <text x="44" y="31" fontFamily="Inter, system-ui, sans-serif" fontWeight="900" fontSize="18" fill="url(#zunoGrad)" letterSpacing="-0.03em">zuno</text>
  </svg>
);

const InsurerLogo = ({ name }) => {
  switch (name) {
    case 'HDFC Ergo':
      return <HdfcErgoLogo />;
    case 'ICICI Lombard':
      return <IciciLombardLogo />;
    case 'Go Digit':
      return <GoDigitLogo />;
    case 'Tata AIG':
      return <TataAigLogo />;
    case 'Bajaj Allianz':
      return <BajajAllianzLogo />;
    case 'Reliance General':
      return <RelianceGeneralLogo />;
    case 'Edelweiss Zuno':
      return <EdelweissZunoLogo />;
    default:
      return <span className="font-semibold text-navy">{name}</span>;
  }
};

export default InsurerLogo;
