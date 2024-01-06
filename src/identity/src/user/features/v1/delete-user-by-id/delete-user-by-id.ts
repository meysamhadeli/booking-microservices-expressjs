import { Controller, Delete, Query, Route, Security, SuccessResponse } from 'tsoa';
import Joi from 'joi';
import httpStatus from 'http-status';
import NotFoundException from 'building-blocks/types/exception/not-found.exception';
import { inject, injectable } from 'tsyringe';
import { UserDeleted } from 'building-blocks/contracts/identity.contract';
import { UserDto } from '../../../dtos/user.dto';
import { IUserRepository } from '../../../../data/repositories/user.repository';
import { User } from '../../../entities/user.entity';
import { IPublisher } from 'building-blocks/rabbitmq/rabbitmq-publisher';
import mapper from '../../../mapping';
import { IRequest, IRequestHandler, mediatrJs } from 'building-blocks/mediatr-js/mediatr-js';

export class DeleteUserById implements IRequest<UserDto> {
  id: number;

  constructor(request: Partial<DeleteUserById> = {}) {
    Object.assign(this, request);
  }
}

const deleteUserValidations = {
  params: Joi.object().keys({
    id: Joi.number().integer().required()
  })
};

@Route('/api/v1/user')
export class DeleteUserByIdController extends Controller {
  @Delete('delete')
  @Security('jwt')
  @SuccessResponse('204', 'NO_CONTENT')
  public async deleteUserById(@Query() id: number): Promise<UserDto> {
    const user = await mediatrJs.send<UserDto>(
      new DeleteUserById({
        id: id
      })
    );

    if (!user) {
      throw new NotFoundException('User not found');
    }
    this.setStatus(httpStatus.NO_CONTENT);
    return user;
  }
}

@injectable()
export class DeleteUserByIdHandler implements IRequestHandler<DeleteUserById, UserDto> {
  constructor(
    @inject('IUserRepository') private userRepository: IUserRepository,
    @inject('IPublisher') private publisher: IPublisher
  ) {}
  async handle(request: DeleteUserById): Promise<UserDto> {
    await deleteUserValidations.params.validateAsync(request);

    const user = await this.userRepository.findUserById(request.id);

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const userEntity = await this.userRepository.removeUser(user);

    await this.publisher.publishMessage(new UserDeleted(userEntity));

    const result = mapper.map<User, UserDto>(userEntity, new UserDto());

    return result;
  }
}
