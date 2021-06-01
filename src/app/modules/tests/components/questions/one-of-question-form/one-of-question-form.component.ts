import { Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormGroup, FormGroupName } from '@angular/forms';

@Component({
  selector: 'mn-one-of-question-form',
  templateUrl: './one-of-question-form.component.html',
  styleUrls: ['./one-of-question-form.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupName}]
})
export class OneOfQuestionFormComponent implements OnInit {
  @Input() readonly: boolean;
  form: FormGroup;

  constructor(public readonly controlContainer: ControlContainer) {
  }

  ngOnInit(): void {
    this.form = (this.controlContainer as FormGroupName).control;
    console.log(this.form);
  }

}
