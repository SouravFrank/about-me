import { motion } from 'framer-motion';
import { ExternalLink, Brain, BarChart2, Users, Workflow } from 'lucide-react';
import type { Skill } from '../data/skills';

interface SkillCardProps extends Skill {
  index: number;
}

export default function SkillCard({ name, src, description, expertise, index }: SkillCardProps) {
  const getIcon = (src: string) => {
    // Special cases for soft skills with dynamic color classes
    const softSkillIcons: Record<string, JSX.Element> = {
      strategy: <Brain className="w-10 h-10 text-blue-500 dark:text-blue-400" />,
      analysis: <BarChart2 className="w-10 h-10 text-green-500 dark:text-green-400" />,
      team: <Users className="w-10 h-10 text-purple-500 dark:text-purple-400" />,
      adapt: <Workflow className="w-10 h-10 text-orange-500 dark:text-orange-400" />,
    };

    if (softSkillIcons[src]) {
      return softSkillIcons[src];
    }

    // For technical skills
    return (
      <img
        src={src}
        alt={name}
        className={`w-10 h-10 ${['express', 'socketio', 'bash'].includes(src.toLowerCase()) ? 'dark:invert dark:brightness-100 dark:transition-all' : ''}`}
        onError={(e) => {
          const target = e.target as HTMLImageElement;
          target.style.display = 'none';
        }}
      />
    );
  };

  return (
    <motion.div className="shadow-neumorph p-6 rounded-lg group relative overflow-hidden bg-white dark:bg-gray-800" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
      {/* Static content */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center">{getIcon(src)}</div>
          <h3 className="text-xl font-bold dark:text-white">{name}</h3>
        </div>
      </div>
      {expertise !== undefined && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2 mb-3">
          <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${(expertise / 5) * 100}%` }}></div>
        </div>
      )}
      {/* Hover content */}
      <motion.div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" initial={false}>
        <div className="p-4 h-full flex flex-col justify-between">
          <p className="text-base dark:text-gray-200 leading-relaxed">{description}</p>
          <motion.a href={`https://www.google.com/search?q=${encodeURIComponent(name)}+skill+development`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium mt-2" whileHover={{ x: 5 }}>
            Learn More <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </motion.a>
        </div>
      </motion.div>
    </motion.div>
  );
}
