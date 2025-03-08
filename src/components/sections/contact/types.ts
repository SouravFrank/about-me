import { LucideIcon } from 'lucide-react';

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

export interface WhatsAppIconProps {
  className?: string;
  size?: number | string;
  style?: React.CSSProperties;
  strokeWidth?: number;
}

export interface SocialIcon {
  name: 'facebook' | 'instagram' | 'github' | 'linkedin' | 'whatsapp';
  icon: LucideIcon | ((props: WhatsAppIconProps) => JSX.Element);
  href: string;
  color: string;
  background: string;
}

export interface SocialLinksProps {}
