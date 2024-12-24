import { motion } from 'framer-motion';

interface ArticleCardProps {
  title: string;
  description: string;
  url: string;
  image?: string;
}

const ArticleCard: React.FC<ArticleCardProps> = ({ title, description, url, image }) => {
  return (
    <div className="p-2">
      <motion.a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-[320px] h-[310px] bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer group relative"
        whileHover={{ scale: 1.15 }}
        transition={{ duration: 0.15 }}
      >
        <div className="aspect-w-16 aspect-h-9">
          <img 
            src={image || '/default-thumbnail.jpg'} 
            alt={title} 
            className="w-full h-full object-cover rounded-t-2xl"
          />
        </div>
        <div className="p-4 group-hover:p-2 transition-all duration-300">
          <h3 className="text-base leading-normal font-semibold text-gray-800 dark:text-gray-200 mb-2 group-hover:text-[12px] group-hover:leading-tight group-hover:mb-1 transition-all duration-400">
            {title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-xs leading-relaxed group-hover:leading-snug h-0 group-hover:h-auto opacity-0 group-hover:opacity-100 transition-all duration-400 line-clamp-4">
            {description}
          </p>
        </div>
      </motion.a>
    </div>
  );
};

export default ArticleCard; 