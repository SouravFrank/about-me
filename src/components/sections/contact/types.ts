import { LucideIcon } from 'lucide-react';
import { ReactElement } from 'react';

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
  icon: LucideIcon | ((props: WhatsAppIconProps) => ReactElement);
  href: string;
  color: string;
  background: string;
}

export type SocialLinksProps = Record<string, never>;

export type ContactInfoProps = Record<string, never>;

export type ContactFormProps = Record<string, never>;

export interface ContactSectionProps {
  isDark: boolean;
}

export interface LocationMapProps {
  isDark: boolean;
}
