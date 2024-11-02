import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import IntroAnimation from './components/IntroAnimation';
import TimelineEvent from './components/TimelineEvent';
import SkillCard from './components/SkillCard';
import ThemeToggle from './components/ThemeToggle';
import ContactInfo from './components/ContactInfo';
import ContactForm from './components/ContactForm';
import GoToTop from './components/GoToTop';
import LocationMap from './components/LocationMap';
import { timelineData, mySkills, myPersonalInfo, socialMediaLinks } from './data';

function App() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
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
            src="./assets/sourav_Dp.jpg"
            alt="Profile"
            className="w-40 h-40 rounded-full mx-auto mb-8 shadow-neumorph object-cover"
            whileHover={{ scale: 1.1 }}
          />
          <motion.h1
            className="text-4xl font-bold mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Sourav Sadhukhan
          </motion.h1>
          <IntroAnimation />
        </motion.div>
      </section>

      {/* Journey Section */}
      <section className="py-20 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">My Journey</h2>
        <div className="max-w-4xl mx-auto">
          {timelineData.map((event, index) => (
            <TimelineEvent key={index} {...event} index={index} />
          ))}
        </div>
      </section>

      {/* Skills Section */}
      <section className="py-20 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Skills</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {mySkills.map((skill, index) => (
            <SkillCard key={index} {...skill} index={index} />
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 px-8">
        <h2 className="text-3xl font-bold text-center mb-12">Get in Touch</h2>
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-12">
            <ContactInfo personalInfo={myPersonalInfo} socialLinks={socialMediaLinks} />
            <LocationMap />
          </div>
          <ContactForm />
        </div>
      </section>

      {/* CV Download Section */}
      <section className="py-20 px-8">
        <motion.div
          className="max-w-md mx-auto shadow-neumorph p-8 rounded-lg text-center"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-bold mb-4">Download My Resume</h2>
          <motion.a
            href="/resume.pdf"
            download
            className="inline-flex items-center px-6 py-3 rounded-full shadow-neumorph"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <Download className="w-5 h-5 mr-2" /> Download CV
          </motion.a>
        </motion.div>
      </section>

      {/* Outro Section */}
      <section className="py-20 px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl font-bold mb-6">Let's Create Something Amazing Together</h2>
          <p className="text-xl opacity-75">
            Always open to new opportunities and exciting projects.
          </p>
        </motion.div>
      </section>
    </div>
  );
}

export default App;