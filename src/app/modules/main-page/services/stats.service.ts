import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppStats } from '../models/app-stats';
import { environment } from '../../../../environments/environment';

export enum StatsPeriod {
  DAY = 'DAY',
  WEEK = 'WEEK',
  MONTH = 'MONTH',
  THREE_MONTHS = 'THREE_MONTHS',
  SIX_MONTHS = 'SIX_MONTHS',
  YEAR = 'YEAR',
}


@Injectable()
export class StatsService {

  constructor(private readonly http: HttpClient) {
  }

  getAppStats(period: StatsPeriod): Observable<AppStats> {
    return this.http.get<AppStats>(`${environment.apiHost}/stats/?period=${period}`);
  }
}
