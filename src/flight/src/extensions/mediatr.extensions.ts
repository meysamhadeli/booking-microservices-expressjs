import { container } from 'tsyringe';
import { mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import {CreateAircraft, CreateAircraftHandler} from "../aircraft/features/v1/create-aircraft/create-aircraft";
import {CreateAirport, CreateAirportHandler} from "../airport/features/v1/create-airport/create-airport";
import {CreateFlight, CreateFlightHandler} from "../flight/features/v1/create-flight/create-flight";
import {GetFlightById, GetFlightByIdHandler} from "../flight/features/v1/get-flight-by-id/get-flight-by-id";
import {CreateSeat, CreateSeatHandler} from "../seat/features/v1/create-seat/create-seat";
import {ReserveSeat, ReserveSeatHandler} from "../seat/features/v1/reserve-seat/reserve-seat";
import {GetAvailableSeats, GetAvailableSeatsHandler} from "../seat/features/v1/get-available-seats/get-available-seats";

export const registerMediatrHandlers = () => {
  mediatrJs.registerHandler(CreateAircraft, container.resolve(CreateAircraftHandler));
  mediatrJs.registerHandler(CreateAirport, container.resolve(CreateAirportHandler));
  mediatrJs.registerHandler(CreateFlight, container.resolve(CreateFlightHandler));
  mediatrJs.registerHandler(GetFlightById, container.resolve(GetFlightByIdHandler));
  mediatrJs.registerHandler(CreateSeat, container.resolve(CreateSeatHandler));
  mediatrJs.registerHandler(ReserveSeat, container.resolve(ReserveSeatHandler));
  mediatrJs.registerHandler(GetAvailableSeats, container.resolve(GetAvailableSeatsHandler));
};
