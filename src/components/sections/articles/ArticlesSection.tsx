import { useEffect, useRef } from 'react';
import { articles } from '../../../data';
import ArticleCard from './ArticleCard';
import { trackEvent, ANALYTICS_CATEGORIES } from '../../../utils/analytics';
import { useInView } from 'framer-motion';

const ArticlesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  // Track when articles section comes into view
  useEffect(() => {
    if (isInView) {
      trackEvent('section_view', {
        category: ANALYTICS_CATEGORIES.CONTENT,
        section: 'articles',
        article_count: articles.length
      });
    }
  }, [isInView]);

  // Track horizontal scrolling in the articles section
  useEffect(() => {
    const handleScroll = () => {
      if (sectionRef.current) {
        trackEvent('articles_scroll', {
          category: ANALYTICS_CATEGORIES.INTERACTION,
          scroll_position: sectionRef.current.scrollLeft,
          container_width: sectionRef.current.scrollWidth
        });
      }
    };

    const sectionElement = sectionRef.current;
    if (sectionElement) {
      // Use a debounced version to avoid too many events
      let timeout: NodeJS.Timeout;
      const debouncedScroll = () => {
        clearTimeout(timeout);
        timeout = setTimeout(handleScroll, 300);
      };

      sectionElement.addEventListener('scroll', debouncedScroll);
      return () => {
        sectionElement.removeEventListener('scroll', debouncedScroll);
        clearTimeout(timeout);
      };
    }
  }, []);

  return (
    <div className="flex flex-row mt-4 mb-4 gap-4 "
      ref={sectionRef}
      data-section="articles"
    >
      {articles.map((article, index) => (
        <div key={index} className="snap-start shrink-0 hover:z-10">
          <ArticleCard {...article} index={index} />
        </div>
      ))}
    </div>
  );
};

export default ArticlesSection;
