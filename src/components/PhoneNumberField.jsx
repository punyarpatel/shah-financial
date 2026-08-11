import React, { useMemo, useState, useEffect } from 'react';
import { countryCallingCodes } from '../lib/countries';

const PhoneNumberField = ({ 
  value = '', 
  onChange, 
  className = '', 
  required = true,
  variant = 'dark'
}) => {
  // Parse country code and 10-digit number from value
  const { code: currentCode, digits: currentDigits } = useMemo(() => {
    if (!value) return { code: '+91', digits: '' };
    const str = String(value).trim();
    
    if (str.includes(' ')) {
      const spaceIdx = str.indexOf(' ');
      const codePart = str.slice(0, spaceIdx);
      const digitsPart = str.slice(spaceIdx + 1).replace(/\D/g, '').slice(0, 10);
      return { code: codePart || '+91', digits: digitsPart };
    }
    
    if (str.startsWith('+')) {
      const matched = countryCallingCodes.find(c => str.startsWith(c.code));
      if (matched) {
        const remaining = str.slice(matched.code.length).replace(/\D/g, '').slice(0, 10);
        return { code: matched.code, digits: remaining };
      }
    }
    
    return { code: '+91', digits: str.replace(/\D/g, '').slice(0, 10) };
  }, [value]);

  const [selectedCode, setSelectedCode] = useState(currentCode);

  useEffect(() => {
    if (currentCode && currentCode !== selectedCode) {
      setSelectedCode(currentCode);
    }
  }, [currentCode]);

  const updateNumber = (newDigits, newCode = selectedCode) => {
    const cleanDigits = (newDigits || '').replace(/\D/g, '').slice(0, 10);
    if (cleanDigits) {
      onChange(`${newCode} ${cleanDigits}`);
    } else {
      onChange('');
    }
  };

  const handleInputChange = (e) => {
    const rawVal = e.target.value.replace(/\D/g, '').slice(0, 10);
    updateNumber(rawVal, selectedCode);
  };

  const handleSelectChange = (e) => {
    const nextCode = e.target.value;
    setSelectedCode(nextCode);
    updateNumber(currentDigits, nextCode);
  };

  const isLight = variant === 'light';

  const containerStyles = isLight
    ? "flex overflow-hidden rounded-[8px] border border-[#0d2545]/15 bg-white focus-within:border-[#c9922a] transition-colors"
    : "flex overflow-hidden rounded-[8px] border border-white/15 bg-white/5 focus-within:border-gold focus-within:bg-white/10 transition-colors";

  const selectStyles = isLight
    ? "w-[88px] sm:w-[94px] shrink-0 border-0 border-r border-[#0d2545]/15 bg-transparent pl-2 pr-1 text-[12px] font-sans text-navy outline-none cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis"
    : "w-[88px] sm:w-[94px] shrink-0 border-0 border-r border-white/15 bg-transparent pl-2 pr-1 text-[12px] font-sans text-white outline-none cursor-pointer overflow-hidden whitespace-nowrap text-ellipsis";

  const optionStyles = isLight
    ? "bg-white text-navy"
    : "bg-[#0d2545] text-white";

  const inputStyles = isLight
    ? `min-w-0 flex-1 border-0 bg-transparent px-2.5 py-[10px] text-[13.5px] font-sans text-navy outline-none placeholder-slate-400 tracking-normal ${className}`
    : `min-w-0 flex-1 border-0 bg-transparent px-2.5 py-[10px] text-[13.5px] font-sans text-white outline-none placeholder-white/35 tracking-normal ${className}`;

  return (
    <div className={containerStyles}>
      <select
        aria-label="Country calling code"
        value={selectedCode}
        onChange={handleSelectChange}
        className={selectStyles}
      >
        {countryCallingCodes.map(({ code, label }, idx) => (
          <option key={`${code}-${idx}`} value={code} className={optionStyles}>
            {label}
          </option>
        ))}
      </select>
      <input
        type="tel"
        inputMode="numeric"
        autoComplete="tel-national"
        required={required}
        pattern="[0-9]{10}"
        minLength={10}
        maxLength={10}
        title="Please enter exactly 10 digits"
        value={currentDigits}
        onChange={handleInputChange}
        placeholder="10-digit number"
        className={inputStyles}
      />
    </div>
  );
};

export default PhoneNumberField;
