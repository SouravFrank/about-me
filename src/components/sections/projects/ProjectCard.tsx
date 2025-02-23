import React from 'react';
import { Github, ExternalLink } from 'lucide-react';
import { ProjectCardProps } from './types';

export const ProjectCard: React.FC<ProjectCardProps> = ({
  title,
  description,
  thumbnail,
  githubLink,
  liveDemoLink,
  technologies,
  index,
  isLastCard,
}) => {
  return (
    <article
      className={`mb-12 w-[30vw] h-[400px] mx-0 bg-white dark:bg-gray-900/80 rounded-2xl shadow-lg dark:shadow-[0_0_20px_rgba(0,255,255,0.1)] overflow-hidden group hover:shadow-xl dark:hover:shadow-[0_0_40px_rgba(0,255,255,0.3)] transition-all duration-300 hover:-translate-y-2 mt-2 border border-gray-200 dark:border-gray-700/50 hover:border-blue-300/50 dark:hover:border-purple-300/50 ${isLastCard ? 'mr-6' : ''
        } ${index === 0 ? 'ml-6' : ''}`}
    >
      {/* Thumbnail Section */}
      <div className="relative h-48 overflow-hidden duration-300 group-hover:h-28">
        <img
          src={thumbnail}
          alt={`${title} project thumbnail`}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-500/10 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 border-b border-blue-300/10 group-hover:border-purple-300/30 transition-all duration-500"></div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        {/* Title with Gradient Text */}
        <h3 className="text-xl font-bold mb-3 transform transition-all duration-300 group-hover:text-sm group-hover:mb-2">
          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text dark:from-blue-400 dark:to-purple-400">
            {title}
          </span>
        </h3>

        {/* Description (Neutral Color) */}
        <p className="text-base text-gray-700 dark:text-gray-300 mb-4 line-clamp-2 transition-all duration-300 group-hover:line-clamp-none group-hover:text-sm group-hover:text-gray-600 dark:group-hover:text-gray-200">
          {description}
        </p>

        {/* Technologies with Solid Text Color */}
        <div className="mb-4 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-300 border border-blue-200 dark:border-blue-500/20 rounded-full hover:bg-blue-200 dark:hover:bg-blue-800/50 hover:border-blue-300 dark:hover:border-blue-300/50 transition-all duration-200"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links Section */}
        <div className="flex items-center space-x-4">
          {/* GitHub Link */}
          {githubLink && <a
            href={githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 transition-colors duration-300 group"
            aria-label={`View ${title} on GitHub`}
          >
            <Github
              className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            />
            <span className="group-hover:underline">View on GitHub</span>
          </a>}

          {/* Live Demo Link */}
          {liveDemoLink && <a
            href={liveDemoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-purple-600 dark:text-purple-400 hover:text-purple-500 dark:hover:text-purple-300 transition-colors duration-300 group"
            aria-label={`View live demo of ${title}`}
          >
            <ExternalLink
              className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300"
              aria-hidden="true"
            />
            <span className="group-hover:underline">Live Demo</span>
          </a>}
        </div>
      </div>

      {/* Hover Gradient Overlays */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -inset-1 bg-gradient-to-b from-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </article>
  );
};