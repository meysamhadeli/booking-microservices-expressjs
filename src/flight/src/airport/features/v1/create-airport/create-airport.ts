import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { Body, Controller, Post, Route, Security, SuccessResponse } from 'tsoa';
import httpStatus from 'http-status';
import Joi from 'joi';
import ConflictException from 'building-blocks/types/exception/conflict.exception';
import { inject, injectable } from 'tsyringe';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
import mapper from '../../../../aircraft/mappings';
import { AirportCreated } from 'building-blocks/contracts/flight.contract';
import {AirportDto} from "../../../dtos/airport.dto";
import {IAirportRepository} from "../../../../data/repositories/airport.repository";
import {Airport} from "../../../entities/airport.entity";

export class CreateAirport implements IRequest<AirportDto> {
  code: string;
  name: string;
  address: string;

  constructor(request: Partial<CreateAirport> = {}) {
    Object.assign(this, request);
  }
}

export class CreateAirportRequestDto {
  code: string;
  name: string;
  address: string;

  constructor(request: Partial<CreateAirportRequestDto> = {}) {
    Object.assign(this, request);
  }
}

const createAirportValidations = Joi.object({
  code: Joi.string().required(),
  address: Joi.string().required(),
  name: Joi.string().required()
});

@Route('/airport')
export class CreateAirportController extends Controller {
  @Post('v1/create')
  @Security('jwt')
  @SuccessResponse('201', 'CREATED')
  public async createAirport(@Body() request: CreateAirportRequestDto): Promise<AirportDto> {
    const result = await mediatrJs.send<AirportDto>(
      new CreateAirport({
        code: request.code,
        name: request.name,
        address: request.address
      })
    );

    this.setStatus(httpStatus.CREATED);
    return result;
  }
}

@injectable()
export class CreateAirportHandler implements IHandler<CreateAirport, AirportDto> {
  constructor(
    @inject('IPublisher') private publisher: IPublisher,
    @inject('IAirportRepository') private airportRepository: IAirportRepository
  ) {}

  async handle(request: CreateAirport): Promise<AirportDto> {
    await createAirportValidations.validateAsync(request);

    const existAirport = await this.airportRepository.findAirportByName(request.name);

    if (existAirport) {
      throw new ConflictException('Airport already taken');
    }

    const airportEntity = await this.airportRepository.createAirport(
      new Airport({
        name: request.name,
        code: request.code,
        address: request.address
      })
    );

    await this.publisher.publishMessage(new AirportCreated(airportEntity));

    const result = mapper.map<Airport, AirportDto>(airportEntity, new AirportDto());

    return result;
  }
}
