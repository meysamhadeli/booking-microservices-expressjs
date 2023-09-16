import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { dataSource } from '../../data/dataSource';
import { User } from '../entities/user';
import { UserDto } from '../dtos/userDto';
import { Controller, Delete, Query, Route, Security, SuccessResponse } from 'tsoa';
import Joi from 'joi';
import mapper from '../mapping';
import httpStatus from 'http-status';
import NotFoundException from "building-blocks/types/exception/notFoundException";

export class DeleteUserById implements IRequest<UserDto> {
  id: number;

  constructor(request: Partial<DeleteUserById> = {}) {
    Object.assign(this, request);
  }
}

const deleteUserValidations = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required()
  })
};

@Route('/identity')
export class DeleteUserByIdController extends Controller {
  @Delete('v1/delete')
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

export class DeleteUserByIdHandler implements IHandler<DeleteUserById, UserDto> {
  async handle(request: DeleteUserById): Promise<UserDto> {
    await deleteUserValidations.params.validateAsync(request);

    const userRepository = dataSource.getRepository(User);

    const user = await userRepository.findOneBy({
      id: request.id
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const usersEntity = await userRepository.remove(user);

    const result = mapper.map<User, UserDto>(usersEntity, new UserDto());

    return result;
  }
}

const deleteUserByIdHandler = new DeleteUserByIdHandler();
mediatrJs.registerHandler(DeleteUserById, deleteUserByIdHandler);
