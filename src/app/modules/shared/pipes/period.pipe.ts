import { Pipe, PipeTransform } from '@angular/core';
import { StatsPeriod } from '../../main-page/services/stats.service';

@Pipe({
  name: 'period'
})
export class PeriodPipe implements PipeTransform {

  transform(value: string): string {
    switch (value) {
      case StatsPeriod.DAY:
        return 'Текущие сутки';
      case StatsPeriod.WEEK:
        return 'Последние 7 дней';
      case StatsPeriod.MONTH:
        return 'Последний месяц';
      case StatsPeriod.THREE_MONTHS:
        return 'Последние 3 месяца';
      case StatsPeriod.SIX_MONTHS:
        return 'Последние 6 месяцев';
      case StatsPeriod.YEAR:
        return 'Последний год';
      default:
        return '';
    }
  }

}
