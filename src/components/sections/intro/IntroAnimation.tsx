import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { introTexts } from '../../../data/introTexts';
import { trackEvent, ANALYTICS_CATEGORIES } from '../../../utils/analytics';

interface IntroAnimationProps {
  showDetailed: boolean;
  setShowDetailed: (show: boolean) => void;
}

export default function IntroAnimation({ setShowDetailed }: IntroAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768); // 768px is common mobile breakpoint
    };
  
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  
  // Animation timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % introTexts.length);
    }, isMobile ? 1500 : 1800); // Slightly faster on mobile for better UX
    return () => clearInterval(timer);
  }, [isMobile]);
  
  const handleIntroClick = () => {
    trackEvent('intro_text_click', {
      category: ANALYTICS_CATEGORIES.INTERACTION,
      text_index: currentIndex,
      text_content: introTexts[currentIndex]
    });
    setShowDetailed(true);
  };
  
  return (
    <div 
      className={`transition-all duration-500 ease-in-out cursor-pointer ${
        isMobile ? 'px-2 py-1' : 'px-4 py-2'
      }`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key="intro"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleIntroClick}
          className="cursor-pointer"
        >
          <motion.p
            key={currentIndex}
            initial={{ y: isMobile ? 15 : 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: isMobile ? -15 : -20, opacity: 0 }}
            transition={{ duration: isMobile ? 0.25 : 0.3 }}
            className={`${
              isMobile 
                ? 'text-sm px-1 whitespace-normal' 
                : 'text-base md:text-xl px-2 md:px-4 whitespace-nowrap'
            } text-blue-600 dark:text-blue-400 text-center`}
          >
            {introTexts[currentIndex]}
          </motion.p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}