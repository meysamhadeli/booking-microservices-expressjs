import { container } from 'tsyringe';
import {IUserRepository, UserRepository} from "../data/repositories/user.repository";
import {AuthRepository, IAuthRepository} from "../data/repositories/auth.repository";

export const registerRepositories = async (): Promise<void> => {
  container.register<IUserRepository>('IUserRepository', UserRepository);
  container.register<IAuthRepository>('IAuthRepository', AuthRepository);
};
