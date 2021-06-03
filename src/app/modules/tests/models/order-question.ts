import { QuestionType } from './question-type';
import { Option } from './option';

export interface OrderQuestion {
  id: string;
  type: QuestionType.Order;
  text: string;
  options: Array<Option>;
  order: number;
}
