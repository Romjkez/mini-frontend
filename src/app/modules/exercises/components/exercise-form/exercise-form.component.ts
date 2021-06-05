import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from '../../../articles/models/article';
import { SimpleTest } from '../../../tests/models/simple-test';
import { TestService } from '../../../tests/test.service';
import { ArticleService } from '../../../articles/article.service';
import { map, shareReplay } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'mn-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseFormComponent implements OnInit {
  @Input() readonly: boolean;
  @Input() form: FormGroup;
  articles$: Observable<Array<Article>>;
  tests$: Observable<Array<SimpleTest>>;
  selectedArticle: Array<Article>;
  selectedTest: Array<SimpleTest>;
  articleAddingMode: boolean;
  testAddingMode: boolean;

  addItemBtnItems: Array<MenuItem> = [];
  items: FormArray;

  constructor(private readonly testService: TestService,
              private readonly articleService: ArticleService) {
  }

  ngOnInit(): void {
    this.items = this.form.get('items') as FormArray;
    this.addItemBtnItems = [
      {
        label: 'Добавить тест',
        command: this.addTest.bind(this)
      },
    ];

    this.articles$ = this.articleService.getMany({})
      .pipe(
        map(articles => articles.data),
        shareReplay(1)
      );

    this.tests$ = this.testService.getMany({})
      .pipe(
        map(tests => tests.data),
        shareReplay(1)
      );
  }

  addArticle(): void {
    this.articleAddingMode = true;
  }

  addTest(): void {
    this.testAddingMode = true;
  }

}
