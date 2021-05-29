import { Pipe, PipeTransform } from '@angular/core';

/**
 * Remove HTML tags from text, cut to 255 symbols
 */
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
