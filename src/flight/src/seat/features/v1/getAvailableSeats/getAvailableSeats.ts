import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { Controller, Get, Query, Route, Security, SuccessResponse } from 'tsoa';
import Joi from 'joi';
import { inject, injectable } from 'tsyringe';
import mapper from '../../../mappings';
import { SeatDto } from '../../../dtos/seatDto';
import { ISeatRepository } from '../../../../data/repositories/seatRepository';
import { Seat } from '../../../entities/seat';

export class GetAvailableSeats implements IRequest<SeatDto[]> {
  flightId: number;

  constructor(request: Partial<GetAvailableSeats> = {}) {
    Object.assign(this, request);
  }
}

const getAvailableSeatsValidations = {
  params: Joi.object().keys({
    flightId: Joi.number().required()
  })
};

@Route('/seat')
export class GetAvailableSeatsController extends Controller {
  @Get('v1/get-available-seats')
  @Security('jwt')
  @SuccessResponse('200', 'OK')
  public async getAvailableSeats(@Query() flightId: number): Promise<SeatDto[]> {
    const result = await mediatrJs.send<SeatDto[]>(
      new GetAvailableSeats({
        flightId: flightId
      })
    );

    return result;
  }
}

@injectable()
export class GetAvailableSeatsHandler implements IHandler<GetAvailableSeats, SeatDto[]> {
  constructor(@inject('ISeatRepository') private seatRepository: ISeatRepository) {}
  async handle(request: GetAvailableSeats): Promise<SeatDto[]> {
    await getAvailableSeatsValidations.params.validateAsync(request);

    const seatsEntity = await this.seatRepository.getSeatsByFlightId(request.flightId);

    const result = seatsEntity.map((seat) => mapper.map<Seat, SeatDto>(seat, new SeatDto()));

    return result;
  }
}
