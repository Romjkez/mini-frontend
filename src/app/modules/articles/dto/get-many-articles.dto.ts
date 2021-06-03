import { GetManyDto } from '../../../common/dto/get-many.dto';

export interface GetManyArticlesDto extends GetManyDto {
  filter?: any;
  sort?: any;
}
