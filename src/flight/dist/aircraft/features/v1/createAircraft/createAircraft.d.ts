import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import { Controller } from 'tsoa';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
import { AircraftDto } from '../../../dtos/aircraftDto';
import { IAircraftRepository } from '../../../../data/repositories/aircraftRepository';
export declare class CreateAircraft implements IRequest<AircraftDto> {
    model: string;
    name: string;
    manufacturingYear: number;
    constructor(request?: Partial<CreateAircraft>);
}
export declare class CreateAircraftRequestDto {
    model: string;
    name: string;
    manufacturingYear: number;
    constructor(request?: Partial<CreateAircraftRequestDto>);
}
export declare class CreateAircraftController extends Controller {
    createAircraft(request: CreateAircraftRequestDto): Promise<AircraftDto>;
}
export declare class CreateAircraftHandler implements IHandler<CreateAircraft, AircraftDto> {
    private publisher;
    private aircraftRepository;
    constructor(publisher: IPublisher, aircraftRepository: IAircraftRepository);
    handle(request: CreateAircraft): Promise<AircraftDto>;
}
