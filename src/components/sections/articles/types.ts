export interface Article {
  title: string;
  description: string;
  image: string;
  url: string;
}

export interface ArticleCardProps extends Article {
  index?: number;
}

export interface ArticlesSectionProps {
  articles: Article[];
}
