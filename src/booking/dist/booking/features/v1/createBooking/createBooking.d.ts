import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import { Controller } from 'tsoa';
import { BookingDto } from '../../../dtos/bookingDto';
import { IBookingRepository } from '../../../../data/repositories/bookingRepository';
import { IFlightClientService } from '../../../httpClient/services/flight/flightClientService';
import { IPassengerClientService } from '../../../httpClient/services/passenger/passengerClientService';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
export declare class CreateBooking implements IRequest<BookingDto> {
    passengerId: number;
    flightId: number;
    description: string;
    constructor(request?: Partial<CreateBooking>);
}
export declare class CreateBookingRequestDto {
    passengerId: number;
    flightId: number;
    description: string;
    constructor(request?: Partial<CreateBooking>);
}
export declare class CreateBookingController extends Controller {
    createBooking(request: CreateBookingRequestDto): Promise<BookingDto>;
}
export declare class CreateBookingHandler implements IHandler<CreateBooking, BookingDto> {
    private bookingRepository;
    private flightClientService;
    private passengerClientService;
    private publisher;
    constructor(bookingRepository: IBookingRepository, flightClientService: IFlightClientService, passengerClientService: IPassengerClientService, publisher: IPublisher);
    handle(request: CreateBooking): Promise<BookingDto>;
}
