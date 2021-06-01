import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupName } from '@angular/forms';

@Component({
  selector: 'mn-exact-answer-question-form',
  templateUrl: './exact-answer-question-form.component.html',
  styleUrls: ['./exact-answer-question-form.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupName}]
})
export class ExactAnswerQuestionFormComponent implements OnInit {
  @Input() readonly: boolean;
  form: FormGroup;

  constructor(public readonly controlContainer: ControlContainer) {
    this.form = (controlContainer as FormGroupName).control;
  }

  ngOnInit(): void {
  }

}
