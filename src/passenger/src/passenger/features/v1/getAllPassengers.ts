import {IHandler, IRequest, mediatrJs} from 'building-blocks/mediatr-js/mediatr.js';
import {PassengerDto} from '../../dtos/passengerDto';
import {Controller, Get, Route, Security, SuccessResponse} from 'tsoa';
import {PassengerRepository} from "../../../data/repositories/passengerRepository";
import {Passenger} from "../../entities/passenger";
import mapper from "../../mappings";

export class GetAllPassenger implements IRequest<PassengerDto[]> {
    constructor(request: Partial<GetAllPassenger> = {}) {
        Object.assign(this, request);
    }
}

@Route('/passenger')
export class GetAllPassengerController extends Controller {
    @Get('v1/get-all')
    @Security('jwt')
    @SuccessResponse('200', 'OK')
    public async getPassengerById(): Promise<PassengerDto[]> {
        const result = await mediatrJs.send<PassengerDto[]>(
            new GetAllPassenger()
        );

        return result;
    }
}

export class GetAllPassengerHandler implements IHandler<GetAllPassenger, PassengerDto[]> {
    async handle(request: GetAllPassenger): Promise<PassengerDto[]> {

        const passengerRepository = new PassengerRepository();

        const passengerEntity = await passengerRepository.getAllPassenger();

        if(passengerEntity?.length == 0)
            return null;

        const result = passengerEntity.map(passenger => mapper.map<Passenger, PassengerDto>(passenger, new PassengerDto()));

        return result;
    }
}
