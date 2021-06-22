import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UsersService } from '../../users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { TOAST_ERROR_TIME } from '../../../../common/constants';
import { catchError, finalize, tap } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { errorToText } from '../../../../common/utils/error-to-text';

const MIN_PASSWORD_LENGTH = 8;

@Component({
  selector: 'mn-change-password-modal',
  templateUrl: './change-password-modal.component.html',
  styleUrls: ['./change-password-modal.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordModalComponent implements OnInit {
  form: FormGroup;
  @Input() userId: number;
  @Output() passwordChanged: EventEmitter<void> = new EventEmitter();

  constructor(private readonly userService: UsersService,
              private readonly messageService: MessageService,
              private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      oldPassword: this.fb.control(null, Validators.required),
      newPassword: this.fb.control(null, [Validators.required, Validators.minLength(MIN_PASSWORD_LENGTH)]),
      newPasswordConfirmation: this.fb.control(null, Validators.required),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.form.disable();

    // TODO: replace with validators
    if (this.form.get('newPassword').value !== this.form.get('newPasswordConfirmation').value) {
      return this.messageService.add({
        severity: 'warn',
        summary: 'Изменение пароля',
        detail: 'Новые пароли не совпадают',
        life: TOAST_ERROR_TIME
      });
    }
    if (this.form.get('newPassword').value.match(/[А-Я]/i)) {
      return this.messageService.add({
        severity: 'warn',
        summary: 'Изменение пароля',
        detail: 'Пароль не должен содержать кириллицу',
        life: TOAST_ERROR_TIME
      });
    }

    this.userService.changePassword(this.userId, {
      oldPassword: this.form.get('oldPassword').value,
      newPassword: this.form.get('newPassword').value
    })
      .pipe(
        tap(() => this.messageService.add({
          severity: 'success',
          summary: 'Пароль успешно изменен',
        })),
        tap(() => this.passwordChanged.emit()),
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка при смене пароля',
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
