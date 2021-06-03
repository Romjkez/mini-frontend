import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'mn-article-form',
  templateUrl: './article-form.component.html',
  styleUrls: ['./article-form.component.scss']
})
export class ArticleFormComponent {
  @Input() form: FormGroup;
  @Input() readonly: boolean;

  getArticleContentTooltip(): string {
    return `
    Подсказки при написании:
    <ul>
        <li>Не вставляйте большие картинки. Проверьте, чтобы их размер был не более 100Кб, а расширение - jpeg или webp. В противном случае воспользуйтесь оптимизаторами изображений или уменьшите размеры изображения</li>
    </ul>`;
  }
}
