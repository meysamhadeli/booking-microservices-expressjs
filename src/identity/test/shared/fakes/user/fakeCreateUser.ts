import { CreateUser } from '../../../../src/user/features/v1/createUser/createUser';
import { User } from '../../../../src/user/entities/user';
import { faker } from '@faker-js/faker';
import { Role } from '../../../../src/user/enums/role';

export class FakeCreateUser {
  static generate(user?: User): CreateUser {
    const createUser: CreateUser = {
      name: user?.name ?? faker.person.fullName(),
      role: user?.role ?? Role.USER,
      password: user?.password ?? 'Admin@1234',
      email: user?.email ?? faker.internet.email(),
      passportNumber: user?.passportNumber ?? faker.string.numeric(9)
    };

    return createUser;
  }
}
