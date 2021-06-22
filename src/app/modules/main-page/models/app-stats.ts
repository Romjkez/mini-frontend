export interface PeriodStats {
  finishedTests: number;
}

export interface AppStats {
  activeUsers: number;
  periodStats: PeriodStats;
}
