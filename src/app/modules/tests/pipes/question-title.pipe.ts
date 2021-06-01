import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';

@Pipe({
  name: 'questionTitle',
  pure: false,
})
export class QuestionTitlePipe implements PipeTransform {
  transform(control: AbstractControl, order: number): string {
    return `${order}. ${getQuestionText(control.get('text').value)}`;
  }
}

function getQuestionText(text: string): string {
  return text === undefined || text === null || text === '' ? '<Новый вопрос>' : text;
}
