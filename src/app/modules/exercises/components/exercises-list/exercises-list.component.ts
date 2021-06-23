import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CURRENT_PAGE_REPORT_TEMPLATE, ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from '../../../../common/constants';
import { LazyLoadEvent } from 'primeng/api';
import { Observable } from 'rxjs';
import { GetManyResponseDto } from '../../../../common/dto/get-many-response.dto';
import { SimpleExercise } from '../../models/simple-exercise';
import { ExerciseService } from '../../exercise.service';
import { map, shareReplay } from 'rxjs/operators';
import { PaginationChangedEvent } from '../../../../common/models/pagination-changed-event';
import { calculatePage } from '../../../../common/utils/calculate-page';
import { ActivatedRoute, Router } from '@angular/router';
import { SortType } from '../../../../common/models/sort-type';
import { UserSortDto } from '../../../users/dto/user-sort.dto';

@Component({
  selector: 'mn-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesListComponent {
  perPage = ROWS_PER_PAGE;
  readonly perPageOptions = ROWS_PER_PAGE_OPTIONS;
  readonly currentPageReportTemplate = CURRENT_PAGE_REPORT_TEMPLATE;

  data: Observable<GetManyResponseDto<SimpleExercise>>;
  exercises: Observable<Array<SimpleExercise>>;
  totalItems: Observable<number>;
  currentPage = 1;
  sortField: keyof UserSortDto;
  sortDirection: number;

  constructor(private readonly exerciseService: ExerciseService,
              private readonly router: Router,
              private readonly route: ActivatedRoute) {
  }

  loadExercises(e: LazyLoadEvent): void {
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
    this.data = this.exerciseService.getMany({
      perPage: this.perPage, page: this.currentPage, sort: {[this.sortField]: this.sortDirection === 1 ? SortType.ASC : SortType.DESC}
    })
      .pipe(
        shareReplay(1),
      );
    this.exercises = this.data
      .pipe(
        map(res => res.data),
      );
    this.totalItems = this.data
      .pipe(
        map(res => res.totalItems),
      );
  }

}
