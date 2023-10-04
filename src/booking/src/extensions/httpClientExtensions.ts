import { container } from 'tsyringe';
import {
  FlightClientService,
  IFlightClientService
} from '../booking/httpClient/services/flight/flightClientService';
import {
  IPassengerClientService,
  PassengerClientService
} from '../booking/httpClient/services/passenger/passengerClientService';

export const initialHttpClientServices = () => {
  container.register<IFlightClientService>('IFlightClientService', FlightClientService);
  container.register<IPassengerClientService>('IPassengerClientService', PassengerClientService);
};
