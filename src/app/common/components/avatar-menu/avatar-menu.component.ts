import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mn-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrls: ['./avatar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarMenuComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
