import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInDto } from './dto/sign-in.dto';
import { Observable } from 'rxjs';
import { TokensDto } from './dto/tokens-dto';
import { environment } from '../../../environments/environment';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from './models/jwt-payload';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) {
  }

  signIn(dto: SignInDto): Observable<TokensDto> {
    return this.http.post<TokensDto>(`${environment.apiHost}/auth/login`, dto);
  }

  isAuthorized(): boolean {
    const accessToken = localStorage.getItem('accessToken');
    const refreshToken = localStorage.getItem('refreshToken');
    if (!accessToken || !refreshToken) {
      return false;
    }
    return (jwtDecode(accessToken) as JwtPayload).exp * 1000 > Date.now();
  }

  getPayload(): JwtPayload | null {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
      return null;
    }
    return jwtDecode(accessToken);
  }

  getTokens(): TokensDto | null {
    if (!this.isAuthorized()) {
      return null;
    }
    return {
      accessToken: localStorage.getItem('accessToken'),
      refreshToken: localStorage.getItem('refreshToken')
    };
  }

  logout(dto: RefreshTokenDto): Observable<void> {
    return this.http.post<void>(`${environment.apiHost}/auth/logout`, dto)
      .pipe(
        finalize(() => {
          localStorage.removeItem('accessToken');
          localStorage.removeItem('refreshToken');
        })
      );
  }
}
