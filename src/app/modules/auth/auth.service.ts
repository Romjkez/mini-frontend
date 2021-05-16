import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInDto } from './dto/sign-in.dto';
import { Observable } from 'rxjs';
import { TokensDto } from './dto/tokens-dto';
import { environment } from '../../../environments/environment';
import jwtDecode from 'jwt-decode';
import { JwtPayload } from './models/jwt-payload';

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
    if (!accessToken) {
      return false;
    }
    return (jwtDecode(accessToken) as JwtPayload).exp * 1000 > Date.now();
  }
}
