import React from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectSectionProps } from './types';

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