import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import { PassengerDto } from '../../../dtos/passengerDto';
import { Controller } from 'tsoa';
import { IPassengerRepository } from '../../../../data/repositories/passengerRepository';
export declare class GetPassengerById implements IRequest<PassengerDto> {
    id: number;
    constructor(request?: Partial<GetPassengerById>);
}
export declare class GetPassengerByIdController extends Controller {
    getPassengerById(id: number): Promise<PassengerDto>;
}
export declare class GetPassengerByIdHandler implements IHandler<GetPassengerById, PassengerDto> {
    private passengerRepository;
    constructor(passengerRepository: IPassengerRepository);
    handle(request: GetPassengerById): Promise<PassengerDto>;
}
