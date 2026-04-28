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

        {/* BACK — Futuristic HUD */}
        <div className="absolute inset-0 [backface-visibility:hidden] [transform:rotateY(180deg)] rounded-2xl overflow-hidden flex flex-col bg-[radial-gradient(ellipse_at_top_left,#1e3a8a_0%,#4c1d95_55%,#0f172a_100%)] shadow-[0_8px_30px_rgba(76,29,149,0.4)]">
          {/* HUD grid backdrop */}
          <div
            aria-hidden
            className="absolute inset-0 opacity-[0.18] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(255,255,255,0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.4) 1px, transparent 1px)',
              backgroundSize: '12px 12px',
              maskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
              WebkitMaskImage: 'radial-gradient(ellipse at center, black 30%, transparent 80%)',
            }}
          />
          {/* Corner brackets */}
          {[
            'top-1 left-1 border-t border-l',
            'top-1 right-1 border-t border-r',
            'bottom-1 left-1 border-b border-l',
            'bottom-1 right-1 border-b border-r',
          ].map((c, i) => (
            <span key={i} className={`absolute w-2 h-2 ${c} border-cyan-300/80 pointer-events-none`} />
          ))}

          <AnimatePresence>
            {flipped && (
              <motion.div
                className="relative flex-1 flex flex-col min-h-0 p-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.18 }}
              >
                {/* Header */}
                <div className="shrink-0 flex items-center justify-between gap-1 mb-1.5">
                  <h4 className="text-[10px] font-bold uppercase tracking-wider text-cyan-200 truncate">
                    {name}
                  </h4>
                  {expertise !== undefined && (
                    <span className="shrink-0 inline-flex items-center gap-0.5 text-[8px] font-mono font-bold text-cyan-100 bg-cyan-400/20 border border-cyan-300/40 rounded-sm px-1 py-[1px]">
                      <span className="w-1 h-1 rounded-full bg-cyan-300 animate-pulse" />
                      LV {expertise}
                    </span>
                  )}
                </div>

                {/* Scrollable body */}
                <div
                  className="relative flex-1 min-h-0 overflow-y-auto pr-1 -mr-1 mobile-skill-scroll"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                >
                  <p className="text-[10px] text-white/95 leading-snug">{description}</p>
                  <div className="h-2" />
                </div>

                {/* Fade hint above action */}
                <div
                  aria-hidden
                  className="shrink-0 h-2 -mx-2 bg-gradient-to-t from-[#0f172a] to-transparent pointer-events-none"
                />

                {/* Pinned action button — always visible */}
                <motion.a
                  href={`https://www.google.com/search?q=${encodeURIComponent(name)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  onTouchStart={(e) => e.stopPropagation()}
                  initial={{ y: 8, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.32 }}
                  whileTap={{ scale: 0.94 }}
                  className="shrink-0 mt-1 relative inline-flex items-center justify-center gap-1 text-[10px] font-bold uppercase tracking-wider text-white rounded-md py-1.5 px-2 bg-gradient-to-r from-cyan-500/90 via-blue-500/90 to-fuchsia-500/90 border border-white/30 shadow-[0_0_12px_rgba(34,211,238,0.5)] overflow-hidden"
                >
                  <span className="relative z-10">Learn More</span>
                  <ExternalLink className="relative z-10 w-2.5 h-2.5" />
                  <motion.span
                    aria-hidden
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent"
                    animate={{ x: ['-100%', '200%'] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
                  />
                </motion.a>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Decorative shimmer sweep */}
          <motion.div
            className="absolute -inset-y-2 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/15 to-transparent skew-x-12 pointer-events-none"
            animate={{ x: ['0%', '300%'] }}
            transition={{ duration: 2.8, repeat: Infinity, repeatDelay: 1.8, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
};

export default MobileSkillCard;
