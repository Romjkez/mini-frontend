import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';

@Component({
  selector: 'mn-test-form',
  templateUrl: './test-form.component.html',
  styleUrls: ['./test-form.component.scss']
})
export class TestFormComponent implements OnInit {
  @Input() form: FormGroup;
  @Input() readonly: boolean;
  oneOfQuestions: FormArray;
  manyOfQuestions: FormArray;
  exactAnswerQuestions: FormArray;
  orderQuestions: FormArray;

  constructor() {
  }

  ngOnInit(): void {
    this.oneOfQuestions = this.form.get('oneOfQuestions') as FormArray;
    this.manyOfQuestions = this.form.get('manyOfQuestions') as FormArray;
    this.orderQuestions = this.form.get('orderQuestions') as FormArray;
    this.exactAnswerQuestions = this.form.get('exactAnswerQuestions') as FormArray;
  }
}
