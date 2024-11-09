import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Facebook, Instagram, Github, Linkedin, MessageCircle } from 'lucide-react';
import type { ContactInfoItem, SocialMedia } from '../types';

interface ContactInfoProps {
  contactInfo: ContactInfoItem[];
  socialLinks: SocialMedia;
}

export default function ContactInfo({ contactInfo, socialLinks }: ContactInfoProps) {
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
    <>
      <h3 className="text-2xl font-bold mb-8">Contact Information</h3>
      
      {/* Contact Details */}
      <div className="space-y-6 mb-12">
        {contactInfo.map((info, index) => {
          const Icon = getIcon(info.title);
          return (
            <motion.a
              key={index}
              href={info.link}
              target={info.title === 'Location' ? '_blank' : undefined}
              rel={info.title === 'Location' ? 'noopener noreferrer' : undefined}
              className="flex items-center group hover:text-blue-500 transition-colors duration-300"
              whileHover={{ x: 5 }}
            >
              <div className="w-12 h-12 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center mr-4 group-hover:bg-blue-100 dark:group-hover:bg-gray-600 transition-colors duration-300">
                <Icon className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{info.title}</p>
                <p className="font-medium">{info.value}</p>
              </div>
            </motion.a>
          );
        })}
      </div>
      
      {/* Social Links */}
      <div>
        <h4 className="text-lg font-semibold mb-4">Connect With Me</h4>
        <div className="flex gap-4">
          {[
            { icon: Linkedin, href: socialLinks.linkedin, label: 'LinkedIn', color: 'bg-[#0077B5]' },
            { icon: Github, href: socialLinks.github, label: 'GitHub', color: 'bg-[#333]' },
            { icon: Facebook, href: socialLinks.facebook, label: 'Facebook', color: 'bg-[#1877F2]' },
            { icon: Instagram, href: socialLinks.instagram, label: 'Instagram', color: 'bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#F77737]' },
            { icon: MessageCircle, href: socialLinks.whatsapp, label: 'WhatsApp', color: 'bg-[#25D366]' },
          ].map(({ icon: Icon, href, label, color }, index) => (
            <motion.a
              key={index}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className={`w-10 h-10 ${color} rounded-lg flex items-center justify-center text-white hover:opacity-90 transition-opacity duration-300`}
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.95 }}
              title={label}
            >
              <Icon className="w-5 h-5" />
            </motion.a>
          ))}
        </div>
      </div>
      </>
  );
}