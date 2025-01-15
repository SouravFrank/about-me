import { motion } from 'framer-motion';
import { ExternalLink, Brain, BarChart2, Users, Workflow, Bot } from 'lucide-react';
import { SkillCardProps } from './types';

const SkillCard: React.FC<SkillCardProps> = ({ name, src, description, expertise, index }) => {
  const getIcon = (src: string): JSX.Element => {
    const softSkillIcons: Record<string, JSX.Element> = {
      strategy: <Brain className="w-10 h-10 text-blue-500 dark:text-blue-400" />,
      analysis: <BarChart2 className="w-10 h-10 text-green-500 dark:text-green-400" />,
      team: <Users className="w-10 h-10 text-purple-500 dark:text-purple-400" />,
      adapt: <Workflow className="w-10 h-10 text-orange-500 dark:text-orange-400" />,
      prompt: <Bot className="w-10 h-10 text-red-500 dark:text-red-400" />,
    };

    return (
      softSkillIcons[src] || (
        <img
          src={src}
          alt={name}
          className={`w-10 h-10 ${['express.js', 'socket.io', 'bash'].includes(name.toLowerCase()) ? 'dark:invert dark:brightness-100 dark:transition-all' : ''}`}
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      )
    );
  };

  return (
    <motion.div className={`shadow-neumorph p-6 rounded-lg group relative overflow-hidden bg-white dark:bg-gray-800 ${expertise && expertise > 5 ? 'border-2 border-transparent' : ''}`} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: index * 0.1 }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 flex items-center justify-center">{getIcon(src)}</div>
          <h3 className="text-xl font-bold dark:text-white">{name}</h3>
        </div>
      </div>

      {expertise !== undefined && (
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-2 mb-3 overflow-hidden relative">
          <motion.div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 via-purple-500/20 to-pink-400/20 opacity-50 blur-sm" initial={{ width: 0 }} animate={{ width: `${(expertise / 5) * 100}%` }} transition={{ type: 'spring', stiffness: 300, damping: 20 }} />
          <motion.div
            className="absolute h-2.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
            initial={{ width: 0 }}
            animate={{ width: `${(expertise / 10) * 100}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 20 }}
            style={{
              backgroundSize: '300% 100%',
              animation: 'gradientFlow 3s ease infinite',
              borderRadius: '9999px',
            }}
          />
        </div>
      )}

      <motion.div className="absolute inset-0 bg-white dark:bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300" initial={false}>
        <div className="p-4 h-full flex flex-col justify-between">
          <p className="text-sm dark:text-gray-200 leading-relaxed">{description}</p>
          <motion.a href={`https://www.google.com/search?q=${encodeURIComponent(name)}+skill+development`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-300 text-sm font-medium mt-2" whileHover={{ x: 5 }}>
            Learn More <ExternalLink className="w-3.5 h-3.5 ml-1" />
          </motion.a>
        </div>
      </motion.div>

      {expertise && expertise > 6 && (
        <motion.div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            background: 'linear-gradient(to right, transparent, rgba(59, 130, 246, 0.3), transparent)',
            backgroundSize: '200% 100%',
            animation: 'borderGlow 3s infinite linear',
          }}
        />
      )}

      <style>{`
        @keyframes gradientFlow {
          0% { background-position: 100% 0; }
          100% { background-position: -100% 0; }
        }
        @keyframes borderGlow {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </motion.div>
  );
};

export default SkillCard;
