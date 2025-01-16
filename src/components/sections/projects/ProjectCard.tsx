import React from 'react';
import { Github } from 'lucide-react';
import { ProjectCardProps } from './types';

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, thumbnail, githubLink, technologies, index, isLastCard }) => {
  return (
    <article className={"mb-12 w-[30vw] h-[400px] mx-0 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group hover:shadow-xl transition-all duration-100 hover:-translate-y-2 mt-2 hover:border-4 border-gray-300 dark:border-gray-700 "+(isLastCard ? "mr-6" : "") + (index === 0 ? "ml-6" : "")}>
      <div className="relative h-48 overflow-hidden duration-100 group-hover:h-28">
        <img
          src={thumbnail}
          alt={`${title} project thumbnail`}
          className="w-full h-full object-cover transform transition-transform duration-500"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white transform transition-all duration-300 group-hover:text-xs group-hover:mb-2">
          {title}
        </h3>
        <p className="text-base text-gray-600 dark:text-gray-400 mb-4 line-clamp-2 transition-all duration-100 group-hover:line-clamp-none group-hover:text-sm">
          {description}
        </p>
        <div className="mb-4 flex flex-wrap gap-2">
          {technologies.map((tech, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 rounded-full">
              {tech}
            </span>
          ))}
        </div>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
          aria-label={`View ${title} on GitHub`}>
          <Github className="w-5 h-5 mr-2" aria-hidden="true" />
          <span>View on GitHub</span>
        </a>
      </div>
    </article>

  );
};