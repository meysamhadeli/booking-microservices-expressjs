import { Role } from '../enums/role';

export class UserDto {
  id: number;
  email: string;
  name: string;
  isEmailVerified: boolean;
  role: Role;
  passportNumber: string;
  createdAt: Date;
  updatedAt?: Date;
}
