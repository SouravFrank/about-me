import React from 'react';
import { ProjectCard } from './ProjectCard';
import { ProjectSectionProps } from './types';
import { projects } from '../../../data';

const ProjectSection: React.FC<ProjectSectionProps> = () => {
  return (
    <>
      {projects.map((project, index) => (
        <div key={index} className="snap-start shrink-0" style={{ minWidth: 'fit-content' }}>
          <ProjectCard {...project} index={index} isLastCard={index === projects.length - 1} />
        </div>
      ))}
    </>
  );
};

export default ProjectSection; 