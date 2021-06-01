import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionType } from '../../models/question-type';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'mn-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() readonly: boolean;
  questions: FormArray;
  addQuestionBtnItems: Array<MenuItem>;

  constructor(private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    console.log(this.form);
    this.questions = this.form.get('questions') as FormArray;

    this.addQuestionBtnItems = [
      {
        label: 'Вопрос "Много из"',
        command: this.addQuestion.bind(this, QuestionType.MultipleOf)
      },
      {
        label: 'Вопрос "Порядок"',
        command: this.addQuestion.bind(this, QuestionType.Order)
      },
      {
        label: 'Вопрос "Точный ответ"',
        command: this.addQuestion.bind(this, QuestionType.ExactAnswer)
      },
    ];
  }

  addQuestion(questionType: QuestionType = QuestionType.OneOf): void {
    switch (questionType) {
      case QuestionType.ExactAnswer: {
        this.questions.push(this.fb.group({
          text: this.fb.control(null, Validators.required),
          type: this.fb.control(QuestionType.ExactAnswer, Validators.required),
          answer: this.fb.control(null, Validators.required),
          order: this.fb.control(null, [Validators.min(1)])
        }));
        break;
      }
      case QuestionType.MultipleOf: {
        this.questions.push(this.fb.group({
          text: this.fb.control(null, Validators.required),
          type: this.fb.control(QuestionType.MultipleOf, Validators.required),
          answer: this.fb.array([], Validators.required),
          options: this.fb.array([], Validators.required),
          order: this.fb.control(null, [Validators.min(1)])
        }));
        break;
      }
      case QuestionType.Order: {
        this.questions.push(this.fb.group({
          text: this.fb.control(null, Validators.required),
          type: this.fb.control(QuestionType.Order, Validators.required),
          answer: this.fb.array([], Validators.required),
          options: this.fb.array([], Validators.required),
          order: this.fb.control(null, [Validators.min(1)])
        }));
        break;
      }
      case QuestionType.OneOf:
      default:
        this.questions.push(this.fb.group({
          text: this.fb.control(null, Validators.required),
          type: this.fb.control(QuestionType.OneOf, Validators.required),
          answer: this.fb.control(null, Validators.required),
          options: this.fb.array([], Validators.required),
          order: this.fb.control(null, [Validators.min(1)])
        }));
    }
    this.form.updateValueAndValidity();
  }

  addOneOfQuestion(): void {

  }

  addManyOfQuestion(): void {

  }

  addOrderQuestion(): void {

  }

  /* addExactAnswerQuestion(): void {
     this.exactAnswerQuestions.push(this.fb.group({
       text: this.fb.control(null, Validators.required),
       answer: this.fb.control(null, Validators.required),
       order: this.fb.control(this.calculateOrderNumber(), [Validators.required, Validators.min(1)])
     }));
     this.form.updateValueAndValidity();
   }

   calculateOrderNumber(): number {
     return this.exactAnswerQuestions.controls.length + this.oneOfQuestions.controls.length + this.manyOfQuestions.controls.length
       + this.orderQuestions.controls.length + 1;
   }*/
}
