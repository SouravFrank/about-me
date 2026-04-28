import type { ReactElement } from 'react';
import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { ArrowUpRight, Brain, BarChart2, Users, Workflow, Bot, MessageSquareCode } from 'lucide-react';
import { SkillCardProps } from './types';

const SkillCard: React.FC<SkillCardProps> = ({ name, src, description, expertise, index }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  // 3D tilt
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const rx = useSpring(useTransform(my, [0, 1], [8, -8]), { stiffness: 200, damping: 20 });
  const ry = useSpring(useTransform(mx, [0, 1], [-10, 10]), { stiffness: 200, damping: 20 });
  const glowX = useTransform(mx, [0, 1], ['0%', '100%']);
  const glowY = useTransform(my, [0, 1], ['0%', '100%']);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    mx.set((e.clientX - rect.left) / rect.width);
    my.set((e.clientY - rect.top) / rect.height);
  };

  const handleLeave = () => {
    mx.set(0.5);
    my.set(0.5);
    setHovered(false);
  };

  const getIcon = (src: string): ReactElement => {
    const softSkillIcons: Record<string, ReactElement> = {
      strategy: <Brain className="w-9 h-9 text-blue-500 dark:text-blue-400" />,
      analysis: <BarChart2 className="w-9 h-9 text-green-500 dark:text-green-400" />,
      team: <Users className="w-9 h-9 text-purple-500 dark:text-purple-400" />,
      adapt: <Workflow className="w-9 h-9 text-orange-500 dark:text-orange-400" />,
      prompt: <Bot className="w-9 h-9 text-red-500 dark:text-red-400" />,
      code: <MessageSquareCode className="w-9 h-9 text-blue-500 dark:text-blue-400" />,
    };

    return (
      softSkillIcons[src] || (
        <img
          src={src}
          alt={name}
          className={`w-9 h-9 ${['express.js', 'socket.io', 'bash'].includes(name.toLowerCase()) ? 'dark:invert' : ''}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      )
    );
  };

  const pct = expertise ? Math.min(100, (expertise / 10) * 100) : 0;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 1000, transformStyle: 'preserve-3d' }}
      className="relative rounded-2xl group"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      {/* Elite outer glow halo — only for top-tier (expertise >= 8) */}
      {(expertise ?? 0) >= 8 && (
        <motion.div
          aria-hidden
          className="absolute -inset-3 rounded-3xl pointer-events-none"
          style={{
            background:
              'conic-gradient(from var(--ang,0deg), #3b82f6, #a855f7, #ec4899, #f59e0b, #22d3ee, #3b82f6)',
            filter: 'blur(22px)',
            // @ts-expect-error custom prop
            '--ang': '0deg',
          }}
          animate={{
            ['--ang' as never]: ['0deg', '360deg'],
            opacity: [0.45, 0.8, 0.45],
            scale: [1, 1.04, 1],
          }}
          transition={{
            ['--ang' as never]: { duration: 5, repeat: Infinity, ease: 'linear' },
            opacity: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
            scale: { duration: 2.4, repeat: Infinity, ease: 'easeInOut' },
          }}
        />
      )}

      {/* Outer animated conic ring */}
      <motion.div
        aria-hidden
        className={`absolute rounded-2xl transition-opacity duration-500 ${
          (expertise ?? 0) >= 8
            ? '-inset-[3px] opacity-100'
            : '-inset-[1.5px] opacity-0 group-hover:opacity-100'
        }`}
        style={{
          background:
            'conic-gradient(from var(--ang,0deg), #3b82f6, #a855f7, #ec4899, #f59e0b, #22d3ee, #3b82f6)',
          filter: (expertise ?? 0) >= 8 ? 'blur(2px) saturate(1.5)' : 'blur(6px)',
          // @ts-expect-error custom prop
          '--ang': '0deg',
        }}
        animate={{ ['--ang' as never]: ['0deg', '360deg'] }}
        transition={{ duration: (expertise ?? 0) >= 8 ? 4 : 6, repeat: Infinity, ease: 'linear' }}
      />

      {/* Elite "PRO" badge — top-right corner */}
      {(expertise ?? 0) >= 8 && (
        <motion.div
          aria-hidden
          className="absolute -top-2 -right-2 z-20 px-2 py-0.5 rounded-full text-[9px] font-bold tracking-widest text-white shadow-lg"
          style={{
            background: 'linear-gradient(135deg, #f59e0b, #ec4899, #a855f7)',
            boxShadow: '0 4px 14px rgba(236,72,153,0.55)',
          }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          ★ PRO
        </motion.div>
      )}

      {/* Card body */}
      <div className="relative h-full rounded-2xl bg-white dark:bg-gray-800/95 backdrop-blur-sm overflow-hidden shadow-neumorph">
        {/* Cursor-following glow */}
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: useTransform(
              [glowX, glowY] as never,
              ([x, y]: string[]) =>
                `radial-gradient(280px circle at ${x} ${y}, rgba(168,85,247,0.18), transparent 60%)`
            ) as never,
          }}
        />

        {/* Grid pattern that fades in */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 dark:opacity-0 dark:group-hover:opacity-[0.12]"
          style={{
            backgroundImage:
              'linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            color: '#a855f7',
          }}
        />

        {/* Front content */}
        <div className="relative p-5" style={{ transform: 'translateZ(30px)' }}>
          <div className="flex items-center gap-3">
            <motion.div
              className="w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-700/60 dark:to-gray-900/60 ring-1 ring-black/5 dark:ring-white/10"
              animate={hovered ? { scale: 1.08, rotate: [0, -6, 6, 0] } : { scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              {getIcon(src)}
            </motion.div>
            <h3 className="text-lg font-bold dark:text-white leading-tight break-words">{name}</h3>
          </div>

          {expertise !== undefined && (
            <div className="mt-4 relative">
              <div className="w-full h-1.5 bg-gray-200/80 dark:bg-gray-700/70 rounded-full overflow-hidden">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#3b82f6,#a855f7,#ec4899,#3b82f6)]"
                  style={{ backgroundSize: '300% 100%' }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${pct}%` }}
                  viewport={{ once: true }}
                  transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.1 }}
                  animate={{ backgroundPosition: ['0% 0%', '300% 0%'] }}
                />
              </div>
              <motion.span
                className="absolute -top-5 right-0 text-[10px] font-mono text-gray-500 dark:text-gray-400 tabular-nums"
                initial={{ opacity: 0 }}
                animate={{ opacity: hovered ? 1 : 0.6 }}
              >
                {expertise}/10
              </motion.span>
            </div>
          )}
        </div>

        {/* Reveal panel — slides up from bottom on hover (solid background for readability) */}
        <motion.div
          className="absolute inset-x-0 bottom-0 px-5 pt-4 pb-4 bg-white dark:bg-gray-900 border-t border-gray-200/70 dark:border-gray-700/70 shadow-[0_-8px_24px_-12px_rgba(0,0,0,0.25)]"
          initial={false}
          animate={{ y: hovered ? 0 : '100%', opacity: hovered ? 1 : 0 }}
          transition={{ type: 'spring', stiffness: 220, damping: 26 }}
        >
          <p className="text-[12.5px] leading-relaxed text-gray-800 dark:text-gray-100 line-clamp-4">
            {description}
          </p>
          <motion.a
            href={`https://www.google.com/search?q=${encodeURIComponent(name)}+skill+development`}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center gap-1 text-[11px] font-medium text-blue-600 dark:text-blue-400 hover:text-pink-500 dark:hover:text-pink-400 transition-colors"
            whileHover={{ x: 3 }}
          >
            Learn more
            <ArrowUpRight className="w-3 h-3" />
          </motion.a>
        </motion.div>

        {/* Corner sparkle */}
        <motion.div
          aria-hidden
          className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full bg-gradient-to-br from-blue-400 to-pink-500"
          animate={hovered ? { scale: [1, 1.6, 1], opacity: [0.6, 1, 0.6] } : { scale: 1, opacity: 0.5 }}
          transition={{ duration: 1.4, repeat: hovered ? Infinity : 0 }}
        />
      </div>
    </motion.div>
  );
};

export default SkillCard;
