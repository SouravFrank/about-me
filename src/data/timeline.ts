// Type definitions for better TypeScript support
export type TimelineItemType = 'work' | 'education' | 'achievement' | 'certification' | 'personal';

export interface TimelineItem {
  title: string;
  company?: string;
  specialization?: string;
  location?: string;
  date: string;
  icon: string;
  type: TimelineItemType;
  highlights: string[];
  technologies?: string[];
}

export const timelineData = [
  {
    title: 'Birth',
    location: 'Howrah, West Bengal, India',
    date: 'June 1998',
    icon: 'cake',
    type: 'personal',
    highlights: ['Welcomed into the world with love and joy!'],
  },
  {
    title: '10th Grade',
    company: 'Shibpur Dinobandhu Institution (Branch)',
    specialization: 'General',
    location: 'Howrah, West Bengal, India',
    date: 'March 2013',
    icon: 'study',
    type: 'education',
    highlights: ['Navigated the challenges of school life with resilience and determination!'],
  },
  {
    title: '12th Grade',
    company: 'Shibpur Dinobandhu Institution (Branch)',
    specialization: 'Science',
    location: 'Howrah, West Bengal, India',
    date: 'June 2013 - July 2015',
    icon: 'study',
    type: 'education',
    highlights: ['Science enthusiast with a passion for discovery!'],
  },
  {
    title: 'B.Tech',
    company: 'Narula Institute of Technology',
    specialization: 'Electronics and Communication Engineering',
    location: 'Kolkata, India',
    date: 'August 2015 - June 2019',
    icon: 'study',
    type: 'education',
    highlights: ['Graduated from Maulana Abul Kalam Azad University of Technology (MAKAUT)', 'Technical Finesse Award for outstanding technical support during college fests'],
  },
  {
    title: 'Assistant System Engineer',
    company: 'Tata Consultancy Services',
    location: 'Kolkata, India',
    date: 'July 2019 - June 2020',
    icon: 'work',
    type: 'work',
    highlights: ['Deployed React Native shopping apps achieving over 1 million downloads', 'Optimized log management and load balancing using PM2', 'Created failure alert system for proactive outage prevention'],
    technologies: ['React Native', 'Node.js', 'PM2'],
  },
  {
    title: 'System Engineer',
    company: 'Tata Consultancy Services',
    location: 'Kolkata, India',
    date: 'July 2020 - October 2021',
    icon: 'work',
    type: 'work',
    highlights: ['Built 3 internal inventory management apps for a major UK retail client', 'Separated Redux and business logic into a standalone repository', 'Led a team of 5 developers for bug resolution and feature development', 'Served as primary point of contact for client communication', 'Managed Agile development processes and sprint planning'],
    technologies: ['React Native', 'React Web', 'Express.js', 'Redux'],
  },
  {
    title: 'Mobile Application Developer',
    company: 'Fareportal',
    location: 'Remote',
    date: 'November 2021 - March 2023',
    icon: 'work',
    type: 'work',
    highlights: ['Enhanced user engagement with in-app rating prompts on iOS and Android platforms', 'Integrated Google Play Store API for seamless in-app update prompts', 'Implemented Apple Pay and Venmo Pay payment solutions', 'Upgraded React Native from version 0.64 to 0.71', 'Designed responsive and reusable UI components with Lottie animations'],
    technologies: ['React Native', 'Apple Pay', 'Venmo', 'Lottie'],
  },
  {
    title: 'Senior Mobile Application Developer',
    company: 'Fareportal',
    location: 'Remote',
    date: 'April 2023 - Present',
    icon: 'work',
    type: 'work',
    highlights: ['Engineered and implemented an in-house dynamic bundle system for React Native apps, reducing delays in critical fixes and feature releases by bypassing app store reviews', 'Led code reviews and mentored junior developers, ensuring timely delivery of promotional in-app games under tight deadlines', 'Collaborated with cross-functional teams to deliver key features and approve release builds for Google Play and Apple App Store', 'Developed and integrated native modules for iOS (Objective-C) and Android (Java)', 'Implemented Firebase Performance Monitoring SDK and Crashlytics SDK for app stability'],
    technologies: ['React Native', 'iOS', 'Android', 'Firebase', 'Azure'],
  },
];