import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import { Controller } from 'tsoa';
import { SeatDto } from '../../../dtos/seatDto';
import { ISeatRepository } from '../../../../data/repositories/seatRepository';
export declare class GetAvailableSeats implements IRequest<SeatDto[]> {
    flightId: number;
    constructor(request?: Partial<GetAvailableSeats>);
}
export declare class GetAvailableSeatsController extends Controller {
    getAvailableSeats(flightId: number): Promise<SeatDto[]>;
}
export declare class GetAvailableSeatsHandler implements IHandler<GetAvailableSeats, SeatDto[]> {
    private seatRepository;
    constructor(seatRepository: ISeatRepository);
    handle(request: GetAvailableSeats): Promise<SeatDto[]>;
}
