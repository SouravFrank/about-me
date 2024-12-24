import { motion } from 'framer-motion';
import { Facebook, Instagram, Github, Linkedin } from 'lucide-react';
import { socialMediaLinks } from '../../../data';

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
    icon: ({ className, size, style }) => (
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width={size} 
        height={size} 
        viewBox="0 0 24 24"
        className={className}
        style={style}
        fill="currentColor"
        stroke="none"
      >
        <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
      </svg>
    ),
    color: '#25d366',
    background: '#25d366'
  }
];

export default function SocialLinks() {
  return (
    <motion.div 
      className="h-[70px] flex flex-row gap-4"
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
    </motion.div>
  );
}