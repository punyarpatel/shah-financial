import React, { useState, useEffect } from 'react';
import { safeLocalStorage } from '../utils/safeStorage';

export default function useDesignMode(key, defaultValue) {
  const [mode, setMode] = useState(() => {
    return safeLocalStorage.getItem(`drishti-${key}`) || defaultValue;
  });

  useEffect(() => {
    const handleDesignChange = () => {
      setMode(safeLocalStorage.getItem(`drishti-${key}`) || defaultValue);
    };
    window.addEventListener('drishti-design-change', handleDesignChange);
    return () => window.removeEventListener('drishti-design-change', handleDesignChange);
  }, [key, defaultValue]);

  return mode;
}
