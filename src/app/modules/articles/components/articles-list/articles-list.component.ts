import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mn-articles-list',
  templateUrl: './articles-list.component.html',
  styleUrls: ['./articles-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArticlesListComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
