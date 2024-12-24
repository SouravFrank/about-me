import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { personalInfo } from '../data';
import IntroAnimation from './IntroAnimation';

const generateBlobPath = () => {
  const numberOfPoints = Math.floor(Math.random() * 5) + 6; // 6-10 points
  const points = [];
  for (let i = 0; i < numberOfPoints; i++) {
    const angle = (i / numberOfPoints) * Math.PI * 2;
    const radius = 40 + Math.random() * 20; // Random radius between 40-60
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    points.push(`${x},${y}`);
  }
  return `M${points.join('L')}Z`;
};

const IntroSection: React.FC = () => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [blobPath1] = useState(generateBlobPath());
  const [blobPath2] = useState(generateBlobPath());

  return (
    <section className="min-h-screen flex items-center justify-center p-8">
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        className="text-center relative"
      >
        {/* Blob animations */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64">
          <motion.svg
            viewBox="-50 -50 100 100"
            className="w-full h-full absolute"
            animate={{
              rotate: 360,
              scale: isHovered ? [1, 1.1, 1] : [1, 1.05, 1],
            }}
            transition={{
              rotate: {
                duration: isHovered ? 15 : 30,
                ease: "linear",
                repeat: Infinity,
              },
              scale: {
                duration: 2,
                ease: "easeInOut",
                repeat: Infinity,
              }
            }}
          >
            <motion.path
              d={blobPath1}
              fill="url(#gradient1)"
              className="opacity-70"
            />
            <defs>
              <linearGradient id="gradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#60A5FA" />
                <stop offset="100%" stopColor="#A855F7" />
              </linearGradient>
            </defs>
          </motion.svg>

          <motion.svg
            viewBox="-50 -50 100 100"
            className="w-full h-full absolute"
            animate={{
              rotate: -360,
              scale: isHovered ? [1, 1.2, 1] : [1, 1.1, 1],
            }}
            transition={{
              rotate: {
                duration: isHovered ? 20 : 40,
                ease: "linear",
                repeat: Infinity,
              },
              scale: {
                duration: 3,
                ease: "easeInOut",
                repeat: Infinity,
                delay: 0.5,
              }
            }}
          >
            <motion.path
              d={blobPath2}
              fill="url(#gradient2)"
              className="opacity-70"
            />
            <defs>
              <linearGradient id="gradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F472B6" />
                <stop offset="100%" stopColor="#FB923C" />
              </linearGradient>
            </defs>
          </motion.svg>
        </div>

        {/* Profile Image */}
        <motion.div
          className="relative z-10"
          onHoverStart={() => setIsHovered(true)}
          onHoverEnd={() => setIsHovered(false)}
        >
          <motion.img
            src={personalInfo.profileImage}
            alt={`${personalInfo.name}'s Profile`}
            className="w-40 h-40 rounded-full mx-auto mb-8 shadow-neumorph object-cover relative z-10 bg-white dark:bg-gray-800"
            whileHover={{ scale: 1.1 }}
            onError={() => {
              setImageError(true);
              const img = document.querySelector('img');
              if (img) {
                img.src = 'https://ui-avatars.com/api/?name=' + encodeURIComponent(personalInfo.name) + '&background=random';
              }
            }}
          />
        </motion.div>

        {/* Name and Intro Animation */}
        <motion.h1 className="text-4xl font-bold mb-4 relative z-10">
          {personalInfo.name}
        </motion.h1>
        <div className="relative z-10">
          <IntroAnimation />
        </div>
      </motion.div>
    </section>
  );
};

export default IntroSection; 