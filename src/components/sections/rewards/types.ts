export interface Achievement {
  title: string;
  company: string;
  location?: string;
  date: string;
  highlights: string[];
  image: string;
  companyImage: string;
}

export interface AchievementSectionDetails {
  titleBold: string;
  titleLight: string;
  description: string;
}

export interface RewardProps {
  achievement: Achievement;
  isDark: boolean;
  index: number;
}

export interface RewardsRecognitionProps {
  achievements: Achievement[];
  sectionDetails: AchievementSectionDetails;
  isDark: boolean;
}
