import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mn-article-view',
  templateUrl: './article-view.component.html',
  styleUrls: ['./article-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticleViewComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
