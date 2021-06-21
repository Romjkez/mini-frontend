import { ChangeDetectionStrategy, Component } from '@angular/core';
import { TestService } from '../../test.service';
import { Observable } from 'rxjs';
import { GetManyResponseDto } from '../../../../common/dto/get-many-response.dto';
import { SimpleTest } from '../../models/simple-test';
import { CURRENT_PAGE_REPORT_TEMPLATE, ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from '../../../../common/constants';
import { PaginationChangedEvent } from '../../../../common/models/pagination-changed-event';
import { calculatePage } from '../../../../common/utils/calculate-page';
import { map, shareReplay } from 'rxjs/operators';
import { LazyLoadEvent } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { UserSortDto } from '../../../users/dto/user-sort.dto';
import { SortType } from '../../../../common/models/sort-type';

@Component({
  selector: 'mn-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestsListComponent {
  perPage = ROWS_PER_PAGE;
  readonly perPageOptions = ROWS_PER_PAGE_OPTIONS;
  readonly currentPageReportTemplate = CURRENT_PAGE_REPORT_TEMPLATE;

  data: Observable<GetManyResponseDto<SimpleTest>>;
  tests: Observable<Array<SimpleTest>>;
  totalItems: Observable<number>;
  currentPage = 1;
  sortField: keyof UserSortDto;
  sortDirection: number;

  constructor(private readonly testService: TestService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
  }

  loadTests(e: LazyLoadEvent): void {
    this.sortField = e.sortField as keyof UserSortDto;
    this.sortDirection = e.sortOrder;
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
    this.data = this.testService.getMany({
      perPage: this.perPage,
      page: this.currentPage,
      sort: {[this.sortField]: this.sortDirection === 1 ? SortType.ASC : SortType.DESC}
    })
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
