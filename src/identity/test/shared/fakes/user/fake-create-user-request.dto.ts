import { faker } from '@faker-js/faker';
import {CreateUserRequestDto} from "../../../../src/user/features/v1/create-user/create-user";
import {Role} from "../../../../src/user/enums/role.enum";

export class FakeCreateUserRequestDto {
  static generate(): CreateUserRequestDto {
    const createUserRequestDto = {
      email: faker.internet.email(),
      password: 'Admin@1234',
      name: faker.person.fullName(),
      role: Role.USER,
      passportNumber: faker.string.numeric(9)
    };

    return createUserRequestDto;
  }
}
