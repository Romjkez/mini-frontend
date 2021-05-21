import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { User } from '../../models/user.model';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { first, map, tap } from 'rxjs/operators';

@Component({
  selector: 'mn-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserViewComponent implements OnInit {
  user: User;
  form: FormGroup;

  constructor(private readonly userService: UsersService,
              private readonly activatedRoute: ActivatedRoute,
              private readonly fb: FormBuilder,
              private readonly router: Router) {
  }

  ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        first(),
        map(data => data.user),
        tap((user: User) => {
          this.user = user;
          this.form = this.fb.group({
            firstName: this.fb.control(user.firstName),
            lastName: this.fb.control(user.lastName),
            email: this.fb.control(user.email),
            company: this.fb.control(user.company || '-'),
          });
        })
      )
      .subscribe();
  }

}
