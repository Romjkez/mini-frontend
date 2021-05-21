import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { defaultIfEmpty, filter, switchMap } from 'rxjs/operators';
import { GetByIdService } from '../../../common/models/get-by-id.service';

export const CRUD_SERVICE = new InjectionToken<GetByIdService<any>>('CRUD SERVICE');

@Injectable()
export class ByIdResolver<T> implements Resolve<T> {
  constructor(@Inject(CRUD_SERVICE) protected readonly crudService: GetByIdService<T>) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> {
    return of(route.params.id)
      .pipe(
        filter(id => !isNaN(+id)),
        switchMap(id => this.crudService.getById(id)),
        defaultIfEmpty(null)
      );
  }
}
