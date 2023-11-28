import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import { Controller } from 'tsoa';
import { FlightDto } from '../../../dtos/flightDto';
import { IFlightRepository } from '../../../../data/repositories/flightRepository';
export declare class GetFlightById implements IRequest<FlightDto> {
    id: number;
    constructor(request?: Partial<GetFlightById>);
}
export declare class GetUserByIdController extends Controller {
    getFlightById(id: number): Promise<FlightDto>;
}
export declare class GetFlightByIdHandler implements IHandler<GetFlightById, FlightDto> {
    private flightRepository;
    constructor(flightRepository: IFlightRepository);
    handle(request: GetFlightById): Promise<FlightDto>;
}
