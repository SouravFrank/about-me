import React from 'react';
import { motion } from 'framer-motion';
import madeWithLoveImage from '../../assets/images/loveIndiaWeb.png'; // Adjust the path as necessary
import { FooterProps } from './types';
import { SectionWrapper } from '../index';
import { sectionData } from '../../data/sectionData';
// import TechStack from '../layout/TechStack';

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  return (
    <SectionWrapper
      isDark={isDark}
      titleBold={sectionData.footer.titleBold}
      titleLight={sectionData.footer.titleLight}
      description={sectionData.footer.description}
    >
      <div className="max-w-7xl mx-auto text-center px-4 py-8">
        <img
          src={madeWithLoveImage}
          alt="Made with Love from India"
          className="w-3/4 md:w-2/3 lg:w-1/2 mx-auto mb-8 filter transition duration-300 ease-in-out dark:invert"
        />

        {/* Futuristic Copyright Section */}
        <motion.div
          className="mt-12 pt-4 border-t border-gray-300 dark:border-gray-700"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-sm font-light tracking-wide text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} Sourav Sadhukhan. All rights reserved.
          </p>
        </motion.div>
      </div>
    </SectionWrapper>
  );
};

export default Footer;