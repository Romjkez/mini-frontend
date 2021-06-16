import { SortType } from '../../../common/models/sort-type';

export interface ArticleSortDto {
  createdAt?: SortType;

  updatedAt: SortType;
}
