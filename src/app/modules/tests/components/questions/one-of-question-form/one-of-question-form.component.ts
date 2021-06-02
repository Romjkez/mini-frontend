import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { ControlContainer, FormArray, FormBuilder, FormGroup, FormGroupName, Validators } from '@angular/forms';

@Component({
  selector: 'mn-one-of-question-form',
  templateUrl: './one-of-question-form.component.html',
  styleUrls: ['./one-of-question-form.component.scss'],
  viewProviders: [{provide: ControlContainer, useExisting: FormGroupName}],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OneOfQuestionFormComponent implements OnInit {
  @Input() readonly: boolean;
  form: FormGroup;
  options: FormArray;

  constructor(public readonly controlContainer: ControlContainer,
              private readonly fb: FormBuilder,
              private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.form = (this.controlContainer as FormGroupName).control;
    this.options = this.form.get('options') as FormArray;
  }

  addOption(): void {
    this.options.push(this.fb.group({
      isCorrect: this.fb.control({
        value: false,
        disabled: this.options.controls.some(c => c.get('isCorrect').value === true)
      }, Validators.required),
      text: this.fb.control(null, Validators.required),
    }));
    this.cdr.detectChanges();
  }

  onCorrectAnswerChange(state: boolean): void {
    if (state) {
      return this.options.controls.forEach(control => {
        if (!control.get('isCorrect').value) {
          control.get('isCorrect').disable();
        }
      });
    }
    this.options.controls.forEach(control => control.get('isCorrect').enable());
    this.cdr.detectChanges();
  }

  onDeleteOption(index: number): void {
    if (this.options.at(index).get('isCorrect').value) {
      this.onCorrectAnswerChange(false);
    }
    this.options.removeAt(index);
  }

}
