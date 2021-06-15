import { GetManyDto } from '../../../common/dto/get-many.dto';
import { ArticleSortDto } from './article-sort.dto';
import { ArticleFilterDto } from './article-filter.dto';

export interface GetManyArticlesDto extends GetManyDto {
  filter?: ArticleFilterDto;
  sort?: ArticleSortDto;
}
