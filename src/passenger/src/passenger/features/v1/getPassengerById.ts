import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import {PassengerDto} from '../../dtos/passengerDto';
import { Controller, Get, Query, Route, Security, SuccessResponse } from 'tsoa';
import Joi from 'joi';
import NotFoundException from 'building-blocks/types/exception/notFoundException';
import {PassengerRepository} from "../../../data/repositories/passengerRepository";
import {Passenger} from "../../entities/passenger";
import mapper from "../../mappings";

export class GetPassengerById implements IRequest<PassengerDto> {
    id: number;

    constructor(request: Partial<GetPassengerById> = {}) {
        Object.assign(this, request);
    }
}

const getPassengerByIdValidations = {
    params: Joi.object().keys({
        id: Joi.number().integer().required()
    })
};

@Route('/passenger')
export class GetPassengerByIdController extends Controller {
    @Get('v1/get-by-id')
    @Security('jwt')
    @SuccessResponse('200', 'OK')
    public async getPassengerById(@Query() id: number): Promise<PassengerDto> {
        const result = await mediatrJs.send<PassengerDto>(
            new GetPassengerById({
                id: id
            })
        );

        if (!result) {
            throw new NotFoundException('Passenger not found');
        }
        return result;
    }
}

export class GetPassengerByIdHandler implements IHandler<GetPassengerById, PassengerDto> {
    async handle(request: GetPassengerById): Promise<PassengerDto> {
        await getPassengerByIdValidations.params.validateAsync(request);

        const passengerRepository = new PassengerRepository();

        const passengerEntity = await passengerRepository.findPassengerById(request.id);

        const result = mapper.map<Passenger, PassengerDto>(passengerEntity, new PassengerDto());

        return result;
    }
}
