import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UsersService } from '../../users.service';
import { TableCol } from '../../../../common/models/table-col.model';
import { SimpleUser } from '../../models/simple-user.model';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { GetManyResponseDto } from '../../../../common/dto/get-many-response.dto';


@Component({
  selector: 'mn-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class UsersListComponent implements OnInit {

  readonly columns: Array<TableCol> = [
    {header: 'ID', field: 'id'},
    {header: 'Имя', field: 'firstName'},
    {header: 'Фамилия', field: 'lastName'},
    {header: 'Email', field: 'email'},
    {header: 'Компания', field: 'company'},
    {header: 'Дата регистрации', field: 'createdAt'},
    {header: 'Последнее обновление', field: 'updatedAt'},
    {header: 'Рейтинг', field: 'rating'},
    {header: 'Скрытый профиль', field: 'isPrivate'},
    {header: 'Дата блокировки', field: 'bannedAt'},
  ];
  data: Observable<GetManyResponseDto<SimpleUser>>;
  users: Observable<Array<SimpleUser>>;

  totalItems: Observable<number>;
  selectedColumns: Array<TableCol> = this.columns;

  constructor(private readonly userService: UsersService) {
  }

  ngOnInit(): void {
    this.data = this.userService.getList(null)
      .pipe(
        shareReplay(1),
      );
    this.users = this.data
      .pipe(
        map(res => res.data),
      );

    this.totalItems = this.data
      .pipe(
        map(res => res.totalItems),
      );
  }

}
