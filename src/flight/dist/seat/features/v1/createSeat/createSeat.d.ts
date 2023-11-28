import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import { Controller } from 'tsoa';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
import { SeatDto } from '../../../dtos/seatDto';
import { SeatClass } from '../../../enums/seatClass';
import { SeatType } from '../../../enums/seatType';
import { ISeatRepository } from '../../../../data/repositories/seatRepository';
import { IFlightRepository } from '../../../../data/repositories/flightRepository';
export declare class CreateSeat implements IRequest<SeatDto> {
    seatNumber: string;
    seatClass: SeatClass;
    seatType: SeatType;
    flightId: number;
    constructor(request?: Partial<CreateSeat>);
}
export declare class CreateSeatRequestDto {
    seatNumber: string;
    seatClass: SeatClass;
    seatType: SeatType;
    flightId: number;
    constructor(request?: Partial<CreateSeatRequestDto>);
}
export declare class CreateSeatController extends Controller {
    createSeat(request: CreateSeatRequestDto): Promise<SeatDto>;
}
export declare class CreateSeatHandler implements IHandler<CreateSeat, SeatDto> {
    private publisher;
    private seatRepository;
    private flightRepository;
    constructor(publisher: IPublisher, seatRepository: ISeatRepository, flightRepository: IFlightRepository);
    handle(request: CreateSeat): Promise<SeatDto>;
}
