import { container } from 'tsyringe';
import {
  IPassengerClient,
  PassengerClient
} from "../booking/http-client/services/passenger/passenger.client";
import {FlightClient, IFlightClient} from "../booking/http-client/services/flight/flight.client";

export const initialHttpClientServices = () => {
  container.register<IFlightClient>('IFlightClient', FlightClient);
  container.register<IPassengerClient>('IPassengerClient', PassengerClient);
};
