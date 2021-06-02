import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormGroupName } from '@angular/forms';

@Component({
  selector: 'mn-many-of-question-form',
  templateUrl: './many-of-question-form.component.html',
  styleUrls: ['./many-of-question-form.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupName}],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ManyOfQuestionFormComponent implements OnInit {
  @Input() readonly: boolean;
  form: FormGroup;
  options: FormArray;

  constructor(public readonly controlContainer: ControlContainer,
              private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = (this.controlContainer as FormGroupName).control;
    this.options = this.form.get('options') as FormArray;
  }

  addOption(): void {
    this.options.push(this.fb.group({
      isCorrect: this.fb.control(null),
      text: this.fb.control(null),
    }));
  }

}
