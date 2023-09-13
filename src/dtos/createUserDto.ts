import {Role} from "../enums/role";

export interface CreateUserDto {
  email: string;
  password: string;
  name: string;
  role: Role;
}
