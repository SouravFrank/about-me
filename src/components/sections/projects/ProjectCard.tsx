import React from 'react';
import { Github } from 'lucide-react';
import { ProjectCardProps } from './types';

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, thumbnail, githubLink, technologies, index, isLastCard }) => {
  return (
    <article className={"mb-12 w-[30vw] h-[400px] mx-0 bg-gray-900/50 dark:bg-gray-900/80 rounded-2xl shadow-[0_0_20px_rgba(0,255,255,0.1)] overflow-hidden group hover:shadow-[0_0_40px_rgba(0,255,255,0.3)] transition-all duration-300 hover:-translate-y-2 mt-2 border border-gray-700/50 hover:border-cyan-300/50 "+(isLastCard ? "mr-6" : "") + (index === 0 ? "ml-6" : "")}>
      <div className="relative h-48 overflow-hidden duration-300 group-hover:h-28">
        <img
          src={thumbnail}
          alt={`${title} project thumbnail`}
          className="w-full h-full object-cover transform transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-cyan-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute inset-0 border-b border-cyan-300/10 group-hover:border-cyan-300/30 transition-all duration-500"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-cyan-300 transform transition-all duration-300 group-hover:text-sm group-hover:mb-2 group-hover:text-cyan-200">
          {title}
        </h3>
        <p className="text-base text-gray-300 mb-4 line-clamp-2 transition-all duration-300 group-hover:line-clamp-none group-hover:text-sm group-hover:text-gray-200">
          {description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-cyan-900/30 text-cyan-300 border border-cyan-500/20 rounded-full hover:bg-cyan-900/50 hover:border-cyan-300/50 transition-all duration-200">
              {tech}
            </span>
          ))}
        </div>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-cyan-300 hover:text-cyan-200 transition-colors duration-300 group"
          aria-label={`View ${title} on GitHub`}>
          <Github className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform duration-300" aria-hidden="true" />
          <span className="group-hover:underline">View on GitHub</span>
        </a>
      </div>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div className="absolute -inset-1 bg-gradient-to-b from-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      </div>
    </article>
  );
};