import { IDataSeeder } from 'building-blocks/typeorm/db-context';
import { container } from 'tsyringe';
import { encryptPassword } from 'building-blocks/utils/encryption';
import { Logger } from 'building-blocks/logging/logger';
import { User } from '../../user/entities/user.entity';
import { Role } from '../../user/enums/role.enum';
import { UserRepository } from '../repositories/user.repository';

export class UserSeed implements IDataSeeder {
  async seedData(): Promise<void> {
    const userRepository = container.resolve(UserRepository);
    if ((await userRepository.getAllUsers())?.length == 0) {
      await userRepository.createUser(
        new User({
          email: 'dev@dev.com',
          name: 'developer',
          password: await encryptPassword('Admin@12345'),
          isEmailVerified: false,
          role: Role.ADMIN,
          passportNumber: '12345678'
        })
      );
      Logger.info('Seed users run successfully!');
    }
  }
}
