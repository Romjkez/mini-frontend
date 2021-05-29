import { QuestionType } from './question-type';
import { Option } from './option';

export interface ManyOfQuestion {
  id: string;

  readonly type: QuestionType.MultipleOf;

  text: string;

  options: Array<Option>;

  order: number;
}
