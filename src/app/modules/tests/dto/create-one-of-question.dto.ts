import { CreateOptionDto } from './option/create-option.dto';

export interface CreateOneOfQuestionDto {
  text: string;
  options: Array<CreateOptionDto>;
  order: number;
}
