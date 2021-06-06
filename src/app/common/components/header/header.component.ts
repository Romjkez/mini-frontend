import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Observable, Subject } from 'rxjs';
import { AuthService } from '../../../modules/auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';
import { filter, map, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mn-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, OnDestroy {
  items: MenuItem[];
  currentUrl$: Observable<string>;
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(public readonly authService: AuthService,
              private readonly router: Router) {
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
     /* {
        label: 'Новости',
        routerLink: '/news',
      }*/
    ];
    this.currentUrl$ = this.router.events
      .pipe(
        takeUntil(this.destroy$),
        filter(event => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      );
  }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}

