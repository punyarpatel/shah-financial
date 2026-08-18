import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const targetId = hash.replace('#', '');
      
      const scrollToSection = () => {
        const element = document.getElementById(targetId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return true;
        }
        return false;
      };

      // Try immediately
      if (!scrollToSection()) {
        // Retry at intervals in case lazy loaded pages or components are rendering
        const t1 = setTimeout(scrollToSection, 100);
        const t2 = setTimeout(scrollToSection, 350);
        const t3 = setTimeout(scrollToSection, 700);

        return () => {
          clearTimeout(t1);
          clearTimeout(t2);
          clearTimeout(t3);
        };
      }
    } else {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      const timer = setTimeout(() => {
        document.documentElement.style.scrollBehavior = 'smooth';
      }, 50);

      return () => clearTimeout(timer);
    }
  }, [pathname, hash]);

  return null;
};

export default ScrollToTop;
