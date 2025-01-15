// Type definitions for better TypeScript support
export type TimelineItemType = 'work' | 'education' | 'personal';

export interface TimelineItem {
  title: string;
  company?: string;
  companyUrl?: string;
  specialization?: string;
  location?: string;
  date: string;
  icon: string;
  type: TimelineItemType;
  highlights: string[];
  description?: string;
  responsibilities?: string[];
  technologies?: string[];
  links?: {
    playStore?: string;
    appStore?: string;
  };
}

export const timelineData = [
  {
    title: 'Birth',
    location: 'Howrah, West Bengal, India',
    date: 'June 1998',
    icon: 'cake',
    type: 'personal',
    description: 'The beginning of my journey in this wonderful world! 🎉',
    highlights: ['A new star was born in Howrah, West Bengal!'],
  },
  {
    title: '10th Grade',
    company: 'Shibpur Dinobandhu Institution (Branch)',
    specialization: 'General',
    location: 'Howrah, West Bengal, India',
    date: 'March 2013',
    icon: 'study',
    type: 'education',
    highlights: [
      'Early exposure to computers sparked a lasting fascination with technology',
      'Started learning basic programming concepts through school computer lab',
      'Demonstrated natural aptitude for logical problem-solving',
    ],
  },
  {
    title: '12th Grade',
    company: 'Shibpur Dinobandhu Institution (Branch)',
    specialization: 'Science with Computer Science',
    location: 'Howrah, West Bengal, India',
    date: 'June 2013 - July 2015',
    icon: 'study',
    type: 'education',
    highlights: [
      'Chose Computer Science as a major subject, diving deep into programming fundamentals',
      'Developed first small applications using C++',
      'Active participant in school technical activities',
      'Discovered passion for software development through practical projects',
    ],
  },
  {
    title: 'B.Tech',
    company: 'Narula Institute of Technology',
    specialization: 'Electronics and Communication Engineering',
    location: 'Kolkata, West Bengal, India',
    date: 'August 2015 - June 2019',
    icon: 'study',
    type: 'education',
    highlights: [
      'Merged electronics knowledge with programming skills to create innovative solutions',
      'Led technical teams in college hackathons and projects',
      'Self-learned web development technologies alongside curriculum',
      'Received Technical Finesse Award for outstanding contributions',
      'Built several full-stack applications during final year',
    ],
  },
  {
    title: 'Assistant System Engineer',
    company: 'Tata Consultancy Services',
    companyUrl: 'https://www.tcs.com/',
    location: 'Kolkata, West Bengal, India',
    date: 'July 2019 - June 2020',
    icon: 'work',
    type: 'work',
    description: 'Kickstarted my professional journey with React Native development and DevOps practices.',
    responsibilities: [
      'Led development of Scan & Go mobile application for retail clients',
      'Implemented robust monitoring and alerting systems',
      'Optimized application performance and deployment workflows',
      'Collaborated with global teams for feature development',
    ],
    highlights: [
      'Successfully launched React Native shopping apps with 1M+ downloads',
      'Reduced application crash rate by 60% through robust error handling',
      'Implemented automated deployment pipelines reducing deployment time by 70%',
      'Recognized for exceptional problem-solving skills in critical situations',
    ],
    technologies: ['React Native', 'Node.js', 'PM2', 'Jenkins'],
  },
  {
    title: 'System Engineer',
    company: 'Tata Consultancy Services',
    companyUrl: 'https://www.tcs.com/',
    location: 'Kolkata, West Bengal, India',
    date: 'July 2020 - October 2021',
    icon: 'work',
    type: 'work',
    description: 'Led development of inventory management applications for ASDA, a Walmart subsidiary and major UK retail client.',
    responsibilities: [
      'Architected and developed enterprise-level inventory management solutions',
      'Led team of 5 developers in Agile environment',
      'Established coding standards and review processes',
      'Managed client communications and requirement gathering',
      'Mentored junior developers in React Native best practices',
    ],
    highlights: [
      'Built 3 critical inventory management apps for Walmart\'s UK subsidiary ASDA',
      'Created reusable component library reducing development time by 40%',
      'Improved app performance by 50% through code optimization',
      'Successfully managed distributed team across time zones',
      'Implemented modular architecture for better code maintainability',
    ],
    technologies: ['React Native', 'React Web', 'Express.js', 'Redux'],
  },
  {
    title: 'Mobile Application Developer',
    company: 'Fareportal',
    companyUrl: 'https://www.fareportal.com/',
    location: 'Remote',
    date: 'November 2021 - March 2023',
    icon: 'work',
    type: 'work',
    description: 'Enhanced travel booking experience through innovative mobile solutions and payment integrations.',
    highlights: ['Enhanced user engagement with in-app rating prompts on iOS and Android platforms', 'Integrated Google Play Store API for seamless in-app update prompts', 'Implemented Apple Pay and Venmo Pay payment solutions', 'Upgraded React Native from version 0.64 to 0.71', 'Designed responsive and reusable UI components with Lottie animations'],
    technologies: ['React Native', 'Apple Pay', 'Venmo', 'Lottie'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.fp.cheapoair',
      appStore: 'https://apps.apple.com/us/app/cheapoair-cheap-flight-deals/id436858222'
    }
  },
  {
    title: 'Senior Mobile Application Developer',
    company: 'Fareportal',
    companyUrl: 'https://www.fareportal.com/',
    location: 'Remote',
    date: 'April 2023 - Present',
    icon: 'work',
    type: 'work',
    description: 'Leading mobile app development initiatives and mentoring junior developers while implementing innovative solutions for travel applications.',
    responsibilities: [
      'Engineering and implementing in-house dynamic bundle system',
      'Leading code reviews and mentoring junior developers',
      'Collaborating with cross-functional teams',
      'Developing native modules for iOS and Android',
      'Implementing Firebase Performance Monitoring'
    ],
    highlights: [
      'Engineered and implemented an in-house dynamic bundle system for React Native apps',
      'Led code reviews and mentored junior developers',
      'Collaborated with cross-functional teams for key features',
      'Developed native modules for iOS and Android',
      'Implemented Firebase Performance Monitoring SDK'
    ],
    technologies: ['React Native', 'iOS', 'Android', 'Firebase', 'Azure', 'Objective-C', 'Java'],
    links: {
      playStore: 'https://play.google.com/store/apps/details?id=com.fp.cheapoair',
      appStore: 'https://apps.apple.com/us/app/cheapoair-cheap-flight-deals/id436858222'
    }
  },
];