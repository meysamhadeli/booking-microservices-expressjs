import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import { Controller } from 'tsoa';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
import { FlightStatus } from '../../../enums/flightStatus';
import { FlightDto } from '../../../dtos/flightDto';
import { IFlightRepository } from '../../../../data/repositories/flightRepository';
export declare class CreateFlight implements IRequest<CreateFlight> {
    flightNumber: string;
    price: number;
    flightStatus: FlightStatus;
    flightDate: Date;
    departureDate: Date;
    departureAirportId: number;
    aircraftId: number;
    arriveDate: Date;
    arriveAirportId: number;
    durationMinutes: number;
    constructor(request?: Partial<CreateFlight>);
}
export declare class CreateFlightRequestDto {
    flightNumber: string;
    price: number;
    flightStatus: FlightStatus;
    flightDate: Date;
    departureDate: Date;
    departureAirportId: number;
    aircraftId: number;
    arriveDate: Date;
    arriveAirportId: number;
    durationMinutes: number;
    constructor(request?: Partial<CreateFlightRequestDto>);
}
export declare class CreateFlightController extends Controller {
    createFlight(request: CreateFlightRequestDto): Promise<FlightDto>;
}
export declare class CreateFlightHandler implements IHandler<CreateFlight, FlightDto> {
    private publisher;
    private flightRepository;
    constructor(publisher: IPublisher, flightRepository: IFlightRepository);
    handle(request: CreateFlight): Promise<FlightDto>;
}
