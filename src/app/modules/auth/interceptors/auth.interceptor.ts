import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private readonly authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const accessToken = this.authService.getTokens()?.accessToken;
    if (accessToken) {
      const reqWithAuth = request.clone({headers: request.headers.set('authorization', `bearer ${accessToken}`)});
      return next.handle(reqWithAuth);
    }

    return next.handle(request);
  }
}
