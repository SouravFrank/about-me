import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Github, Linkedin, MessageCircle } from 'lucide-react';
import type { ContactInfo, SocialMedia } from '../types';

interface ContactInfoProps {
  personalInfo: ContactInfo[];
  socialLinks: SocialMedia;
}

export default function ContactInfo({ personalInfo, socialLinks }: ContactInfoProps) {
  const getIcon = (title: string) => {
    switch (title.toLowerCase()) {
      case 'email':
        return Mail;
      case 'call':
        return Phone;
      case 'location':
        return MapPin;
      default:
        return Mail;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
        {personalInfo.map((info, index) => {
          const Icon = getIcon(info.title);
          return (
            <motion.a
              key={index}
              href={info.link}
              className="shadow-neumorph p-4 rounded-lg flex items-center justify-center"
              whileHover={{ scale: 1.05 }}
            >
              <Icon className="w-6 h-6 mr-2" />
              <span>{info.value}</span>
            </motion.a>
          );
        })}
      </div>
      
      <div className="flex justify-center space-x-6">
        {[
          { icon: Facebook, href: socialLinks.facebook },
          { icon: Instagram, href: socialLinks.instagram },
          { icon: Github, href: socialLinks.github },
          { icon: Linkedin, href: socialLinks.linkedin },
          { icon: MessageCircle, href: socialLinks.whatsapp },
        ].map(({ icon: Icon, href }, index) => (
          <motion.a
            key={index}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="shadow-neumorph p-3 rounded-full"
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <Icon className="w-6 h-6" />
          </motion.a>
        ))}
      </div>
    </div>
  );
}