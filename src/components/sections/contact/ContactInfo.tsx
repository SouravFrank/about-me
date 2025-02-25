import { motion } from 'framer-motion';
import { Mail, Phone, MapPin } from 'lucide-react';
import SocialLinks from './SocialLinks';
import { ContactInfoProps } from './types';
import { contactInfo } from '../../../data';

export default function ContactInfo({ }: ContactInfoProps) {
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
      <h3 className="text-2xl font-bold mb-6 md:mb-8">Contact Information</h3>

      <div className="space-y-4 md:space-y-6 mb-8 md:mb-12" style={{
        marginLeft: '-10px',
        marginRight: '-10px'
      }} >
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
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-blue-50 dark:bg-gray-700 flex items-center justify-center mr-3 md:mr-4 group-hover:bg-blue-100 dark:group-hover:bg-gray-600 transition-colors duration-300 flex-shrink-0">
                <Icon className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 truncate">{info.title}</p>
                <p className="font-medium text-sm md:text-base break-words">{info.value}</p>
              </div>
            </motion.a>
          );
        })}
      </div>

      <SocialLinks />
    </>
  );
}
