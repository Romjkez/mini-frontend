import { SortType } from '../../../common/models/sort-type';

export interface ExerciseSortDto {
  createdAt?: SortType;
  isVisible?: SortType;
  updatedAt?: SortType;
}
