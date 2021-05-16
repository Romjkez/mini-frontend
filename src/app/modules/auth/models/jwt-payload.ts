import { UserRole } from './user-role';

export interface JwtPayload {
  login: string;
  role: UserRole;
  sub: number;
  iat: number;
  exp: number;
}

