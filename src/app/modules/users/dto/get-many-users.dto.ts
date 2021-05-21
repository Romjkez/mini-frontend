import { GetManyDto } from '../../../common/models/get-many.dto';
import { UserSortDto } from './user-sort.dto';
import { UserFilterDto } from './user-filter.dto';

export interface GetManyUsersDto extends GetManyDto {
  filter?: UserFilterDto;
  sort?: UserSortDto;
}
