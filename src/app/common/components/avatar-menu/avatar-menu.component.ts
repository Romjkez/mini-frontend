import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../../../modules/auth/auth.service';
import { RefreshTokenDto } from '../../../modules/auth/dto/refresh-token.dto';
import { catchError, finalize } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { errorToText } from '../../utils/error-to-text';
import { TOAST_ERROR_TIME } from '../../constants';
import { Router } from '@angular/router';

@Component({
  selector: 'mn-avatar-menu',
  templateUrl: './avatar-menu.component.html',
  styleUrls: ['./avatar-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarMenuComponent implements OnInit {
  items: MenuItem[];

  constructor(private readonly authService: AuthService,
              private readonly messageService: MessageService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.items = [
      {
        label: 'Профиль',
        icon: 'pi pi-user',
        routerLink: `/users/${this.authService.getPayload().sub}`
      },
      {
        label: 'Настройки',
        icon: 'pi pi-cog'
      },
      {
        label: 'Выход',
        icon: 'pi pi-sign-out',
        command: this.onLogout.bind(this)
      }
    ];
  }

  onLogout(): void {
    const dto: RefreshTokenDto = {refreshToken: this.authService.getTokens()?.refreshToken};

    this.authService.logout(dto)
      .pipe(
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'warn',
            summary: 'Ошибка при выходе из системы',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          throw new HttpErrorResponse(err);
        }),
        finalize(() => this.router.navigateByUrl('/auth/sign-in')),
      )
      .subscribe();
  }
}
