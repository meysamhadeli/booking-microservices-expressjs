import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import { PassengerDto } from '../../../dtos/passengerDto';
import { Controller } from 'tsoa';
import { IPassengerRepository } from '../../../../data/repositories/passengerRepository';
import { PagedResult } from 'building-blocks/types/pagination/pagedResult';
export declare class GetPassengers implements IRequest<PagedResult<PassengerDto[]>> {
    page: number;
    pageSize: number;
    orderBy: string;
    order: 'ASC' | 'DESC';
    searchTerm?: string;
    constructor(request?: Partial<GetPassengers>);
}
export declare class GetPassengersController extends Controller {
    getPassengers(pageSize?: number, page?: number, order?: 'ASC' | 'DESC', orderBy?: string, searchTerm?: string): Promise<PassengerDto[]>;
}
export declare class GetPassengersHandler implements IHandler<GetPassengers, PagedResult<PassengerDto[]>> {
    private passengerRepository;
    constructor(passengerRepository: IPassengerRepository);
    handle(request: GetPassengers): Promise<PagedResult<PassengerDto[]>>;
}
