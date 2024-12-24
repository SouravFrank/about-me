import React from 'react';
import madeWithLoveImage from '/images/loveIndiaWeb.png'; // Adjust the path as necessary
import { FooterProps } from './types';
import { SectionWrapper } from '../index';

const Footer: React.FC<FooterProps> = ({ isDark }) => {
  return (
    <SectionWrapper 
      isDark={isDark} 
      titleBold="Let's Collaborate!" 
      titleLight="" 
      description="I'm always open to new opportunities and collaborations. If you have a project in mind or just want to chat about technology, feel free to reach out!"
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