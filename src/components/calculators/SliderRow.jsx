import React, { useState, useEffect } from 'react';

const SliderRow = ({ label, value, min, max, step = 1, onChange }) => {
  const [inputVal, setInputVal] = useState(String(value));

  useEffect(() => {
    setInputVal(String(value));
  }, [value]);

  const handleBlur = () => {
    const num = parseFloat(inputVal);
    if (!isNaN(num)) onChange(Math.min(max, Math.max(min, num)));
    else setInputVal(String(value));
  };

  return (
    <div className="flex items-center gap-3">
      <span className="text-white/70 text-[13px] w-[200px] flex-shrink-0">{label}</span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="flex-1 h-[4px] appearance-none bg-white/10 rounded-full outline-none cursor-pointer"
        style={{ accentColor: '#c9922a' }}
      />
      <input
        type="number"
        min={min}
        max={max}
        step={step}
        value={inputVal}
        onChange={e => setInputVal(e.target.value)}
        onBlur={handleBlur}
        onKeyDown={e => e.key === 'Enter' && e.currentTarget.blur()}
        className="text-[#f0c96a] text-[13px] font-semibold w-[80px] text-right flex-shrink-0 bg-transparent border-b border-transparent hover:border-[#f0c96a]/40 focus:border-[#f0c96a] outline-none transition-colors cursor-text [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
      />
    </div>
  );
};

export default SliderRow;
