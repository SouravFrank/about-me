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

export interface ContactInfo {
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