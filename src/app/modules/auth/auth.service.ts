import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SignInDto } from './dto/sign-in.dto';
import { Observable } from 'rxjs';
import { TokensDto } from './dto/tokens-dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) {
  }

  signIn(dto: SignInDto): Observable<TokensDto> {
    return this.http.post<TokensDto>(`${environment.apiHost}/auth/login`, dto);
  }
}
