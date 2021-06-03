import { Inject, Injectable, InjectionToken } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, defaultIfEmpty, filter, switchMap } from 'rxjs/operators';
import { CrudService } from '../../../common/models/crud.service';
import { MessageService } from 'primeng/api';
import { errorToText } from '../../../common/utils/error-to-text';
import { TOAST_ERROR_TIME } from '../../../common/constants';

export const CRUD_SERVICE = new InjectionToken<CrudService<any>>('CRUD SERVICE');

@Injectable()
export class ByIdResolver<T> implements Resolve<T> {
  constructor(@Inject(CRUD_SERVICE) protected readonly crudService: CrudService<T>,
              private readonly messageService: MessageService,
              private readonly router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<T> {
    return of(route.params.id)
      .pipe(
        filter(id => !isNaN(+id)),
        switchMap(id => this.crudService.getById(id)),
        catchError(async err => {
          this.messageService.add({
            severity: 'error',
            summary: 'Ошибка при поиске по идентификатору',
            detail: errorToText(err?.error?.message, err.status),
            life: TOAST_ERROR_TIME
          });
          await this.router.navigateByUrl('/404');
          throw new Error(`ID ${route.params.id} not found`);
        }),
        defaultIfEmpty(null)
      );
  }
}
