import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'defaultValue'
})
export class DefaultValuePipe implements PipeTransform {

  transform(value: unknown): unknown {
    return value ?? '-';
  }

}
