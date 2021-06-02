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

    this.form.valueChanges.subscribe(e => {
      console.log(e);
      console.log(this.form);
      console.log('--------------------------------');
    });
  }

  addQuestion(questionType: QuestionType = QuestionType.OneOf): void {
    switch (questionType) {
      case QuestionType.ExactAnswer: {
        this.questions.push(this.fb.group({
          text: this.fb.control(null, Validators.required),
          type: this.fb.control(QuestionType.ExactAnswer, Validators.required),
          answer: this.fb.control(null, Validators.required),
        }));
        break;
      }
      case QuestionType.MultipleOf: {
        this.questions.push(this.fb.group({
          text: this.fb.control(null, Validators.required),
          type: this.fb.control(QuestionType.MultipleOf, Validators.required),
          options: this.fb.array([
            this.fb.group({
              isCorrect: this.fb.control(null, Validators.required),
              text: this.fb.control(null, Validators.required),
            }),
            this.fb.group({
              isCorrect: this.fb.control(null, Validators.required),
              text: this.fb.control(null, Validators.required),
            })
          ], Validators.required),
        }));
        break;
      }
      case QuestionType.Order: {
        this.questions.push(this.fb.group({
          text: this.fb.control(null, Validators.required),
          type: this.fb.control(QuestionType.Order, Validators.required),
          options: this.fb.array([
            this.fb.group({
              text: this.fb.control(null, Validators.required),
            }),
            this.fb.group({
              text: this.fb.control(null, Validators.required),
            })
          ], Validators.required),
        }));
        break;
      }
      case QuestionType.OneOf:
      default:
        this.questions.push(this.fb.group({
          text: this.fb.control(null, Validators.required),
          type: this.fb.control(QuestionType.OneOf, Validators.required),
          options: this.fb.array([
            this.fb.group({
              isCorrect: this.fb.control(null, Validators.required),
              text: this.fb.control(null, Validators.required),
            }),
            this.fb.group({
              isCorrect: this.fb.control(null, Validators.required),
              text: this.fb.control(null, Validators.required),
            })
          ], Validators.required),
        }));
    }
    this.form.updateValueAndValidity();
  }

}
