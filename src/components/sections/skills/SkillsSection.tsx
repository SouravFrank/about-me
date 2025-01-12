import { skills } from '../../../data';
import { SectionWrapper } from '../../common';
import SkillCard from './SkillCard';
import { Skill, SkillsSectionProps } from './types';
import { sectionData } from '../../../data/sectionData';

export const SkillsSection = ({ isDark }: SkillsSectionProps) => (
  <SectionWrapper isDark={isDark} titleBold={sectionData.skills.titleBold} titleLight={sectionData.skills.titleLight} description={sectionData.skills.description}>
    <div className="max-w-6xl mx-auto">
      {Object.entries(skills).map(([category, items]) => (
        <div key={category} className="mb-12 last:mb-0">
          <h3 className="text-2xl font-semibold mb-6">{category.charAt(0).toUpperCase() + category.slice(1)}</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {items.map((skill: Skill, index: number) => (
              <SkillCard key={index} {...skill} index={index} />
            ))}
          </div>
        </div>
      ))}
    </div>
  </SectionWrapper>
);
