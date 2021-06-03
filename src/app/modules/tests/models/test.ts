import { Tag } from '../../../common/models/tag';
import { OrderQuestion } from './order-question';
import { OneOfQuestion } from './one-of-question';
import { ManyOfQuestion } from './many-of-question';
import { ExactAnswerQuestion } from './exact-answer-question';

export interface Test {
  id: number;

  title: string;

  previewUrl?: string;

  oneOfQuestions: Array<OneOfQuestion>;

  manyOfQuestions: Array<ManyOfQuestion>;

  orderQuestions: Array<OrderQuestion>;

  exactAnswerQuestions: Array<ExactAnswerQuestion>;

  isVisible: boolean;

  createdAt: Date;

  updatedAt?: Date;

  order?: number;

  tags: Array<Tag>;
}
