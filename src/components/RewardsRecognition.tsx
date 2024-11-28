import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timelineAchievements } from '../data/timelineAchievements';

// Achievement Cup SVG Component
const AchievementCup = ({ rotation = 0 }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 100 100" 
    className="w-24 h-24 mx-auto"
    style={{ transform: `rotate(${rotation}deg)` }}
  >
    <path 
      d="M30 20 L70 20 L70 40 Q50 50, 30 40 Z" 
      fill="url(#goldGradient)" 
      stroke="#D4AF37" 
      strokeWidth="2"
    />
    <path 
      d="M25 15 L75 15 L75 20 L25 20 Z" 
      fill="#D4AF37"
    />
    <defs>
      <linearGradient id="goldGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{stopColor:'#FFD700', stopOpacity:1}} />
        <stop offset="100%" style={{stopColor:'#DAA520', stopOpacity:1}} />
      </linearGradient>
    </defs>
  </svg>
);

const RewardsRecognition: React.FC = () => {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]);
  const yTranslate = useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]);

  return (
    <motion.section 
      ref={sectionRef}
      style={{ opacity, y: yTranslate }}
      className="py-20 px-8 bg-gradient-to-br from-neutral-50 to-neutral-100"
    >
      <div className="text-center mb-16">
        <h2 className="text-5xl font-thin text-neutral-800 tracking-wide mb-4">
          Milestones of <span className="text-gold-600 font-semibold">Excellence</span>
        </h2>
        <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
          A journey marked by significant achievements and remarkable accomplishments.
        </p>
      </div>

      <div className="flex overflow-x-scroll hide-scrollbar pb-10 space-x-8">
        {timelineAchievements.map((achievement, index) => (
          <motion.div
            key={index}
            className="flex-shrink-0 w-96 group"
            whileHover={{ 
              scale: 1.03,
              transition: { duration: 0.3 }
            }}
          >
            <div className="bg-white/40 backdrop-blur-lg rounded-2xl border border-white/20 shadow-2xl p-8 transform transition-all duration-300 hover:shadow-4xl">
              {/* Achievement Cup with Rotation on Hover */}
              <motion.div 
                whileHover={{ rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <AchievementCup />
              </motion.div>

              {/* Achievement Details */}
              <div className="text-center mt-6">
                <h3 className="text-2xl font-semibold text-neutral-800 mb-2">
                  {achievement.title}
                </h3>
                <p className="text-neutral-600 mb-4">
                  {achievement.company} • {achievement.location}
                </p>
                <p className="text-neutral-500 italic mb-6">
                  {achievement.date}
                </p>

                {/* Highlights with Subtle Animation */}
                <motion.ul 
                  className="space-y-2"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: { 
                      opacity: 1,
                      transition: {
                        delayChildren: 0.2,
                        staggerChildren: 0.1
                      }
                    }
                  }}
                  initial="hidden"
                  whileInView="visible"
                >
                  {achievement.highlights.map((highlight, idx) => (
                    <motion.li
                      key={idx}
                      variants={{
                        hidden: { opacity: 0, y: 20 },
                        visible: { opacity: 1, y: 0 }
                      }}
                      className="text-neutral-700 text-left"
                    >
                      • {highlight}
                    </motion.li>
                  ))}
                </motion.ul>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default RewardsRecognition;