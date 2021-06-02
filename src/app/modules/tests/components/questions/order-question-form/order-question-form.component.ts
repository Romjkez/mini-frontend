import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormGroupName } from '@angular/forms';

@Component({
  selector: 'mn-order-question-form',
  templateUrl: './order-question-form.component.html',
  styleUrls: ['./order-question-form.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupName}],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OrderQuestionFormComponent implements OnInit {
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
      text: this.fb.control(null),
    }));
  }

}