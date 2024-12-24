import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { ContactInfoProps } from './types';

export default function ContactInfo({ contactInfo }: ContactInfoProps) {
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
      <SocialLinks />
    </>
  );
}