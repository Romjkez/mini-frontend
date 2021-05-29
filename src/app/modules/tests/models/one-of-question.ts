import { QuestionType } from './question-type';
import { Option } from './option';

export interface OneOfQuestion {
  id: string;

  readonly type: QuestionType.OneOf;

  text: string;

  options: Array<Option>;

  order: number;
}
