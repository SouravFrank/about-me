import { motion } from 'framer-motion';
import { useState } from 'react';

interface DetailedIntroProps {
  onClose: () => void;
}

export default function DetailedIntro({ onClose }: DetailedIntroProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative w-full max-w-4xl mx-auto mt-8"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Background blobs */}
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
              rotate: {
                duration: 20 + index * 5,
                ease: "linear",
                repeat: Infinity,
              },
              scale: {
                duration: 2,
                ease: "easeInOut",
              }
            }}
          />
        ))}
      </div>

      {/* Card content */}
      <motion.div
        className="relative backdrop-blur-sm bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700"
        initial={{ y: 20 }}
        animate={{ y: 0 }}
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={onClose}
          className="absolute -top-4 -right-4 w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600 text-white flex items-center justify-center shadow-lg transition-colors duration-200"
        >
          ↑
        </button>

        <div className="prose dark:prose-invert prose-lg max-w-none">
          <motion.h2 
            className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Hello, I'm [Your Name]
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <p className="text-gray-700 dark:text-gray-300">
              A passionate Full Stack Developer with expertise in React Native and Node.js. 
              With [X] years of experience in developing scalable applications, I specialize 
              in creating seamless mobile experiences and robust backend solutions.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              My journey in software development has led me to work with various technologies 
              and frameworks, always focusing on writing clean, maintainable code and 
              delivering user-centric solutions.
            </p>
            <p className="text-gray-700 dark:text-gray-300">
              I invite you to explore my portfolio to learn more about my professional 
              journey, projects, and the impact I've made in the software development world.
            </p>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
