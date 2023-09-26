import { CreateUser } from '../../../../src/user/features/v1/createUser/createUser';
import { fakeUser } from './fakeUser';

export const fakeCreateUser: CreateUser = {
  name: fakeUser.name,
  role: fakeUser.role,
  password: fakeUser.password,
  email: fakeUser.email,
  passportNumber: fakeUser.passportNumber
};
