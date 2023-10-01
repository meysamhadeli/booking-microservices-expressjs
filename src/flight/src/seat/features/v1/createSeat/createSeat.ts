import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { Body, Controller, Post, Route, Security, SuccessResponse } from 'tsoa';
import httpStatus from 'http-status';
import Joi from 'joi';
import { inject, injectable } from 'tsyringe';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
import mapper from '../../../../aircraft/mappings';
import { SeatDto } from '../../../dtos/seatDto';
import { SeatClass } from '../../../enums/seatClass';
import { SeatType } from '../../../enums/seatType';
import { ISeatRepository } from '../../../../data/repositories/seatRepository';
import { IFlightRepository } from '../../../../data/repositories/flightRepository';
import NotFoundException from 'building-blocks/types/exception/notFoundException';
import { Seat } from '../../../entities/seat';

export class CreateSeat implements IRequest<SeatDto> {
  seatNumber: string;
  seatClass: SeatClass;
  seatType: SeatType;
  flightId: number;

  constructor(request: Partial<CreateSeat> = {}) {
    Object.assign(this, request);
  }
}

export class CreateSeatRequestDto {
  seatNumber: string;
  seatClass: SeatClass;
  seatType: SeatType;
  flightId: number;

  constructor(request: Partial<CreateSeatRequestDto> = {}) {
    Object.assign(this, request);
  }
}

const createSeatValidations = Joi.object({
  seatNumber: Joi.string().required(),
  flightId: Joi.number().required(),
  seatClass: Joi.string()
    .required()
    .valid(SeatClass.UNKNOWN, SeatClass.FIRST_CLASS, SeatClass.BUSINESS, SeatClass.ECONOMY),
  seatType: Joi.string()
    .required()
    .valid(SeatType.UNKNOWN, SeatType.AISLE, SeatType.MIDDLE, SeatType.WINDOW)
});

@Route('/seat')
export class CreateSeatController extends Controller {
  @Post('v1/create')
  @Security('jwt')
  @SuccessResponse('201', 'CREATED')
  public async createSeat(@Body() request: CreateSeatRequestDto): Promise<SeatDto> {
    const result = await mediatrJs.send<SeatDto>(
      new CreateSeat({
        flightId: request.flightId,
        seatNumber: request.seatNumber,
        seatClass: request.seatClass,
        seatType: request.seatType
      })
    );

    this.setStatus(httpStatus.CREATED);
    return result;
  }
}

@injectable()
export class CreateSeatHandler implements IHandler<CreateSeat, SeatDto> {
  constructor(
    @inject('IPublisher') private publisher: IPublisher,
    @inject('ISeatRepository') private seatRepository: ISeatRepository,
    @inject('IFlightRepository') private flightRepository: IFlightRepository
  ) {}

  async handle(request: CreateSeat): Promise<SeatDto> {
    await createSeatValidations.validateAsync(request);

    const existFlight = await this.flightRepository.findFlightById(request.flightId);

    if (existFlight == null) {
      throw new NotFoundException('Flight not found!');
    }

    const seatEntity = await this.seatRepository.createSeat(
      new Seat({
        flightId: request.flightId,
        seatNumber: request.seatNumber,
        seatClass: request.seatClass,
        seatType: request.seatType,
        isReserved: false
      })
    );

    const result = mapper.map<Seat, SeatDto>(seatEntity, new SeatDto());

    return result;
  }
}
