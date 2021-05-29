import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { TestService } from '../../test.service';
import { Observable } from 'rxjs';
import { GetManyResponseDto } from '../../../../common/dto/get-many-response.dto';
import { SimpleTest } from '../../models/simple-test';
import { CURRENT_PAGE_REPORT_TEMPLATE, ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from '../../../../common/constants';
import { PaginationChangedEvent } from '../../../../common/models/pagination-changed-event';
import { calculatePage } from '../../../../common/utils/calculate-page';
import { map, shareReplay } from 'rxjs/operators';

@Component({
  selector: 'mn-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestsListComponent implements OnInit {
  readonly perPage = ROWS_PER_PAGE;
  readonly perPageOptions = ROWS_PER_PAGE_OPTIONS;
  readonly currentPageReportTemplate = CURRENT_PAGE_REPORT_TEMPLATE;

  data: Observable<GetManyResponseDto<SimpleTest>>;
  tests: Observable<Array<SimpleTest>>;
  totalItems: Observable<number>;

  constructor(private readonly testService: TestService) {
  }

  ngOnInit(): void {
    this.data = this.testService.getMany({perPage: ROWS_PER_PAGE, page: 1})
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

  pageChanged(ev: PaginationChangedEvent): void {
    this.data = this.testService.getMany({perPage: ev.rows, page: calculatePage(ev.first, ev.rows)})
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
