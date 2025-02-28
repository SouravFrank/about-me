import React from 'react';
import { motion } from 'framer-motion';
import { socialIcons } from './socialIcons.tsx';
import { SocialIcon } from './types';

const SocialLinks: React.FC = () => {
  return (
    <motion.div
      className="h-[60px] "
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white dark:bg-gray-800 rounded-2xl gap-1 md:gap-4 flex flex-row flex-nowrap" >
        {socialIcons.map(({ name, icon: Icon, href, color, background }: SocialIcon) => (
          <motion.a
            key={name}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={"relative inline-block w-[60px] h-[60px] text-center overflow-hidden rounded-[28%] shadow-[0_5px_15px_-5px_rgba(0,0,0,0.3)] opacity-[0.99] group dark:bg-gray-700"}
            whileHover={{ scale: 1.18 }}
          >
            <div
              className="content-[''] w-[120%] h-[120%] absolute top-[90%] left-[-110%] transform rotate-45 group-hover:top-[-10%] group-hover:left-[-10%] transition-all duration-[0.35s] ease-[cubic-bezier(0.31,-0.105,0.43,1.59)]"
              style={{ background }}
            />
            <Icon
              size={30}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.35s] ease-[cubic-bezier(0.31,-0.105,0.43,1.59)] z-20 group-hover:text-white"
              style={{ color }}
              strokeWidth={2}
            />
            <Icon
              size={24}
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.35s] ease-[cubic-bezier(0.31,-0.105,0.43,1.59)] z-20 opacity-0 group-hover:opacity-100 text-white"
              strokeWidth={2}
              style={{ color: '#fff' }}
            />
          </motion.a>
        ))}
      </div>
    </motion.div>
  );
};

export default SocialLinks;