import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { ExerciseService } from '../../exercise.service';

@Component({
  selector: 'mn-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateExerciseComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly exerciseService: ExerciseService,
              private readonly fb: FormBuilder,
              private readonly messageService: MessageService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      title: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
      previewUrl: this.fb.control(null),
      tags: this.fb.control(null, Validators.required),
      items: this.fb.array([], Validators.required),
      isVisible: this.fb.control(true, Validators.required)
    });
  }

  onSubmit(): void {
    console.log(this.form);
    if (this.form.invalid) {
      return;
    }
  }

}
