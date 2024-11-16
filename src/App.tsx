import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  IntroAnimation,
  TimelineEvent,
  SkillCard,
  ThemeToggle,
  ContactInfo,
  ContactForm,
  GoToTop,
  LocationMap
} from './components';
import DownloadButton from './components/DownloadButton';
import Footer from './components/Footer';
import ProjectCard from './components/ProjectCard';
import HorizontalScroll from './components/HorizontalScroll';

import {
  timelineData,
  skills,
  personalInfo,
  socialMediaLinks,
  contactInfo
} from './data';
import { projects } from './data/projects';

function App() {
  const [isDark, setIsDark] = useState(false);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'dark bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'
    }`}>
      <ThemeToggle isDark={isDark} toggle={() => setIsDark(!isDark)} />
      <GoToTop />

      {/* Intro Section */}
      <section className="min-h-screen flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center"
        >
          <motion.img
            src={personalInfo.profileImage}
            alt={`${personalInfo.name}'s Profile`}
            className="w-40 h-40 rounded-full mx-auto mb-8 shadow-neumorph object-cover"
            whileHover={{ scale: 1.1 }}
            onError={() => {
              setImageError(true);
              const img = document.querySelector('img');
              if (img) {
                img.src = 'https://ui-avatars.com/api/?name=' + 
                  encodeURIComponent(personalInfo.name) +
                  '&background=random';
              }
            }}
          />
          <motion.h1 className="text-4xl font-bold mb-4">
            {personalInfo.name}
          </motion.h1>
          <IntroAnimation />
        </motion.div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
        <div className="max-w-4xl mx-auto">
          {timelineData.map((item, index) => (
            <TimelineEvent key={index} {...item} index={index} />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
        <div className="max-w-6xl mx-auto">
          {/* Technical Skills */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Technical Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.technical.map((skill, index) => (
                <SkillCard key={index} {...skill} index={index} />
              ))}
            </div>
          </div>

          {/* Tools */}
          <div className="mb-12">
            <h3 className="text-2xl font-semibold mb-6">Tools</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.tools.map((skill, index) => (
                <SkillCard key={index} {...skill} index={index} />
              ))}
            </div>
          </div>

          {/* Additional Skills */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Additional Skills</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {skills.additional.map((skill, index) => (
                <SkillCard key={index} {...skill} index={index} />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Industry Standard Projects Section */}
      <section className="py-20 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Industry Standard Projects</h2>
        <HorizontalScroll projects={projects} />
      </section>

      {/* Contact Section */}
      <section className="py-20 px-8 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Get in Touch</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Feel free to reach out for collaborations, opportunities, or just a friendly chat about technology and development.
            </p>
          </div>

          <div className="space-y-8">
            {/* Contact Info & Map Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Contact Info */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-neumorph p-8">
                <ContactInfo contactInfo={contactInfo} socialLinks={socialMediaLinks} />
              </div>

              {/* Location Map */}
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-neumorph p-8">
                <LocationMap />
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-neumorph p-8">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>

      {/* CV Download Section */}
      <section className="py-20 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Download My CV</h2>
          <DownloadButton />
        </motion.div>
      </section>

      {/* Footer Section */}
      <Footer />
    </div>
  );
}
export default App;