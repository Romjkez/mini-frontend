import { UserRole } from '../../auth/models/user-role';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  company?: string;
  createdAt: Date;
  updatedAt?: Date;
  isPrivate: boolean;
  bannedAt?: Date;
  rating?: number;
  finishedArticles: number;
  finishedTests: number;
  favoriteArticles: number;
  role: UserRole;
}
