// import { IDataSeeder } from 'building-blocks/typeorm/dbContext';
// import { container, inject } from 'tsyringe';
// import { UserRepository } from '../repositories/userRepository';
// import { User } from '../../user/entities/user';
// import { encryptPassword } from 'building-blocks/utils/encryption';
// import { Role } from '../../user/enums/role';
// import { Logger } from 'building-blocks/logging/logger';
//
// export class FlightSeed implements IDataSeeder {
//   logger = container.resolve(Logger);
//   async seedData(): Promise<void> {
//     const userRepository = container.resolve(UserRepository);
//     if ((await userRepository.getAllUsers())?.length == 0) {
//       await userRepository.createUser(
//         new User({
//           email: 'dev@dev.com',
//           name: 'developer',
//           password: await encryptPassword('Admin@1234'),
//           isEmailVerified: false,
//           role: Role.ADMIN,
//           passportNumber: '12345678'
//         })
//       );
//       this.logger.info('Seed users run successfully!');
//     }
//   }
// }
//# sourceMappingURL=userSeed.js.map