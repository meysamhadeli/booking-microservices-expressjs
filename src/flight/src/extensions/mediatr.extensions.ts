import { container } from 'tsyringe';
import {
  CreateAircraft,
  CreateAircraftHandler
} from '../aircraft/features/v1/create-aircraft/create-aircraft';
import {
  CreateAirport,
  CreateAirportHandler
} from '../airport/features/v1/create-airport/create-airport';
import {
  CreateFlight,
  CreateFlightHandler
} from '../flight/features/v1/create-flight/create-flight';
import {
  GetFlightById,
  GetFlightByIdHandler
} from '../flight/features/v1/get-flight-by-id/get-flight-by-id';
import { CreateSeat, CreateSeatHandler } from '../seat/features/v1/create-seat/create-seat';
import { ReserveSeat, ReserveSeatHandler } from '../seat/features/v1/reserve-seat/reserve-seat';
import {
  GetAvailableSeats,
  GetAvailableSeatsHandler
} from '../seat/features/v1/get-available-seats/get-available-seats';
import { mediatrJs } from 'building-blocks/mediatr-js/mediatr-js';

export const registerMediatrHandlers = () => {
  mediatrJs.registerRequestHandler(new CreateAircraft(), container.resolve(CreateAircraftHandler));
  mediatrJs.registerRequestHandler(new CreateAirport(), container.resolve(CreateAirportHandler));
  mediatrJs.registerRequestHandler(new CreateFlight(), container.resolve(CreateFlightHandler));
  mediatrJs.registerRequestHandler(new GetFlightById(), container.resolve(GetFlightByIdHandler));
  mediatrJs.registerRequestHandler(new CreateSeat(), container.resolve(CreateSeatHandler));
  mediatrJs.registerRequestHandler(new ReserveSeat(), container.resolve(ReserveSeatHandler));
  mediatrJs.registerRequestHandler(
    new GetAvailableSeats(),
    container.resolve(GetAvailableSeatsHandler)
  );
};
