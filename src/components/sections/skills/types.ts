export interface Skill {
  name: string;
  src: string;
  description: string;
  expertise?: number;
}

export interface SkillCardProps extends Skill {
  index: number;
}

export interface SkillsSectionProps {
  skills: Skill[];
}
