import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Subject } from 'rxjs';
import { AuthService } from '../../../modules/auth/auth.service';

@Component({
  selector: 'mn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly authService: AuthService) {
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


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

