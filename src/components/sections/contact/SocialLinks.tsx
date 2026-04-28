import React from 'react';
import { motion } from 'framer-motion';
import { socialIcons } from './socialIcons.tsx';
import { SocialIcon, SocialLinksProps } from './types';
import { trackEvent, ANALYTICS_CATEGORIES } from '../../../utils/analytics';

const SocialLinks: React.FC<SocialLinksProps> = () => {
  const handleSocialClick = (name: string, href: string) => {
    trackEvent('social_click', {
      category: ANALYTICS_CATEGORIES.SOCIAL,
      platform: name,
      destination: href,
    });
  };

  return (
    <motion.div
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
    >
      {/* Removed strict height/overflow restrictions here to allow the 
        heavy skeuomorphic drop-shadows and hover scaling from socialIcons.tsx 
        to bleed out naturally without being clipped.
      */}
      <div className="bg-transparent dark:bg-transparent flex flex-row flex-wrap items-center justify-center gap-2 md:gap-4 p-4 rounded-2xl">
        {socialIcons.map(({ name, icon: Icon, href }: SocialIcon) => (
          <motion.a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => handleSocialClick(name, href)}
            // Framer motion wrapper to coordinate entry staggering if needed, 
            // but styling is delegated entirely to the skeuomorphic IconComponent
            className="relative block"
            whileTap={{ scale: 0.9 }}
          >
            <Icon />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialLinks;