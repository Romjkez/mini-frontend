import { Article } from './article';

export interface ArticleOwn extends Article {
  isFavorite?: boolean;
  isFinished?: boolean;
}
