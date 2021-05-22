import { Tag } from '../../../common/models/tag';

export interface Article {
  id: number;

  title: string;

  video?: string;

  content?: string;

  isVisible: boolean;

  finishedBy: number;

  favoriteFor: number;

  previewUrl?: string;

  createdAt: Date;

  updatedAt?: Date;

  tags: Array<Tag>;

}
