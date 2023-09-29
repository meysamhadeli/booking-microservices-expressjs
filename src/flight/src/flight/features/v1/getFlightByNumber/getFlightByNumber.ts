import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { Controller, Get, Query, Route, Security, SuccessResponse } from 'tsoa';
import Joi from 'joi';
import NotFoundException from 'building-blocks/types/exception/notFoundException';
import { inject, injectable } from 'tsyringe';
import { FlightDto } from '../../../dtos/flightDto';
import { IFlightRepository } from '../../../../data/repositories/flightRepository';
import { Flight } from '../../../entities/flight';
import mapper from '../../../mappings';

export class GetFlightByNumber implements IRequest<FlightDto> {
  flightNumber: string;

  constructor(request: Partial<GetFlightByNumber> = {}) {
    Object.assign(this, request);
  }
}

const getFlightByNumberValidations = {
  params: Joi.object().keys({
    flightNumber: Joi.string().required()
  })
};

@Route('/flight')
export class GetUserByIdController extends Controller {
  @Get('v1/get-by-number')
  @Security('jwt')
  @SuccessResponse('200', 'OK')
  public async getFlightByNumber(@Query() flightNumber: string): Promise<FlightDto> {
    const result = await mediatrJs.send<FlightDto>(
      new GetFlightByNumber({
        flightNumber: flightNumber
      })
    );

    if (!result) {
      throw new NotFoundException('Flight not found');
    }
    return result;
  }
}

@injectable()
export class GetFlightByNumberHandler implements IHandler<GetFlightByNumber, FlightDto> {
  constructor(@inject('IFlightRepository') private flightRepository: IFlightRepository) {}
  async handle(request: GetFlightByNumber): Promise<FlightDto> {
    await getFlightByNumberValidations.params.validateAsync(request);

    const flightEntity = await this.flightRepository.findFlightByNumber(request.flightNumber);

    const result = mapper.map<Flight, FlightDto>(flightEntity, new FlightDto());

    return result;
  }
}
