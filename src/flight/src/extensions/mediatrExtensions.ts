import { container } from 'tsyringe';
import { mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { CreateFlight, CreateFlightHandler } from '../flight/features/v1/createFlight/createFlight';
import {
  CreateAircraft,
  CreateAircraftHandler
} from '../aircraft/features/v1/createAircraft/createAircraft';
import {
  CreateAirport,
  CreateAirportHandler
} from '../airport/features/v1/createAirport/createAirport';
import { CreateSeat, CreateSeatHandler } from '../seat/features/v1/createSeat/createSeat';
import { ReserveSeat, ReserveSeatHandler } from '../seat/features/v1/reserveSeat/reserveSeat';
import {
  GetAvailableSeats,
  GetAvailableSeatsHandler
} from '../seat/features/v1/getAvailableSeats/getAvailableSeats';
import { GetFlightById, GetFlightByIdHandler } from '../flight/features/v1/getFlightById/getFlightById';

export const registerMediatrHandlers = () => {
  mediatrJs.registerHandler(CreateAircraft, container.resolve(CreateAircraftHandler));
  mediatrJs.registerHandler(CreateAirport, container.resolve(CreateAirportHandler));
  mediatrJs.registerHandler(CreateFlight, container.resolve(CreateFlightHandler));
  mediatrJs.registerHandler(GetFlightById, container.resolve(GetFlightByIdHandler));
  mediatrJs.registerHandler(CreateSeat, container.resolve(CreateSeatHandler));
  mediatrJs.registerHandler(ReserveSeat, container.resolve(ReserveSeatHandler));
  mediatrJs.registerHandler(GetAvailableSeats, container.resolve(GetAvailableSeatsHandler));
};
