import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mn-exercise-view',
  templateUrl: './exercise-view.component.html',
  styleUrls: ['./exercise-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseViewComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
