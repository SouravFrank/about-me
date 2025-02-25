import { SectionWrapper } from '../../common';
import { ContactInfo, LocationMap, ContactForm } from './index';
import { ContactSectionProps } from './types';
import { sectionData } from '../../../data/sectionData';

export const ContactSection = ({ isDark }: ContactSectionProps) => (
  <SectionWrapper isDark={isDark} titleBold={sectionData.contact.titleBold} titleLight={sectionData.contact.titleLight} description={sectionData.contact.description}>
    <div className="space-y-6 md:px-8">
      <div className="flex flex-col gap-6 md:grid md:grid-cols-2 md:gap-8">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-neumorph p-6 md:p-8 order-2 md:order-1">
          <ContactInfo />
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-neumorph p-6 md:p-8 order-1 md:order-2">
          <LocationMap isDark={isDark} />
        </div>
      </div>
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-neumorph p-6 md:p-8">
        <ContactForm />
      </div>
    </div>
  </SectionWrapper>
);
