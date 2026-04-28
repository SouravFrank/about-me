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
      description: 'Cross-platform product engineering spanning native modules, releases, performance tuning, and polished UI delivery.',
      expertise: 9,
    },
    {
      name: 'React',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      description: 'Production React apps with responsive architecture, route systems, offline support, and reusable UI foundations.',
      expertise: 9,
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
      description: 'Server-side JavaScript for REST APIs, automation, app support services, and product integrations.',
      expertise: 7,
    },
    {
      name: 'Express.js',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg',
      description: 'Lean API layers powering promotions, internal tools, and connected mobile-web user journeys.',
      expertise: 7,
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
      description: 'Static typing and safer architecture across React, React Native, shared packages, and enterprise-scale features.',
      expertise: 8,
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
      expertise: 7,
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
      expertise: 8,
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
    {
      name: 'Lottie',
      src: 'https://stp-v4-cdn.lottiefiles.com/Lottie_Creator_d015ee2074.svg',
      description: 'Library for rendering animations in web and mobile applications',
      expertise: 7,
    },
    {
      name: 'Expo',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
      description: 'Fast React Native iteration and tooling for prototyping, team enablement, and product delivery.',
      expertise: 8,
    },
    {
      name: 'IndexedDB',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/chrome/chrome-original.svg',
      description: 'Offline-first browser persistence and sync queue patterns for network-sensitive workflows.',
      expertise: 7,
    },
    {
      name: 'Storybook',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/storybook/storybook-original.svg',
      description: 'Component libraries and UI documentation systems shared across web and mobile teams.',
      expertise: 7,
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
      name: 'Azure DevOps',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuredevops/azuredevops-original.svg',
      description: 'Planning, sprint coordination, release management, and enterprise delivery workflows.',
    },
    {
      name: 'Firebase',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg',
      description: 'Crashlytics, Analytics, Cloud Messaging, and performance monitoring for production-grade apps.',
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
      name: 'Figma',
      src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg',
      description: 'Design-to-code handoff, spec alignment, and pixel-precise UI implementation.',
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
      name: 'Prompt Engineering',
      src: 'prompt',
      description: 'Certified prompt design for reliable AI-assisted engineering and content workflows.',
    },
    {
      name: 'Vibe Coding',
      src: 'code',
      description: 'Fast, high-quality development using Cursor, Claude Code, GitHub Copilot, and OpenAI Codex.',
    },
    {
      name: 'Adaptability',
      src: 'adapt',
      description: 'Quick to learn and adapt to new technologies and situations',
    },
    {
      name: 'Big Picture Thinking',
      src: 'strategy',
      description: 'Architecture-level thinking across product scope, team structure, and long-term maintainability.',
    },
    {
      name: 'Analytical & Problem Solving',
      src: 'analysis',
      description: 'Strong capability in breaking down and solving complex problems',
    },
    {
      name: 'Teamwork & Leadership',
      src: 'team',
      description: 'Technical leadership, mentoring, PR approvals, stakeholder alignment, and release ownership.',
    },

  ],
};
