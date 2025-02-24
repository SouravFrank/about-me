import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

interface DetailedIntroProps {
  onClose: () => void;
}

export default function DetailedIntro({ onClose }: DetailedIntroProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      className={`relative w-full ${isMobile ? 'max-w-full mx-2 mt-4' : 'max-w-4xl mx-auto mt-8'}`}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="absolute inset-0 -z-10 opacity-70">
        {[1, 2].map((index) => (
          <motion.div
            key={index}
            className={`magicpattern${index} absolute inset-0 rounded-2xl`}
            animate={{
              rotate: isHovered ? (index % 2 === 0 ? 360 : -360) : 0,
              scale: isHovered ? [1, 1.05, 1] : 1,
            }}
            transition={{
              rotate: { duration: 20 + index * 5, ease: "linear", repeat: Infinity },
              scale: { duration: 2, ease: "easeInOut" }
            }}
          />
        ))}
      </div>

      <motion.div
        className={`relative backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl ${
          isMobile ? 'p-4' : 'p-8'
        } border border-gray-200 dark:border-gray-700`}
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className={`absolute ${isMobile ? '-top-3 -right-3 w-6 h-6' : '-top-4 -right-4 w-8 h-8'} rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-colors duration-200`}
        >
          ↑
        </button>

        <div className="prose dark:prose-invert max-w-none">
          <motion.h2
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I'm Sourav Sadhukhan
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className={isMobile ? 'space-y-6' : 'space-y-8'}
          >
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <h3 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'} text-gray-800 dark:text-gray-200`}>Who I Am ?</h3>
              </div>
              <div className="ml-5 pl-4 border-l-2 border-gray-200 dark:border-gray-700 text-left">
                <p className={`text-gray-700 dark:text-gray-300 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>
                  A results-driven <strong>Mobile Developer</strong> specializing in <strong>React Native</strong>, crafting seamless cross-platform experiences with the finesse of a front-end artist and the logic of a back-end strategist.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <h3 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'} text-gray-800 dark:text-gray-200`}>Technical Prowess</h3>
              </div>
              <div className="ml-5 pl-4 border-l-2 border-gray-200 dark:border-gray-700 text-left">
                <p className={`text-gray-700 dark:text-gray-300 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>
                  Whether it's integrating <strong>Apple Pay, Venmo</strong>, or building native modules that play well across iOS and Android, I thrive on engineering solutions that make apps both performant and delightful.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <h3 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'} text-gray-800 dark:text-gray-200`}>Backend Mastery</h3>
              </div>
              <div className="ml-5 pl-4 border-l-2 border-gray-200 dark:border-gray-700 text-left">
                <p className={`text-gray-700 dark:text-gray-300 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>
                  Backend wizardry? Absolutely. I leverage <strong>Node.js</strong> to architect scalable APIs, while <strong>Redux</strong> ensures smooth state management, preventing app chaos before it begins.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-purple-500" />
                <h3 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'} text-gray-800 dark:text-gray-200`}>Development Philosophy</h3>
              </div>
              <div className="ml-5 pl-4 border-l-2 border-gray-200 dark:border-gray-700 text-left">
                <p className={`text-gray-700 dark:text-gray-300 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>
                  Agile workflows, clean architecture, and a relentless focus on user experience drive my development approach. Basically, I turn coffee into high-quality, maintainable code—one feature at a time.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <h3 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'} text-gray-800 dark:text-gray-200`}>Next ?</h3>
              </div>
              <div className="ml-5 pl-4 border-l-2 border-gray-200 dark:border-gray-700 text-left">
                <p className={`text-gray-700 dark:text-gray-300 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>
                  Feel free to explore my portfolio and see how I blend technology with innovation to build solutions that matter.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}