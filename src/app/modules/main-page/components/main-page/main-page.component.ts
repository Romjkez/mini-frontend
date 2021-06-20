import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StatsPeriod, StatsService } from '../../services/stats.service';
import { Observable, ReplaySubject } from 'rxjs';
import { shareReplay, tap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';
import { AppStats } from '../../models/app-stats';

@Component({
  selector: 'mn-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainPageComponent implements OnInit {
  stats$: Observable<AppStats>;
  finishedTestsPeriod: StatsPeriod = StatsPeriod.DAY;
  periodOptions: Array<StatsPeriod> = Object.values(StatsPeriod);
  readonly selectedPeriod: FormControl = new FormControl(this.periodOptions[0]);
  loading: ReplaySubject<boolean> = new ReplaySubject<boolean>(1);

  constructor(private readonly statsService: StatsService) {
  }

  ngOnInit(): void {
    this.stats$ = this.statsService.getAppStats(this.finishedTestsPeriod)
      .pipe(
        shareReplay(1)
      );

    this.selectedPeriod.valueChanges
      .pipe(
        tap(period => this.stats$ = this.statsService.getAppStats(period)
          .pipe(
            shareReplay(1)
          )),
      )
      .subscribe();
  }

}
