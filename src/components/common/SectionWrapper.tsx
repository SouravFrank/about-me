import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { SectionWrapperProps } from './types';

const SectionWrapper: React.FC<SectionWrapperProps> = ({ titleBold, titleLight, description, children, isDark }) => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  });

  // More nuanced opacity and translation transformations
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0]);
  const yTranslate = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [50, 0, 0, -50]);

  return (
    <motion.div 
      ref={sectionRef} 
      style={{ 
        opacity, 
        y: yTranslate
      }} 
      className={`py-5 px-8 w-full ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-black'}`}
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl font-thin tracking-wide mb-4">
          {titleBold}
          <span className="text-gold-600 font-semibold">{titleLight}</span>
        </h2>
        <p className="text-lg max-w-2xl mx-auto">{description}</p>
      </div>
      <div ref={contentRef}>
        {children}
      </div>
    </motion.div>
  );
};

export default SectionWrapper;