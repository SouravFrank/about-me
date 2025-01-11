export interface ContactInfoItem {
  title: string;
  value: string;
  link: string;
}

export interface SocialMedia {
  facebook: string;
  instagram: string;
  github: string;
  linkedin: string;
  whatsapp: string;
}

// Define the type for social icons
export interface SocialIcon {
  name: string;
  icon: React.FC<any>; // Adjust the type based on how the icon is used
  href: string;
  color: string;
  background: string;
}

export interface ContactInfoProps {}

export interface ContactFormProps {
  onSubmit?: (data: any) => void;
}

export interface ContactSectionProps {
  isDark: boolean;
}
