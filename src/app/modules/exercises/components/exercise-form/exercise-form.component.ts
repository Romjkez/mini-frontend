import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mn-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseFormComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
