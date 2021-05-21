import { Pipe, PipeTransform } from '@angular/core';

/**
 * Convert Boolean to human-readable text
 */
@Pipe({
  name: 'boolean'
})
export class BooleanPipe implements PipeTransform {

  transform(value: unknown): unknown {
    return value === true ? 'Да' : 'Нет';
  }

}
