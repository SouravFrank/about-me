import { skills } from '../../../data';
import { SectionWrapper } from '../../common';
import SkillCard from './SkillCard';
import MobileSkillCard from './MobileSkillCard';
import { Skill, SkillsSectionProps } from './types';
import { sectionData } from '../../../data/sectionData';
import useIsMobile from '../../../hooks/isMobile';

export const SkillsSection = ({ isDark }: SkillsSectionProps) => {
  const isMobile = useIsMobile();

  return (
    <SectionWrapper isDark={isDark} titleBold={sectionData.skills.titleBold} titleLight={sectionData.skills.titleLight} description={sectionData.skills.description} opacityPosition={0.8}>
      <div className="max-w-6xl mx-auto">
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="mb-10 md:mb-12 last:mb-0">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 md:mb-6">
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-8">
              {items.map((skill: Skill, index: number) =>
                isMobile ? (
                  <MobileSkillCard key={index} {...skill} index={index} />
                ) : (
                  <SkillCard key={index} {...skill} index={index} />
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};
