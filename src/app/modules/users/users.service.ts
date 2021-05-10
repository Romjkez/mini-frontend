import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { Observable } from 'rxjs';
import { SimpleUser } from './models/simple-user.model';
import { GetManyUsersDto } from './dto/get-many-users.dto';

@Injectable()
export class UsersService {

  constructor(private readonly http: HttpClient) {
  }

  getList(dto: GetManyUsersDto): Observable<GetManyResponseDto<SimpleUser>> {
    return this.http.post<GetManyResponseDto<SimpleUser>>(`${environment.apiHost}/user/getMany`, null);
  }
}