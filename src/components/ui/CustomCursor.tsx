import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { useCursor } from '../../hooks/useCursor';

const CustomCursor = () => {
  const { cursorText, cursorVariant } = useCursor();
  const [visible, setVisible] = useState(false);
  const [isMobileOrTablet, setIsMobileOrTablet] = useState(true); // Start with true to prevent flash
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 700 };
  const springX = useSpring(cursorX, springConfig);
  const springY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Check if device is mobile or tablet
    const checkDevice = () => {
      const isTouchDevice = (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        // @ts-ignore
        (navigator.msMaxTouchPoints > 0));
      const isMobileOrTabletQuery = window.matchMedia('(max-width: 1024px)');
      setIsMobileOrTablet(isTouchDevice || isMobileOrTabletQuery.matches);
    };

    // Initial check
    checkDevice();

    // Add listener for screen resize
    window.addEventListener('resize', checkDevice);

    return () => {
      window.removeEventListener('resize', checkDevice);
    };
  }, []);

  useEffect(() => {
    if (isMobileOrTablet) {
      document.body.classList.add('touch-device');
    } else {
      document.body.classList.remove('touch-device');
    }
  }, [isMobileOrTablet]);

  useEffect(() => {
    // Only add mouse event listeners if not on mobile/tablet
    if (isMobileOrTablet) return;

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX + 8);
      cursorY.set(e.clientY + 8);
    };

    const handleMouseEnter = () => setVisible(true);
    const handleMouseLeave = () => setVisible(false);

    document.addEventListener('mousemove', moveCursor);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', moveCursor);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [cursorX, cursorY, isMobileOrTablet]);

  // Don't render the cursor on mobile/tablet devices
  if (isMobileOrTablet) return null;

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(255, 255, 255, 0.2)',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      fontSize: '0px',
    },
    text: {
      width: 120,
      height: 120,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      fontSize: '16px',
    },
    link: {
      width: 120,
      height: 120,
      backgroundColor: 'rgba(255, 255, 255, 0.1)',
      border: '2px solid rgba(255, 255, 255, 0.8)',
      fontSize: '14px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
    },
    button: {
      width: 140,
      height: 140,
      backgroundColor: 'rgba(255, 255, 255, 0.15)',
      border: '2px solid rgba(255, 255, 255, 0.9)',
      fontSize: '16px',
    },
    image: {
      width: 150,
      height: 150,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(255, 255, 255, 0.7)',
      fontSize: '16px',
    },
  };

  return (
    <motion.div
      style={{
        left: springX,
        top: springY,
        position: 'fixed',
        zIndex: 9999,
        pointerEvents: 'none',
        opacity: visible ? 1 : 0,
        mixBlendMode: 'difference',
        transform: 'translate(-50%, -50%)',
      }}
      animate={cursorVariant}
      variants={variants}
      transition={{
        type: 'spring',
        damping: 25,
        stiffness: 150,
      }}
      className="flex items-center justify-center rounded-full backdrop-blur-sm"
    >
      <motion.span
        className="text-white font-medium select-none text-center w-full px-2"
        animate={{ opacity: cursorText ? 1 : 0 }}
      >
        {cursorText}
      </motion.span>
    </motion.div>
  );
};

export default CustomCursor;