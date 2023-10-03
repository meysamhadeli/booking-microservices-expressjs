import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { Body, Controller, Post, Route, Security, SuccessResponse } from 'tsoa';
import httpStatus from 'http-status';
import Joi from 'joi';
import ConflictException from 'building-blocks/types/exception/conflictException';
import { inject, injectable } from 'tsyringe';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
import { AircraftDto } from '../../../dtos/aircraftDto';
import { IAircraftRepository } from '../../../../data/repositories/aircraftRepository';
import { Aircraft } from '../../../entities/aircraft';
import mapper from '../../../mappings';
import { BookingDto } from '../../../dtos/bookingDto';
import { IBookingRepository } from '../../../../data/repositories/bookingRepository';
import { Booking } from '../../../entities/booking';

export class CreateBooking implements IRequest<BookingDto> {
  passengerId: number;
  flightId: number;
  description: string;

  constructor(request: Partial<CreateBooking> = {}) {
    Object.assign(this, request);
  }
}

export class CreateBookingRequestDto {
  passengerId: number;
  flightId: number;
  description: string;

  constructor(request: Partial<CreateBooking> = {}) {
    Object.assign(this, request);
  }
}

const createBookingValidations = Joi.object({
  passengerId: Joi.number().required(),
  flightId: Joi.number().required(),
  description: Joi.string().required()
});

@Route('/booking')
export class CreateBookingController extends Controller {
  @Post('v1/create')
  @Security('jwt')
  @SuccessResponse('201', 'CREATED')
  public async createBooking(@Body() request: CreateBookingRequestDto): Promise<BookingDto> {
    const result = await mediatrJs.send<BookingDto>(
      new CreateBooking({
        flightId: request.flightId,
        passengerId: request.passengerId,
        description: request.description
      })
    );

    this.setStatus(httpStatus.CREATED);
    return result;
  }
}

@injectable()
export class CreateBookingHandler implements IHandler<CreateBooking, BookingDto> {
  constructor(
    @inject('IBookingRepository') private bookingRepository: IBookingRepository
  ) {}

  async handle(request: CreateBooking): Promise<BookingDto> {
    await createBookingValidations.validateAsync(request);

    const bookingEntity = await this.bookingRepository.createBooking(null);


    const result = mapper.map<Booking, BookingDto>(bookingEntity, new BookingDto());

    return result;
  }
}
