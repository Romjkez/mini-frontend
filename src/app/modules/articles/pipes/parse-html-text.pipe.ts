import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'parseHtmlText'
})
export class ParseHtmlTextPipe implements PipeTransform {

  transform(value: string): string {
    const pureValue = value.replace(/<\/?[^>]+(>|$)/g, '');
    if (pureValue.length > 255) {
      return `${pureValue.slice(0, 255)}...`;
    }
    return pureValue;
  }

}
