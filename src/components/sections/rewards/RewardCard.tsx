import React from 'react';
import { motion } from 'framer-motion';
import trophyIcon from '../../../assets/icons/trophy.svg';

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

const RewardCard: React.FC<RewardCardProps> = ({ title, date, companyImage, image, highlights, isDark, company }) => (
    <motion.div
        className="relative group flex-shrink-0"
        style={{ aspectRatio: '379 / 210' }}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
    >
        <div className={`rounded-lg shadow-lg overflow-hidden transition-transform duration-300 group-hover:scale-105 ${isDark ? 'bg-gray-800' : 'bg-white'}`} style={{ minHeight: '200px' }}>
            <div className="flex flex-col items-center p-4">
                <motion.img
                    src={trophyIcon}
                    alt="Trophy Icon"
                    className="w-24 h-24 mx-auto transition-transform duration-300"
                    whileHover={{ rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 300 }}
                />
                <h3 className={`text-lg font-semibold mb-1 text-center ${isDark ? 'text-white' : 'text-neutral-800'}`}>{title}</h3>
                <p className={`text-neutral-500 italic mb-2 text-center ${isDark ? 'text-gray-400' : 'text-neutral-500'}`}>{date}</p>
                <div className="flex flex-row items-center justify-center" style={{ height: 50 }}>
                    <img
                        src={companyImage}
                        alt={company}
                        style={{
                            height: 'auto',
                            width: '50%',
                            filter: isDark && company === 'Narula Institute of Technology' ? 'brightness(1.9)' : 'none'
                        }}
                    />
                </div>
            </div>

            <div className={`absolute inset-0 flex flex-col md:flex-row items-center justify-center bg-opacity-0 group-hover:bg-opacity-95 transition duration-300 rounded-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
                <motion.img
                    src={image}
                    alt={title}
                    className="w-1/1.5 md:w-full h-32 object-cover transition-opacity duration-300 opacity-0 group-hover:opacity-100 mx-2"
                />
                <div className={`p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${isDark ? 'text-gray-300' : 'text-neutral-700'}`}>
                    <p>{highlights[0]}</p>
                </div>
            </div>
        </div>
    </motion.div>
);

export default RewardCard;