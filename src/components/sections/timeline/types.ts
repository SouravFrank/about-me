export type TimelineItemType = 'work' | 'education' | 'achievement' | 'certification' | 'personal';

export interface TimelineItem {
  title: string;
  company?: string;
  specialization?: string;
  location?: string;
  date: string;
  icon: string;
  type: TimelineItemType;
  highlights: string[];
  technologies?: string[];
  links?: {
    playStore?: string;
    appStore?: string;
    oneTravel?: {
      playStore: string;
      appStore: string;
    };
  };
}