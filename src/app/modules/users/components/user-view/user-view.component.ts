import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { User } from '../../models/user.model';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { catchError, first, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { MenuItem, MessageService } from 'primeng/api';
import { AuthService } from '../../../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { errorToText } from '../../../../common/utils/error-to-text';
import { TOAST_ERROR_TIME } from '../../../../common/constants';
import { BehaviorSubject, Observable, of, Subject, zip } from 'rxjs';

@Component({
  selector: 'mn-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserViewComponent implements OnInit, OnDestroy {
  user: BehaviorSubject<User> = new BehaviorSubject<User>({} as User);
  form: FormGroup;
  isMyProfile: boolean;
  changePasswordModalVisible: boolean;

  settingsItems$: Observable<Array<MenuItem>>;
  private readonly destroy$: Subject<void> = new Subject<void>();

  constructor(private readonly userService: UsersService,
              private readonly authService: AuthService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly messageService: MessageService,
              private readonly fb: FormBuilder,
              private readonly cdr: ChangeDetectorRef) {
  }

  ngOnInit(): void {

    this.activatedRoute.data
      .pipe(
        takeUntil(this.destroy$),
        map(data => this.user.next(data.user)),
      )
      .subscribe();

    this.settingsItems$ = this.user
      .pipe(
        map(user => ([
          {
            label: 'Изменить пароль',
            icon: 'pi pi-key',
            visible: this.isMyProfile,
            command: this.showChangePasswordModal.bind(this)
          },
          {
            label: 'Заблокировать',
            icon: 'pi pi-ban',
            visible: !this.isMyProfile && !user.bannedAt,
            command: this.ban.bind(this),
          },
          {
            label: 'Разблокировать',
            icon: 'pi pi-lock-open',
            visible: !this.isMyProfile && !!user.bannedAt,
            command: this.unban.bind(this),
          }
        ])));

    this.activatedRoute.data
      .pipe(
        takeUntil(this.destroy$),
        map(data => data.user),
        tap((user: User) => {
          this.form = this.fb.group({
            firstName: this.fb.control(user.firstName),
            lastName: this.fb.control(user.lastName),
            email: this.fb.control(user.email),
            company: this.fb.control(user.company || '-'),
          });
          this.isMyProfile = this.authService.getPayload().sub === user.id;
          this.cdr.markForCheck();
        })
      )
      .subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showChangePasswordModal(): void {
    this.changePasswordModalVisible = true;
  }

  ban(): void {
    this.user
      .pipe(
        first(),
        switchMap(user => zip(of(user.id), this.userService.ban(user.id))),
        tap(([id]) => this.fetchUser(id)),
        tap(() => this.messageService.add({
          severity: 'success',
          summary: 'Пользователь заблокирован',
        })),
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка при блокировке',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          throw new HttpErrorResponse(err);
        }),
      )
      .subscribe();
  }

  unban(): void {
    this.user
      .pipe(
        first(),
        switchMap(user => zip(of(user.id), this.userService.unban(user.id))),
        tap(([id]) => this.fetchUser(id)),
        tap(() => this.messageService.add({
          severity: 'success',
          summary: 'Пользователь разблокирован',
        })),
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка при разблокировке',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          throw new HttpErrorResponse(err);
        }),
      )
      .subscribe();
  }

  private fetchUser(id: number): void {
    this.userService.getById(id)
      .pipe(
        tap(user => this.user.next(user)),
        tap(() => this.cdr.markForCheck()),
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка при обновлении данных',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          throw new HttpErrorResponse(err);
        }),
      )
      .subscribe();
  }

}
