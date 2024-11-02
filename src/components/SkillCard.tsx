import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import type { Skill } from '../types';

interface SkillCardProps extends Skill {
  index: number;
}

export default function SkillCard({ title, src, description, index }: SkillCardProps) {
  const logoUrl = `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${src}/${src}-original.svg`;

  return (
    <motion.div
      className="shadow-neumorph p-6 rounded-lg group relative"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center">
            <img src={logoUrl} alt={title} className="w-10 h-10" />
          </div>
          <h3 className="text-xl font-bold">{title}</h3>
        </div>
      </div>
      
      <motion.div
        className="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between"
        initial={false}
      >
        <p className="text-lg">{description}</p>
        <motion.a
          href={`https://www.google.com/search?q=${title}+programming`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-500 hover:text-blue-600 mt-4"
          whileHover={{ x: 5 }}
        >
          Learn More <ExternalLink className="w-4 h-4 ml-1" />
        </motion.a>
      </motion.div>
    </motion.div>
  );
}