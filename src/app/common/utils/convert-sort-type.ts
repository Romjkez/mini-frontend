import { SortType } from '../models/sort-type';

export function convertSortType(sort: number): SortType {
  return sort === 1 ? SortType.ASC : SortType.DESC;
}
