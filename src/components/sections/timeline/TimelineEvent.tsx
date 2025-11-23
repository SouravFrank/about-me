import { useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Cake, ChevronDown, ChevronUp, ExternalLink, Award, MapPin, Calendar } from 'lucide-react';
import { TimelineItem } from './types';
import { trackEvent, ANALYTICS_CATEGORIES } from '../../../utils/analytics';

const TimelineEvent: React.FC<TimelineItem> = ({
  title, company, companyUrl, location, specialization, date, type, highlights, description, responsibilities, technologies, links, credLink, isMobile, }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'personal': return Cake;
      case 'education': return GraduationCap;
      case 'certification': return Award;
      default: return Briefcase;
    }
  };

  const Icon = getIcon();

  const getGradientColors = () => {
    switch (type) {
      case 'personal': return { from: 'from-purple-500', to: 'to-pink-500', text: 'text-purple-500', bg: 'bg-purple-500' };
      case 'education': return { from: 'from-blue-500', to: 'to-cyan-500', text: 'text-blue-500', bg: 'bg-blue-500' };
      case 'certification': return { from: 'from-yellow-500', to: 'to-orange-500', text: 'text-yellow-500', bg: 'bg-yellow-500' };
      default: return { from: 'from-emerald-500', to: 'to-teal-500', text: 'text-emerald-500', bg: 'bg-emerald-500' };
    }
  };

  const colors = getGradientColors();
  const gradientClass = `bg-gradient-to-r ${colors.from} ${colors.to}`;

  const hasExpandableContent = description || responsibilities || (highlights && highlights.length > 0);
  const hasFooter = (technologies && technologies.length > 0) || hasExpandableContent;

  return (
    <motion.div
      className={`relative ${isMobile ? 'mb-8' : 'flex items-start gap-8 pb-12 last:pb-0'}`}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      {/* Timeline Line (Desktop) */}
      {!isMobile && (
        <div className="absolute left-[2.25rem] top-14 -bottom-4 w-0.5 bg-gradient-to-b from-gray-200 via-gray-200 to-transparent dark:from-gray-800 dark:via-gray-800 last:hidden" />
      )}

      {/* Icon Column */}
      <div className={`flex-none ${isMobile ? 'mb-4 flex items-start gap-4' : 'pt-2'}`}>
        <div className="relative flex h-14 w-14 items-center justify-center flex-none">
          {/* Animated Glow Behind Icon */}
          <div className={`absolute inset-0 rounded-2xl ${gradientClass} opacity-20 blur-xl animate-pulse`} />

          {/* Icon Container */}
          <div className={`relative flex h-14 w-14 items-center justify-center rounded-2xl bg-white dark:bg-gray-900 shadow-xl ring-1 ring-gray-100 dark:ring-gray-800 z-10 group overflow-hidden`}>
            {/* Hover Gradient Effect */}
            <div className={`absolute inset-0 ${gradientClass} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
            <Icon className={`h-6 w-6 ${colors.text} transition-transform duration-300 group-hover:scale-110`} />
          </div>
        </div>

        {/* Mobile Title Layout */}
        {isMobile && (
          <div className="flex-1 min-w-0 pt-1">
            <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight mb-1">
              {title}
            </h3>
            <div className="flex flex-col gap-0.5 text-sm text-gray-600 dark:text-gray-400">
              <span className={`font-medium ${colors.text}`}>{company}</span>
              {location && (
                <span className="text-xs text-gray-500 dark:text-gray-500 flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {location}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Content Card */}
      <div className={`flex-1 relative group`}>
        {/* Animated Border Gradient */}
        <div className={`absolute -inset-[1px] rounded-2xl ${gradientClass} opacity-30 blur-sm transition-opacity duration-500 group-hover:opacity-60 group-hover:blur-md`} />

        <div className="relative rounded-2xl bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl shadow-sm ring-1 ring-gray-200/50 dark:ring-gray-800/50 p-5 sm:p-6 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5">

          {/* Desktop Header */}
          {!isMobile && (
            <div className={`flex flex-col sm:flex-row sm:items-start justify-between gap-4 ${description || specialization ? 'mb-4' : 'mb-2'}`}>
              <div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                  {title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                  {company && (
                    <div className="flex items-center gap-1.5 font-medium text-gray-700 dark:text-gray-300">
                      <Briefcase className="h-3.5 w-3.5 text-gray-400" />
                      {companyUrl ? (
                        <a href={companyUrl} target="_blank" rel="noopener noreferrer" className={`hover:${colors.text} transition-colors flex items-center gap-1`}>
                          {company}
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      ) : company}
                    </div>
                  )}
                  {location && (
                    <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                      <MapPin className="h-3.5 w-3.5" />
                      {location}
                    </div>
                  )}
                  {type === 'certification' && credLink && (
                    <a href={credLink} target="_blank" rel="noopener noreferrer" className={`flex items-center gap-1.5 font-medium ${colors.text} hover:underline`}>
                      <Award className="h-3.5 w-3.5" />
                      Show Certificate
                    </a>
                  )}
                </div>
              </div>

              <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 text-xs font-semibold whitespace-nowrap ${colors.text}`}>
                <Calendar className="h-3.5 w-3.5" />
                {date}
              </div>
            </div>
          )}

          {/* Mobile Date Badge */}
          {isMobile && (
            <div className="flex flex-wrap items-center gap-2 mb-4 text-xs">
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800 font-medium ${colors.text}`}>
                <Calendar className="h-3 w-3" />
                {date}
              </div>
              {type === 'certification' && credLink && (
                <a href={credLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 flex items-center gap-1 ml-auto">
                  Certificate <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          )}

          {/* Specialization / Subtitle */}
          {specialization && (
            <div className="mb-4 inline-block px-3 py-1 rounded-lg bg-gray-100/50 dark:bg-gray-800/50 text-sm font-medium text-gray-700 dark:text-gray-300">
              {specialization}
            </div>
          )}

          {/* Description Preview */}
          {!isExpanded && description && (
            <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed line-clamp-2">
              {description}
            </p>
          )}

          {/* Expanded Content */}
          <motion.div
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 0, opacity: isExpanded ? 1 : 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="pt-4 space-y-6">
              {/* Full Description */}
              {description && (
                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                  {description}
                </p>
              )}

              {/* Responsibilities */}
              {responsibilities && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${gradientClass}`} />
                    Key Responsibilities
                  </h4>
                  <ul className="grid gap-2">
                    {responsibilities.map((resp, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className={`mt-1.5 h-1 w-1 flex-none rounded-full bg-gray-300 dark:bg-gray-600`} />
                        {resp}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Highlights */}
              {highlights && highlights.length > 0 && type !== 'personal' && (
                <div>
                  <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${gradientClass}`} />
                    Key Achievements
                  </h4>
                  <ul className="grid gap-2">
                    {highlights.map((highlight, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-400">
                        <span className={`mt-1.5 h-1 w-1 flex-none rounded-full bg-gray-300 dark:bg-gray-600`} />
                        {highlight}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Personal Highlights */}
              {type === 'personal' && highlights && (
                <div className="p-4 rounded-xl bg-gray-50 dark:bg-gray-800/50 border border-gray-100 dark:border-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-300 italic">
                    "{highlights[0]}"
                  </p>
                </div>
              )}

              {/* Links */}
              {links && (
                <div className="flex flex-wrap gap-4 pt-2">
                  {Object.entries(links).map(([appName, appLinks]) => (
                    <div key={appName} className="flex items-center gap-2 text-sm">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{appName}:</span>
                      {appLinks.playStore && (
                        <a href={appLinks.playStore} target="_blank" rel="noopener noreferrer"
                          className="text-xs px-2 py-1 rounded-md bg-green-50 text-green-600 hover:bg-green-100 border border-green-200 transition-colors">
                          Play Store
                        </a>
                      )}
                      {appLinks.appStore && (
                        <a href={appLinks.appStore} target="_blank" rel="noopener noreferrer"
                          className="text-xs px-2 py-1 rounded-md bg-blue-50 text-blue-600 hover:bg-blue-100 border border-blue-200 transition-colors">
                          App Store
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>

          {/* Footer Actions & Tags */}
          {hasFooter && (
            <div className={`pt-4 border-t border-gray-100 dark:border-gray-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${isExpanded ? 'mt-5' : (description ? 'mt-4' : 'mt-2')}`}>
              {/* Technologies */}
              <div className="flex flex-wrap gap-1.5">
                {technologies?.slice(0, isExpanded ? undefined : 4).map((tech, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700"
                  >
                    {tech}
                  </span>
                ))}
                {!isExpanded && technologies && technologies.length > 4 && (
                  <span className="px-2.5 py-1 text-xs font-medium rounded-md bg-gray-50 dark:bg-gray-800/50 text-gray-500 border border-gray-100 dark:border-gray-800">
                    +{technologies.length - 4} more
                  </span>
                )}
              </div>

              {/* Toggle Button */}
              {hasExpandableContent && (
                <button
                  onClick={() => {
                    setIsExpanded(!isExpanded);
                    trackEvent('timeline_toggle', {
                      category: ANALYTICS_CATEGORIES.TIMELINE,
                      action: isExpanded ? 'collapse' : 'expand',
                      item_title: title,
                      item_type: type
                    });
                  }}
                  className={`flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${colors.text} hover:opacity-80 transition-opacity ml-auto sm:ml-0`}
                >
                  {isExpanded ? (
                    <>Show Less <ChevronUp className="h-3.5 w-3.5" /></>
                  ) : (
                    <>Read More <ChevronDown className="h-3.5 w-3.5" /></>
                  )}
                </button>
              )}
            </div>
          )}

        </div>
      </div>
    </motion.div>
  );
};

export default TimelineEvent;