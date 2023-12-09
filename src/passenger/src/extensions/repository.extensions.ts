import { container } from 'tsyringe';
import {IPassengerRepository, PassengerRepository} from "../data/repositories/passenger.repository";

export const registerRepositories = async (): Promise<void> => {
  container.register<IPassengerRepository>('IPassengerRepository', PassengerRepository);
};
