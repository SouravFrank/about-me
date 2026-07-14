// Import profile images
import profileImage1 from '../assets/images/profile(1).jpg';
import profileImage2 from '../assets/images/profile(2).jpg';
import profileImage3 from '../assets/images/profile(3).png';
import profileImage4 from '../assets/images/profile(4).jpg';
import profileImage5 from '../assets/images/profile(5).jpg';
import profileImage6 from '../assets/images/profile(6).jpg';
import profileImage7 from '../assets/images/profile(7).jpg';
import profileImage8 from '../assets/images/profile(8).jpg';
import profileImage9 from '../assets/images/profile(9).jpg';


// Define the interface for personal information
export interface PersonalInfo {
  name: string;
  location: string;
  email: string;
  phone: string;
  profileImages: Array<string>;
  viewResumeLink: string;
  downLoadResumeLink: string;
}

// Define the interface for contact information
export interface ContactInfo {
  title: string;
  value: string;
  link: string;
}

// Export the personal information object
export const personalInfo: PersonalInfo = {
  name: "Sourav Sadhukhan",
  location: "Kolkata, India",
  email: "ssadhukhan990@gmail.com",
  phone: "+91 9038516950",
  profileImages: [profileImage1, profileImage2, profileImage3, profileImage4, profileImage5, profileImage6, profileImage7, profileImage8, profileImage9],
  viewResumeLink: 'https://drive.google.com/file/d/1jcx6KyKoar3csU4qez9-oKJTuTLD3alX/preview',
  downLoadResumeLink: 'https://drive.google.com/uc?export=download&id=1jcx6KyKoar3csU4qez9-oKJTuTLD3alX'
};
// Export the contact information array
export const contactInfo: ContactInfo[] = [
  {
    title: "Email",
    value: "ssadhukhan990@gmail.com",
    link: "mailto:ssadhukhan990@gmail.com"
  },
  {
    title: "Call",
    value: "+91 9038516950",
    link: "tel:+919038516950"
  },
  {
    title: "Location",
    value: "Kolkata, India",
    link: "https://maps.app.goo.gl/cWVq1S6euoYtkfw99"
  }
];