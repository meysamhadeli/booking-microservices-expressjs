import { Role } from '../enums/role';

export interface CreateUserRequestDto {
  email: string;
  password: string;
  name: string;
  role: Role;
}
