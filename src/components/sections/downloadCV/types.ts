export interface DownloadButtonProps {
  isDark: boolean;
  cvPath?: string;
  className?: string;
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface DownloadCVSectionProps {
  isDark: boolean;
  titleBold?: string;
  titleLight?: string;
  description?: string;
  cvPath?: string;
}
