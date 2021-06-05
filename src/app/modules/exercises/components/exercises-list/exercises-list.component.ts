import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CURRENT_PAGE_REPORT_TEMPLATE, ROWS_PER_PAGE, ROWS_PER_PAGE_OPTIONS } from '../../../../common/constants';
import { SortMeta } from 'primeng/api';
import { Observable } from 'rxjs';
import { GetManyResponseDto } from '../../../../common/dto/get-many-response.dto';
import { SimpleExercise } from '../../models/simple-exercise';
import { ExerciseService } from '../../exercise.service';
import { ExerciseSortDto } from '../../dto/exercise-sort.dto';
import { ExerciseFilterDto } from '../../dto/exercise-filter.dto';
import { map, shareReplay } from 'rxjs/operators';
import { MultiSortMeta } from '../../../../common/models/multi-sort-meta';
import { convertSortType } from '../../../../common/utils/convert-sort-type';
import { PaginationChangedEvent } from '../../../../common/models/pagination-changed-event';
import { calculatePage } from '../../../../common/utils/calculate-page';

@Component({
  selector: 'mn-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesListComponent implements OnInit {
  perPage = ROWS_PER_PAGE;
  readonly perPageOptions = ROWS_PER_PAGE_OPTIONS;
  readonly currentPageReportTemplate = CURRENT_PAGE_REPORT_TEMPLATE;

  data: Observable<GetManyResponseDto<SimpleExercise>>;
  exercises: Observable<Array<SimpleExercise>>;
  totalItems: Observable<number>;
  currentPage = 1;
  sort: ExerciseSortDto = {};
  filter: ExerciseFilterDto = {};
  multiSortMeta: Array<SortMeta>;

  constructor(private readonly exerciseService: ExerciseService) {
  }

  ngOnInit(): void {
    this.data = this.exerciseService.getMany({perPage: ROWS_PER_PAGE, page: this.currentPage})
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

  onSort(event: MultiSortMeta): void {
    event.multisortmeta.forEach(meta => this.sort[meta.field] = convertSortType(meta.order));

    this.getData();
  }

  pageChanged(ev: PaginationChangedEvent): void {
    this.currentPage = calculatePage(ev.first, ev.rows);
    this.perPage = ev.rows;

    this.getData();
  }

  private getData(): void {
    this.data = this.exerciseService.getMany({perPage: this.perPage, page: this.currentPage, sort: this.sort, filter: this.filter})
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
