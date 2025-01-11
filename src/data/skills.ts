// Define the Skill interface for individual skill items
export interface Skill {
  name: string;
  src: string;
  description: string;
  expertise?: number;
}

// Define the SkillsData interface for the overall skills structure
export interface SkillsData {
  technical: Skill[];
  tools: Skill[];
  additional: Skill[];
}

// Define the skills object with type annotation
export const skills: SkillsData = {
  technical: [
    {
      name: 'React Native',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      description: 'Cross-platform mobile framework for building native apps',
      expertise: 8,
    },
    {
      name: 'React',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      description: 'Front-end library for building user interfaces',
      expertise: 8,
    },
    {
      name: 'Redux',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg',
      description: 'State management library for JavaScript applications',
      expertise: 9,
    },
    {
      name: 'Node.js',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg',
      description: 'JavaScript runtime for server-side development',
      expertise: 6,
    },
    {
      name: 'Express.js',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
      description: 'Web application framework for Node.js',
      expertise: 5,
    },
    {
      name: 'JavaScript',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
      description: 'Core programming language for web development',
      expertise: 8,
    },
    {
      name: 'TypeScript',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
      description: 'Superset of JavaScript that adds static types',
      expertise: 4,
    },
    {
      name: 'HTML5',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
      description: 'Markup language for structuring web content',
      expertise: 5,
    },
    {
      name: 'CSS3',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
      description: 'Style sheet language for web design',
      expertise: 5,
    },
    {
      name: 'Material UI',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/materialui/materialui-original.svg',
      description: 'React component library for faster and easier web development',
      expertise: 4,
    },
    {
      name: 'Axios',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/axios/axios-plain.svg',
      description: 'Promise-based HTTP client for the browser and Node.js',
      expertise: 6,
    },
    {
      name: 'Socket.io',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/socketio/socketio-original.svg',
      description: 'Library for real-time web applications',
      expertise: 4,
    },
    {
      name: 'Bash',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bash/bash-original.svg',
      description: 'Scripts for automation in Unix/Linux environments',
      expertise: 6,
    },
    
  ],
  tools: [
    {
      name: 'XCode',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/xcode/xcode-original.svg',
      description: 'IDE for iOS app development',
    },
    {
      name: 'Android Studio',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/androidstudio/androidstudio-original.svg',
      description: 'IDE for Android app development',
    },
    {
      name: 'Azure',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg',
      description: 'Cloud computing platform for deployment and CI/CD',
    },
    {
      name: 'Firebase',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg',
      description: 'Platform for mobile and web application development',
    },
    {
      name: 'Swagger',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/swagger/swagger-original.svg',
      description: 'API documentation and testing tool',
    },
    {
      name: 'Git',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg',
      description: 'Version control system for tracking changes in code',
    },
    {
      name: 'Postman',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg',
      description: 'API development environment for testing and documentation',
    },
    {
      name: 'Jira',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg',
      description: 'Project management tool for agile teams',
    },
    {
      name: 'npm',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/npm/npm-original-wordmark.svg',
      description: 'Package manager for JavaScript',
    },
    {
      name: 'SonarQube',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sonarqube/sonarqube-original.svg',
      description: 'Continuous inspection tool for code quality',
    },
  ],
  additional: [
    {
      name: 'Big Picture Thinking',
      src: 'strategy',
      description: 'Ability to understand and plan for large-scale solutions',
    },
    {
      name: 'Analytical & Problem Solving',
      src: 'analysis',
      description: 'Strong capability in breaking down and solving complex problems',
    },
    {
      name: 'Teamwork & Leadership',
      src: 'team',
      description: 'Experience in leading teams and collaborating effectively',
    },
    {
      name: 'Adaptability',
      src: 'adapt',
      description: 'Quick to learn and adapt to new technologies and situations',
    },
  ],
};
