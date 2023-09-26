import { CreateUserRequestDto } from '../../../../src/user/features/v1/createUser/createUser';
import { Role } from '../../../../src/user/enums/role';
import { faker } from '@faker-js/faker';

export class FakeCreateUserRequestDto {
  static generate(): CreateUserRequestDto {
    const createUserRequestDto: CreateUserRequestDto = {
      email: faker.internet.email(),
      password: 'Admin@1234',
      name: faker.person.fullName(),
      role: Role.USER,
      passportNumber: faker.string.numeric(9)
    };

    return createUserRequestDto;
  }
}
