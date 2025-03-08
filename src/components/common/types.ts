export interface SectionWrapperProps {
  children?: React.ReactNode;
  isDark: boolean;
  titleBold: string;
  titleLight: string;
  description: string;
  className?: string;
  opacityPosition?: number;
}

export interface CTAButtonProps {
  label: string;
  onClick?: (e: Object) => void;
  variant?: 'colored' | 'white';
  Icon?: React.ElementType;
  downloadClicked?: boolean;
  disabled?: boolean;
}

export interface HorizontalScrollProps {
  children: React.ReactNode;
  className?: string;
  scrollSpeed?: number;
}

export interface VisitorCounterProps {
  appId: string;
}

export interface VisitorsData {
  [ip: string]: boolean;
}
