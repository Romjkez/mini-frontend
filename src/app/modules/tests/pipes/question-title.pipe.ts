import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'questionTitle',
  pure: false,
})
export class QuestionTitlePipe implements PipeTransform {
  transform(control: AbstractControl): string {
    return `${control.get('order').value}. ${control.get('text').value ?? '<Новый вопрос>'}`;
  }
}
