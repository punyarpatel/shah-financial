import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const themes = [
  {
    id: 'classic',
    name: 'Classic',
    desc: 'Navy & Gold',
    colors: ['#0d2545', '#c9922a']
  },
  {
    id: 'emerald',
    name: 'Emerald',
    desc: 'Forest & Mint',
    colors: ['#08241c', '#10b981']
  },
  {
    id: 'burgundy',
    name: 'Burgundy',
    desc: 'Wine & Champagne',
    colors: ['#2e0c16', '#c5a880']
  },
  {
    id: 'charcoal',
    name: 'Charcoal',
    desc: 'Slate & Bronze',
    colors: ['#1e293b', '#d97706']
  }
];

const ThemeToggle = () => {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('drishti-theme') || 'classic';
  });
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    // Remove previous theme classes
    themes.forEach(t => {
      if (t.id !== 'classic') {
        document.documentElement.removeAttribute(`data-theme`);
      }
    });

    // Apply active theme
    if (theme !== 'classic') {
      document.documentElement.setAttribute('data-theme', theme);
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    localStorage.setItem('drishti-theme', theme);
  }, [theme]);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const activeTheme = themes.find(t => t.id === theme) || themes[0];

  return (
    <div className="relative inline-block text-left" ref={containerRef}>
      {/* Active Theme Selector Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2.5 bg-white/10 hover:bg-white/15 active:bg-white/20 border border-white/20 hover:border-white/30 rounded-full px-4 py-2 text-[12px] font-semibold text-white/95 transition-all shadow-sm outline-none cursor-pointer"
      >
        <span className="flex items-center gap-1.5">
          {/* Swatch preview */}
          <span className="flex -space-x-1">
            <span 
              className="w-3.5 h-3.5 rounded-full border border-white/25 shadow-sm"
              style={{ backgroundColor: activeTheme.colors[0] }}
            />
            <span 
              className="w-3.5 h-3.5 rounded-full border border-white/25 shadow-sm"
              style={{ backgroundColor: activeTheme.colors[1] }}
            />
          </span>
          <span>Theme: {activeTheme.name}</span>
        </span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className={`h-3.5 w-3.5 text-white/60 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} 
          viewBox="0 0 20 20" 
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.15, ease: 'easeOut' }}
            className="absolute right-0 mt-2.5 w-56 rounded-2xl bg-[#091629]/95 backdrop-blur-xl border border-white/10 shadow-[0_12px_40px_rgba(0,0,0,0.4)] p-1.5 z-[110]"
          >
            <div className="px-3 py-2 text-[10px] font-sans font-bold uppercase tracking-wider text-white/40">
              Select Color Theme
            </div>

            <div className="flex flex-col gap-0.5">
              {themes.map((t) => {
                const isSelected = t.id === theme;
                return (
                  <button
                    key={t.id}
                    onClick={() => {
                      setTheme(t.id);
                      setIsOpen(false);
                    }}
                    className={`flex items-center justify-between w-full text-left p-2.5 rounded-xl transition-all duration-200 outline-none group cursor-pointer ${
                      isSelected 
                        ? 'bg-gold/25 text-white font-medium' 
                        : 'text-white/70 hover:bg-white/5 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      {/* Dual-color Swatch */}
                      <span className="flex -space-x-1.5">
                        <span 
                          className="w-4 h-4 rounded-full border border-white/10 shadow-sm"
                          style={{ backgroundColor: t.colors[0] }}
                        />
                        <span 
                          className="w-4 h-4 rounded-full border border-white/10 shadow-sm"
                          style={{ backgroundColor: t.colors[1] }}
                        />
                      </span>

                      <div className="flex flex-col">
                        <span className="text-[12px]">{t.name}</span>
                        <span className="text-[9.5px] text-white/45 group-hover:text-white/60 leading-none mt-0.5">
                          {t.desc}
                        </span>
                      </div>
                    </div>

                    {/* Active checkmark */}
                    {isSelected && (
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gold" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </button>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ThemeToggle;
