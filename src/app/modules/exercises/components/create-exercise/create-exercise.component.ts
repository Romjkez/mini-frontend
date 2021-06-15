import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ExerciseService } from '../../exercise.service';
import { CreateExerciseDto, CreateExerciseItemDto } from '../../dto/create-exercise.dto';
import { ExItemType } from '../exercise-form/exercise-form.component';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { errorToText } from '../../../../common/utils/error-to-text';
import { TOAST_ERROR_TIME } from '../../../../common/constants';

@Component({
  selector: 'mn-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateExerciseComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly exerciseService: ExerciseService,
              private readonly fb: FormBuilder,
              private readonly messageService: MessageService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      previewUrl: this.fb.control(null),
      tags: this.fb.control(null, Validators.required),
      items: this.fb.array([], Validators.required),
      isVisible: this.fb.control(true, Validators.required)
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const {tests, articles} = this.buildTestArticles();
    if (tests.length === 0 || articles.length === 0) {
      return;
    }

    this.form.disable();
    const createExerciseDto: CreateExerciseDto = {
      title: this.form.get('title').value,
      tags: this.form.get('tags').value,
      isVisible: this.form.get('isVisible').value,
      tests,
      articles,
    };

    this.exerciseService.create(createExerciseDto)
      .pipe(
        tap(user => {
          this.messageService.add({
            severity: 'success',
            summary: 'Упражнение успешно добавлено',
            detail: `Присвоен ID: ${user.id}`
          });
          return this.router.navigate(['/exercises', user.id]);
        }),
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка добавления упражнения',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          throw new HttpErrorResponse(err);
        }),
        finalize(() => this.form.enable())
      )
      .subscribe();
  }

  private buildTestArticles(): { tests: Array<CreateExerciseItemDto>, articles: Array<CreateExerciseItemDto> } {
    const tests: Array<CreateExerciseItemDto> = [];
    const articles: Array<CreateExerciseItemDto> = [];

    (this.form.get('items') as FormArray).controls.forEach((c, index) => {
      if (c.get('type').value === ExItemType.TEST) {
        tests.push({id: c.get('id').value, order: index + 1});
      } else {
        articles.push({id: c.get('id').value, order: index + 1});
      }
    });
    return {tests, articles};
  }

}
