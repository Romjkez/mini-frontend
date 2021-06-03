import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article } from '../../models/article';
import { ArticleService } from '../../article.service';
import { first, map, tap } from 'rxjs/operators';

@Component({
  selector: 'mn-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleViewComponent implements OnInit {
  article: Article;
  form: FormGroup;

  constructor(private readonly articleService: ArticleService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        first(),
        map(data => data.article),
        tap((article: Article) => {
          this.article = article;
          this.form = this.fb.group({
            title: this.fb.control(article.title, [Validators.required, Validators.minLength(3)]),
            content: this.fb.control(article.content, [Validators.required]),
            video: this.fb.control(article.video),
            useVideo: this.fb.control(!article.content),
            previewUrl: this.fb.control(article.previewUrl),
            tags: this.fb.control({value: article.tags.map(t => t.text), disabled: true}),
          });
        })
      )
      .subscribe();
  }

}
