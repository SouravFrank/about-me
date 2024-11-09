import { motion } from 'framer-motion';
import { Facebook, Instagram, Github, Linkedin, MessageCircle } from 'lucide-react';
import { socialMediaLinks } from '../data/social';

const socialIcons = [
  {
    name: 'facebook',
    icon: Facebook,
    href: socialMediaLinks.facebook,
    color: '#4267b2',
    background: '#4267b2'
  },
  {
    name: 'instagram',
    icon: Instagram,
    href: socialMediaLinks.instagram,
    color: '#d9317a',
    background: `radial-gradient(circle farthest-corner at 35% 90%, #fec564, transparent 50%),
                radial-gradient(circle farthest-corner at 0 140%, #fec564, transparent 50%),
                radial-gradient(ellipse farthest-corner at 0 -25%, #5258cf, transparent 50%),
                radial-gradient(ellipse farthest-corner at 20% -50%, #5258cf, transparent 50%),
                radial-gradient(ellipse farthest-corner at 100% 0, #893dc2, transparent 50%),
                radial-gradient(ellipse farthest-corner at 60% -20%, #893dc2, transparent 50%),
                radial-gradient(ellipse farthest-corner at 100% 100%, #d9317a, transparent),
                linear-gradient(#6559ca, #bc318f 30%, #e33f5f 50%, #f77638 70%, #fec66d 100%)`
  },
  {
    name: 'github',
    icon: Github,
    href: socialMediaLinks.github,
    color: '#211f1f',
    background: '#211f1f'
  },
  {
    name: 'linkedin',
    icon: Linkedin,
    href: socialMediaLinks.linkedin,
    color: '#0e76a8',
    background: '#0e76a8'
  },
  {
    name: 'whatsapp',
    icon: MessageCircle,
    href: socialMediaLinks.whatsapp,
    color: '#25d366',
    background: '#25d366'
  }
];

export default function SocialLinks() {
  return (
    <motion.div 
      className="h-[70px] flex flex-row gap-4 m-[25px_0px_20px_0px]"
      initial={{ x: -100 }}
      animate={{ x: 0 }}
      transition={{ duration: 0.5 }}
    >
      {socialIcons.map(({ name, icon: Icon, href, color, background }) => (
        <motion.a
          key={name}
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="relative inline-block bg-white w-[60px] h-[60px] text-center overflow-hidden rounded-[28%] shadow-[0_5px_15px_-5px_rgba(0,0,0,0.3)] opacity-[0.99] group"
          whileHover={{ scale: 1.02 }}
        >
          <div
            className="content-[''] w-[120%] h-[120%] absolute top-[90%] left-[-110%] transform rotate-45 group-hover:top-[-10%] group-hover:left-[-10%] transition-all duration-[0.35s] ease-[cubic-bezier(0.31,-0.105,0.43,1.59)]"
            style={{ background }}
          />
          <Icon
            size={24}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.35s] ease-[cubic-bezier(0.31,-0.105,0.43,1.59)] z-10"
            style={{ color: `${color}` }}
            strokeWidth={2}
          />
          <Icon
            size={24}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-[0.35s] ease-[cubic-bezier(0.31,-0.105,0.43,1.59)] z-20 opacity-0 group-hover:opacity-100 text-white"
            strokeWidth={2}
          />
        </motion.a>
      ))}
    </motion.div>
  );
} 