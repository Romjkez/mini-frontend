import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TestService } from '../../test.service';
import { Observable } from 'rxjs';
import { GetManyResponseDto } from '../../../../common/dto/get-many-response.dto';
import { SimpleTest } from '../../models/simple-test';
import { CURRENT_PAGE_REPORT_TEMPLATE, ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from '../../../../common/constants';
import { PaginationChangedEvent } from '../../../../common/models/pagination-changed-event';
import { calculatePage } from '../../../../common/utils/calculate-page';
import { map, shareReplay } from 'rxjs/operators';
import { TestSortDto } from '../../dto/test-sort.dto';
import { convertSortType } from '../../../../common/utils/convert-sort-type';
import { TestFilterDto } from '../../dto/test-filter.dto';
import { MultiSortMeta } from '../../../../common/models/multi-sort-meta';
import { SortMeta } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'mn-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestsListComponent implements OnInit {
  perPage = ROWS_PER_PAGE;
  readonly perPageOptions = ROWS_PER_PAGE_OPTIONS;
  readonly currentPageReportTemplate = CURRENT_PAGE_REPORT_TEMPLATE;

  data: Observable<GetManyResponseDto<SimpleTest>>;
  tests: Observable<Array<SimpleTest>>;
  totalItems: Observable<number>;
  currentPage = 1;
  sort: TestSortDto = {};
  filter: TestFilterDto = {};
  multiSortMeta: Array<SortMeta>;

  constructor(private readonly testService: TestService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.data = this.testService.getMany({perPage: ROWS_PER_PAGE, page: this.currentPage})
      .pipe(
        shareReplay(1),
      );
    this.tests = this.data
      .pipe(
        map(res => res.data),
      );

    this.totalItems = this.data
      .pipe(
        map(res => res.totalItems),
      );
  }

  onSort(event: MultiSortMeta): void {
    event.multisortmeta.forEach(meta => this.sort[meta.field] = convertSortType(meta.order));

    this.getData();
  }

  pageChanged(ev: PaginationChangedEvent): void {
    this.currentPage = calculatePage(ev.first, ev.rows);
    this.perPage = ev.rows;

    this.getData();
  }

  onDblClick(id: number): Promise<boolean> {
    return this.router.navigate([id], {relativeTo: this.route});
  }

  private getData(): void {
    this.data = this.testService.getMany({perPage: this.perPage, page: this.currentPage, sort: this.sort, filter: this.filter})
      .pipe(
        shareReplay(1),
      );
    this.tests = this.data
      .pipe(
        map(res => res.data),
      );
    this.totalItems = this.data
      .pipe(
        map(res => res.totalItems),
      );
  }

}
