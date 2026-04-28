import React from 'react';
import { ExternalLink } from 'lucide-react';
import * as SimpleIcons from 'simple-icons';
import { ProjectCardProps } from './types';

const { siGithub } = SimpleIcons as any;

const GithubGlyph: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    role="img"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    fill="currentColor"
    dangerouslySetInnerHTML={{ __html: siGithub.svg.replace(/<svg[^>]*>|<\/svg>/g, '') }}
  />
);

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  thumbnail,
  githubLink,
  liveDemoLink,
  technologies,
}) => {
  return (
    <article
      className={`
        relative
        mb-8 
        lg:w-[30vw] 
        h-auto 
        w-[90vw]
        sm:h-[420px] 
        bg-white 
        dark:bg-gray-900/80 
        rounded-2xl 
        shadow-lg 
        dark:shadow-[0_0_20px_rgba(0,255,255,0.1)] 
        overflow-hidden 
        group 
        hover:shadow-2xl 
        dark:hover:shadow-[0_0_40px_rgba(0,255,255,0.3)] 
        transition-all 
        duration-300 
        hover:-translate-y-2 
        border 
        border-gray-200 
        dark:border-gray-700/50 
        hover:border-blue-300/50 
        dark:hover:border-purple-300/50
      `}
      data-no-animation-mobile
    >
      {/* Animated gradient border halo */}
      <div className="pointer-events-none absolute -inset-[1px] rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"
        style={{
          background: 'conic-gradient(from var(--ang,0deg), #3b82f6, #a855f7, #ec4899, #3b82f6)',
          filter: 'blur(14px)',
          animation: 'projectSpin 6s linear infinite',
        }}
      />
      <style>{`
        @keyframes projectSpin { to { --ang: 360deg; } }
        @property --ang { syntax: '<angle>'; inherits: false; initial-value: 0deg; }
      `}</style>

      {/* Inner wrapper to sit above halo */}
      <div className="relative z-10 bg-white dark:bg-gray-900/90 rounded-2xl h-full flex flex-col">
        {/* Thumbnail Section */}
        <div className="relative h-44 sm:h-44 overflow-hidden duration-300 group-hover:h-28 sm:group-hover:h-28 shrink-0">
          <img
            src={thumbnail}
            alt={`${title} project thumbnail`}
            className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-purple-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/0 via-transparent to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-700"></div>
        </div>

        {/* Content Section */}
        <div className="p-4 sm:p-5 flex-1 flex flex-col min-h-0">
          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold mb-2 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text dark:from-blue-400 dark:to-purple-400">
              {title}
            </span>
          </h3>

          {/* Description */}
          <p className="text-sm text-gray-700 dark:text-gray-300 mb-3 line-clamp-4 sm:line-clamp-3 group-hover:line-clamp-5 sm:group-hover:line-clamp-4 transition-all duration-300">
            {description}
          </p>

          {/* Technologies */}
          <div className="mb-4 flex flex-wrap gap-1.5">
            {technologies.map((tech, techIndex) => (
              <span
                key={techIndex}
                className="px-2 py-0.5 text-[11px] font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/50 hover:border-blue-300 dark:hover:border-blue-300/50 transition-all duration-200"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Links Section - Fancy buttons */}
          <div className="mt-auto flex flex-row items-center gap-3">
            {githubLink && (
              <a
                href={githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-gray-800 dark:text-white overflow-hidden group/btn border border-gray-300 dark:border-gray-700 bg-gradient-to-br from-gray-50 to-gray-200 dark:from-gray-800 dark:to-gray-900 hover:shadow-[0_8px_20px_-6px_rgba(0,0,0,0.4)] hover:-translate-y-0.5 transition-all duration-300"
                aria-label={`View ${title} on GitHub`}
              >
                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-white/40 dark:via-white/10 to-transparent" />
                <GithubGlyph className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:rotate-[360deg]" />
                <span className="relative z-10">GitHub</span>
              </a>
            )}

            {liveDemoLink && (
              <a
                href={liveDemoLink}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white overflow-hidden group/btn shadow-md hover:shadow-[0_8px_24px_-6px_rgba(168,85,247,0.6)] hover:-translate-y-0.5 transition-all duration-300"
                style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #a855f7 50%, #ec4899 100%)' }}
                aria-label={`View live demo of ${title}`}
              >
                <span className="absolute inset-0 -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-500 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                <ExternalLink className="w-4 h-4 relative z-10 transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
                <span className="relative z-10">Live Demo</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
