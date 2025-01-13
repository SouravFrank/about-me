import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionWrapperProps } from './types';

const SectionWrapper: React.FC<SectionWrapperProps> = ({ titleBold, titleLight, description, children, isDark, opacityPosition }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Adjusted opacity transformation for smoother transitions
  const opacity = useTransform(scrollYProgress, [0, 0.3, opacityPosition || 0.75, 1], [0, 1, 1, 0]);
  // Adjusted yTranslate transformation for better visual effect
  const yTranslate = useTransform(scrollYProgress, [0, 0.3, 0.75, 1], [50, 0, 0, -50]);

  return (
    <motion.div ref={sectionRef} style={{ opacity, y: yTranslate }} className={`py-5 px-8 w-full ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}>
      <div className={`text-center mb-16 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
        <h2 className={`text-5xl font-thin tracking-wide mb-4 ${isDark ? 'text-gray-200' : 'text-gray-600'}`}>
          {titleBold}
          <span className={`text-gray-800 font-semibold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}>{titleLight}</span>
        </h2>
        <p className={`text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-700'}`}>{description}</p>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};

export default SectionWrapper;
