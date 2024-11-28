interface AchievementEntry {
  title: string;
  company: string;
  location?: string; // Optional, as not all achievements may have a location
  date: string;
  icon: string;
  type: 'achievement'; // Specify the type of entry
  highlights: string[];
  image: string; // Path to the achievement image
  companyImage: string; // Path to the company logo
}

export const timelineAchievements: AchievementEntry[] = [
  {
    title: 'Ownership and Accountability Award',
    company: 'Fareportal',
    location: 'Remote',
    date: 'Q1 2024',
    icon: 'award',
    type: 'achievement',
    highlights: ['Recognized for showcasing exceptional accountability and dedication to success.'],
    image: '/images/ownership-accountability-award.png',
    companyImage: '/images/FareportalLogo.webp'
  },
  {
    title: 'Fast Execution Award',
    company: 'Fareportal',
    location: 'Remote',
    date: 'Q2 2023',
    icon: 'award',
    type: 'achievement',
    highlights: ['Recognized for timely delivery of critical projects under tight deadlines.'],
    image: '/images/fast-execution-award-2023.png',
    companyImage: '/images/FareportalLogo.webp'
  },
  {
    title: 'Fast Execution Award',
    company: 'Fareportal',
    location: 'Remote',
    date: 'Q2 2022',
    icon: 'award',
    type: 'achievement',
    highlights: ['Recognized for timely delivery of critical projects under tight deadlines.'],
    image: '/images/fast-execution-award-2022.png',
    companyImage: '/images/FareportalLogo.webp'
  },
  {
    title: 'Passion For Customers Award',
    company: 'Fareportal',
    location: 'Remote',
    date: 'Q4 2021',
    icon: 'award',
    type: 'achievement',
    highlights: ['Awarded for delivering bug-free, efficient code enhancing user satisfaction.'],
    image: '/images/passion-for-customers-award.png',
    companyImage: '/images/FareportalLogo.webp'
  },
  {
    title: 'Technical Excellence Award',
    company: 'TCS',
    location: 'Kolkata, India',
    date: 'June 2020',
    icon: 'award',
    type: 'achievement',
    highlights: ['For rapid learning and efficient delivery of high-impact coding projects.'],
    image: '/images/technical-excellence-award.png',
    companyImage: '/images/Tata-Consultancy-Services-TCS.png'
  },
  {
    title: 'Technical Finesse Award',
    company: 'Narula Institute of Technology',
    location: 'Kolkata, India',
    date: '2019',
    icon: 'award',
    type: 'achievement',
    highlights: ['For outstanding technical and graphical support during college fests.'],
    image: '/images/technical-finesse-award.png',
    companyImage: '/images/Narula_Institute_of_Technology_logo.png'
  },
];
