import React from 'react';
import { motion } from 'framer-motion';
import { timelineAchievements } from '../../../data';
import trophyIcon from '../../../assets/icons/trophy.svg';
import { SectionWrapper } from '../../common';
import { RewardsRecognitionProps } from './types';
import { sectionData } from '../../../data/sectionData'; // Import the section data

const RewardsRecognition: React.FC<RewardsRecognitionProps> = ({ isDark }) => {
  return (
    <SectionWrapper titleBold={sectionData.rewards.titleBold} titleLight={sectionData.rewards.titleLight} description={sectionData.rewards.description} isDark={isDark}>
      <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6 ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        {timelineAchievements.map((achievement, index) => (
          <motion.div key={index} className="relative group flex-shrink-0">
            <div className={`rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 ${isDark ? 'bg-gray-800' : 'bg-white'}`} style={{ minHeight: '200px' }}>
              <div className="flex flex-col items-center p-4">
                <motion.img src={trophyIcon} alt="Trophy Icon" className="w-24 h-24 mx-auto transition-transform duration-300" whileHover={{ rotate: 10 }} transition={{ type: 'spring', stiffness: 300 }} />
                <h3 className={`text-lg font-semibold mb-1 text-center ${isDark ? 'text-white' : 'text-neutral-800'}`}>{achievement.title}</h3>
                <p className={`text-neutral-500 italic mb-2 text-center ${isDark ? 'text-gray-400' : 'text-neutral-500'}`}>{achievement.date}</p>
                <div className="flex flex-row items-center justify-center" style={{ height: 50 }}>
                  <img
                    src={achievement.companyImage}
                    style={{ height: 'auto', width: '50%', filter: isDark && achievement.company === 'Narula Institute of Technology' ? 'brightness(1.9)' : 'none' }} // Brighten the logo in dark mode
                  />
                </div>
              </div>

              <div className={`absolute inset-0 flex items-center justify-center bg-opacity-0 group-hover:bg-opacity-95 transition duration-300 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <motion.img
                  src={achievement.image} // Use the image path from the achievement data
                  alt={achievement.title}
                  className="w-full h-32 object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                />
                <div className={`p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDark ? 'text-gray-300' : 'text-neutral-700'}`}>
                  <p>
                    {achievement.highlights[0]} {/* Display the description as a paragraph */}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default RewardsRecognition;
