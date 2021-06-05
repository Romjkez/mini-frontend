import { Test } from '../../tests/models/test';
import { Tag } from '../../../common/models/tag';
import { Article } from '../../articles/models/article';

export interface Exercise {
  id: number;
  title: string;
  previewUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  isVisible: boolean;
  tests: Array<Test>;
  articles: Array<Article>;
  tags: Array<Tag>;
}
