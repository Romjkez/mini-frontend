import { CreateOrderOptionDto } from './option/create-order-option.dto';

export interface CreateOrderQuestionDto {
  text: string;
  options: Array<CreateOrderOptionDto>;
  order: number;
}
