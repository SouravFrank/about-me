import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Award, BookOpen } from 'lucide-react';
import type { TimelineItem } from '../data/timelineBornEducation';

interface TimelineEventProps extends TimelineItem {
  index: number;
}

export default function TimelineEvent({ 
  title, 
  company, 
  location, 
  date, 
  icon, 
  type,
  highlights,
  technologies,
  index 
}: TimelineEventProps) {
  // Map icon types to Lucide icons
  const getIcon = () => {
    switch (type) {
      case 'work':
        return Briefcase;
      case 'education':
        return GraduationCap;
      case 'achievement':
        return Award;
      case 'certification':
        return BookOpen;
      default:
        return Briefcase;
    }
  };

  const Icon = getIcon();

  return (
    <motion.div
      className="flex gap-4 mb-8 relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="w-32 text-right">
        <span className="font-medium text-sm opacity-75">{date}</span>
      </div>
      <div className="w-12 flex items-center justify-center relative">
        <div className="absolute h-full w-0.5 bg-gray-300 dark:bg-gray-700" />
        <motion.div
          className="z-10 p-2 rounded-full shadow-neumorph bg-white dark:bg-gray-800"
          whileHover={{ scale: 1.1 }}
        >
          <Icon className="w-5 h-5 text-blue-500" />
        </motion.div>
      </div>
      <motion.div
        className="flex-1 shadow-neumorph p-4 rounded-lg"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="font-bold text-lg">{title}</h3>
        <p className="text-sm opacity-75 mt-1">
          {company} • {location}
        </p>
        
        {/* Highlights */}
        {highlights.length > 0 && (
          <ul className="mt-4 space-y-2">
            {highlights.map((highlight, idx) => (
              <li key={idx} className="text-sm pl-4 border-l-2 border-blue-500">
                {highlight}
              </li>
            ))}
          </ul>
        )}

        {/* Technologies */}
        {technologies && technologies.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {technologies.map((tech, idx) => (
              <span 
                key={idx}
                className="px-2 py-1 text-xs rounded-full bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
              >
                {tech}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}