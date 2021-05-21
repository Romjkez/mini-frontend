import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mn-tests-list',
  templateUrl: './tests-list.component.html',
  styleUrls: ['./tests-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TestsListComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
