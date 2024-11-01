import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

const introTexts = [
  "Building exceptional user experiences",
  "Crafting elegant solutions",
  "Transforming ideas into reality",
  "Creating seamless interactions"
];

export default function IntroAnimation() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % introTexts.length);
    }, 1500);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="h-8 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.p
          key={currentIndex}
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="text-xl text-blue-600 dark:text-blue-400"
        >
          {introTexts[currentIndex]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}