import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import mapper from '../../../mapping';
import { Body, Controller, Put, Query, Route, Security, SuccessResponse } from 'tsoa';
import { password } from 'building-blocks/utils/validation';
import NotFoundException from 'building-blocks/types/exception/not-found.exception';
import { encryptPassword } from 'building-blocks/utils/encryption';
import httpStatus from 'http-status';
import Joi from 'joi';
import { inject, injectable } from 'tsyringe';
import { UserUpdated } from 'building-blocks/contracts/identity.contract';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq';
import {UserDto} from "../../../dtos/user.dto";
import {Role} from "../../../enums/role.enum";
import {IUserRepository} from "../../../../data/repositories/user.repository";
import {User} from "../../../entities/user.entity";

export class UpdateUser implements IRequest<UserDto> {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Role;
  passportNumber: string;
  constructor(request: Partial<UpdateUser> = {}) {
    Object.assign(this, request);
  }
}

export class UpdateUserRequestDto {
  email: string;
  password: string;
  name: string;
  role: Role;
  passportNumber: string;

  constructor(request: Partial<UpdateUserRequestDto> = {}) {
    Object.assign(this, request);
  }
}

const updateUserValidations = Joi.object({
  id: Joi.number().required(),
  email: Joi.string().required().email(),
  password: Joi.string().required().custom(password),
  name: Joi.string().required(),
  passportNumber: Joi.string().required(),
  role: Joi.string().required().valid(Role.USER, Role.ADMIN)
});

@Route('/api/v1/user')
export class UpdateUserController extends Controller {
  @Put('update')
  @Security('jwt')
  @SuccessResponse('204', 'NO_CONTENT')
  public async updateUser(
    @Query() id: number,
    @Body() request: UpdateUserRequestDto
  ): Promise<void> {
    await mediatrJs.send(
      new UpdateUser({
        id: id,
        email: request.email,
        password: request.password,
        name: request.name,
        role: request.role,
        passportNumber: request.passportNumber
      })
    );

    this.setStatus(httpStatus.NO_CONTENT);
  }
}

@injectable()
export class UpdateUserHandler implements IHandler<UpdateUser, any> {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IPublisher') private publisher: IPublisher
  ) {}

  async handle(command: UpdateUser): Promise<any> {
    await updateUserValidations.validateAsync(command);

    const existUser = await this.userRepository.findUserById(command.id);

    if (!existUser) {
      throw new NotFoundException('User not found');
    }

    const updateUserEntity =  new User({
      id: command.id,
      email: command.email,
      name: command.name,
      password: await encryptPassword(command.password),
      role: command.role,
      passportNumber: command.passportNumber,
      isEmailVerified: existUser.isEmailVerified,
      tokens: existUser.tokens,
      createdAt: existUser.createdAt,
      updatedAt: new Date()
    });

    await this.userRepository.updateUser(updateUserEntity);

    await this.publisher.publishMessage(new UserUpdated(updateUserEntity));
  }
}
