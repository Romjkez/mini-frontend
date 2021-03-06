import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ArticleService } from '../../article.service';
import { Observable } from 'rxjs';
import { GetManyResponseDto } from '../../../../common/dto/get-many-response.dto';
import { Article } from '../../models/article';
import { ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from '../../../../common/constants';
import { map, shareReplay } from 'rxjs/operators';
import { PaginationChangedEvent } from '../../../../common/models/pagination-changed-event';
import { calculatePage } from '../../../../common/utils/calculate-page';

@Component({
  selector: 'mn-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesListComponent implements OnInit {
  perPage = ROWS_PER_PAGE;
  readonly perPageOptions = ROWS_PER_PAGE_OPTIONS;
  data: Observable<GetManyResponseDto<Article>>;
  articles: Observable<Array<Article>>;
  totalItems: Observable<number>;
  page = 1;

  constructor(private readonly articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.data = this.articleService.getMany({perPage: this.perPage, page: this.page})
      .pipe(
        shareReplay(1)
      );
    this.articles = this.data
      .pipe(
        map(res => res.data)
      );
    this.totalItems = this.data
      .pipe(
        map(res => res.totalItems)
      );
  }

  pageChanged(ev: PaginationChangedEvent): void {
    this.perPage = ev.rows;
    this.page = calculatePage(ev.first, ev.rows);
    this.data = this.articleService.getMany({perPage: this.perPage, page: this.page})
      .pipe(
        shareReplay(1),
      );
    this.articles = this.data
      .pipe(
        map(res => res.data),
      );
    this.totalItems = this.data
      .pipe(
        map(res => res.totalItems),
      );
  }

}
