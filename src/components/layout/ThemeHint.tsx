import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

interface ThemeHintProps {
  isDark: boolean;
  detectedSource: 'system' | 'user' | null;
}

const STORAGE_KEY = 'theme-hint-dismissed-v1';

/**
 * One-time, on-load tooltip that points to the ThemeToggle in the top-right
 * and informs the user the theme was auto-detected from their system.
 */
export default function ThemeHint({ isDark, detectedSource }: ThemeHintProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (detectedSource !== 'system') return;
    if (typeof window === 'undefined') return;
    if (localStorage.getItem(STORAGE_KEY) === '1') return;

    const showTimer = setTimeout(() => setVisible(true), 1400);
    const hideTimer = setTimeout(() => dismiss(), 9000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(hideTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [detectedSource]);

  const dismiss = () => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed top-20 right-3 sm:right-4 z-[60] max-w-[240px]"
          initial={{ opacity: 0, y: -12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -8, scale: 0.92 }}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
        >
          {/* Arrow pointing up to the toggle */}
          <div
            className="absolute -top-2 right-5 w-3 h-3 rotate-45 border-l border-t"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(30,41,59,0.95), rgba(15,23,42,0.95))'
                : 'linear-gradient(135deg, rgba(255,255,255,0.98), rgba(248,250,252,0.98))',
              borderColor: isDark ? 'rgba(99,102,241,0.5)' : 'rgba(99,102,241,0.35)',
            }}
          />

          <motion.div
            className="relative rounded-xl overflow-hidden border shadow-2xl backdrop-blur-md p-3 pr-8"
            style={{
              background: isDark
                ? 'linear-gradient(135deg, rgba(30,41,59,0.92), rgba(15,23,42,0.92))'
                : 'linear-gradient(135deg, rgba(255,255,255,0.95), rgba(248,250,252,0.95))',
              borderColor: isDark ? 'rgba(99,102,241,0.5)' : 'rgba(99,102,241,0.35)',
              boxShadow: isDark
                ? '0 12px 40px -10px rgba(99,102,241,0.5)'
                : '0 12px 40px -10px rgba(99,102,241,0.35)',
            }}
          >
            {/* Animated accent strip */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[2px]"
              style={{
                background:
                  'linear-gradient(90deg, #06b6d4, #6366f1, #a855f7, #06b6d4)',
                backgroundSize: '300% 100%',
              }}
              animate={{ backgroundPosition: ['0% 0%', '100% 0%'] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
            />

            <button
              onClick={dismiss}
              aria-label="Dismiss"
              className={`absolute top-1.5 right-1.5 p-1 rounded-md transition-colors ${
                isDark ? 'text-gray-400 hover:text-white hover:bg-white/10' : 'text-gray-500 hover:text-gray-900 hover:bg-black/5'
              }`}
            >
              <X className="w-3.5 h-3.5" />
            </button>

            <div className="flex items-start gap-2">
              <motion.span
                className="text-base leading-none mt-0.5"
                animate={{ rotate: [0, -12, 12, -8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 1.6 }}
              >
                {isDark ? '🌙' : '☀️'}
              </motion.span>
              <div className="flex-1 min-w-0">
                <p
                  className={`text-[12px] font-semibold leading-tight ${
                    isDark ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  {isDark ? 'Dark mode on' : 'Light mode on'} — matched to your system
                </p>
                <p
                  className={`text-[11px] mt-0.5 leading-snug ${
                    isDark ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Tap the toggle above to switch anytime.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
