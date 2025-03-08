export interface TimelineItem {
  title: string;
  description: string;
  date: string;
  icon: string;
  subsection?: {
    title: string;
    description?: string;
    date: string;
  }[];
}

export interface Skill {
  title: string;
  src: string;
  description: string;
}

export interface ContactInfoItem {
  title: string;
  value: string;
  link: string;
}

export interface SocialMedia {
  facebook: string;
  instagram: string;
  github: string;
  linkedin: string;
  whatsapp: string;
}

export interface PersonalInfo {
  name: string;
  location: string;
  email: string;
  phone: string;
  profileImage: string;
  links: {
    linkedin: string;
    github: string;
    portfolio: string;
  };
  summary: string;
}

// Re-export types from component-specific type files for convenience
export * from '../components/sections/timeline/types';
export * from '../components/sections/contact/types';
export * from '../components/sections/skills/types';
export * from '../components/sections/projects/types';
export * from '../components/sections/articles/types';
export * from '../components/sections/intro/types';
export * from '../components/common/types';
export * from '../components/layout/types';