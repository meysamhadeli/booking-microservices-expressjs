import { IDataSeeder } from 'building-blocks/typeorm/db-context';
import { container } from 'tsyringe';
import { encryptPassword } from 'building-blocks/utils/encryption';
import { Logger } from 'building-blocks/logging/logger';
import {UserRepository} from "../repositories/user.repository";
import {User} from "../../user/entities/user.entity";
import {Role} from "../../user/enums/role.enum";

export class UserSeed implements IDataSeeder {
  logger = container.resolve(Logger);
  async seedData(): Promise<void> {
    const userRepository = container.resolve(UserRepository);
    if ((await userRepository.getAllUsers())?.length == 0) {
      await userRepository.createUser(
        new User({
          email: 'dev@dev.com',
          name: 'developer',
          password: await encryptPassword('Admin@1234'),
          isEmailVerified: false,
          role: Role.ADMIN,
          passportNumber: '12345678'
        })
      );
      this.logger.info('Seed users run successfully!');
    }
  }
}
