import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { TOAST_ERROR_TIME } from '../../../../common/constants';
import { HttpErrorResponse } from '@angular/common/http';
import { errorToText } from '../../../../common/utils/error-to-text';

@Component({
  selector: 'mn-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserFormComponent implements OnInit {
  form: FormGroup;
  users: FormArray;

  constructor(private readonly userService: UsersService,
              private readonly fb: FormBuilder,
              private readonly messageService: MessageService,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      user: this.fb.array([])
    });
    this.users = this.form.get('user') as FormArray;
    this.addUser();
  }

  addUser(): void {
    this.users.push(this.fb.group({
      firstName: this.fb.control('Ivan', [Validators.required, Validators.minLength(2)]),
      lastName: this.fb.control('Ivanov', [Validators.required, Validators.minLength(2)]),
      email: this.fb.control('ivanov@mail.ru', [Validators.required, Validators.email]),
      company: this.fb.control('Avilon', [Validators.minLength(2)]),
    }));
  }

  onSubmit(): void {
    console.log(this.form.value);
    if (this.form.invalid) {
      return;
    }

    if (this.users.controls.length === 1) {
      return this.saveUser();
    }
    return this.saveMultipleUsers();
  }

  private saveUser(): void {
    this.userService.create(this.users.controls[0].value)
      .pipe(
        tap(user => {
          this.messageService.add({
            severity: 'success',
            summary: 'Пользователь успешно добавлен',
            detail: `Присвоен ID: ${user.id}`
          });
          return this.router.navigate(['/users', user.id]);
        }),
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка добавления пользователя',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          throw new HttpErrorResponse(err);
        })
      )
      .subscribe();
  }

  private saveMultipleUsers(): void {
    this.userService.createBulk(this.users.value)
      .pipe(
        tap(users => {
          this.messageService.add({
            severity: 'success',
            summary: 'Пользователи успешно добавлены',
            detail: `Присвоены ID: ${users.map(u => u.id).join(', ')}`
          });
          return this.router.navigateByUrl('/users');
        }),
        catchError((err: HttpErrorResponse) => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка добавления пользователей',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          throw new HttpErrorResponse(err);
        })
      )
      .subscribe();
  }

}
