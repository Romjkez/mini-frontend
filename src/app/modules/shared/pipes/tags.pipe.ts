import { Pipe, PipeTransform } from '@angular/core';
import { Tag } from '../../../common/models/tag';

@Pipe({
  name: 'tags'
})
export class TagsPipe implements PipeTransform {

  transform(value: Array<Tag>): string {
    if (value?.length === 0) {
      return '';
    }
    return value.map(t => t.text).join(', ');
  }

}
