import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, GraduationCap, Cake, ChevronDown, ChevronUp, ExternalLink, Award } from 'lucide-react';
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

  const getIconColor = () => {
    switch (type) {
      case 'personal': return 'from-purple-500 to-pink-500';
      case 'education': return 'from-blue-500 to-cyan-500';
      case 'certification': return 'from-yellow-500 to-orange-500';
      default: return 'from-emerald-500 to-teal-500';
    }
  };

  return (
    <motion.div
      className={`relative ${isMobile ? 'mb-4' : 'flex gap-6 pb-8 last:pb-0'}`}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Desktop Timeline Line */}
      {!isMobile && (
        <div className="absolute left-9 top-12 -bottom-3 w-px bg-gradient-to-b from-gray-200 to-transparent dark:from-gray-800 last:hidden" />
      )}

      {/* Icon Column (Desktop) / Header Icon (Mobile) */}
      {isMobile ? (
        <div className="flex items-center gap-3 pt-4">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br ${getIconColor()} shadow-md`}>
            <Icon className="h-4 w-4 text-white" />
          </div>
          <h3 className="text-base font-semibold text-gray-900 dark:text-white truncate">
            {title}
          </h3>
        </div>
      ) : (
        <div className="flex-none pt-0.5">
          <div className="relative flex h-10 w-10 items-center justify-center">
            <div className={`absolute inset-0 rounded-xl bg-gradient-to-br ${getIconColor()} opacity-20 blur-xl`} />
            <div className="absolute inset-0 rounded-xl bg-white/30 backdrop-blur-md dark:bg-gray-950/30" />
            <div className={`relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br ${getIconColor()} shadow-lg ring-1 ring-white/20`}>
              <Icon className="h-5 w-5 text-white" />
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className={isMobile ? 'pb-4 w-full' : 'flex-1'}>
        <div className={`relative rounded-xl bg-white dark:bg-gray-900 shadow-md overflow-hidden ${isMobile ? 'mt-2' : 'p-4 backdrop-blur-lg ring-1 ring-gray-200/50 dark:ring-gray-800/50 transition-all duration-200 hover:shadow-xl'}`}>
          {/* Desktop Gradient Overlay */}
          {!isMobile && (
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/50 to-transparent opacity-20 dark:from-gray-900/50" />
          )}

          <div className={isMobile ? 'p-3' : 'relative'}>
            {/* Desktop Header */}
            {!isMobile && (
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {title}
                    {company && (
                      <span className="text-gray-600 dark:text-gray-400">
                        {' '}@ {companyUrl ? (
                          <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 inline-flex items-center">
                            {company}
                            <ExternalLink className="ml-1 h-3 w-3" />
                          </a>
                        ) : company}
                      </span>
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
            )}

            {/* Mobile Header Details */}
            {isMobile && (
              <div className="flex flex-col space-y-2">
                <time className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {date}
                </time>
                <div className="text-xs text-gray-600 dark:text-gray-400 flex flex-wrap gap-x-3 gap-y-1">
                  {company && (
                    <span>
                      {companyUrl ? (
                        <a href={companyUrl} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 flex items-center">
                          {company}
                          <ExternalLink className="ml-1 h-3 w-3" />
                        </a>
                      ) : company}
                    </span>
                  )}
                  {specialization && <span>{specialization}</span>}
                </div>
              </div>
            )}

            {/* Certification Link */}
            {type === 'certification' && credLink && (
              <div className={isMobile ? 'mt-3' : 'mt-2'}>
                <a href={credLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600 text-sm">
                  Show Certificate <ExternalLink className="inline h-3 w-3" />
                </a>
              </div>
            )}

            {/* Collapsed Description */}
            {!isExpanded && description && (
              <p className={`mt-2 text-gray-600 dark:text-gray-400 ${isMobile ? 'text-sm' : 'text-sm'}`}>
                {description}
              </p>
            )}

            {/* Expanded Content */}
            {isExpanded && (
              <div className={isMobile ? 'mt-3' : ''}>
                {responsibilities && (
                  <div className={isMobile ? 'mb-4' : 'mt-4'}>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">Key Responsibilities</h4>
                    <ul className="mt-2 space-y-2">
                      {responsibilities.map((resp, idx) => (
                        <li key={idx} className={`flex items-start gap-2 text-gray-700 dark:text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          <span className={`mt-1 h-1 w-1 flex-none rounded-full bg-gradient-to-r ${getIconColor()}`} />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {type !== 'personal' && (
                  <div className={isMobile ? 'mb-4' : 'mt-4'}>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">Highlights</h4>
                    <ul className="mt-2 space-y-2">
                      {highlights.map((highlight, idx) => (
                        <li key={idx} className={`flex items-start gap-2 text-gray-700 dark:text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                          <span className={`mt-1 h-1 w-1 flex-none rounded-full bg-gradient-to-r ${getIconColor()}`} />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {type === 'personal' && (
                  <div className={isMobile ? 'mb-4' : 'mt-4'}>
                    <p className={`text-gray-700 dark:text-gray-300 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                      {highlights[0]}
                    </p>
                  </div>
                )}

                {links && (
                  <div className={isMobile ? 'mb-4' : 'mt-4'}>
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">Available On</h4>
                    <div className={`mt-2 ${isMobile ? 'space-y-2' : 'space-y-2'}`}>
                      <div className="flex flex-wrap gap-3">
                        <span className={`text-gray-500 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>CheapOair:</span>
                        {links.playStore && (
                          <a href={links.playStore} target="_blank" rel="noopener noreferrer"
                            className={`text-blue-500 hover:text-blue-600 flex items-center gap-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            Play Store <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        {links.appStore && (
                          <a href={links.appStore} target="_blank" rel="noopener noreferrer"
                            className={`text-blue-500 hover:text-blue-600 flex items-center gap-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                            App Store <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      {links.oneTravel && (
                        <div className="flex flex-wrap gap-3">
                          <span className={`text-gray-500 dark:text-gray-400 ${isMobile ? 'text-xs' : 'text-sm'}`}>OneTravel:</span>
                          {links.oneTravel.playStore && (
                            <a href={links.oneTravel.playStore} target="_blank" rel="noopener noreferrer"
                              className={`text-blue-500 hover:text-blue-600 flex items-center gap-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              Play Store <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          {links.oneTravel.appStore && (
                            <a href={links.oneTravel.appStore} target="_blank" rel="noopener noreferrer"
                              className={`text-blue-500 hover:text-blue-600 flex items-center gap-1 ${isMobile ? 'text-xs' : 'text-sm'}`}>
                              App Store <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Technologies */}
            {technologies && technologies.length > 0 && (
              <div className={`mt-3 flex flex-wrap ${isMobile ? 'gap-1' : 'gap-2'}`}>
                {technologies.map((tech, idx) => (
                  <span
                    key={idx}
                    className={`inline-flex items-center rounded-full bg-gray-100 dark:bg-gray-800 ${isMobile ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-xs'} font-medium text-gray-700 dark:text-gray-300`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            )}

            {/* Expand/Collapse Button */}
            {type !== 'personal' && (description || responsibilities || highlights.length > 0) && (
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
                className={`w-full mt-3 flex items-center justify-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600 py-2 ${isMobile ? 'bg-gray-100 dark:bg-gray-800 rounded-b-xl' : ''}`}
              >
                {isExpanded ? (
                  <>Collapse <ChevronUp className="h-4 w-4" /></>
                ) : (
                  <>Expand <ChevronDown className="h-4 w-4" /></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default TimelineEvent;