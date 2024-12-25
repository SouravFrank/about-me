// Define the interface for personal information
export interface PersonalInfo {
  name: string;
  location: string;
  email: string;
  phone: string;
  profileImage: string;
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
  profileImage: "/images/profile.jpg",
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