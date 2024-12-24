import { motion } from 'framer-motion';
import { articles } from '../data/articles';

const ArticlesSection = () => {

  return (
    <section className="py-20 px-8">
      <h2 className="text-3xl font-bold text-center mb-12">My Published Articles</h2>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {articles.map((article, index) => (
          <motion.a
            key={index}
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white dark:bg-gray-800 rounded-lg shadow-neumorph overflow-hidden transition-transform duration-300 hover:scale-105"
            whileHover={{ scale: 1.05 }}
          >
            <img src={article.image || 'default-thumbnail.jpg'} alt={article.title || 'Article'} className="w-full h-40 object-cover" />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{article.title || 'Unknown Title'}</h3>
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
};

export default ArticlesSection; 