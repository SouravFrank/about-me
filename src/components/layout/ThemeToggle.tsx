import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { ThemeToggleProps } from './types';

export default function ThemeToggle({ isDark, toggle }: ThemeToggleProps) {
  return (
    <motion.button
      onClick={toggle}
      aria-label="Toggle theme"
      className="fixed top-4 right-4 z-50 group"
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, y: -20, rotate: -180 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ type: 'spring', stiffness: 200, damping: 18 }}
    >
      {/* Outer rotating conic glow */}
      <motion.span
        className="absolute -inset-1 rounded-full pointer-events-none"
        style={{
          background: isDark
            ? 'conic-gradient(from 0deg, #6366f1, #8b5cf6, #06b6d4, #6366f1)'
            : 'conic-gradient(from 0deg, #fbbf24, #f59e0b, #f97316, #fbbf24)',
          filter: 'blur(10px)',
          opacity: 0.55,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Pulsing ring on theme change */}
      <motion.span
        key={isDark ? 'd' : 'l'}
        className={`absolute inset-0 rounded-full pointer-events-none ${isDark ? 'border-cyan-400/60' : 'border-amber-400/60'} border-2`}
        initial={{ scale: 1, opacity: 0.8 }}
        animate={{ scale: 2, opacity: 0 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      />

      <motion.div
        className="relative flex items-center justify-center w-12 h-12 rounded-full overflow-hidden"
        style={{
          background: isDark
            ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)'
            : 'linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)',
          boxShadow: isDark
            ? '0 8px 24px -6px rgba(99,102,241,0.6), inset 0 1px 0 rgba(255,255,255,0.08), inset 0 -2px 6px rgba(0,0,0,0.5)'
            : '0 8px 24px -6px rgba(251,191,36,0.6), inset 0 1px 0 rgba(255,255,255,0.7), inset 0 -2px 6px rgba(180,120,0,0.15)',
        }}
        whileHover={{ scale: 1.1 }}
        animate={{
          boxShadow: isDark
            ? '0 8px 24px -6px rgba(99,102,241,0.6)'
            : '0 8px 24px -6px rgba(251,191,36,0.6)',
        }}
      >
        {/* Stars (dark mode) */}
        {isDark && (
          <>
            {[
              { x: -14, y: -10, d: 0 },
              { x: 12, y: -12, d: 0.4 },
              { x: 14, y: 8, d: 0.8 },
              { x: -10, y: 12, d: 1.2 },
            ].map((s, i) => (
              <motion.span
                key={i}
                className="absolute w-0.5 h-0.5 rounded-full bg-white"
                style={{ left: '50%', top: '50%', x: s.x, y: s.y }}
                animate={{ opacity: [0.2, 1, 0.2], scale: [0.6, 1.2, 0.6] }}
                transition={{ duration: 1.8, repeat: Infinity, delay: s.d, ease: 'easeInOut' }}
              />
            ))}
          </>
        )}

        {/* Sun rays (light mode) */}
        {!isDark &&
          [...Array(8)].map((_, i) => (
            <motion.span
              key={i}
              className="absolute top-1/2 left-1/2 w-0.5 h-1.5 bg-amber-500/70 rounded-full origin-bottom"
              style={{
                transform: `translate(-50%, -100%) rotate(${i * 45}deg) translateY(-12px)`,
              }}
              animate={{ scaleY: [1, 1.4, 1], opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.1, ease: 'easeInOut' }}
            />
          ))}

        {/* Icon swap with morph */}
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={isDark ? 'sun' : 'moon'}
            initial={{ y: -28, rotate: -180, opacity: 0, scale: 0.4 }}
            animate={{ y: 0, rotate: 0, opacity: 1, scale: 1 }}
            exit={{ y: 28, rotate: 180, opacity: 0, scale: 0.4 }}
            transition={{ type: 'spring', stiffness: 220, damping: 18 }}
            className="relative z-10"
          >
            {isDark ? (
              <Sun className="w-5 h-5 text-amber-300 drop-shadow-[0_0_6px_rgba(252,211,77,0.9)]" strokeWidth={2.5} />
            ) : (
              <Moon className="w-5 h-5 text-indigo-700 drop-shadow-[0_0_4px_rgba(99,102,241,0.5)]" strokeWidth={2.5} />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Shimmer sweep on hover */}
        <motion.span
          className="absolute inset-0 pointer-events-none rounded-full opacity-0 group-hover:opacity-100"
          style={{
            background:
              'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.4) 50%, transparent 70%)',
          }}
          animate={{ x: ['-120%', '120%'] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </motion.button>
  );
}
