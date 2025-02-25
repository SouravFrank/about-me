import React from 'react';
import { motion } from 'framer-motion';
import madeWithLoveImage from '../../assets/images/loveIndiaWeb.png';
import { FooterProps } from './types';
import { SectionWrapper } from '../index';
import { sectionData } from '../../data/sectionData';

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  return (
    <SectionWrapper
      isDark={isDark}
      titleBold={sectionData.footer.titleBold}
      titleLight={sectionData.footer.titleLight}
      description={sectionData.footer.description}
    >
      <div className="max-w-7xl mx-auto text-center px-4 py-6 md:py-8 mb-6 md:mb-0">
        <img
          src={madeWithLoveImage}
          alt="Made with Love from India"
          className="w-full md:w-3/4 lg:w-2/3 mx-auto mb-0 md:mb-8 filter transition duration-300 ease-in-out dark:invert"
        />

        <motion.div
          className="mt-8 md:mt-12 pt-4 border-t border-gray-300 dark:border-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-xs md:text-sm font-light tracking-wide text-gray-600 dark:text-gray-400">
            © {new Date().getFullYear()} Sourav Sadhukhan. All rights reserved.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Footer;