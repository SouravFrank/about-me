import { Briefcase, GraduationCap, Cake, MapPin } from 'lucide-react';
import { TimelineItem } from './types';

export default function TimelineEvent({
  title,
  company,
  location,
  specialization,
  date,
  type,
  highlights,
  technologies,
}: TimelineItem) {
  const getIcon = () => {
    switch (type) {
      case 'personal':
        return Cake;
      case 'education':
        return GraduationCap;
      default:
        return Briefcase;
    }
  };

  const Icon = getIcon();
  
  // Dynamic color based on type
  const getIconColor = () => {
    switch (type) {
      case 'personal':
        return 'from-purple-500 to-pink-500';
      case 'education':
        return 'from-blue-500 to-cyan-500';
      default:
        return 'from-emerald-500 to-teal-500';
    }
  };

  return (
    <div className="group relative flex gap-6 pb-8 last:pb-0">
      {/* Modern timeline line with gradient */}
      <div className="absolute left-9 top-12 -bottom-3 w-px bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-800 last:hidden" />

      {/* Icon column with glassmorphism */}
      <div className="flex-none pt-0.5">
        <div className="relative flex h-10 w-10 items-center justify-center">
          {/* Gradient background */}
          <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${getIconColor()} opacity-20 blur-xl`} />
          {/* Glassmorphism effect */}
          <div className="absolute inset-0 rounded-xl bg-white/30 backdrop-blur-md dark:bg-gray-950/30" />
          {/* Icon container with dynamic gradient */}
          <div className={`relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${getIconColor()} shadow-lg ring-1 ring-white/20 backdrop-blur-sm`}>
            <Icon className="h-5 w-5 text-white" />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1">
        <div className="relative rounded-xl bg-white/50 p-4 shadow-lg ring-1 ring-gray-200/50 backdrop-blur-lg transition-all duration-200 hover:shadow-xl dark:bg-gray-900/50 dark:ring-gray-800/50 group-hover:ring-blue-500/20">
          {/* Gradient overlay */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/50 to-transparent opacity-20 dark:from-gray-900/50" />
          
          {/* Content wrapper */}
          <div className="relative">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {title}
                  {company && (
                    <span className="text-gray-600 dark:text-gray-400"> @ {company}</span>
                  )}
                </h3>
                {specialization && (
                  <p className="mt-0.5 text-sm text-gray-600 dark:text-gray-400">
                    {specialization}
                  </p>
                )}
              </div>
              <time className="flex-none text-sm font-medium text-gray-500 dark:text-gray-400">
                {date}
              </time>
            </div>

            {/* Location with modern icon */}
            {location && (
              <div className="mt-2 flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-gray-500/80 dark:text-gray-400/80" />
                <p className="text-sm text-gray-600 dark:text-gray-400">{location}</p>
              </div>
            )}

            {/* Highlights with modern bullets */}
            {highlights.length > 0 && (
              <ul className="mt-4 space-y-3">
                {highlights.map((highlight, idx) => (
                  <li
                    key={idx}
                    className="relative pl-6 text-sm text-gray-700 dark:text-gray-300"
                  >
                    <span className={`absolute left-0 top-1.5 h-1.5 w-1.5 rounded-full bg-gradient-to-r ${getIconColor()}`} />
                    {highlight}
                  </li>
                ))}
              </ul>
            )}

            {/* Technologies with glassmorphism */}
            {technologies && technologies.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className="relative inline-flex items-center rounded-full bg-blue-500/10 px-3 py-1 text-xs font-medium backdrop-blur-sm"
                  >
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/20 to-cyan-500/20" />
                    <span className="relative text-blue-700 dark:text-blue-300">{tech}</span>
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}