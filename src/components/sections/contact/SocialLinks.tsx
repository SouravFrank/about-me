import React from 'react';
import { motion } from 'framer-motion';
import { socialIcons } from './socialIcons.tsx';
import { SocialIcon } from './types';

const SocialLinks: React.FC = () => {
  return (
    <motion.div 
      className="h-[60px] flex flex-row gap-3 md:gap-4 flex-wrap"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {socialIcons.map(({ name, icon: Icon, href, color, background }: SocialIcon) => (
        <motion.a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block w-[50px] h-[50px] md:w-[60px] md:h-[60px] text-center overflow-hidden rounded-[28%] shadow-[0_5px_15px_-5px_rgba(0,0,0,0.3)] opacity-[0.99] group dark:bg-gray-700"
          whileHover={{ scale: 1.18 }}
        >
          <div
            className="content-[''] w-[120%] h-[120%] absolute top-[90%] left-[-110%] transform rotate-45 group-hover:top-[-10%] group-hover:left-[-10%] transition-all duration-[0.35s] ease-[cubic-bezier(0.31,-0.105,0.43,1.59)]"
            style={{ background }}
          />
          <Icon
            size={24}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.35s] ease-[cubic-bezier(0.31,-0.105,0.43,1.59)] z-20 group-hover:text-white md:size-30"
            style={{ color }}
            strokeWidth={2}
          />
          <Icon
            size={20}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.35s] ease-[cubic-bezier(0.31,-0.105,0.43,1.59)] z-20 opacity-0 group-hover:opacity-100 text-white md:size-24"
            strokeWidth={2}
            style={{ color: '#fff' }}
          />
        </motion.a>
      ))}
    </motion.div>
  );
};

export default SocialLinks;