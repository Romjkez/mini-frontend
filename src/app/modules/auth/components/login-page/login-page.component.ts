import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, finalize, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from '../../models/jwt-payload';
import { UserRole } from '../../models/user-role';
import { MessageService } from 'primeng/api';
import { EMPTY } from 'rxjs';
import { TOAST_ERROR_TIME } from '../../../../common/constants';
import { HttpErrorResponse } from '@angular/common/http';
import { errorToText } from '../../../../common/utils/error-to-text';

@Component({
  selector: 'mn-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent {
  form: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });

  constructor(private readonly authService: AuthService,
              private readonly fb: FormBuilder,
              private readonly router: Router,
              private readonly messageService: MessageService) {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.form.disable();
    this.authService.signIn(this.form.value)
      .pipe(
        switchMap(async res => {
          const payload: JwtPayload = jwtDecode(res.accessToken);
          if (payload.role !== UserRole.ADMIN) {
            this.messageService.add({
              severity: 'warn',
              summary: 'Авторизация запрещена',
              detail: 'Авторизация доступна только администраторам',
              life: TOAST_ERROR_TIME
            });
            return EMPTY;
          }
          localStorage.setItem('accessToken', res.accessToken);
          localStorage.setItem('refreshToken', res.refreshToken);
          return this.router.navigateByUrl('/');
        }),
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка авторизации',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          throw new HttpErrorResponse(err);
        }),
        finalize(() => this.form.enable())
      )
      .subscribe();
  }

}
