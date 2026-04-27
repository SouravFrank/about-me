import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, animate } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { trackEvent, ANALYTICS_CATEGORIES } from '../../utils/analytics';

const GoToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const progress = useMotionValue(0);
  const dashOffset = useTransform(progress, (p) => 138 - (138 * p) / 100);

  useEffect(() => {
    const toggleVisibility = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      animate(progress, pct, { duration: 0.3, ease: 'easeOut' });
      setIsVisible(scrollTop > 300);
    };
    window.addEventListener('scroll', toggleVisibility, { passive: true });
    toggleVisibility();
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, [progress]);

  const scrollToTop = () => {
    trackEvent('scroll_to_top', {
      category: ANALYTICS_CATEGORIES.NAVIGATION,
      scroll_position: window.pageYOffset,
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          className="fixed bottom-6 right-6 z-50"
          initial={{ opacity: 0, scale: 0, rotate: -180, y: 40 }}
          animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
          exit={{ opacity: 0, scale: 0, rotate: 180, y: 40 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          {/* Outer pulsing rings */}
          <motion.div
            className="absolute inset-0 rounded-full pointer-events-none"
            style={{
              background:
                'conic-gradient(from 0deg, hsl(var(--primary, 220 90% 60%)), #06b6d4, #a855f7, hsl(var(--primary, 220 90% 60%)))',
              filter: 'blur(14px)',
              opacity: 0.55,
            }}
            animate={{ rotate: 360 }}
            transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
          />
          <motion.span
            className="absolute inset-0 rounded-full border border-cyan-400/40 pointer-events-none"
            animate={{ scale: [1, 1.6], opacity: [0.6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
          />
          <motion.span
            className="absolute inset-0 rounded-full border border-purple-400/40 pointer-events-none"
            animate={{ scale: [1, 1.9], opacity: [0.5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.6 }}
          />

          <motion.button
            onClick={scrollToTop}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative flex items-center justify-center w-14 h-14 rounded-full overflow-hidden group"
            whileHover={{ scale: 1.12 }}
            whileTap={{ scale: 0.88 }}
            aria-label="Scroll to top"
          >
            {/* Glassy gradient background */}
            <span
              className="absolute inset-0 rounded-full"
              style={{
                background:
                  'linear-gradient(135deg, rgba(99,102,241,0.95) 0%, rgba(168,85,247,0.95) 50%, rgba(6,182,212,0.95) 100%)',
                boxShadow:
                  '0 10px 30px -8px rgba(99,102,241,0.6), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -2px 6px rgba(0,0,0,0.25)',
              }}
            />
            {/* Inner glassy core */}
            <span className="absolute inset-[3px] rounded-full bg-white/10 backdrop-blur-md border border-white/20" />

            {/* Animated progress ring */}
            <svg
              className="absolute inset-0 w-full h-full -rotate-90"
              viewBox="0 0 50 50"
            >
              <circle
                cx="25"
                cy="25"
                r="22"
                fill="none"
                stroke="rgba(255,255,255,0.18)"
                strokeWidth="2"
              />
              <motion.circle
                cx="25"
                cy="25"
                r="22"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeDasharray="138"
                style={{ strokeDashoffset: dashOffset, filter: 'drop-shadow(0 0 4px rgba(255,255,255,0.9))' }}
              />
            </svg>

            {/* Shimmer sweep on hover */}
            <motion.span
              className="absolute inset-0 rounded-full pointer-events-none"
              style={{
                background:
                  'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.5) 50%, transparent 70%)',
              }}
              initial={{ x: '-120%' }}
              animate={isHovered ? { x: '120%' } : { x: '-120%' }}
              transition={{ duration: 0.9, ease: 'easeInOut' }}
            />

            {/* Bouncing arrow with floating particles */}
            <motion.div
              className="relative z-10"
              animate={{ y: isHovered ? [-2, -6, -2] : [0, -3, 0] }}
              transition={{ duration: isHovered ? 0.6 : 1.8, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ArrowUp className="w-6 h-6 text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.4)]" strokeWidth={2.5} />
            </motion.div>

            {/* Floating particles on hover */}
            {isHovered &&
              [0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="absolute w-1 h-1 rounded-full bg-white"
                  style={{ left: '50%', top: '50%' }}
                  initial={{ opacity: 1, x: 0, y: 0, scale: 1 }}
                  animate={{
                    opacity: 0,
                    x: (i - 1) * 14,
                    y: -28 - i * 4,
                    scale: 0,
                  }}
                  transition={{ duration: 0.9, repeat: Infinity, delay: i * 0.15, ease: 'easeOut' }}
                />
              ))}
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GoToTop;
