import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import IntroAnimation from './IntroAnimation';
import { personalInfo } from '../../../data';
import DetailedIntro from './DetailedIntro';
import ThanosSnap from './ThanosSnap';
import '../../../styles/gradienttext.css';
import { trackEvent, ANALYTICS_CATEGORIES } from '../../../utils/analytics';

const IntroSection: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [nextImageIndex, setNextImageIndex] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);

  // Auto-advance images
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isHovered) {  // Only advance if not hovered
        setIsTransitioning(true); // Start transition
        setNextImageIndex((prev) =>
          (prev + 1) % personalInfo.profileImages.length
        );
      }
    }, 2000);  // Change image every 3 seconds

    return () => clearInterval(timer);
  }, [isHovered]);

  // Handle transition end
  useEffect(() => {
    if (isTransitioning) {
      const transitionTimer = setTimeout(() => {
        setCurrentImageIndex(nextImageIndex); // Update current image after transition
        setIsTransitioning(false); // End transition
      }, 1000); // Overlap duration (adjust as needed)

      return () => clearTimeout(transitionTimer);
    }
  }, [isTransitioning, nextImageIndex]);

  // Track profile image hover
  const handleProfileHover = (isHovering: boolean) => {
    setIsHovered(isHovering);
  };

  // Track detailed view toggle
  const handleShowDetailed = () => {
    trackEvent('show_detailed_intro', {
      category: ANALYTICS_CATEGORIES.INTERACTION,
      action: 'open',
    });
    setShowDetailed(true);
  };

  const handleHideDetailed = () => {
    trackEvent('hide_detailed_intro', {
      category: ANALYTICS_CATEGORIES.INTERACTION,
      action: 'close',
    });
    setShowDetailed(false);
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-8" data-section="intro">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center relative"
      >
        {/* Combined Blob and Profile Container */}
        <div className="relative w-80 h-80 mx-auto mb-8">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              className={`magicpattern${index} absolute inset-0`}
              animate={{
                rotate: isHovered
                  ? (index % 2 === 0 ? 360 : -360)
                  : (index === 0 ? 360 : index === 1 ? -360 : 360),
                scale: isHovered
                  ? [1, 1.25, 1]
                  : [1, 1.08, 1],
              }}
              transition={{
                rotate: {
                  duration: isHovered
                    ? 15 + index * 5
                    : 8 + index * 2,
                  ease: "linear",
                  repeat: Infinity,
                },
                scale: {
                  duration: isHovered
                    ? 0.9 + index * 0.5
                    : 3 + index,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: index * 0.2,
                }
              }}
              style={{
                opacity: isHovered ? 0.7 : 0.6,
                transformOrigin: 'center center',
              }}
            />
          ))}

          {/* Profile Images with Overlapping Transition */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            onHoverStart={() => handleProfileHover(true)}
            onHoverEnd={() => handleProfileHover(false)}
          >
            {/* Current Image */}
            <motion.img
              key={`current-${currentImageIndex}`}
              src={imageError ?
                `https://ui-avatars.com/api/?name=${encodeURIComponent(personalInfo.name)}&background=random`
                : personalInfo.profileImages[currentImageIndex]
              }
              alt={`${personalInfo.name}'s Profile ${currentImageIndex + 1}`}
              className="w-112 h-112 rounded-full object-cover bg-white dark:bg-gray-800"
              initial={{ opacity: 1 }}
              animate={{ opacity: isTransitioning ? 0 : 1 }} // Fade out current image during transition
              transition={{ duration: 0.5 }}
              whileHover={{
                scale: 1.15,
                transition: { duration: 0.5 }
              }}
              onError={() => {
                setImageError(true);
              }}
            />

            {/* Next Image */}
            <AnimatePresence>
              {isTransitioning && (
                <motion.img
                  key={`next-${nextImageIndex}`}
                  src={imageError ?
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(personalInfo.name)}&background=random`
                    : personalInfo.profileImages[nextImageIndex]
                  }
                  alt={`${personalInfo.name}'s Profile ${nextImageIndex + 1}`}
                  className="w-112 h-112 rounded-full object-cover bg-white dark:bg-gray-800 absolute top-0 left-0"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }} // Fade in next image during transition
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  whileHover={{
                    scale: 1.15,
                    transition: { duration: 0.5 }
                  }}
                  onError={() => {
                    setImageError(true);
                  }}
                />
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Name and Intro Animation */}
        {!showDetailed ? (
          <>
            <motion.h1
              className="text-4xl font-bold mb-4 relative z-10 cursor-link gradient-text"
              onClick={handleShowDetailed}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {personalInfo.name}
            </motion.h1>
            <IntroAnimation showDetailed={showDetailed} setShowDetailed={handleShowDetailed} />
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <DetailedIntro onClose={handleHideDetailed} />
            <ThanosSnap onComplete={() => { }} />
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default IntroSection;