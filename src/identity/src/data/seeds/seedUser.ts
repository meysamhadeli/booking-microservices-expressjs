import { UserRepository } from '../repositories/userRepository';
import { User } from '../../user/entities/user';
import { Role } from '../../user/enums/role';
import { encryptPassword } from 'building-blocks/utils/encryption';

export const seedUser = async () => {
  const userRepository = new UserRepository();

  if ((await userRepository.getAllUsers())?.length == 0)
    await userRepository.createUser(
      new User(
        'dev@dev.com',
        'developer',
        await encryptPassword('Admin@1234'),
        false,
        Role.ADMIN,
        '12345678'
      )
    );
};
