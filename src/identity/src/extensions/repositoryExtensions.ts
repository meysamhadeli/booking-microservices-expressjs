import { container } from 'tsyringe';
import { IUserRepository, UserRepository } from '../data/repositories/userRepository';
import { AuthRepository, IAuthRepository } from '../data/repositories/authRepository';

export const registerRepositories = async (): Promise<void> => {
  container.register<IUserRepository>('IUserRepository', UserRepository);
  container.register<IAuthRepository>('IAuthRepository', AuthRepository);
};
