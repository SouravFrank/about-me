export interface SectionWrapperProps {
  children: React.ReactNode;
  isDark: boolean;
  titleBold: string;
  titleLight: string;
  description: string;
  className?: string;
  opacityPosition?: number;
}

export interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  scrollSpeed?: number;
}
