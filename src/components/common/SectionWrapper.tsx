import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionWrapperProps } from './types';

const SectionWrapper: React.FC<SectionWrapperProps> = ({ titleBold, titleLight, description, children, isDark }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Adjusted opacity transformation for smoother transitions
  const opacity = 1; //useTransform(scrollYProgress, [0, 0.3, opacityPosition || 0.75, 1], [0, 1, 1, 0]);
  // Adjusted yTranslate transformation for better visual effect
  const yTranslate = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [50, 0, 0, -50]);

  return (
    <motion.div
      ref={sectionRef}
      style={{ opacity, y: yTranslate }}
      className={`py-5 px-4 md:px-8 w-full ${isDark ? 'bg-gray-900 text-white' : 'text-black'}`}
    >
      <div className={`text-center ${children && 'mb-8 md:mb-16'} dark:text-gray-300 light:text-gray-600`}>
        <h2 className={`text-3xl md:text-5xl font-thin tracking-wide mb-2 md:mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
          {titleBold}
          <span className={`font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{titleLight}</span>
        </h2>
        <p className={`text-base md:text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{description}</p>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};

export default SectionWrapper;