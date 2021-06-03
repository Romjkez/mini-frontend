import { Pipe, PipeTransform } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { QuestionType } from '../models/question-type';

@Pipe({
  name: 'questionTitle',
  pure: false,
})
export class QuestionTitlePipe implements PipeTransform {
  transform(control: AbstractControl, order: number): string {
    return `${order}. ${getQuestionText(control.get('text').value)} [${resolveQuestionType(control.get('type').value)}]`;
  }
}

function getQuestionText(text: string): string {
  return text === undefined || text === null || text === '' ? '<Новый вопрос>' : `${text}`;
}

function resolveQuestionType(questionType: QuestionType): string {
  switch (questionType) {
    case QuestionType.Order:
      return 'Порядок';
    case QuestionType.OneOf:
      return 'Один из';
    case QuestionType.ExactAnswer:
      return 'Точный ответ';
    case QuestionType.MultipleOf:
      return 'Много из';
    default:
      return 'Неизвестный тип вопроса';
  }
}

