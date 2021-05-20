import { UserRole } from '../../auth/models/user-role';

export interface UserFilterDto {
  firstName?: string;

  lastName?: string;

  email?: string;

  company?: string;

  isPrivate?: boolean;

  role?: UserRole;
}
