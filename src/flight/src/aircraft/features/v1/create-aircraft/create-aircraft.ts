import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { Body, Controller, Post, Route, Security, SuccessResponse } from 'tsoa';
import httpStatus from 'http-status';
import Joi from 'joi';
import ConflictException from 'building-blocks/types/exception/conflict.exception';
import { inject, injectable } from 'tsyringe';
import mapper from '../../../mappings';
import { AircraftCreated } from 'building-blocks/contracts/flight.contract';
import {AircraftDto} from "../../../dtos/aircraft.dto";
import {IAircraftRepository} from "../../../../data/repositories/aircraft.repository";
import {Aircraft} from "../../../entities/aircraft.entity";
import {IPublisher} from "building-blocks/rabbitmq/rabbitmq-publisher";

export class CreateAircraft implements IRequest<AircraftDto> {
  model: string;
  name: string;
  manufacturingYear: number;

  constructor(request: Partial<CreateAircraft> = {}) {
    Object.assign(this, request);
  }
}

export class CreateAircraftRequestDto {
  model: string;
  name: string;
  manufacturingYear: number;

  constructor(request: Partial<CreateAircraftRequestDto> = {}) {
    Object.assign(this, request);
  }
}

const createAircraftValidations = Joi.object({
  model: Joi.string().required(),
  manufacturingYear: Joi.number().required(),
  name: Joi.string().required()
});

@Route('/api/v1/aircraft')
export class CreateAircraftController extends Controller {
  @Post('create')
  @Security('jwt')
  @SuccessResponse('201', 'CREATED')
  public async createAircraft(@Body() request: CreateAircraftRequestDto): Promise<AircraftDto> {
    const result = await mediatrJs.send<AircraftDto>(
      new CreateAircraft({
        model: request.model,
        name: request.name,
        manufacturingYear: request.manufacturingYear
      })
    );

    this.setStatus(httpStatus.CREATED);
    return result;
  }
}

@injectable()
export class CreateAircraftHandler implements IHandler<CreateAircraft, AircraftDto> {
  constructor(
    @inject('IPublisher') private publisher: IPublisher,
    @inject('IAircraftRepository') private aircraftRepository: IAircraftRepository
  ) {}

  async handle(request: CreateAircraft): Promise<AircraftDto> {
    await createAircraftValidations.validateAsync(request);

    const existAircraft = await this.aircraftRepository.findAircraftByName(request.name);

    if (existAircraft) {
      throw new ConflictException('Aircraft already taken');
    }

    const aircraftEntity = await this.aircraftRepository.createAircraft(
      new Aircraft({
        name: request.name,
        manufacturingYear: request.manufacturingYear,
        model: request.model
      })
    );

    await this.publisher.publishMessage(new AircraftCreated(aircraftEntity));

    const result = mapper.map<Aircraft, AircraftDto>(aircraftEntity, new AircraftDto());

    return result;
  }
}
