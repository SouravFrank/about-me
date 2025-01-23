import React from 'react';
import { timelineAchievements } from '../../../data';
import { SectionWrapper } from '../../common';
import RewardCard from './RewardCard';
import { RewardsRecognitionProps } from './types';
import { sectionData } from '../../../data/sectionData';

const RewardsRecognition: React.FC<RewardsRecognitionProps> = ({ isDark }) => {
  return (
    <SectionWrapper
      isDark={isDark}
      titleBold={sectionData.rewards.titleBold}
      titleLight={sectionData.rewards.titleLight}
      description={sectionData.rewards.description}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-6 max-w-7xl mx-auto">
        {timelineAchievements.map((reward, index) => (
          <RewardCard key={index} {...reward} index={index} isDark={isDark} />
        ))}
      </div>
    </SectionWrapper>
  );
};

export default RewardsRecognition;
