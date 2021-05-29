import { Component, OnInit } from '@angular/core';
import { ArticleService } from '../../article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, distinctUntilChanged, tap } from 'rxjs/operators';
import * as Quill from 'quill';
import { CreateArticleDto } from '../../dto/create-article.dto';
import { HttpErrorResponse } from '@angular/common/http';
import { errorToText } from '../../../../common/utils/error-to-text';
import { TOAST_ERROR_TIME } from '../../../../common/constants';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';


const ColorStyle = Quill.import('attributors/style/color');
const SizeStyle = Quill.import('attributors/style/size');
const DirectionAttribute = Quill.import('attributors/attribute/direction');
const AlignStyle = Quill.import('attributors/style/align');
const BackgroundStyle = Quill.import('attributors/style/background');
const DirectionStyle = Quill.import('attributors/style/direction');
const FontStyle = Quill.import('attributors/style/font');

Quill.register(DirectionAttribute, true);
Quill.register(ColorStyle, true);
Quill.register(SizeStyle, true);
Quill.register(AlignStyle, true);
Quill.register(BackgroundStyle, true);
Quill.register(DirectionStyle, true);
Quill.register(FontStyle, true);

@Component({
  selector: 'mn-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
})
export class CreateArticleComponent implements OnInit {
  form: FormGroup = this.fb.group({
    title: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
    content: this.fb.control(null, [Validators.required]),
    video: this.fb.control(null),
    useVideo: this.fb.control(false),
    previewUrl: this.fb.control(null),
    tags: this.fb.control(null),
  });

  constructor(private readonly articleService: ArticleService,
              private readonly fb: FormBuilder,
              private readonly messageService: MessageService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.form.get('useVideo').valueChanges
      .pipe(
        distinctUntilChanged(),
        tap(value => value ? this.switchToVideo() : this.switchToContent()),
        tap(() => this.form.updateValueAndValidity())
      )
      .subscribe();
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    const dto: CreateArticleDto = {
      title: this.form.get('title').value,
      tags: this.form.get('tags').value,
      video: this.form.get('video').value,
      previewUrl: this.form.get('previewUrl').value,
      content: this.form.get('content').value
    };
    this.articleService.create(dto)
      .pipe(
        tap(article => {
          this.messageService.add({
            severity: 'success',
            summary: 'Статья успешно добавлена',
            detail: `Присвоен ID: ${article.id}`
          });
          return this.router.navigateByUrl('/articles');
        }),
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка добавления статьи',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          throw new HttpErrorResponse(err);
        })
      )
      .subscribe();
  }

  getArticleContentTooltip(): string {
    return `
    Подсказки при написании:
    <ul>
        <li>Не вставляйте большие картинки. Проверьте, чтобы их размер был не более 100Кб, а расширение - jpeg или webp. В противном случае воспользуйтесь оптимизаторами изображений или уменьшите размеры изображения</li>
    </ul>`;
  }

  private switchToVideo(): void {
    this.form.get('video').setValidators([Validators.required]);
    this.form.get('content').reset();
    this.form.get('content').clearValidators();
  }

  private switchToContent(): void {
    this.form.get('content').setValidators([Validators.required]);
    this.form.get('video').reset();
    this.form.get('video').clearValidators();
  }
}
