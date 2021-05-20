import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mn-create-user-form',
  templateUrl: './create-user-form.component.html',
  styleUrls: ['./create-user-form.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateUserFormComponent implements OnInit {
  form: FormGroup;

  constructor(private readonly userService: UsersService,
              private readonly fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      firstName: this.fb.control(null, [Validators.required, Validators.minLength(2)]),
      lastName: this.fb.control(null, [Validators.required, Validators.minLength(2)]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      company: this.fb.control(null, [Validators.minLength(2)]),
    });
  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
  }

}
