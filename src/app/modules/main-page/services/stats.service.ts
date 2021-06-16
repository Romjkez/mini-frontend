import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatsCountResponseDto } from '../dto/stats-count-response.dto';
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

  getFinishedTestsStats(period: StatsPeriod): Observable<StatsCountResponseDto> {
    return this.http.get<StatsCountResponseDto>(`${environment.apiHost}/stats/finished-tests?period=${period}`);
  }
}
