import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import mapper from '../../../mapping';
import { Body, Controller, Post, Route, Security, SuccessResponse } from 'tsoa';
import httpStatus from 'http-status';
import Joi from 'joi';
import { password } from 'building-blocks/utils/validation';
import ConflictException from 'building-blocks/types/exception/conflict.exception';
import { encryptPassword } from 'building-blocks/utils/encryption';
import { inject, injectable } from 'tsyringe';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
import { UserCreated } from 'building-blocks/contracts/identity.contract';
import {Role} from "../../../enums/role.enum";
import {UserDto} from "../../../dtos/user.dto";
import {IUserRepository} from "../../../../data/repositories/user.repository";
import {User} from "../../../entities/user.entity";
import {HttpContext} from "building-blocks/context/context";

export class CreateUser implements IRequest<UserDto> {
  email: string;
  password: string;
  name: string;
  role: Role;
  passportNumber: string;

  constructor(request: Partial<CreateUser> = {}) {
    Object.assign(this, request);
  }
}

export class CreateUserRequestDto {
  email: string;
  password: string;
  name: string;
  role: Role;
  passportNumber: string;

  constructor(request: Partial<CreateUserRequestDto> = {}) {
    Object.assign(this, request);
  }
}

const createUserValidations = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  name: Joi.string().required(),
  passportNumber: Joi.string().required(),
  role: Joi.string().required().valid(Role.USER, Role.ADMIN)
});

@Route('/api/v1/user')
export class CreateUserController extends Controller {
  @Post('create')
  @Security('jwt')
  @SuccessResponse('201', 'CREATED')
  public async createUser(@Body() request: CreateUserRequestDto): Promise<UserDto> {

    const result = await mediatrJs.send<UserDto>(
      new CreateUser({
        email: request.email,
        password: request.password,
        name: request.name,
        role: request.role,
        passportNumber: request.passportNumber
      })
    );

    this.setStatus(httpStatus.CREATED);
    return result;
  }
}

@injectable()
export class CreateUserHandler implements IHandler<CreateUser, UserDto> {
  constructor(
    @inject('IPublisher') private publisher: IPublisher,
    @inject('IUserRepository') private userRepository: IUserRepository
  ) {}

  async handle(command: CreateUser): Promise<UserDto> {
    await createUserValidations.validateAsync(command);

    const existUser = await this.userRepository.findUserByEmail(command.email);

    if (existUser) {
      throw new ConflictException('Email already taken');
    }

    const userEntity = await this.userRepository.createUser(
      new User({
        email: command.email,
        name: command.name,
        password: await encryptPassword(command.password),
        role: command.role,
        passportNumber: command.passportNumber,
        isEmailVerified: false
      })
    );

    await this.publisher.publishMessage(new UserCreated(userEntity));

    const result = mapper.map<User, UserDto>(userEntity, new UserDto());

    return result;
  }
}
