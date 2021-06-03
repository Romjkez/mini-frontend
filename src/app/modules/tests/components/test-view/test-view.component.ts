import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Test } from '../../models/test';
import { first, map, tap } from 'rxjs/operators';
import { TestService } from '../../test.service';
import { convertQuestionsFromModelToForm } from '../../utils';

@Component({
  selector: 'mn-test-view',
  templateUrl: './test-view.component.html',
  styleUrls: ['./test-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TestViewComponent implements OnInit {
  test: Test;
  form: FormGroup;

  constructor(private readonly testService: TestService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        first(),
        map(data => data.test),
        tap((test: Test) => {
          this.test = test;
          this.form = this.fb.group({
            title: this.fb.control(this.test.title, [Validators.required, Validators.minLength(3)]),
            previewUrl: this.fb.control(this.test.previewUrl),
            tags: this.fb.control({value: test.tags.map(t => t.text), disabled: true}),
            questions: this.fb.array(convertQuestionsFromModelToForm(test), [Validators.required]),
          });
        }),
      )
      .subscribe();
  }

}
