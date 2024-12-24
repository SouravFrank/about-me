import { SectionWrapper } from '../../common';
import {ContactInfo, LocationMap, ContactForm} from './index';
import { ContactSectionProps } from './types';

export const ContactSection = ({ isDark }: ContactSectionProps) => (
  <SectionWrapper isDark={isDark} titleBold="Get " titleLight="in Touch" description="Feel free to reach out for collaborations, opportunities, or just a friendly chat about technology and development.">
    <div className="space-y-8 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-neumorph p-8">
          <ContactInfo />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-neumorph p-8">
          <LocationMap />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-neumorph p-8">
        <ContactForm />
      </div>
    </div>
  </SectionWrapper>
);
