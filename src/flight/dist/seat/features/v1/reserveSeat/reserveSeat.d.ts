import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import { Controller } from 'tsoa';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
import { SeatDto } from '../../../dtos/seatDto';
import { ISeatRepository } from '../../../../data/repositories/seatRepository';
import { IFlightRepository } from '../../../../data/repositories/flightRepository';
import { Seat } from '../../../entities/seat';
export declare class ReserveSeat implements IRequest<SeatDto> {
    seatNumber: string;
    flightId: number;
    constructor(request?: Partial<ReserveSeat>);
}
export declare class ReserveSeatRequestDto {
    seatNumber: string;
    flightId: number;
    constructor(request?: Partial<ReserveSeatRequestDto>);
}
export declare class ReserveSeatController extends Controller {
    reserveSeat(request: ReserveSeatRequestDto): Promise<Seat>;
}
export declare class ReserveSeatHandler implements IHandler<ReserveSeat, SeatDto> {
    private publisher;
    private seatRepository;
    private flightRepository;
    constructor(publisher: IPublisher, seatRepository: ISeatRepository, flightRepository: IFlightRepository);
    handle(request: ReserveSeat): Promise<SeatDto>;
}
