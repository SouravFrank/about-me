export interface Project {
  title: string;
  description: string;
  thumbnail: string;
  githubLink?: string;
  liveDemoLink?: string;
  technologies: string[];
}

export interface ProjectCardProps {
  title: string;
  description: string;
  thumbnail: string;
  githubLink?: string;
  technologies: string[];
  index: number;
  isLastCard: boolean;
  liveDemoLink?: string;
}

export interface ProjectSectionProps {}
