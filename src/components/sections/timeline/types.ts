export type TimelineItemType = 'work' | 'education' | 'personal' | 'certification';

export interface TimelineItem {
  title: string;
  company?: string;
  companyUrl?: string;
  specialization?: string;
  location?: string;
  date: string;
  icon: string;
  type: TimelineItemType;
  highlights: string[];
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
  links?: Record<string, { playStore?: string; appStore?: string }>;
  credLink?: string;
  isMobile?: boolean;
}

export interface TimelineSectionProps {
  isMobile?: boolean;
}