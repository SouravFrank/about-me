import { SectionWrapper } from '../../common';
import { ContactInfo, LocationMap, ContactForm } from './index';
import { ContactSectionProps } from './types';
import { sectionData } from '../../../data/sectionData';

export const ContactSection = ({ isDark }: ContactSectionProps) => (
  <SectionWrapper isDark={isDark} titleBold={sectionData.contact.titleBold} titleLight={sectionData.contact.titleLight} description={sectionData.contact.description}>
    <div className="space-y-8 px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-neumorph p-8">
          <ContactInfo />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-neumorph p-8">
          <LocationMap isDark={isDark}  />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-neumorph p-8">
        <ContactForm />
      </div>
    </div>
  </SectionWrapper>
);
