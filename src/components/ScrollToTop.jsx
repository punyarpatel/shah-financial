import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // We must use 'auto' to override any global 'scroll-behavior: smooth' in CSS.
    // Otherwise, navigating to a new page from the footer will slowly scroll up through
    // sticky horizontal sections (like Insurance or About Us timeline), making it look "stuck".
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
    
    // Restore smooth scroll behavior after a brief delay
    setTimeout(() => {
      document.documentElement.style.scrollBehavior = 'smooth';
    }, 50);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
