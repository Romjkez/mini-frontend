import { CreateOneOfQuestionDto } from './create-one-of-question.dto';
import { CreateManyOfQuestionDto } from './create-many-of-question.dto';
import { CreateExactAnswerQuestionDto } from './create-exact-answer-question.dto';
import { CreateOrderQuestionDto } from './create-order-question.dto';

export interface CreateTestDto {
  title: string;
  previewUrl?: string;
  oneOfQuestions?: Array<CreateOneOfQuestionDto>;
  manyOfQuestions?: Array<CreateManyOfQuestionDto>;
  exactAnswerQuestions?: Array<CreateExactAnswerQuestionDto>;
  orderQuestions?: Array<CreateOrderQuestionDto>;
  order?: number;
  tags: Array<string>;
}
