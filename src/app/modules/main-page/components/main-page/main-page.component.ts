import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StatsPeriod, StatsService } from '../../services/stats.service';
import { Observable, ReplaySubject } from 'rxjs';
import { map, shareReplay, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'mn-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  finishedTests$: Observable<number>;
  finishedTestsPeriod: StatsPeriod = StatsPeriod.DAY;
  periodOptions: Array<StatsPeriod> = Object.values(StatsPeriod);
  readonly selectedPeriod: FormControl = new FormControl(this.periodOptions[0]);
  loading: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private readonly statsService: StatsService) {
  }

  ngOnInit(): void {
    this.finishedTests$ = this.statsService.getFinishedTestsStats(this.finishedTestsPeriod)
      .pipe(
        map(res => res.count),
        shareReplay(1)
      );

    this.selectedPeriod.valueChanges
      .pipe(
        tap(period => this.finishedTests$ = this.statsService.getFinishedTestsStats(period)
          .pipe(
            map(res => res.count),
            shareReplay(1)
          )),
      )
      .subscribe();
  }

}
