import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap } from 'lucide-react';
import type { AITool } from '../../../data/aiTools';

interface Props extends AITool {
  index: number;
}

const AIToolCard: React.FC<Props> = ({ name, logo, story, badge, since, color, category, index }) => {
  const [imgErr, setImgErr] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: -10 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, delay: (index % 8) * 0.05, ease: 'easeOut' }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="group relative rounded-2xl p-[1.5px] overflow-hidden"
      style={{ perspective: 1000 }}
    >
      {/* Animated gradient border */}
      <motion.div
        aria-hidden
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${color} opacity-60 group-hover:opacity-100 transition-opacity`}
        animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
        style={{ backgroundSize: '200% 200%' }}
      />

      <div className="relative h-full rounded-2xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl p-5 flex flex-col">
        {/* Badge — absolute so it doesn't squeeze the title */}
        {badge && (
          <motion.span
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 300, delay: 0.2 }}
            className={`absolute top-3 right-3 z-10 inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-1 rounded-full text-white bg-gradient-to-r ${color} shadow-md whitespace-nowrap`}
          >
            <Zap className="w-3 h-3" />
            {badge}
          </motion.span>
        )}

        {/* Header */}
        <div className={`flex items-center gap-3 mb-3 ${badge ? 'pr-2' : ''}`}>
          <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-white to-gray-100 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center shadow-inner overflow-hidden shrink-0">
            {imgErr ? (
              <Sparkles className="w-6 h-6 text-gray-500" />
            ) : (
              <img
                src={logo}
                alt={`${name} logo`}
                className="w-8 h-8 object-contain"
                loading="lazy"
                onError={() => setImgErr(true)}
              />
            )}
            <motion.div
              aria-hidden
              className={`absolute inset-0 bg-gradient-to-br ${color} mix-blend-overlay opacity-0 group-hover:opacity-30 transition-opacity`}
            />
          </div>
          <div className={`min-w-0 flex-1 ${badge ? 'mt-6' : ''}`}>
            <h3 className="text-base md:text-lg font-bold text-gray-900 dark:text-white leading-tight break-words">
              {name}
            </h3>
            <p className="text-[11px] uppercase tracking-wider text-gray-500 dark:text-gray-400 mt-0.5">
              {category}
            </p>
          </div>
        </div>

        {/* Story */}
        <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed flex-1">{story}</p>

        {since && (
          <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700/60 flex items-center justify-between text-[11px] text-gray-500 dark:text-gray-400">
            <span>Since</span>
            <span className="font-mono font-semibold text-gray-700 dark:text-gray-300">{since}</span>
          </div>
        )}

        {/* Hover sheen */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"
          style={{
            background:
              'linear-gradient(115deg, transparent 30%, rgba(255,255,255,0.18) 50%, transparent 70%)',
            backgroundSize: '200% 100%',
            animation: 'aiSheen 2.5s linear infinite',
          }}
        />
      </div>

      <style>{`
        @keyframes aiSheen {
          0% { background-position: -100% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default AIToolCard;
