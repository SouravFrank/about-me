import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';

interface IntroAnimationProps {
  showDetailed: boolean;
  setShowDetailed: (show: boolean) => void;
}

const introTexts = [
  "Crafting innovative mobile experiences with React Native",
  "Building robust cross-platform solutions that delight users",
  "Transforming ideas into scalable applications with Node.js",
  "Expert in integrating seamless payment solutions for modern apps",
  "Passionate about delivering high-quality code and user-centric designs",
  "Navigating the complexities of Agile project management with ease"
];

export default function IntroAnimation({ showDetailed, setShowDetailed }: IntroAnimationProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!showDetailed) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % introTexts.length);
      }, 1800);
      return () => clearInterval(timer);
    }
  }, [showDetailed]);

  return (
    <div className="transition-all duration-500 ease-in-out">
      <AnimatePresence mode="wait">
        {!showDetailed ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetailed(true)}
            className="cursor-pointer"
          >
            <motion.p
              key={currentIndex}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-xl text-blue-600 dark:text-blue-400 px-4 whitespace-nowrap text-center"
            >
              {introTexts[currentIndex]}
            </motion.p>
          </motion.div>
        ) : (
          <motion.div
            key="detailed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DetailedIntro onClose={() => setShowDetailed(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}