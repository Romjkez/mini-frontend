import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ArticleService } from '../../article.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { distinctUntilChanged, tap } from 'rxjs/operators';
import * as Quill from 'quill';


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
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateArticleComponent implements OnInit {
  form: FormGroup = this.fb.group({
    title: this.fb.control(null, [Validators.required, Validators.minLength(3)]),
    content: this.fb.control(null, [Validators.required]),
    video: this.fb.control(null),
    useVideo: this.fb.control(false),
    previewUrl: this.fb.control(null),
    tags: this.fb.control([]),
  });

  constructor(private readonly articleService: ArticleService,
              private readonly fb: FormBuilder) {
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
    console.log(1);
  }

  getArticleContentTooltip(): string {
    return `
    Подсказки при написании:
    <ul>
        <li>Не вставляйте большие картинки. Проверьте, чтобы их размер был не более 100Кб. В противном случае воспользуйтесь оптимизаторами изображений или уменьшите размеры изображения</li>
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
