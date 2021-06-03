import { QuestionType } from './question-type';

export interface ExactAnswerQuestion {
  id: string;

  readonly type: QuestionType.ExactAnswer;

  text: string;

  answer: string; // TODO: do not expose?

  order: number;
}
