import { Observable } from 'rxjs';
import { GetManyDto } from '../dto/get-many.dto';
import { GetManyResponseDto } from '../dto/get-many-response.dto';

export interface CrudService<T> {
  create(dto: any): Observable<T>;

  getById(id: number): Observable<T>;

  getMany<M>(dto: GetManyDto): Observable<GetManyResponseDto<M>>;
}
