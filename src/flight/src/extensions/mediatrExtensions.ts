import { container } from 'tsyringe';
import { mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { CreateFlight, CreateFlightHandler } from '../flight/features/v1/createFlight/createFlight';
import { GetFlightByNumber, GetFlightByNumberHandler } from '../flight/features/v1/getFlightByNumber/getFlightByNumber';
import { CreateAircraft, CreateAircraftHandler } from '../aircraft/features/v1/createAircraft/createAircraft';
import { CreateAirport, CreateAirportHandler } from '../airport/features/v1/createAirport/createAirport';


export const registerMediatrHandlers = () => {
  mediatrJs.registerHandler(CreateAircraft, container.resolve(CreateAircraftHandler));
  mediatrJs.registerHandler(CreateAirport, container.resolve(CreateAirportHandler));
  mediatrJs.registerHandler(CreateFlight, container.resolve(CreateFlightHandler));
  mediatrJs.registerHandler(GetFlightByNumber, container.resolve(GetFlightByNumberHandler));
};
