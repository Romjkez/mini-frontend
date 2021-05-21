export interface SimpleUser {
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
}
