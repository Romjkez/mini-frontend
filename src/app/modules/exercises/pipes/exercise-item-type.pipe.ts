import { Pipe, PipeTransform } from '@angular/core';
import { ExItemType } from '../components/exercise-form/exercise-form.component';

@Pipe({
  name: 'exerciseItemType'
})
export class ExerciseItemTypePipe implements PipeTransform {

  transform(value: unknown): unknown {
    return value === ExItemType.TEST ? 'Тест' : 'Статья';
  }

}
