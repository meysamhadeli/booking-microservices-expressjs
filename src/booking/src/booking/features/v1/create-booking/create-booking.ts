import { Body, Controller, Post, Route, Security, SuccessResponse } from 'tsoa';
import httpStatus from 'http-status';
import Joi from 'joi';
import { inject, injectable } from 'tsyringe';
import notFoundException from 'building-blocks/types/exception/not-found.exception';
import { BookingCreated } from 'building-blocks/contracts/booking.contract';
import { BookingDto } from '../../../dtos/booking.dto';
import { IBookingRepository } from '../../../../data/repositories/booking.repository';
import { Booking } from '../../../entities/booking.entity';
import { IFlightClient } from '../../../http-client/services/flight/flight.client';
import { IPassengerClient } from '../../../http-client/services/passenger/passenger.client';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq-publisher';
import mapper from '../../../mappings';
import { IRequest, IRequestHandler, mediatrJs } from 'building-blocks/mediatr-js/mediatr-js';

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

@Route('/api/v1/booking')
export class CreateBookingController extends Controller {
  @Post('create')
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
export class CreateBookingHandler implements IRequestHandler<CreateBooking, BookingDto> {
  constructor(
    @inject('IBookingRepository') private bookingRepository: IBookingRepository,
    @inject('IFlightClient') private flightClientService: IFlightClient,
    @inject('IPassengerClient') private passengerClientService: IPassengerClient,
    @inject('IPublisher') private publisher: IPublisher
  ) {}

  async handle(request: CreateBooking): Promise<BookingDto> {
    await createBookingValidations.validateAsync(request);

    const flightDto = await this.flightClientService.getFlightById(request.flightId);

    const passengerDto = await this.passengerClientService.getPassengerById(request.passengerId);

    const avalibaleSeats = await this.flightClientService.getAvalibaleSeats(request.flightId);

    if (avalibaleSeats.length == 0) {
      throw new notFoundException('No seat available!');
    }

    await this.flightClientService.reserveSeat({
      seatNumber: avalibaleSeats[0]?.seatNumber,
      flightId: flightDto?.id
    });

    const bookingEntity = await this.bookingRepository.createBooking(
      new Booking({
        seatNumber: avalibaleSeats[0]?.seatNumber,
        flightNumber: flightDto?.flightNumber,
        price: flightDto?.price,
        passengerName: passengerDto?.name,
        description: request?.description,
        flightDate: flightDto?.flightDate,
        aircraftId: flightDto?.aircraftId,
        departureAirportId: flightDto?.departureAirportId,
        arriveAirportId: flightDto?.arriveAirportId
      })
    );

    await this.publisher.publishMessage(new BookingCreated(bookingEntity));

    const result = mapper.map<Booking, BookingDto>(bookingEntity, new BookingDto());

    return result;
  }
}
