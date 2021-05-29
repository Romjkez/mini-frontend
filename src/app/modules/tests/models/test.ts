import { Tag } from '../../../common/models/tag';
import { OrderQuestion } from './order-question';
import { OneOfQuestion } from './one-of-question';
import { ManyOfQuestion } from './many-of-question';

export interface Test {
  id: number;

  title: string;

  previewUrl?: string;

  oneOfQuestions: Array<OneOfQuestion>;

  manyOfQuestions: Array<ManyOfQuestion>;

  orderQuestions: Array<OrderQuestion>;

  isVisible: boolean;

  createdAt: Date;

  updatedAt?: Date;

  order?: number;

  tags: Array<Tag>;
}
