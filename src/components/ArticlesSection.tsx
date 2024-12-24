import ArticleCard from './ArticleCard';
import { articles } from '../data/articles';

const ArticlesSection = () => {
  return (
      articles.map((article, index) => (
        <div key={index} className="snap-start shrink-0">
          <ArticleCard {...article} />
        </div>
      ))
  );
};

export default ArticlesSection; 