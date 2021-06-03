import { CreateOptionDto } from './option/create-option.dto';

export interface CreateManyOfQuestionDto {
  text: string;
  options: Array<CreateOptionDto>;
  order: number;
}
