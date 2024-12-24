export type TimelineItemType = 'work' | 'education' | 'achievement' | 'certification' | 'personal';

export interface TimelineItem {
  title: string;
  company?: string;
  location?: string;
  date: string;
  icon: TimelineItemType;
  highlights: string[];
}

export interface TimelineEventProps extends TimelineItem {
  index: number;
}
