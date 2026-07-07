import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

/**
 * SCHEMA CONFIGURATION FOR THE DESIGN SELECTOR
 * To add any new design comparisons in the future, simply add an entry here.
 * The UI and event broadcast system will automatically hook it up!
 */
const features = [
  {
    key: 'achievements-mode',
    label: 'Achievements Showcase',
    defaultValue: 'circular',
    options: [
      { value: 'classic', label: 'Rotating Coins' },
      { value: 'circular', label: 'Circular Gallery' }
    ]
  }
];

const DesignSelector = () => {
  // Sync state values dynamically for all registered features
  const [featureStates, setFeatureStates] = useState(() => {
    const initial = {};
    features.forEach(f => {
      initial[f.key] = localStorage.getItem(`drishti-${f.key}`) || f.defaultValue;
    });
    return initial;
  });

  const [isOpen, setIsOpen] = useState(false);

  // Sync state back to localStorage and dispatch custom window events
  const handleFeatureToggle = (key, value) => {
    setFeatureStates(prev => {
      const updated = { ...prev, [key]: value };
      localStorage.setItem(`drishti-${key}`, value);
      window.dispatchEvent(new Event('drishti-design-change'));
      return updated;
    });
  };

  // Keep internal state synchronized if localStorage updates from elsewhere
  useEffect(() => {
    const handleDesignChange = () => {
      setFeatureStates(() => {
        const updated = {};
        features.forEach(f => {
          updated[f.key] = localStorage.getItem(`drishti-${f.key}`) || f.defaultValue;
        });
        return updated;
      });
    };
    window.addEventListener('drishti-design-change', handleDesignChange);
    return () => window.removeEventListener('drishti-design-change', handleDesignChange);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-[200] flex flex-col items-start font-sans">
      {/* Selector Toggles Box */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mb-3 w-[280px] bg-navy/90 backdrop-blur-md border border-[#c9922a]/30 rounded-2xl p-4 shadow-[0_10px_30px_rgba(13,37,69,0.3)] text-white"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-3">
              <span className="text-[11px] uppercase tracking-wider font-bold text-goldLight">
                Design Switcher
              </span>
              <span className="text-[9px] bg-gold/20 text-[#f0c96a] px-1.5 py-0.5 rounded">
                Preview Mode
              </span>
            </div>

            <div className="flex flex-col gap-4">
              {features.map((feature) => {
                const activeVal = featureStates[feature.key];
                return (
                  <div key={feature.key} className="flex flex-col gap-1.5">
                    <label className="text-[11px] text-white/60 font-medium">
                      {feature.label}:
                    </label>
                    <div className="grid grid-cols-2 gap-1 bg-white/5 p-1 rounded-lg border border-white/10">
                      {feature.options.map((opt) => {
                        const isSelected = activeVal === opt.value;
                        return (
                          <button
                            key={opt.value}
                            onClick={() => handleFeatureToggle(feature.key, opt.value)}
                            className={`px-2 py-1.5 rounded-md text-[10.5px] font-semibold transition-all cursor-pointer ${
                              isSelected
                                ? 'bg-[#c9922a] text-white shadow-sm'
                                : 'text-white/60 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            {opt.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Action Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 bg-[#c9922a] hover:bg-[#f0c96a] active:scale-95 text-white border border-[#f0c96a]/20 shadow-[0_4px_20px_rgba(201,146,42,0.3)] rounded-full px-4 py-2.5 text-[11px] uppercase tracking-wider font-bold transition-all outline-none cursor-pointer"
      >
        <span className="text-[13px]">🎛️</span>
        <span>{isOpen ? 'Close Panel' : 'Compare Designs'}</span>
      </button>
    </div>
  );
};

export default DesignSelector;
