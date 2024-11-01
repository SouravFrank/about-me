import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Cake } from 'lucide-react';
import type { TimelineItem } from '../types';

interface TimelineEventProps extends TimelineItem {
  index: number;
}

export default function TimelineEvent({ title, description, date, icon, subsection, index }: TimelineEventProps) {
  const Icon = icon === 'work' ? Briefcase : icon === 'study' ? GraduationCap : Cake;

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
        <h3 className="font-bold">{title}</h3>
        <p className="text-sm opacity-75 mt-1">{description}</p>
        {subsection && (
          <div className="mt-4 space-y-3">
            {subsection.map((sub, idx) => (
              <div key={idx} className="pl-4 border-l-2 border-blue-500">
                <h4 className="font-medium">{sub.title}</h4>
                {sub.description && <p className="text-sm opacity-75">{sub.description}</p>}
                <span className="text-xs opacity-75">{sub.date}</span>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}