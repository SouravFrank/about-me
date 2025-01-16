export interface FooterProps {
  isDark: boolean;
}

export interface GradientBlobCursorProps {
  children: React.ReactNode;
  isDarkMode: boolean;
}

export interface GoToTopProps {
  scrollThreshold?: number;
}

export interface ThemeToggleProps {
  isDark: boolean;
  toggle: () => void;
}

export interface PreloaderProps {}
