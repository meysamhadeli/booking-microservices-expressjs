import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import { Controller } from 'tsoa';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
import { AirportDto } from '../../../dtos/airportDto';
import { IAirportRepository } from '../../../../data/repositories/airportRepository';
export declare class CreateAirport implements IRequest<AirportDto> {
    code: string;
    name: string;
    address: string;
    constructor(request?: Partial<CreateAirport>);
}
export declare class CreateAirportRequestDto {
    code: string;
    name: string;
    address: string;
    constructor(request?: Partial<CreateAirportRequestDto>);
}
export declare class CreateAirportController extends Controller {
    createAirport(request: CreateAirportRequestDto): Promise<AirportDto>;
}
export declare class CreateAirportHandler implements IHandler<CreateAirport, AirportDto> {
    private publisher;
    private airportRepository;
    constructor(publisher: IPublisher, airportRepository: IAirportRepository);
    handle(request: CreateAirport): Promise<AirportDto>;
}
