import { useState, type ReactElement } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, BarChart2, Users, Workflow, Bot, MessageSquareCode, Sparkles, ExternalLink } from 'lucide-react';
import { SkillCardProps } from './types';

const getIcon = (src: string, name: string): ReactElement => {
  const softSkillIcons: Record<string, ReactElement> = {
    strategy: <Brain className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
    analysis: <BarChart2 className="w-6 h-6 text-green-500 dark:text-green-400" />,
    team: <Users className="w-6 h-6 text-purple-500 dark:text-purple-400" />,
    adapt: <Workflow className="w-6 h-6 text-orange-500 dark:text-orange-400" />,
    prompt: <Bot className="w-6 h-6 text-red-500 dark:text-red-400" />,
    code: <MessageSquareCode className="w-6 h-6 text-blue-500 dark:text-blue-400" />,
  };
  return (
    softSkillIcons[src] || (
      <img
        src={src}
        alt={name}
        className={`w-6 h-6 object-contain ${['express.js', 'socket.io', 'bash'].includes(name.toLowerCase()) ? 'dark:invert' : ''}`}
        onError={(e) => ((e.target as HTMLImageElement).style.display = 'none')}
      />
    )
  );
};

const MobileSkillCard: React.FC<SkillCardProps> = ({ name, src, description, expertise, index }) => {
  const [flipped, setFlipped] = useState(false);
  const isElite = (expertise ?? 0) >= 8;

  return (
    <motion.div
      className="relative w-full aspect-square [perspective:1000px] cursor-pointer"
      initial={{ opacity: 0, y: 30, scale: 0.85 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 220, damping: 18 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setFlipped((f) => !f)}
    >
      {/* Animated gradient border for elite skills */}
      {isElite && (
        <motion.div
          className="absolute -inset-[1.5px] rounded-2xl opacity-70 blur-[2px] pointer-events-none"
          style={{
            background:
              'conic-gradient(from 0deg, #3b82f6, #a855f7, #ec4899, #f59e0b, #3b82f6)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        />
      )}

      <motion.div
        className="relative w-full h-full [transform-style:preserve-3d]"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 180, damping: 18 }}
      >
        {/* FRONT */}
        <div className="absolute inset-0 [backface-visibility:hidden] rounded-2xl bg-white dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700/60 shadow-md overflow-hidden flex flex-col items-center justify-center p-3">
          {/* Sparkle pulse for elite */}
          {isElite && (
            <motion.div
              className="absolute top-1.5 right-1.5"
              animate={{ scale: [1, 1.3, 1], rotate: [0, 15, -15, 0] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            </motion.div>
          )}

          {/* Icon with floating animation */}
          <motion.div
            className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-900/30 dark:to-purple-900/30 mb-2"
            animate={{ y: [0, -3, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: index * 0.1 }}
          >
            {getIcon(src, name)}
          </motion.div>

          <h3 className="text-xs font-bold text-center text-gray-900 dark:text-white leading-tight line-clamp-2 px-1">
            {name}
          </h3>

          {/* Expertise dots */}
          {expertise !== undefined && (
            <div className="flex items-center gap-0.5 mt-2">
              {Array.from({ length: 5 }).map((_, i) => {
                const filled = i < Math.round((expertise / 10) * 5);
                return (
                  <motion.span
                    key={i}
                    className={`w-1 h-1 rounded-full ${
                      filled
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500'
                        : 'bg-gray-300 dark:bg-gray-600'
                    }`}
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 + i * 0.06, type: 'spring' }}
                  />
                );
              })}
            </div>
          )}

          {/* Subtle tap hint */}
          <motion.div
            className="absolute bottom-1.5 text-[8px] uppercase tracking-wider text-gray-400 dark:text-gray-500 font-medium"
            animate={{ opacity: [0.4, 0.9, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            tap
          </motion.div>
        </div>

        {/* BACK */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl bg-gradient-to-br from-blue-600 to-purple-700 dark:from-blue-700 dark:to-purple-900 shadow-lg overflow-hidden p-2.5 flex flex-col">
          <AnimatePresence>
            {flipped && (
              <motion.div
                className="flex-1 flex flex-col min-h-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h4 className="text-[11px] font-bold text-white mb-1 line-clamp-1 shrink-0">{name}</h4>
                <div
                  className="flex-1 min-h-0 overflow-y-auto pr-1 -mr-1 mobile-skill-scroll"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  <p className="text-[10px] text-white/90 leading-snug">
                    {description}{' '}
                    <a
                      href={`https://www.google.com/search?q=${encodeURIComponent(name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-0.5 text-white font-semibold underline underline-offset-2 decoration-white/60 hover:decoration-white"
                    >
                      learn more<ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  </p>
                </div>
                <motion.div
                  className="shrink-0 mt-1 h-3 -mx-2.5 bg-gradient-to-t from-purple-800/80 to-transparent pointer-events-none"
                  animate={{ opacity: [0.4, 0.9, 0.4] }}
                  transition={{ duration: 1.6, repeat: Infinity }}
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative shimmer */}
          <motion.div
            className="absolute -inset-y-2 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 pointer-events-none"
            animate={{ x: ['0%', '300%'] }}
            transition={{ duration: 2.5, repeat: Infinity, repeatDelay: 1.5, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileSkillCard;
