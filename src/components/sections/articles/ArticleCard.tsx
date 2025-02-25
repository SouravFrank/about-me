import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import { ArticleCardProps } from './types';
import useIsMobile from '../../../hooks/isMobile';

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, url, image }) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      className="block w-[320px] md:w-[320px] h-[350px] md:h-[310px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden group relative"
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.15 }}
      variants={{
        hover: { scale: 1.05, y: -5 },
        tap: { scale: 0.98 }
      }}
      animate={undefined}
      whileInView={undefined}
      viewport={{ once: true }}
      initial={undefined}
      // Only apply hover/tap animations on desktop
      data-no-animation-mobile
    >
      <div className="relative aspect-w-16 aspect-h-9">
        <img
          src={image || '/default-thumbnail.jpg'}
          alt={title}
          className="w-full h-42 md:h-full object-cover rounded-t-2xl"
        />
        <div className="absolute inset-0 bg-black/40 md:opacity-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 md:p-4 bg-white/10 hover:bg-white/20 rounded-full transition-colors duration-200"
            onClick={(e) => e.stopPropagation()}
            aria-label="Visit article"
          >
            <ExternalLink className="w-5 h-5 md:w-6 md:h-6 text-white" />
          </a>
        </div>
      </div>
      <div className="px-3 pt-3 md:p-4 md:group-hover:p-2 transition-all duration-300">
        <h3 className="text-sm md:text-base leading-tight md:leading-normal font-semibold text-gray-800 dark:text-gray-200 mb-2 md:group-hover:text-[12px] md:group-hover:leading-tight md:group-hover:mb-1 transition-all duration-400">
          {title}
        </h3>
        <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed line-clamp-3 md:line-clamp-none md:group-hover:leading-snug md:h-0 h-auto md:opacity-0 opacity-100 md:group-hover:h-auto md:group-hover:opacity-100 transition-all duration-400">
          {description}
        </p>

      </div>
      {isMobile && <div className="absolute bottom-2 right-3 px-3 py-2 md:p-4 ">
        <span className="text-xs text-blue-500 font-medium flex items-center">
          Read more
          <ExternalLink className="w-3 h-3 ml-1" />
        </span>
      </div>}
    </motion.div>
  );
};

export default ArticleCard;