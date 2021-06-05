import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mn-create-exercise',
  templateUrl: './create-exercise.component.html',
  styleUrls: ['./create-exercise.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateExerciseComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
