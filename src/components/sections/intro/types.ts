export interface IntroSectionProps {
  personalInfo: {
    name: string;
    location: string;
    email: string;
    phone: string;
    profileImage: string;
  };
}

export interface IntroAnimationProps {
  texts?: string[];
  interval?: number;
} 