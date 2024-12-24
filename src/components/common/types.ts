export interface SectionWrapperProps {
  children: React.ReactNode;
  isDark: boolean;
  titleBold: string;
  titleLight: string;
  description: string;
  className?: string;
}

export interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  scrollSpeed?: number;
}
