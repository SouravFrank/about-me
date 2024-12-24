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

export interface ContactInfoProps {
  contactInfo: ContactInfoItem[];
  socialLinks: SocialMedia;
}

export interface ContactFormProps {
  onSubmit?: (data: any) => void;
}
