export const skills = {
  technical: [
    { 
      name: "React Native", 
      src: "react", 
      description: "Cross-platform mobile framework for building native apps" 
    },
    { 
      name: "React", 
      src: "react", 
      description: "Front-end library for building user interfaces" 
    },
    { 
      name: "Redux", 
      src: "redux", 
      description: "State management library for JavaScript applications" 
    },
    { 
      name: "Node.js", 
      src: "nodejs", 
      description: "JavaScript runtime for server-side development" 
    },
    { 
      name: "Express.js", 
      src: "express", 
      description: "Web application framework for Node.js" 
    },
    { 
      name: "JavaScript", 
      src: "javascript", 
      description: "Core programming language for web development" 
    },
    { 
      name: "HTML5", 
      src: "html5", 
      description: "Markup language for structuring web content" 
    },
    { 
      name: "CSS3", 
      src: "css3", 
      description: "Style sheet language for web design" 
    }
  ],
  tools: [
    { 
      name: "XCode", 
      src: "xcode", 
      description: "IDE for iOS app development" 
    },
    { 
      name: "Android Studio", 
      src: "android", 
      description: "IDE for Android app development" 
    },
    { 
      name: "Azure", 
      src: "azure", 
      description: "Cloud computing platform for deployment and CI/CD" 
    },
    { 
      name: "Firebase", 
      src: "firebase", 
      description: "Platform for mobile and web application development" 
    }
  ],
  additional: [
    { 
      name: "Big Picture Thinking",
      src: "strategy",
      description: "Ability to understand and plan for large-scale solutions"
    },
    { 
      name: "Analytical & Problem Solving",
      src: "analysis",
      description: "Strong capability in breaking down and solving complex problems"
    },
    { 
      name: "Teamwork & Leadership",
      src: "team",
      description: "Experience in leading teams and collaborating effectively"
    },
    { 
      name: "Adaptability",
      src: "adapt",
      description: "Quick to learn and adapt to new technologies and situations"
    }
  ]
};

// Add TypeScript interface for type safety
export interface Skill {
  name: string;
  src: string;
  description: string;
}

export interface SkillsData {
  technical: Skill[];
  tools: Skill[];
  additional: Skill[];
} 