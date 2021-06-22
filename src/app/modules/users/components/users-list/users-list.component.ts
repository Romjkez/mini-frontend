import { ChangeDetectionStrategy, Component } from '@angular/core';
import { UsersService } from '../../users.service';
import { SimpleUser } from '../../models/simple-user.model';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GetManyResponseDto } from '../../../../common/dto/get-many-response.dto';
import { CURRENT_PAGE_REPORT_TEMPLATE, ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from '../../../../common/constants';
import { PaginationChangedEvent } from '../../../../common/models/pagination-changed-event';
import { calculatePage } from '../../../../common/utils/calculate-page';
import { ActivatedRoute, Router } from '@angular/router';
import { LazyLoadEvent } from 'primeng/api';
import { UserSortDto } from '../../dto/user-sort.dto';
import { SortType } from '../../../../common/models/sort-type';


@Component({
  selector: 'mn-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent {
  perPage = ROWS_PER_PAGE;
  readonly perPageOptions = ROWS_PER_PAGE_OPTIONS;
  readonly currentPageReportTemplate = CURRENT_PAGE_REPORT_TEMPLATE;
  data: Observable<GetManyResponseDto<SimpleUser>>;
  users: Observable<Array<SimpleUser>>;

  totalItems: Observable<number>;
  page = 1;
  sortField: keyof UserSortDto;
  sortDirection: number;

  constructor(private readonly userService: UsersService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
  }

  onDblClick(userId: number): Promise<boolean> {
    return this.router.navigate([userId], {relativeTo: this.route});
  }

  pageChanged(ev: PaginationChangedEvent): void {
    this.perPage = ev.rows;
    this.page = calculatePage(ev.first, ev.rows);
    this.setData();
  }

  loadUsers(e: LazyLoadEvent): void {
    this.sortField = e.sortField as keyof UserSortDto;
    this.sortDirection = e.sortOrder;
    this.setData();
  }

  private setData(): void {
    this.data = this.userService.getMany({
      perPage: this.perPage,
      page: this.page,
      sort: {[this.sortField]: this.sortDirection === 1 ? SortType.ASC : SortType.DESC}
    })
      .pipe(
        shareReplay(1),
      );
    this.users = this.data
      .pipe(
        map(res => res.data),
        shareReplay(1)
      );

    this.totalItems = this.data
      .pipe(
        map(res => res.totalItems),
        shareReplay(1)
      );
  }

}
