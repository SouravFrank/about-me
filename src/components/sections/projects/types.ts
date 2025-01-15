export interface Project {
  title: string;
  description: string;
  thumbnail: string;
  githubLink: string;
}

export interface ProjectCardProps {
  title: string;
  description: string;
  thumbnail: string;
  githubLink: string;
  technologies: string[];
}

export interface ProjectSectionProps {}
