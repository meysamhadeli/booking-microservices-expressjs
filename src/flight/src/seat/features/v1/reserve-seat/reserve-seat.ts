import { Body, Controller, Post, Route, Security, SuccessResponse } from 'tsoa';
import httpStatus from 'http-status';
import Joi from 'joi';
import { inject, injectable } from 'tsyringe';
import NotFoundException from 'building-blocks/types/exception/not-found.exception';
import { SeatReserved } from 'building-blocks/contracts/flight.contract';
import { SeatDto } from '../../../dtos/seat.dto';
import { Seat } from '../../../entities/seat.entity';
import { IFlightRepository } from '../../../../data/repositories/flight.repository';
import { ISeatRepository } from '../../../../data/repositories/seat.repository';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq-publisher';
import mapper from '../../../mappings';
import { IRequest, IRequestHandler, mediatrJs } from 'building-blocks/mediatr-js/mediatr-js';

export class ReserveSeat implements IRequest<SeatDto> {
  seatNumber: string;
  flightId: number;

  constructor(request: Partial<ReserveSeat> = {}) {
    Object.assign(this, request);
  }
}

export class ReserveSeatRequestDto {
  seatNumber: string;
  flightId: number;

  constructor(request: Partial<ReserveSeatRequestDto> = {}) {
    Object.assign(this, request);
  }
}

const reserveSeatValidations = Joi.object({
  seatNumber: Joi.string().required(),
  flightId: Joi.number().required()
});

@Route('/api/v1/seat')
export class ReserveSeatController extends Controller {
  @Post('reserve')
  @Security('jwt')
  @SuccessResponse('204', 'NO_CONTENT')
  public async reserveSeat(@Body() request: ReserveSeatRequestDto): Promise<Seat> {
    const result = await mediatrJs.send<SeatDto>(
      new ReserveSeat({
        flightId: request.flightId,
        seatNumber: request.seatNumber
      })
    );

    this.setStatus(httpStatus.NO_CONTENT);

    return result;
  }
}

@injectable()
export class ReserveSeatHandler implements IRequestHandler<ReserveSeat, SeatDto> {
  constructor(
    @inject('IPublisher') private publisher: IPublisher,
    @inject('ISeatRepository') private seatRepository: ISeatRepository,
    @inject('IFlightRepository') private flightRepository: IFlightRepository
  ) {}

  async handle(request: ReserveSeat): Promise<SeatDto> {
    await reserveSeatValidations.validateAsync(request);

    const existFlight = await this.flightRepository.findFlightById(request.flightId);

    if (existFlight == null) {
      throw new NotFoundException('Flight not found!');
    }

    const seat = await this.seatRepository.getAvailableSeat(request.flightId, request.seatNumber);

    if (seat == null) {
      throw new NotFoundException('Seat not found!');
    }

    const seatEntity = await this.seatRepository.reserveSeat(
      new Seat({
        id: seat.id,
        flightId: request.flightId,
        seatNumber: request.seatNumber,
        seatClass: seat.seatClass,
        seatType: seat.seatType,
        isReserved: true,
        createdAt: seat.createdAt,
        updatedAt: new Date()
      })
    );

    await this.publisher.publishMessage(new SeatReserved(seatEntity));

    const result = mapper.map<Seat, SeatDto>(seatEntity, new SeatDto());

    return result;
  }
}
