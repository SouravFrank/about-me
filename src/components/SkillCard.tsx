import { motion } from 'framer-motion';
import { ExternalLink, Brain, BarChart2, Users, Workflow } from 'lucide-react';
import type { Skill } from '../data/skills';

interface SkillCardProps extends Skill {
  index: number;
}

export default function SkillCard({ name, src, description, index }: SkillCardProps) {
  const getIcon = (src: string) => {
    // Special cases for soft skills
    const softSkillIcons: Record<string, JSX.Element> = {
      strategy: <Brain className="w-10 h-10 text-blue-500" />,
      analysis: <BarChart2 className="w-10 h-10 text-green-500" />,
      team: <Users className="w-10 h-10 text-purple-500" />,
      adapt: <Workflow className="w-10 h-10 text-orange-500" />
    };

    if (softSkillIcons[src]) {
      return softSkillIcons[src];
    }

    // For technical skills, use the original devicon logic
    const logoUrl = src; // Directly use the src from the skills object

    console.log(src, "logoUrl:: ", logoUrl);
    return (
      <img 
        src={logoUrl} 
        alt={name} 
        className="w-10 h-10"
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    );
  };

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
            {getIcon(src)}
          </div>
          <h3 className="text-xl font-bold">{name}</h3>
        </div>
      </div>
      
      <motion.div
        className="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between"
        initial={false}
      >
        <p className="text-lg">{description}</p>
        <motion.a
          href={`https://www.google.com/search?q=${encodeURIComponent(name)}+skill+development`}
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