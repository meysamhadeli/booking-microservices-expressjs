import { Role } from '../enums/role';

export interface UpdateUserRequestDto {
  email: string;
  password: string;
  name: string;
  role: Role;
}
