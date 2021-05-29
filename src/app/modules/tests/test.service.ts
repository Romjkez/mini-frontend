import { Injectable } from '@angular/core';
import { CrudService } from '../../common/models/crud.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { CreateTestDto } from './dto/create-test.dto';
import { Test } from './models/test';
import { SimpleTest } from './models/simple-test';
import { environment } from '../../../environments/environment';
import { GetManyTestsDto } from './dto/get-many-tests.dto';

@Injectable()
export class TestService implements CrudService<Test> {

  constructor(private readonly http: HttpClient) {
  }

  create(dto: CreateTestDto): Observable<Test> {
    return this.http.post<Test>(`${environment.apiHost}/article`, dto);
  }

  getById(id: number): Observable<Test> {
    return this.http.get<Test>(`${environment.apiHost}/article/${id}`);
  }

  getMany<M = SimpleTest>(dto: GetManyTestsDto): Observable<GetManyResponseDto<M>> {
    return this.http.post<GetManyResponseDto<M>>(`${environment.apiHost}/article/getMany`, dto);
  }
}
