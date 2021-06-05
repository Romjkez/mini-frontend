import { Tag } from '../../../common/models/tag';

export interface SimpleTest {
  id: number;
  title: string;
  previewUrl?: string;
  oneOfQuestions: number;
  manyOfQuestions: number;
  exactAnswerQuestions: number;
  orderQuestions: number;
  isVisible: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: Array<Tag>;
}
