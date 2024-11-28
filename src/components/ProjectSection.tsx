import React from 'react';
import { ProjectCard } from './ProjectCard';

interface ProjectSectionProps {
  projects: {
    title: string;
    description: string;
    thumbnail: string;
    githubLink: string;
  }[];
}

const ProjectSection: React.FC<ProjectSectionProps> = ({ projects }) => {
  return (
    <>
      {projects.map((project, index) => (
        <div key={index} className="snap-start shrink-0" style={{ minWidth: 'fit-content' }}>
          <ProjectCard {...project} />
        </div>
      ))}
    </>
  );
};

export default ProjectSection; 