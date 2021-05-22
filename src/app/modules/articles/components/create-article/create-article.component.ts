import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mn-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateArticleComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
