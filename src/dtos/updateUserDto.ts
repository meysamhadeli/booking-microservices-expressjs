import {Role} from "../enums/role";

export interface UpdateUserDto {
  email: string;
  password: string;
  name: string;
  role: Role;
}
