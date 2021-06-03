import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Test } from './models/test';
import { OneOfQuestion } from './models/one-of-question';
import { ManyOfQuestion } from './models/many-of-question';
import { OrderQuestion } from './models/order-question';
import { ExactAnswerQuestion } from './models/exact-answer-question';
import { QuestionType } from './models/question-type';
import { Option } from './models/option';

/**
 * Convert questions from server model to from model
 */
export function convertQuestionsFromModelToForm(test: Test): Array<FormGroup> {
  let questions: Array<OneOfQuestion | ManyOfQuestion | OrderQuestion | ExactAnswerQuestion> = [];
  questions = mergeQuestions(test, questions);
  questions = questions.sort((a, b) => a.order - b.order);
  return questions.map(q => {
    switch (q.type as QuestionType) {
      case QuestionType.OneOf: {
        return new FormGroup({
          text: new FormControl(q.text, Validators.required),
          type: new FormControl(q.type, Validators.required),
          options: ofQuestionOptionsToForm((q as OneOfQuestion).options),
        });
      }
      case QuestionType.MultipleOf: {
        return new FormGroup({
          text: new FormControl(q.text),
          type: new FormControl(q.type),
          options: ofQuestionOptionsToForm((q as ManyOfQuestion).options),
        });
      }
      case QuestionType.ExactAnswer: {
        return new FormGroup({
          text: new FormControl(q.text),
          type: new FormControl(q.type),
          answer: new FormControl((q as ExactAnswerQuestion).answer)
        });
      }
      case QuestionType.Order: {
        return new FormGroup({
          text: new FormControl(q.text),
          type: new FormControl(q.type),
          options: orderQuestionOptionsToForm((q as OrderQuestion).options)
        });
      }
    }
  });
}

function mergeQuestions(test: Test, questions: Array<OneOfQuestion | ManyOfQuestion | OrderQuestion | ExactAnswerQuestion>)
  : Array<OneOfQuestion | ManyOfQuestion | OrderQuestion | ExactAnswerQuestion> {
  if (Array.isArray(test.oneOfQuestions)) {
    questions.push(...test.oneOfQuestions);
  }
  if (Array.isArray(test.manyOfQuestions)) {
    questions.push(...test.manyOfQuestions);
  }
  if (Array.isArray(test.orderQuestions)) {
    questions.push(...test.orderQuestions);
  }
  if (Array.isArray(test.exactAnswerQuestions)) {
    questions.push(...test.exactAnswerQuestions);
  }
  return questions;
}

function ofQuestionOptionsToForm(options: Array<Option>): FormArray {
  return new FormArray(options.map(opt => new FormGroup({
    isCorrect: new FormControl(opt.isCorrect, Validators.required),
    text: new FormControl(opt.text, Validators.required)
  })), Validators.required);
}

function orderQuestionOptionsToForm(options: Array<Option>): FormArray {
  return new FormArray(options.map(opt => new FormGroup({
    text: new FormControl(opt.text, Validators.required)
  })), Validators.required);
}
