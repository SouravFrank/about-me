import React from 'react';
import { motion } from 'framer-motion';
import { Check, Loader } from 'lucide-react';
import { CTAButtonProps } from './types';
import { trackEvent, ANALYTICS_CATEGORIES } from '../../utils/analytics';

const CTAButton: React.FC<CTAButtonProps> = ({ label, onClick, variant = 'colored', Icon, downloadClicked, disabled }) => {
  const buttonStyles =
    variant === 'colored'
      ? 'bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white'
      : 'bg-white border-2 border-gray-200 text-gray-700 dark:bg-gray-800 dark:border-gray-600 dark:text-white';

  const handleClick = (e: React.MouseEvent) => {
    // Track the button click event
    trackEvent('button_click', {
      category: ANALYTICS_CATEGORIES.INTERACTION,
      button_label: label,
      button_variant: variant,
      is_download: !!downloadClicked,
    });

    // Call the original onClick handler
    if (!disabled && onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`relative overflow-hidden px-10 py-4 rounded-full font-medium shadow-xl 
        ${downloadClicked ? 'bg-green-500' : buttonStyles} 
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
        hover:shadow-2xl transition-all duration-300`}
      whileHover={{ scale: disabled ? 1 : 1.05, boxShadow: '0 20px 40px rgba(0,0,0,0.1)' }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
    >
      {/* Rest of your component remains unchanged */}
      <motion.span
        initial={false}
        animate={{
          opacity: downloadClicked ? 0 : 1,
          y: downloadClicked ? -20 : 0,
        }}
        className="flex items-center gap-3 text-lg"
      >
        {disabled ? <Loader className="w-6 h-6 animate-spin text-white" /> : Icon && !downloadClicked && <Icon className="w-6 h-6" />} {label}
      </motion.span>
      <motion.span
        initial={{ opacity: 0, y: 20 }}
        animate={{
          opacity: downloadClicked ? 1 : 0,
          y: downloadClicked ? 0 : 20,
        }}
        className="absolute inset-0 flex items-center justify-center"
      >
        <Check className="w-6 h-6 text-white" />
      </motion.span>
      {/* Shimmer effect on hover */}
      <div className="absolute inset-0 overflow-hidden rounded-full">
        <div
          className="absolute inset-0 animate-shimmer"
          style={{
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.6), transparent)',
            backgroundSize: '200% 100%',
            width: '150%',
            left: '-25%',
            transform: 'translateX(-100%)',
            animationDuration: '1.5s',
            opacity: 0,
          }}
        />
      </div>
      {/* Show shimmer on hover */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
            opacity: 0.5;
          }
          100% {
            transform: translateX(100%);
            opacity: 0.5;
          }
        }
        button:hover .animate-shimmer {
          opacity: 1;
          animation: shimmer 1.5s linear infinite;
        }
      `}</style>
    </motion.button>
  );
};

export default CTAButton;
