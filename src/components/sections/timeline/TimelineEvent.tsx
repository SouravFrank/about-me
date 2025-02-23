import { Briefcase, GraduationCap, Cake, MapPin, ChevronDown, ChevronUp, ExternalLink, Award } from 'lucide-react';
import { useState } from 'react';
import { TimelineItem } from './types';
import { motion } from 'framer-motion';

export default function TimelineEvent({
  title,
  company,
  companyUrl,
  location,
  specialization,
  date,
  type,
  highlights,
  description,
  responsibilities, 
  technologies,
  links,
  credLink,
}: TimelineItem) {
  const [isExpanded, setIsExpanded] = useState(false);

  const getIcon = () => {
    switch (type) {
      case 'personal':
        return Cake;
      case 'education':
        return GraduationCap;
      case 'certification':
        return Award;
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
      case 'certification':
        return 'from-yellow-500 to-orange-500';
      default:
        return 'from-emerald-500 to-teal-500';
    }
  };

  return (
    <motion.div 
      className="group relative flex gap-6 pb-8 last:pb-0"
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ 
        duration: 0.5,
        type: "spring",
        stiffness: 100,
        damping: 15
      }}
    >
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

            {/* Show Credentials link for certifications */}
            {type === 'certification' && credLink && (
              <div className="mt-2">
                <a href={credLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-blue-600">
                  Show Certifficate <ExternalLink className="h-3 w-3 inline" />
                </a>
              </div>
            )}

            {/* Collapsed Content */}
            {!isExpanded && description && (
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                {description}
              </p>
            )}

            {/* Expanded Content */}
            {isExpanded && (
              <>
                {responsibilities && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Key Responsibilities</h4>
                    <ul className="mt-2 space-y-2">
                      {responsibilities.map((resp, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className={`mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r ${getIconColor()}`} />
                          {resp}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Highlights */}
                {type !== 'personal' && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Highlights</h4>
                    <ul className="mt-2 space-y-2">
                      {highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
                          <span className={`mt-1.5 h-1.5 w-1.5 flex-none rounded-full bg-gradient-to-r ${getIconColor()}`} />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Special rendering for personal type cards */}
                {type === 'personal' && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {highlights[0]}
                    </p>
                  </div>
                )}

                {/* App Links */}
                {links && (
                  <div className="mt-4">
                    <h4 className="font-medium text-gray-900 dark:text-white">Available On</h4>
                    <div className="mt-2 space-y-2">
                      {/* CheapOair Links */}
                      <div className="flex gap-4">
                        <span className="text-sm text-gray-500 dark:text-gray-400">CheapOair:</span>
                        {links.playStore && (
                          <a href={links.playStore} target="_blank" rel="noopener noreferrer" 
                             className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
                            Play Store <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                        {links.appStore && (
                          <a href={links.appStore} target="_blank" rel="noopener noreferrer"
                             className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
                            App Store <ExternalLink className="h-3 w-3" />
                          </a>
                        )}
                      </div>
                      
                      {/* OneTravel Links */}
                      {links.oneTravel && (
                        <div className="flex gap-4">
                          <span className="text-sm text-gray-500 dark:text-gray-400">OneTravel:</span>
                          {links.oneTravel.playStore && (
                            <a href={links.oneTravel.playStore} target="_blank" rel="noopener noreferrer" 
                               className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
                              Play Store <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                          {links.oneTravel.appStore && (
                            <a href={links.oneTravel.appStore} target="_blank" rel="noopener noreferrer"
                               className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1">
                              App Store <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </>
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

            {/* Show More/Less Button - Hidden for birth card */}
            {type !== 'personal' && (description || responsibilities || highlights.length > 0) && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="mt-4 flex items-center gap-1 text-sm font-medium text-blue-500 hover:text-blue-600"
              >
                {isExpanded ? (
                  <>Show Less <ChevronUp className="h-4 w-4" /></>
                ) : (
                  <>Show More <ChevronDown className="h-4 w-4" /></>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}