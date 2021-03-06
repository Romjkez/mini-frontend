import { Injectable } from '@angular/core';
import { CrudService } from '../../common/models/crud.service';
import { Article } from './models/article';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { GetManyArticlesDto } from './dto/get-many-articles.dto';
import { CreateArticleDto } from './dto/create-article.dto';

@Injectable()
export class ArticleService implements CrudService<Article> {

  constructor(private readonly http: HttpClient) {
  }

  create(dto: CreateArticleDto): Observable<Article> {
    return this.http.post<Article>(`${environment.apiHost}/article`, dto);
  }

  getById(id: number): Observable<Article> {
    return this.http.get<Article>(`${environment.apiHost}/article/${id}`);
  }

  getMany<M = Article>(dto: GetManyArticlesDto): Observable<GetManyResponseDto<M>> {
    return this.http.post<GetManyResponseDto<M>>(`${environment.apiHost}/article/getMany`, dto);
  }

  publish(id: number): Observable<void> {
    return this.http.post<void>(`${environment.apiHost}/article/${id}/show`, null);
  }

  hide(id: number): Observable<void> {
    return this.http.post<void>(`${environment.apiHost}/article/${id}/hide`, null);
  }
}
