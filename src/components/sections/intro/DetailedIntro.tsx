import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { trackEvent, ANALYTICS_CATEGORIES } from '../../../utils/analytics';

interface DetailedIntroProps {
  onClose: () => void;
}

export default function DetailedIntro({ onClose }: DetailedIntroProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const handleHover = (isHovering: boolean) => {
    setIsHovered(isHovering);
  };

  // Track close button click
  const handleClose = () => {
    trackEvent('detailed_intro_close', {
      category: ANALYTICS_CATEGORIES.INTERACTION,
      device_type: isMobile ? 'mobile' : 'desktop'
    });
    onClose();
  };

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <motion.div
      className={`relative w-full ${isMobile ? 'max-w-full mx-2 mt-4' : 'max-w-4xl mx-auto mt-8'}`}
      onHoverStart={() => handleHover(true)}
      onHoverEnd={() => handleHover(false)}
      initial={{ opacity: 0, scale: 0.85, y: 40, filter: 'blur(20px)', rotateX: -12 }}
      animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', rotateX: 0 }}
      exit={{ opacity: 0, scale: 0.92, y: -30, filter: 'blur(16px)', rotateX: 8 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }}
    >
      {/* Futuristic scan line that sweeps across on enter */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-[5] rounded-2xl overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 0 }}
        transition={{ duration: 0.9, delay: 0.5 }}
      >
        <motion.div
          className="absolute inset-y-0 w-[40%] bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent"
          initial={{ x: '-60%' }}
          animate={{ x: '160%' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </motion.div>

      {/* HUD-style glowing corner brackets */}
      {[
        'top-0 left-0 border-t-2 border-l-2 rounded-tl-2xl',
        'top-0 right-0 border-t-2 border-r-2 rounded-tr-2xl',
        'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-2xl',
        'bottom-0 right-0 border-b-2 border-r-2 rounded-br-2xl',
      ].map((pos, i) => (
        <motion.span
          key={i}
          aria-hidden
          className={`pointer-events-none absolute h-6 w-6 ${pos} border-cyan-400/70 dark:border-cyan-300/70 shadow-[0_0_12px_rgba(34,211,238,0.6)]`}
          initial={{ opacity: 0, scale: 0.4 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.4 }}
          transition={{ duration: 0.4, delay: 0.25 + i * 0.05 }}
        />
      ))}

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
          onClick={handleClose}
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
                <h3 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'} text-gray-800 dark:text-gray-200`}>Who I Am</h3>
              </div>
              <div className="ml-5 pl-4 border-l-2 border-gray-200 dark:border-gray-700 text-left">
                <p className={`text-gray-700 dark:text-gray-300 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>
                  I’m a <strong>Senior Frontend Engineer</strong> with close to <strong>7 years</strong> of shipping <strong>React</strong> and <strong>React Native</strong> products end to end. Today I lead architecture and delivery on a <strong>US enterprise retail logistics portal at PwC India</strong>, owning a team of five and acting as the go-to technical decision maker for the codebase.
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
                  I work deep in <strong>TypeScript</strong>, <strong>React 19</strong>, <strong>React Native (Fabric, Turbo Modules, Hermes)</strong>, <strong>Storybook</strong>, and <strong>IndexedDB</strong> for offline-first flows—plus native bridges in <strong>Objective-C</strong> and <strong>Java</strong>. Recently led a <strong>RN 0.71 → 0.78</strong> migration and resolved high-severity findings flagged by <strong>SonarQube</strong> and <strong>GitHub Advanced Security</strong>.
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
                  I design and maintain <strong>REST APIs with Node.js and Express.js</strong>, integrate <strong>FCM</strong> push notifications, ship <strong>Google Play In-App Updates</strong> (lifted adoption from 52% to 91%), and coordinate <strong>OneTrust / Osano</strong> GDPR compliance across consumer-scale apps.
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
                  Clean architecture, security awareness, and <strong>release discipline</strong>—paired with <strong>AI-assisted development</strong> to compress delivery time without compromising quality. I treat ownership as a baseline, not a milestone.
                </p>
              </div>
            </div>

            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="h-2 w-2 rounded-full bg-blue-500" />
                <h3 className={`font-semibold ${isMobile ? 'text-lg' : 'text-xl'} text-gray-800 dark:text-gray-200`}>What’s Next</h3>
              </div>
              <div className="ml-5 pl-4 border-l-2 border-gray-200 dark:border-gray-700 text-left">
                <p className={`text-gray-700 dark:text-gray-300 ${isMobile ? 'text-sm' : 'text-base'} leading-relaxed`}>
                  I’m drawn to product spaces where <strong>architecture, animation, user trust, and execution speed</strong> all matter at once—the same DNA that runs through every section of this portfolio.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}