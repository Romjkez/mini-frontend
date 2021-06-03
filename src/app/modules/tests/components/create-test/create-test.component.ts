import { Component, OnInit } from '@angular/core';
import { TestService } from '../../test.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CreateTestDto } from '../../dto/create-test.dto';
import { QuestionType } from '../../models/question-type';
import { CreateOrderQuestionDto } from '../../dto/create-order-question.dto';
import { CreateOrderOptionDto } from '../../dto/option/create-order-option.dto';
import { CreateExactAnswerQuestionDto } from '../../dto/create-exact-answer-question.dto';
import { CreateManyOfQuestionDto } from '../../dto/create-many-of-question.dto';
import { CreateOptionDto } from '../../dto/option/create-option.dto';
import { CreateOneOfQuestionDto } from '../../dto/create-one-of-question.dto';
import { catchError, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { errorToText } from '../../../../common/utils/error-to-text';
import { TOAST_ERROR_TIME } from '../../../../common/constants';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'mn-create-test',
  templateUrl: './create-test.component.html',
  styleUrls: ['./create-test.component.scss']
})
export class CreateTestComponent implements OnInit {
  form: FormGroup;
  questions: FormArray;

  constructor(private readonly testService: TestService,
              private readonly fb: FormBuilder,
              private readonly messageService: MessageService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      previewUrl: this.fb.control(null),
      tags: this.fb.control(null, [Validators.required]),
      questions: this.fb.array([], [Validators.required]),
    });
    this.questions = this.form.get('questions') as FormArray;
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    const dto: CreateTestDto = this.buildCreateTestDto();
    this.testService.create(dto)
      .pipe(
        tap(user => {
          this.messageService.add({
            severity: 'success',
            summary: 'Тест успешно добавлен',
            detail: `Присвоен ID: ${user.id}`
          });
          return this.router.navigate(['/tests', user.id]);
        }),
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка добавления теста',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          throw new HttpErrorResponse(err);
        })
      )
      .subscribe();
  }

  private buildCreateTestDto(): CreateTestDto {
    const dto: CreateTestDto = {
      title: this.form.get('title').value.trim(),
      tags: this.form.get('tags').value,
      exactAnswerQuestions: [],
      orderQuestions: [],
      oneOfQuestions: [],
      manyOfQuestions: []
    };
    if (this.form.get('previewUrl').value) {
      dto.previewUrl = this.form.get('previewUrl').value;
    }
    this.questions.controls.forEach((question, i) => {
      switch (question.get('type').value as QuestionType) {
        case QuestionType.Order: {
          const options: Array<CreateOrderOptionDto> = (question.get('options') as FormArray).controls.map((opt, index) => ({
            order: index + 1,
            text: opt.get('text').value
          }));
          const orderDto: CreateOrderQuestionDto = {
            text: question.get('text').value.trim(),
            order: i + 1,
            options,
          };
          dto.orderQuestions.push(orderDto);
          break;
        }
        case QuestionType.ExactAnswer: {
          const exactDto: CreateExactAnswerQuestionDto = {
            text: question.get('text').value.trim(),
            answer: question.get('answer').value.trim(),
            order: i + 1,
          };
          dto.exactAnswerQuestions.push(exactDto);
          break;
        }
        case QuestionType.MultipleOf: {
          const options: Array<CreateOptionDto> = (question.get('options') as FormArray).controls.map((opt, index) => ({
            text: opt.get('text').value,
            isCorrect: opt.get('isCorrect').value,
          }));
          const multipleOfDto: CreateManyOfQuestionDto = {
            text: question.get('text').value.trim(),
            order: i + 1,
            options,
          };
          dto.manyOfQuestions.push(multipleOfDto);
          break;
        }
        case QuestionType.OneOf:
        default: {
          const options: Array<CreateOptionDto> = (question.get('options') as FormArray).controls.map((opt, index) => ({
            text: opt.get('text').value,
            isCorrect: opt.get('isCorrect').value,
          }));
          const multipleOfDto: CreateOneOfQuestionDto = {
            text: question.get('text').value.trim(),
            order: i + 1,
            options,
          };
          dto.oneOfQuestions.push(multipleOfDto);
        }
      }
    });
    return dto;
  }
}

