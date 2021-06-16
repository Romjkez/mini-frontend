import { AfterViewInit, ChangeDetectionStrategy, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Exercise } from '../../models/exercise';
import { ActivatedRoute } from '@angular/router';
import { ExerciseService } from '../../exercise.service';
import { first, map, tap } from 'rxjs/operators';
import { ExerciseFormComponent, ExItemType } from '../exercise-form/exercise-form.component';

@Component({
  selector: 'mn-exercise-view',
  templateUrl: './exercise-view.component.html',
  styleUrls: ['./exercise-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseViewComponent implements OnInit, AfterViewInit {
  form: FormGroup;
  exercise: Exercise;
  @ViewChild(ExerciseFormComponent, {static: true}) readonly exerciseForm: ExerciseFormComponent;

  constructor(private readonly exerciseService: ExerciseService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        first(),
        map(data => data.exercise),
        tap((exercise: Exercise) => {
          this.exercise = exercise;

          const items = [];

          exercise.articles.forEach((a, i) =>
            items[a.order - 1] = this.fb.group({
              id: this.fb.control(a.id),
              title: this.fb.control(a.title),
              type: this.fb.control(ExItemType.ARTICLE)
            })
          );
          exercise.tests.forEach((t, i) =>
            items[t.order - 1] = this.fb.group({
              id: this.fb.control(t.id),
              title: this.fb.control(t.title),
              type: this.fb.control(ExItemType.TEST)
            })
          );

          this.form = this.fb.group({
            title: this.fb.control(exercise.title, [Validators.required, Validators.minLength(3)]),
            previewUrl: this.fb.control(exercise.previewUrl),
            tags: this.fb.control({value: exercise.tags.map(tag => tag.text), disabled: true}, Validators.required),
            items: this.fb.array(items, Validators.required),
            isVisible: this.fb.control(exercise.isVisible, Validators.required)
          });
        }),
      )
      .subscribe();
  }

  ngAfterViewInit(): void {
    console.log(this.exerciseForm.form);
  }

}
