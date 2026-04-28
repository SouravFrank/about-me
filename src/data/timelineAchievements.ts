interface AchievementEntry {
  title: string;
  company: string;
  location?: string; // Optional, as not all achievements may have a location
  date: string;
  icon: string;
  type: 'achievement'; // Specify the type of entry
  highlights: string[];
  image: string; // Image variable
  companyImage: string; // Company logo variable
}

interface AchievementsSectionDetails {
  titleBold: string;
  titleLight: string;
  description: string;
}

export const achievementsSectionDetails: AchievementsSectionDetails = {
  titleBold: 'Milestones of ',
  titleLight: 'Excellence',
  description: 'Awards that reflect execution speed, ownership, customer impact, and technical excellence.',
};

// Import images
import employeeAward from '../assets/images/employee-of-the-year2024-.jpg';
import ownershipAward from '../assets/images/ownership-accountability-award.jpg';
import fareportalLogo from '../assets/images/FareportalLogo.webp';
import fastExecutionAward2023 from '../assets/images/fast-execution-award-2023.jpg';
import fastExecutionAward2022 from '../assets/images/fast-execution-award-2022.jpg';
import passionForCustomersAward from '../assets/images/passion-for-customers-award.jpg';
import technicalExcellenceAward from '../assets/images/technical-excellence-award.jpg';
import technicalFinesseAward from '../assets/images/technical-finesse-award.jpg';
import tcsLogo from '../assets/images/Tata-Consultancy-Services-TCS.png';
import nitLogo from '../assets/images/Narula_Institute_of_Technology_logo.png';

export const timelineAchievements: AchievementEntry[] = [
  {
    title: 'Employee of the Year Award',
    company: 'Fareportal',
    location: 'Remote',
    date: '2024',
    icon: 'award',
    type: 'achievement',
    highlights: ['Recognized as Employee of the Year 2024 for standout delivery, ownership, and high-impact mobile engineering leadership.'],
    image: employeeAward,
    companyImage: fareportalLogo,
  },
  {
    title: 'Ownership and Accountability Award',
    company: 'Fareportal',
    location: 'Remote',
    date: 'Q1 2024',
    icon: 'award',
    type: 'achievement',
    highlights: ['Recognized for exceptional accountability, release ownership, and dependable execution under pressure.'],
    image: ownershipAward,
    companyImage: fareportalLogo,
  },
  {
    title: 'Fast Execution Award',
    company: 'Fareportal',
    location: 'Remote',
    date: 'Q2 2023',
    icon: 'award',
    type: 'achievement',
    highlights: ['Awarded for fast delivery of critical initiatives without sacrificing product quality.'],
    image: fastExecutionAward2023,
    companyImage: fareportalLogo,
  },
  {
    title: 'Fast Execution Award',
    company: 'Fareportal',
    location: 'Remote',
    date: 'Q2 2022',
    icon: 'award',
    type: 'achievement',
    highlights: ['Awarded for rapid execution across business-critical deliverables and release cycles.'],
    image: fastExecutionAward2022,
    companyImage: fareportalLogo,
  },
  {
    title: 'Passion For Customers Award',
    company: 'Fareportal',
    location: 'Remote',
    date: 'Q4 2021',
    icon: 'award',
    type: 'achievement',
    highlights: ['Recognized for customer-first thinking, stable delivery, and reliable user-facing quality.'],
    image: passionForCustomersAward,
    companyImage: fareportalLogo,
  },
  {
    title: 'Technical Excellence Award',
    company: 'TCS',
    location: 'Kolkata, India',
    date: 'June 2020',
    icon: 'award',
    type: 'achievement',
    highlights: ['For rapid learning and efficient delivery of high-impact coding projects.'],
    image: technicalExcellenceAward,
    companyImage: tcsLogo,
  },
  {
    title: 'Technical Finesse Award',
    company: 'Narula Institute of Technology',
    location: 'Kolkata, India',
    date: '2019',
    icon: 'award',
    type: 'achievement',
    highlights: ['For outstanding technical and graphical support during college fests.'],
    image: technicalFinesseAward,
    companyImage: nitLogo,
  },
];