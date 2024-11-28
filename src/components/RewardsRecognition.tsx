import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timelineAchievements } from '../data/timelineAchievements';
import trophyIcon from '../assets/icons/trophy.svg'; // Import the SVG

const RewardsRecognition: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const yTranslate = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <motion.section ref={sectionRef} style={{ opacity, y: yTranslate }} className="py-20 px-8">
      <div className="text-center mb-16">
        <h2 className="text-5xl font-thin text-neutral-800 tracking-wide mb-4">
          Milestones of <span className="text-gold-600 font-semibold">Excellence</span>
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">A journey marked by significant achievements and remarkable accomplishments.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {timelineAchievements.map((achievement, index) => (
          <motion.div key={index} className="relative group flex-shrink-0">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105">
              <div className="flex flex-col items-center p-4">
                {/* Trophy Icon using require */}
                <motion.img
                  src={trophyIcon} // Use the imported SVG
                  alt="Trophy Icon"
                  className="w-24 h-24 mx-auto transition-transform duration-300"
                  whileHover={{ rotate: 10 }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
                <h3 className="text-lg font-semibold text-neutral-800 mb-1 text-center">{achievement.title}</h3>
                <p className="text-neutral-500 italic mb-2 text-center">{achievement.date}</p>
                <div className="flex flex-row items-center justify-center" style={{ height: 50 }}>
                  <img src={achievement.companyImage} style={{ height: achievement.company === 'Narula Institute of Technology' ? 40 : 'auto', width: achievement.company === 'Narula Institute of Technology' ? 'auto' : '50%' }} />
                  <span className="text-neutral-600 ml-2">{achievement.company === 'Narula Institute of Technology' ? achievement.company : ''}</span>
                </div>
              </div>
              <motion.img
                src={achievement.image} // Use the image path from the achievement data
                alt={achievement.title}
                className="w-full h-32 object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-0 group-hover:bg-opacity-80 transition duration-300 rounded-lg">
                <div className="text-center p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-neutral-700">
                    {achievement.highlights[0]} {/* Display the description as a paragraph */}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RewardsRecognition;
