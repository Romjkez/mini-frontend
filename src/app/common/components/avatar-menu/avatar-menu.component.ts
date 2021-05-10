import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'mn-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrls: ['./avatar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarMenuComponent implements OnInit {
  items: MenuItem[];

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Профиль',
        icon: 'pi pi-user'
      },
      {
        label: 'Настройки',
        icon: 'pi pi-cog'
      },
      {
        label: 'Выход',
        icon: 'pi pi-sign-out'
      }
    ];
  }

}
