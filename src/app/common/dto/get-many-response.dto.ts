export interface GetManyResponseDto<T> {
  data: Array<T>;
  page: number;
  perPage: number;
  totalItems: number;
}
