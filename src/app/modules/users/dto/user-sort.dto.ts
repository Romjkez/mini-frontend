import { SortType } from '../../../common/models/sort-type';

export interface UserSortDto {
  firstName?: SortType;

  lastName?: SortType;

  email?: SortType;

  company?: SortType;

  isPrivate?: SortType;

  rating?: SortType;
}
