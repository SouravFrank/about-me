import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trophy, Calendar, Sparkles, Eye, X } from 'lucide-react';

interface RewardCardProps {
    title: string;
    date: string;
    company: string;
    companyImage: string;
    image: string;
    highlights: string[];
    isDark: boolean;
    index: number;
}

const RewardCard: React.FC<RewardCardProps> = ({
    title,
    date,
    companyImage,
    image,
    highlights,
    isDark,
    company,
    index,
}) => {
    const [showCert, setShowCert] = useState(false);

    return (
        <>
            <motion.div
                className="relative group h-full"
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.55, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
            >
                {/* Animated glowing border */}
                <div
                    className="absolute -inset-[1.5px] rounded-2xl opacity-60 group-hover:opacity-100 transition-opacity duration-500 blur-sm group-hover:blur-md"
                    style={{
                        background:
                            'linear-gradient(135deg, #f59e0b, #ec4899, #6366f1, #06b6d4, #f59e0b)',
                        backgroundSize: '300% 300%',
                        animation: 'rewardGradient 8s ease infinite',
                    }}
                />
                <style>{`
                    @keyframes rewardGradient {
                        0%,100% { background-position: 0% 50%; }
                        50% { background-position: 100% 50%; }
                    }
                `}</style>

                {/* Card body */}
                <div
                    className={`relative rounded-2xl overflow-hidden h-full flex flex-col backdrop-blur-xl ring-1 ${isDark
                        ? 'bg-gray-900/85 ring-white/10'
                        : 'bg-white/90 ring-gray-200/70'
                        } shadow-xl`}
                >
                    {/* Header gradient strip with trophy */}
                    <div className="relative h-24 overflow-hidden flex-none">
                        <div
                            className="absolute inset-0"
                            style={{
                                background:
                                    'linear-gradient(135deg, rgba(251,191,36,0.25) 0%, rgba(236,72,153,0.20) 50%, rgba(99,102,241,0.25) 100%)',
                            }}
                        />
                        {/* Sparkles */}
                        {[...Array(5)].map((_, i) => (
                            <motion.span
                                key={i}
                                className="absolute w-1 h-1 rounded-full bg-amber-300"
                                style={{
                                    left: `${15 + i * 17}%`,
                                    top: `${20 + (i % 3) * 25}%`,
                                }}
                                animate={{
                                    opacity: [0, 1, 0],
                                    scale: [0.5, 1.4, 0.5],
                                }}
                                transition={{
                                    duration: 2.4,
                                    repeat: Infinity,
                                    delay: i * 0.4,
                                    ease: 'easeInOut',
                                }}
                            />
                        ))}

                        {/* Date badge */}
                        <div
                            className={`absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-semibold backdrop-blur-md ${isDark
                                ? 'bg-white/10 text-amber-200 ring-1 ring-white/15'
                                : 'bg-white/70 text-amber-700 ring-1 ring-amber-200/60'
                                }`}
                        >
                            <Calendar className="w-3 h-3" />
                            {date}
                        </div>

                        {/* Trophy icon with glow */}
                        <motion.div
                            className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2"
                            animate={{ y: [0, -4, 0], rotate: [-3, 3, -3] }}
                            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-amber-400 blur-2xl opacity-50 rounded-full" />
                                <div className="relative w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br from-amber-300 via-amber-500 to-orange-600 shadow-lg shadow-amber-500/40">
                                    <Trophy className="w-7 h-7 text-white drop-shadow" strokeWidth={2.2} />
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Content body */}
                    <div className="flex-1 flex flex-col px-5 pt-4 pb-5 gap-3">
                        <h3
                            className={`text-base font-bold leading-snug text-center line-clamp-2 ${isDark ? 'text-white' : 'text-gray-900'
                                }`}
                            title={title}
                        >
                            {title}
                        </h3>

                        {/* Highlight quote */}
                        {highlights?.[0] && (
                            <div
                                className={`relative flex-1 px-3 py-2.5 rounded-xl text-xs leading-relaxed ${isDark
                                    ? 'bg-white/5 text-gray-300 ring-1 ring-white/5'
                                    : 'bg-gray-50/80 text-gray-600 ring-1 ring-gray-100'
                                    }`}
                            >
                                <Sparkles
                                    className={`absolute -top-2 -left-2 w-4 h-4 ${isDark ? 'text-amber-300' : 'text-amber-500'
                                        }`}
                                />
                                <p className="italic line-clamp-3">"{highlights[0]}"</p>
                            </div>
                        )}

                        {/* Footer: company logo + view button */}
                        <div
                            className={`flex items-center justify-between gap-3 pt-3 mt-auto border-t ${isDark ? 'border-white/10' : 'border-gray-100'
                                }`}
                        >
                            <div className="flex items-center gap-2 min-w-0 flex-1">
                                <img
                                    src={companyImage}
                                    alt={company}
                                    className="h-12 max-w-40 w-auto object-contain"
                                    style={{
                                        filter:
                                            isDark && company === 'Narula Institute of Technology'
                                                ? 'brightness(1.9)'
                                                : 'none',
                                    }}
                                />
                            </div>

                            {image && (
                                <motion.button
                                    onClick={() => setShowCert(true)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1.5 rounded-lg shrink-0 transition-colors ${isDark
                                        ? 'bg-amber-500/15 text-amber-300 hover:bg-amber-500/25 ring-1 ring-amber-500/30'
                                        : 'bg-amber-50 text-amber-700 hover:bg-amber-100 ring-1 ring-amber-200'
                                        }`}
                                >
                                    <Eye className="w-3 h-3" />
                                    View
                                </motion.button>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Certificate preview modal */}
            <AnimatePresence>
                {showCert && image && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowCert(false)}
                        className="fixed inset-0 z-[60] backdrop-blur-md flex items-center justify-center p-4"
                    >
                        <motion.div
                            initial={{ scale: 0.85, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.85, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 22, stiffness: 240 }}
                            onClick={(e) => e.stopPropagation()}
                            className="relative max-w-3xl w-full"
                        >
                            <button
                                onClick={() => setShowCert(false)}
                                className="absolute -top-3 -right-3 z-10 p-2 rounded-full bg-white text-gray-800 shadow-lg hover:scale-110 transition-transform"
                                aria-label="Close"
                            >
                                <X className="w-4 h-4" />
                            </button>
                            <img
                                src={image}
                                alt={title}
                                className="w-full h-auto rounded-2xl shadow-2xl ring-1 ring-white/20"
                            />
                            <p className="mt-3 text-center text-white text-sm font-medium drop-shadow">
                                {title} · {company}
                            </p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default RewardCard;
