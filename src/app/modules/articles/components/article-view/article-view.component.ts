import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '../../models/article';
import { ArticleService } from '../../article.service';
import { catchError, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, Observable, of, Subject, zip } from 'rxjs';
import { MenuItem, MessageService } from 'primeng/api';
import { HttpErrorResponse } from '@angular/common/http';
import { errorToText } from '../../../../common/utils/error-to-text';
import { TOAST_ERROR_TIME } from '../../../../common/constants';

@Component({
  selector: 'mn-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleViewComponent implements OnInit, OnDestroy {
  article: BehaviorSubject<Article> = new BehaviorSubject<Article>({} as Article);
  form: FormGroup;
  settingsItems$: Observable<Array<MenuItem>>;
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly articleService: ArticleService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly fb: FormBuilder,
              private readonly messageService: MessageService,
              private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        takeUntil(this.destroy$),
        map(data => this.article.next(data.article)),
      )
      .subscribe();

    this.settingsItems$ = this.article
      .pipe(
        map(article => ([
          {
            label: 'Скрыть публикацию',
            icon: 'pi pi-lock',
            visible: article.isVisible,
            command: this.hide.bind(this),
          },
          {
            label: 'Опубликовать',
            icon: 'pi pi-lock-open',
            visible: !article.isVisible,
            command: this.publish.bind(this),
          }
        ])));

    this.activatedRoute.data
      .pipe(
        takeUntil(this.destroy$),
        map(data => data.article),
        tap((article: Article) => {
          this.form = this.fb.group({
            title: this.fb.control(article.title, [Validators.required, Validators.minLength(3)]),
            content: this.fb.control(article.content, [Validators.required]),
            video: this.fb.control(article.video),
            useVideo: this.fb.control(!article.content),
            previewUrl: this.fb.control(article.previewUrl),
            tags: this.fb.control({value: article.tags.map(t => t.text), disabled: true}),
          });
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  publish(): void {
    this.article
      .pipe(
        first(),
        switchMap(user => zip(of(user.id), this.articleService.publish(user.id))),
        tap(([id]) => this.fetchArticle(id)),
        tap(() => this.messageService.add({
          severity: 'success',
          summary: 'Статья опубликована',
        })),
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка при публикации',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          throw new HttpErrorResponse(err);
        }),
      )
      .subscribe();
  }

  hide(): void {
    this.article
      .pipe(
        first(),
        switchMap(user => zip(of(user.id), this.articleService.hide(user.id))),
        tap(([id]) => this.fetchArticle(id)),
        tap(() => this.messageService.add({
          severity: 'success',
          summary: 'Статья скрыта',
        })),
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка при скрытии',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          throw new HttpErrorResponse(err);
        }),
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private fetchArticle(id: number): void {
    this.articleService.getById(id)
      .pipe(
        tap(article => this.article.next(article)),
        tap(() => this.cdr.markForCheck()),
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка при обновлении данных',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          throw new HttpErrorResponse(err);
        }),
      )
      .subscribe();
  }
}
