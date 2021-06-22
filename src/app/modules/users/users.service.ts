import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { Observable } from 'rxjs';
import { SimpleUser } from './models/simple-user.model';
import { GetManyUsersDto } from './dto/get-many-users.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './models/user.model';
import { CrudService } from '../../common/models/crud.service';
import { ChangePasswordDto } from './dto/change-password.dto';

@Injectable()
export class UsersService implements CrudService<User> {

  constructor(private readonly http: HttpClient) {
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.apiHost}/user/${id}`);
  }

  getMany<M = SimpleUser>(dto: GetManyUsersDto): Observable<GetManyResponseDto<M>> {
    return this.http.post<GetManyResponseDto<M>>(`${environment.apiHost}/user/getMany`, dto);
  }

  create(dto: CreateUserDto): Observable<User> {
    return this.http.post<User>(`${environment.apiHost}/user`, dto);
  }

  createBulk(dto: Array<CreateUserDto>): Observable<Array<User>> {
    return this.http.post<Array<User>>(`${environment.apiHost}/user/bulk`, {data: dto});
  }

  changePassword(id: number, dto: ChangePasswordDto): Observable<void> {
    return this.http.put<void>(`${environment.apiHost}/user/${id}/password`, dto);
  }

  ban(id: number): Observable<void> {
    return this.http.post<void>(`${environment.apiHost}/user/${id}/deactivate`, null);
  }

  unban(id: number): Observable<void> {
    return this.http.post<void>(`${environment.apiHost}/user/${id}/activate`, null);
  }
}
