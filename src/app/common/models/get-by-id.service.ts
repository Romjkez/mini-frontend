import { Observable } from 'rxjs';

export interface GetByIdService<T> {
  getById(id: number): Observable<T>;
}
