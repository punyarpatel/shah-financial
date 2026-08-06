import React, { useState, useEffect, useRef } from 'react';

const DwLogo3DViewer = ({ className = "w-full h-[360px] md:h-[420px] lg:h-[460px]" }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const viewerRef = useRef(null);

  useEffect(() => {
    // Ensure model-viewer custom element is registered
    if (typeof window !== 'undefined' && !customElements.get('model-viewer')) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://cdn.jsdelivr.net/npm/@google/model-viewer/dist/model-viewer.min.js';
      document.head.appendChild(script);
    }

    const viewer = viewerRef.current;
    if (viewer) {
      const handleLoad = () => setIsLoaded(true);
      viewer.addEventListener('load', handleLoad);
      // Fallback in case already loaded
      if (viewer.loaded) setIsLoaded(true);

      return () => {
        viewer.removeEventListener('load', handleLoad);
      };
    }
  }, []);

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Subtle radial ambient glow behind the 3D logo */}
      <div 
        className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full bg-[#c9922a]/15 blur-3xl pointer-events-none"
        style={{ transform: 'translate3d(0, 0, 0)' }}
      />

      {/* Google <model-viewer> Web Component */}
      <model-viewer
        ref={viewerRef}
        src="/dw_logo_3d.glb"
        alt="Drishti Wealth 3D Rotating Logo"
        auto-rotate
        rotation-per-second="-40deg"
        camera-orbit="0deg 78deg 105%"
        field-of-view="30deg"
        exposure="1.1"
        shadow-intensity="0.7"
        shadow-softness="0.8"
        environment-image="neutral"
        disable-pan
        interaction-prompt="none"
        camera-controls
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: 'transparent',
          opacity: 1,
          display: 'block',
        }}
      />
    </div>
  );
};

export default DwLogo3DViewer;
