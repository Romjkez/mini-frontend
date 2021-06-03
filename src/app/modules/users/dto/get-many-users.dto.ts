import { UserSortDto } from './user-sort.dto';
import { UserFilterDto } from './user-filter.dto';
import { GetManyDto } from '../../../common/dto/get-many.dto';

export interface GetManyUsersDto extends GetManyDto {
  filter?: UserFilterDto;
  sort?: UserSortDto;
}
