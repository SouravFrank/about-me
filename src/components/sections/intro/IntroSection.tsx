import React, { useState } from 'react';
import { motion } from 'framer-motion';
import IntroAnimation from './IntroAnimation';
import { personalInfo } from '../../../data';

const IntroSection: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="min-h-screen flex items-center justify-center p-8">
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
                    ? 2 + index * 0.5
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

          {/* Profile Image */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.img
              src={personalInfo.profileImage}
              alt={`${personalInfo.name}'s Profile`}
              className="w-112 h-112 rounded-full object-cover bg-white dark:bg-gray-800"
              whileHover={{ 
                scale: 1.15,
                transition: { duration: 0.3 }
              }}
              onError={() => {
                setImageError(true);
                const img = document.querySelector('img');
                if (img) {
                  img.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(personalInfo.name) + '&background=random';
                }
              }}
            />
          </motion.div>
        </div>

        {/* Name and Intro Animation */}
        <motion.h1 className="text-4xl font-bold mb-4 relative z-10">
          {personalInfo.name}
        </motion.h1>
        {/* <div className="relative z-10"> */}
          <IntroAnimation />
        {/* </div> */}
      </motion.div>
    </section>
  );
};

export default IntroSection; 