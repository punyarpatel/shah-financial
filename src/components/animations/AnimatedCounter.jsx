import React, { useEffect, useRef, useState } from 'react';
import { useInView, useSpring } from 'framer-motion';

const AnimatedCounter = ({ value, prefix = '', suffix = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  // Remove commas for parsing
  const numericValue = parseInt(value.replace(/,/g, ''), 10);
  const hasComma = value.includes(',');
  
  const [displayValue, setDisplayValue] = useState(0);
  
  const springValue = useSpring(0, {
    bounce: 0,
    duration: 2500 // 2.5 seconds
  });

  useEffect(() => {
    if (isInView) {
      springValue.set(numericValue);
    }
  }, [isInView, numericValue, springValue]);

  useEffect(() => {
    return springValue.on("change", (latest) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [springValue]);

  const formattedValue = hasComma ? displayValue.toLocaleString('en-IN') : displayValue;

  return (
    <span ref={ref}>
      {prefix}{formattedValue}{suffix}
    </span>
  );
};

export default AnimatedCounter;
