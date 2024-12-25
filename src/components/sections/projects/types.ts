export interface Project {
  title: string;
  description: string;
  thumbnail: string;
  githubLink: string;
}

export interface ProjectCardProps extends Project {
  index?: number;
}

export interface ProjectSectionProps {}
