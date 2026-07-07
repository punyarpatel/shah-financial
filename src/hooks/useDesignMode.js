import { useState, useEffect } from 'react';

/**
 * A custom React hook to dynamically subscribe to real-time design selector mode updates.
 * @param {string} key - The unique identifier of the design feature (e.g. 'nav-mode', 'hero-mode').
 * @param {string} defaultValue - The default mode fallback.
 * @returns {string} The active mode selection.
 */
export default function useDesignMode(key, defaultValue) {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem(`drishti-${key}`) || defaultValue;
  });

  useEffect(() => {
    const handleDesignChange = () => {
      setMode(localStorage.getItem(`drishti-${key}`) || defaultValue);
    };
    window.addEventListener('drishti-design-change', handleDesignChange);
    return () => window.removeEventListener('drishti-design-change', handleDesignChange);
  }, [key, defaultValue]);

  return mode;
}
