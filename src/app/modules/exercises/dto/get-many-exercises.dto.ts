import { GetManyDto } from '../../../common/dto/get-many.dto';
import { ExerciseFilterDto } from './exercise-filter.dto';
import { ExerciseSortDto } from './exercise-sort.dto';

export interface GetManyExercisesDto extends GetManyDto {
  filter?: ExerciseFilterDto;
  sort?: ExerciseSortDto;
}
