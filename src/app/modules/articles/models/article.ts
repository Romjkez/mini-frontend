import { Tag } from '../../../common/models/tag';
import { CreatedUpdatedEntity } from '../../../common/models/created-updated-entity.model';

export interface Article extends CreatedUpdatedEntity {
  id: number;

  title: string;

  video?: string;

  content?: string;

  isVisible: boolean;

  finishedBy: number;

  favoriteFor: number;

  previewUrl?: string;

  createdAt: Date;

  updatedAt: Date;

  tags: Array<Tag>;

}
