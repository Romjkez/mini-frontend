import { GetManyDto } from '../../../common/dto/get-many.dto';
import { TestFilterDto } from './test-filter.dto';
import { TestSortDto } from './test-sort.dto';

export interface GetManyTestsDto extends GetManyDto {
  filter?: TestFilterDto;
  sort?: TestSortDto;
}
