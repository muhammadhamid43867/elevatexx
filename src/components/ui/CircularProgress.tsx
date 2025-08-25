import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const CircularProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(Math.min(100, Math.max(0, progress)));
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed bottom-8 left-8 z-50">
      <div className="relative w-16 h-16">
        {/* Background circle */}
        <div className="absolute inset-0 rounded-full border-2 border-white/5" />
        
        {/* Progress circle */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90"
          viewBox="0 0 100 100"
        >
          <motion.circle
            cx="50"
            cy="50"
            r="46"
            fill="none"
            strokeWidth="4"
            stroke="rgba(255, 255, 255, 0.8)"
            strokeLinecap="round"
            strokeDasharray="289.027"
            initial={{ strokeDashoffset: 289.027 }}
            animate={{ strokeDashoffset: 289.027 * (1 - scrollProgress / 100) }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="drop-shadow-[0_0_3px_rgba(255,255,255,0.3)]"
          />
        </svg>

        {/* Percentage text */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.span 
            className="text-white/90 font-medium text-sm"
            animate={{ opacity: [0, 1] }}
            transition={{ duration: 0.5 }}
          >
            {Math.round(scrollProgress)}%
          </motion.span>
        </div>
      </div>
    </div>
  );
};

export default CircularProgress; 