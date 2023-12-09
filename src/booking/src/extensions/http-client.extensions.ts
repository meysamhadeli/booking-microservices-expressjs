import { container } from 'tsyringe';
import {FlightClientService, IFlightClientService} from "../booking/http-client/services/flight/flight.client";
import {
  IPassengerClientService,
  PassengerClientService
} from "../booking/http-client/services/passenger/passenger.client";

export const initialHttpClientServices = () => {
  container.register<IFlightClientService>('IFlightClientService', FlightClientService);
  container.register<IPassengerClientService>('IPassengerClientService', PassengerClientService);
};
