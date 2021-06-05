import { Tag } from '../../../common/models/tag';

export interface SimpleExercise {
  id: number;
  title: string;
  previewUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  tests: number;
  articles: number;
  isVisible: boolean;
  tags: Array<Tag>;
}
