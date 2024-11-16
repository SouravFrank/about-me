import React from 'react';
import { ChevronLeft, ChevronRight, Github } from 'lucide-react';

interface ProjectCardProps {
  title: string;
  description: string;
  thumbnail: string;
  githubLink: string;
}

export const ProjectCard: React.FC<ProjectCardProps> = ({ title, description, thumbnail, githubLink }) => {
  return (
    <div className="w-[30vw] min-w-[30vw] mx-4 bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden group transition-all duration-300 hover:-translate-y-2">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={thumbnail} 
          alt={title} 
          className="w-full h-full object-cover transform transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-white">{title}</h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">{description}</p>
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors duration-300"
        >
          <Github className="w-5 h-5 mr-2" />
          <span>View on GitHub</span>
        </a>
      </div>
    </div>
  );
};