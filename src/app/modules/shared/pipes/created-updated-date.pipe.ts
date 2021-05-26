import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { CreatedUpdatedEntity } from '../../../common/models/created-updated-entity.model';

@Pipe({
  name: 'createdUpdatedDate'
})
export class CreatedUpdatedDatePipe implements PipeTransform {
  datePipe = new DatePipe('en-US');
  private readonly dateFormat = 'HH:mm dd.MM.YY';

  transform(value: CreatedUpdatedEntity): string {
    return `<b>Дата создания:</b> ${this.datePipe.transform(value.createdAt, this.dateFormat)}<br><b>Последнее обновление:</b> ${this.datePipe.transform(value.updatedAt, this.dateFormat)}`;
  }

}
