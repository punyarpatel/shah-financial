import React, { useState, useEffect, useRef, useMemo } from 'react';
import { motion } from 'framer-motion';

export const FollowEyes = ({
  eyeColor = '#ffffff',
  pupilColor = '#0d2545',
  eyeSize = 26,
  pupilSize: rawPupilSize = 10,
  eyeGap = 4,
  trackingSpeed = 160,
  trackingRange = 85,
  enableBlinking = true,
  blinkInterval = 3200
}) => {
  const containerRef = useRef(null);
  const [leftPupilPos, setLeftPupilPos] = useState({ x: 0, y: 0 });
  const [rightPupilPos, setRightPupilPos] = useState({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);

  const pupilSize = useMemo(() => Math.min(rawPupilSize, eyeSize * 0.7), [rawPupilSize, eyeSize]);
  const maxDistance = useMemo(() => ((eyeSize - pupilSize) / 2) * (trackingRange / 100), [eyeSize, pupilSize, trackingRange]);

  // Blinking animation loop
  useEffect(() => {
    if (!enableBlinking) return;
    const interval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 180);
    }, blinkInterval);
    return () => clearInterval(interval);
  }, [enableBlinking, blinkInterval]);

  // Throttled mouse tracking logic with requestAnimationFrame
  useEffect(() => {
    let animationFrameId = null;
    let latestEvent = null;

    const updateEyePos = () => {
      if (!latestEvent || !containerRef.current) {
        animationFrameId = null;
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const mouseX = latestEvent.clientX - centerX;
      const mouseY = latestEvent.clientY - centerY;

      const leftEyeOffsetX = -eyeGap / 2;
      const rightEyeOffsetX = eyeGap / 2;

      const calcPos = (eyeOffsetX) => {
        const relX = mouseX - eyeOffsetX;
        const relY = mouseY;
        const dist = Math.sqrt(relX * relX + relY * relY);
        if (dist === 0) return { x: 0, y: 0 };
        const clamped = Math.min(dist, maxDistance);
        const angle = Math.atan2(relY, relX);
        return {
          x: Math.round(Math.cos(angle) * clamped * 10) / 10,
          y: Math.round(Math.sin(angle) * clamped * 10) / 10
        };
      };

      const newLeft = calcPos(leftEyeOffsetX);
      const newRight = calcPos(rightEyeOffsetX);

      setLeftPupilPos(prev => (prev.x === newLeft.x && prev.y === newLeft.y ? prev : newLeft));
      setRightPupilPos(prev => (prev.x === newRight.x && prev.y === newRight.y ? prev : newRight));
      animationFrameId = null;
    };

    const handleMouseMove = (e) => {
      latestEvent = e;
      if (!animationFrameId) {
        animationFrameId = requestAnimationFrame(updateEyePos);
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [eyeGap, maxDistance]);

  return (
    <div
      ref={containerRef}
      className="inline-flex items-center justify-center shrink-0 select-none"
      style={{ gap: `${eyeGap}px`, height: `${eyeSize}px` }}
    >
      {/* Left Eye */}
      <div style={{ width: eyeSize, height: eyeSize }} className="rounded-full overflow-hidden shadow-inner flex items-center justify-center">
        <motion.div
          style={{ width: eyeSize, height: eyeSize, backgroundColor: eyeColor }}
          className="rounded-full relative flex items-center justify-center origin-center"
          animate={{ scaleY: isBlinking ? 0.2 : 1 }}
          transition={{ duration: 0.1, ease: 'easeInOut' }}
        >
          <motion.div
            style={{ width: pupilSize, height: pupilSize, backgroundColor: pupilColor }}
            className="rounded-full"
            animate={{ x: leftPupilPos.x, y: leftPupilPos.y, opacity: isBlinking ? 0 : 1 }}
            transition={{ type: 'spring', stiffness: trackingSpeed, damping: 20 }}
          />
        </motion.div>
      </div>

      {/* Right Eye */}
      <div style={{ width: eyeSize, height: eyeSize }} className="rounded-full overflow-hidden shadow-inner flex items-center justify-center">
        <motion.div
          style={{ width: eyeSize, height: eyeSize, backgroundColor: eyeColor }}
          className="rounded-full relative flex items-center justify-center origin-center"
          animate={{ scaleY: isBlinking ? 0.2 : 1 }}
          transition={{ duration: 0.1, ease: 'easeInOut' }}
        >
          <motion.div
            style={{ width: pupilSize, height: pupilSize, backgroundColor: pupilColor }}
            className="rounded-full"
            animate={{ x: rightPupilPos.x, y: rightPupilPos.y, opacity: isBlinking ? 0 : 1 }}
            transition={{ type: 'spring', stiffness: trackingSpeed, damping: 20 }}
          />
        </motion.div>
      </div>
    </div>
  );
};

export const EyeFollowButton = ({
  text = 'Get Free Review',
  onClick,
  className = '',
  buttonColor = '#c9922a',
  textColor = '#ffffff',
  eyeColor = '#ffffff',
  pupilColor = '#0d2545'
}) => {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-3 px-6 py-3 rounded-full font-bold text-[14px] shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 cursor-pointer ${className}`}
      style={{
        backgroundColor: buttonColor,
        color: textColor,
        boxShadow: '0 8px 25px rgba(201, 146, 42, 0.35)'
      }}
    >
      <span>{text}</span>
      <FollowEyes eyeColor={eyeColor} pupilColor={pupilColor} />
    </button>
  );
};

export default EyeFollowButton;
