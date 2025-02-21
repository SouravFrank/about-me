import React from 'react';
import madeWithLoveImage from '../../assets/images/loveIndiaWeb.png'; // Adjust the path as necessary
import { FooterProps } from './types';
import { SectionWrapper } from '../index';
import { sectionData } from '../../data/sectionData'; // Import sectionData

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  return (
    <SectionWrapper 
      isDark={isDark} 
      titleBold={sectionData.footer.titleBold} // Use titleBold from sectionData.footer
      titleLight={sectionData.footer.titleLight} // Use titleLight from sectionData.footer
      description={sectionData.footer.description} // Use description from sectionData.footer
    >
      <div className="max-w-7xl mx-auto text-center px-4 py-8">
        <img 
          src={madeWithLoveImage} 
          alt="Made with Love from India" 
          className="w-3/4 md:w-2/3 lg:w-1/2 mx-auto mb-4 filter transition duration-300 ease-in-out dark:invert" 
        />
      </div>
    </SectionWrapper>
  );
};

export default Footer; 