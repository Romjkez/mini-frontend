import { Injectable } from '@angular/core';
import { CrudService } from '../../common/models/crud.service';
import { Exercise } from './models/exercise';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetManyResponseDto } from '../../common/dto/get-many-response.dto';
import { SimpleExercise } from './models/simple-exercise';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { environment } from '../../../environments/environment';
import { GetManyExercisesDto } from './dto/get-many-exercises.dto';

@Injectable()
export class ExerciseService implements CrudService<Exercise> {

  constructor(private readonly http: HttpClient) {
  }

  create(dto: CreateExerciseDto): Observable<Exercise> {
    return this.http.post<Exercise>(`${environment.apiHost}/exercise`, dto);
  }

  getById(id: number): Observable<Exercise> {
    return this.http.get<Exercise>(`${environment.apiHost}/exercise/${id}`);
  }

  getMany<M = SimpleExercise>(dto: GetManyExercisesDto): Observable<GetManyResponseDto<M>> {
    return this.http.post<GetManyResponseDto<M>>(`${environment.apiHost}/exercise/getMany`, dto);
  }
}
