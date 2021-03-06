import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Article } from '../../../articles/models/article';
import { SimpleTest } from '../../../tests/models/simple-test';
import { TestService } from '../../../tests/test.service';
import { ArticleService } from '../../../articles/article.service';
import { auditTime, map, shareReplay, tap } from 'rxjs/operators';
import { MenuItem } from 'primeng/api';
import { Test } from '../../../tests/models/test';
import { ArticleFilterDto } from '../../../articles/dto/article-filter.dto';
import { TestFilterDto } from '../../../tests/dto/test-filter.dto';

export enum ExItemType {
  TEST = 'TEST',
  ARTICLE = 'ARTICLE'
}

@Component({
  selector: 'mn-exercise-form',
  templateUrl: './exercise-form.component.html',
  styleUrls: ['./exercise-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExerciseFormComponent implements OnInit {
  @Input() readonly: boolean;
  @Input() form: FormGroup;
  articles$: Observable<Array<Article & { disabled: boolean }>>;
  tests$: Observable<Array<SimpleTest & { disabled: boolean }>>;
  selectedArticle: Array<Article>;
  selectedTest: Array<SimpleTest>;
  articleAddingMode: boolean;
  testAddingMode: boolean;

  addItemBtnItems: Array<MenuItem> = [];
  items: FormArray;
  searchTestText: FormControl = this.fb.control('');
  searchArticleText: FormControl = this.fb.control('');

  articlesFilter: ArticleFilterDto = {isInExercise: false};
  testsFilter: TestFilterDto = {isInExercise: false};

  constructor(private readonly testService: TestService,
              private readonly articleService: ArticleService,
              private readonly fb: FormBuilder,
              private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.items = this.form.get('items') as FormArray;
    this.addItemBtnItems = [
      {
        label: '???????????????? ????????',
        command: this.addTest.bind(this)
      },
    ];

    this.articles$ = this.articleService.getMany({filter: this.articlesFilter})
      .pipe(
        map(res => res.data),
        shareReplay(1),
        map(tests => tests.map(t => Object.assign(t, {disabled: this.isArticleSelected(t)}))),
      );

    this.tests$ = this.testService.getMany({filter: this.testsFilter})
      .pipe(
        map(res => res.data),
        shareReplay(1),
        map(tests => tests.map(t => Object.assign(t, {disabled: this.isTestSelected(t)}))),
      );

    this.searchTestText.valueChanges
      .pipe(
        auditTime(200),
        tap(() => {
          this.testsFilter.title = this.searchTestText.value?.trim();
          this.tests$ = this.testService.getMany({filter: this.testsFilter})
            .pipe(
              map(res => res.data),
              shareReplay(1),
              map(tests => tests.map(t => Object.assign(t, {disabled: this.isTestSelected(t)}))),
            );
          this.cdr.detectChanges();
        }),
      )
      .subscribe();

    this.searchArticleText.valueChanges
      .pipe(
        auditTime(200),
        tap(() => {
          this.articlesFilter.title = this.searchArticleText.value?.trim();
          this.articles$ = this.articleService.getMany({filter: this.articlesFilter})
            .pipe(
              map(res => res.data),
              shareReplay(1),
              map(tests => tests.map(t => Object.assign(t, {disabled: this.isArticleSelected(t)}))),
            );
          this.cdr.detectChanges();
        }),
      )
      .subscribe();
  }

  addArticle(): void {
    this.articleAddingMode = true;
  }

  addTest(): void {
    this.testAddingMode = true;
  }

  onSelectTest(test: Test): void {
    this.testAddingMode = false;
    this.items.push(this.fb.group({
      id: this.fb.control(test.id),
      title: this.fb.control(test.title),
      type: this.fb.control(ExItemType.TEST)
    }));
    this.selectedTest = null;
  }

  onSelectArticle(article: Article): void {
    this.articleAddingMode = false;
    this.items.push(this.fb.group({
      id: this.fb.control(article.id),
      title: this.fb.control(article.title),
      type: this.fb.control(ExItemType.ARTICLE)
    }));
    this.selectedArticle = null;
  }

  private isTestSelected(test: SimpleTest): boolean {
    return this.items.controls.some(c => c.get('type').value === ExItemType.TEST && c.get('id').value === test.id);
  }

  private isArticleSelected(article: Article): boolean {
    return this.items.controls.some(c => c.get('type').value === ExItemType.ARTICLE && c.get('id').value === article.id);
  }

}
