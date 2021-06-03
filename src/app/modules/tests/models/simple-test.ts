import { Tag } from '../../../common/models/tag';

export interface SimpleTest {
  id: number;
  oneOfQuestions: number;
  manyOfQuestions: number;
  exactAnswerQuestions: number;
  orderQuestions: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: Array<Tag>;
}
