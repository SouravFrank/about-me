export interface DownloadButtonProps {
  isDark: boolean;
  cvPath?: string;
  className?: string;
  text?: string;
  icon?: React.ReactNode;
  onClick?: () => void;
}

export interface CVDownloadSectionProps {
  isDark: boolean;
  titleBold?: string;
  titleLight?: string;
  description?: string;
  cvPath?: string;
}

export interface DownloadCVProps extends CVDownloadSectionProps {
  onDownload?: () => void;
}
