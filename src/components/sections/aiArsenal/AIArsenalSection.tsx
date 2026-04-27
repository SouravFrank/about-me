import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { SectionWrapper } from '../../common';
import AIToolCard from './AIToolCard';
import { aiTools, aiArsenalIntro, type AITool } from '../../../data/aiTools';

interface Props {
  isDark: boolean;
}

const CATEGORIES: AITool['category'][] = [
  'Chat & Reasoning',
  'Coding',
  'IDE & Agents',
  'Creative & Multimodal',
];

const AIArsenalSection: React.FC<Props> = ({ isDark }) => {
  const grouped = useMemo(() => {
    return CATEGORIES.map((cat) => ({
      cat,
      items: aiTools.filter((t) => t.category === cat),
    })).filter((g) => g.items.length > 0);
  }, []);

  return (
    <SectionWrapper
      isDark={isDark}
      titleBold={aiArsenalIntro.titleBold}
      titleLight={aiArsenalIntro.titleLight}
      description={aiArsenalIntro.description}
    >
      <div className="max-w-7xl mx-auto">
        {/* Stats strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid grid-cols-3 gap-3 md:gap-6 mb-10 max-w-3xl mx-auto"
        >
          {[
            { k: `${aiTools.length}+`, v: 'AI Tools' },
            { k: '3+ yrs', v: 'AI-First Workflow' },
            { k: 'Day-1', v: 'On Frontier Releases' },
          ].map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              className="relative rounded-xl p-[1.5px] overflow-hidden"
            >
              <motion.div
                aria-hidden
                className="absolute inset-0 rounded-xl bg-gradient-to-r from-fuchsia-500 via-cyan-400 to-amber-300"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 200%' }}
              />
              <div className="relative rounded-xl bg-white/90 dark:bg-gray-900/90 backdrop-blur-md px-3 py-3 md:px-5 md:py-4 text-center">
                <div className="text-lg md:text-2xl font-bold bg-gradient-to-r from-fuchsia-500 via-cyan-500 to-amber-500 bg-clip-text text-transparent">
                  {s.k}
                </div>
                <div className="text-[10px] md:text-xs uppercase tracking-wider text-gray-600 dark:text-gray-400 mt-1">
                  {s.v}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Grouped grids */}
        {grouped.map(({ cat, items }) => (
          <div key={cat} className="mb-10 last:mb-0">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.5 }}
              className="text-lg md:text-xl font-semibold mb-4 flex items-center gap-3 text-gray-800 dark:text-gray-100"
            >
              <span className="inline-block w-8 h-[2px] bg-gradient-to-r from-fuchsia-500 to-cyan-400 rounded-full" />
              {cat}
            </motion.h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-5">
              {items.map((tool, i) => (
                <AIToolCard key={tool.name} {...tool} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </SectionWrapper>
  );
};

export default AIArsenalSection;
