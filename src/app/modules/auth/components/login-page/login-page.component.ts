import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { catchError, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'mn-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPageComponent implements OnInit {
  form: FormGroup = this.fb.group({
    email: [null, [Validators.required, Validators.email]],
    password: [null, Validators.required]
  });

  constructor(private readonly authService: AuthService,
              private readonly fb: FormBuilder,
              private readonly router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    this.authService.signIn(this.form.value)
      .pipe(
        switchMap(res => {
          console.log(res);
          return this.router.navigateByUrl('/');
        }),
        catchError(err => {
          throw new Error(err);
        })
      )
      .subscribe();
  }

}
