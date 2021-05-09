import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'mn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit {

  items: MenuItem[];

  constructor() {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Главная',
        routerLink: '/',
      },
      {
        label: 'Упражнения',
        routerLink: '/exercises',
      },
      {
        label: 'Статьи',
        routerLink: '/articles',
      },
      {
        label: 'Тесты',
        routerLink: '/tests',
      },
      {
        label: 'Пользователи',
        routerLink: '/users',
      },
      {
        label: 'Новости',
        routerLink: '/news',
      }
    ];
  }

}
