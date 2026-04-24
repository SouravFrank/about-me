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
      className={`relative overflow-hidden py-8 px-4 md:px-8 w-full ${isDark ? 'bg-gray-900 text-white' : 'text-black'}`}
    >
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-r from-fuchsia-500/10 via-cyan-400/10 to-amber-300/10 blur-3xl"
        animate={{ x: ['-8%', '8%', '-8%'], opacity: [0.35, 0.6, 0.35] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
      />
      <div className={`text-center ${children && 'mb-8 md:mb-16'} dark:text-gray-300 light:text-gray-600`}>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className={`text-3xl md:text-5xl font-thin tracking-wide mb-2 md:mb-4 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}
        >
          {titleBold}
          <motion.span
            className={`inline-block font-bold ${isDark ? 'text-gray-100' : 'text-gray-800'}`}
            animate={{ textShadow: ['0 0 0 rgba(255,255,255,0)', '0 0 18px rgba(255,255,255,0.18)', '0 0 0 rgba(255,255,255,0)'] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut' }}
          >
            {titleLight}
          </motion.span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, delay: 0.12, ease: 'easeOut' }}
          className={`text-base md:text-lg max-w-2xl mx-auto ${isDark ? 'text-gray-400' : 'text-gray-700'}`}
        >
          {description}
        </motion.p>
      </div>
      <div ref={contentRef}>{children}</div>
    </motion.div>
  );
};

export default SectionWrapper;