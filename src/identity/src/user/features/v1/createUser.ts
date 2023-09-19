import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { Role } from '../../enums/role';
import { dataSource } from '../../../data/dataSource';
import { User } from '../../entities/user';
import { UserDto } from '../../dtos/userDto';
import mapper from '../../mapping';
import { Body, Controller, Post, Route, Security, SuccessResponse } from 'tsoa';
import httpStatus from 'http-status';
import Joi from 'joi';
import { password } from 'building-blocks/utils/validation';
import ConflictException from 'building-blocks/types/exception/conflictException';
import { encryptPassword } from 'building-blocks/utils/encryption';
import { UserRepository } from '../../../data/repositories/userRepository';
import { Publisher } from 'building-blocks/rabbitmq/publisher';
import { UserCreated } from 'building-blocks/contracts/identityContract';

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

export interface CreateUserRequestDto {
  email: string;
  password: string;
  name: string;
  role: Role;
  passportNumber: string;
}

const createUserValidations = Joi.object({
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  name: Joi.string().required(),
  passportNumber: Joi.string().required(),
  role: Joi.string().required().valid(Role.USER, Role.ADMIN)
});

@Route('/user')
export class CreateUserController extends Controller {
  @Post('v1/create')
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

export class CreateUserHandler implements IHandler<CreateUser, UserDto> {
  async handle(request: CreateUser): Promise<UserDto> {
    await createUserValidations.validateAsync(request);

    const userRepository = new UserRepository();

    const existUser = await userRepository.findUserByEmail(request.email);

    if (existUser) {
      throw new ConflictException('Email already taken');
    }

    const userEntity = await userRepository.createUser(
      new User(
        request.email,
        request.name,
        await encryptPassword(request.password),
        false,
        request.role,
        request.passportNumber
      )
    );

    const publisher = new Publisher();
    await publisher.publishMessage(
      new UserCreated(userEntity.id, userEntity.name, userEntity.passportNumber)
    );

    const result = mapper.map<User, UserDto>(userEntity, new UserDto());

    return result;
  }
}
