import { articles } from '../../../data';
import ArticleCard from './ArticleCard';

const ArticlesSection = () => {
  return (
    <div className="flex flex-row mt-4 mb-4 gap-8 px-8">
      {articles.map((article, index) => (
        <div key={index} className="snap-start shrink-0 hover:z-10">
          <ArticleCard {...article} />
        </div>
      ))}
    </div>
  );
};

export default ArticlesSection;
