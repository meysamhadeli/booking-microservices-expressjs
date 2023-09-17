import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { dataSource } from '../../data/dataSource';
import { User } from '../entities/user';
import { UserDto } from '../dtos/userDto';
import { Controller, Get, Query, Route, Security, SuccessResponse } from 'tsoa';
import Joi from 'joi';
import mapper from '../mapping';
import NotFoundException from 'building-blocks/types/exception/notFoundException';

export class GetUserById implements IRequest<UserDto> {
  id: number;

  constructor(request: Partial<GetUserById> = {}) {
    Object.assign(this, request);
  }
}

const getUserByIdValidations = {
  params: Joi.object().keys({
    id: Joi.number().integer().required()
  })
};

@Route('/identity')
export class GetUserByIdController extends Controller {
  @Get('v1/get-by-id')
  @Security('jwt')
  @SuccessResponse('200', 'OK')
  public async getUserById(@Query() id: number): Promise<UserDto> {
    const result = await mediatrJs.send<UserDto>(
      new GetUserById({
        id: id
      })
    );

    if (!result) {
      throw new NotFoundException('User not found');
    }
    return result;
  }
}

export class GetUserByIdHandler implements IHandler<GetUserById, UserDto> {
  async handle(request: GetUserById): Promise<UserDto> {
    await getUserByIdValidations.params.validateAsync(request);

    const userRepository = dataSource.getRepository(User);

    const usersEntity = await userRepository.findOneBy({
      id: request.id
    });

    const result = mapper.map<User, UserDto>(usersEntity, new UserDto());

    return result;
  }
}

mediatrJs.registerHandler(GetUserById, new GetUserByIdHandler());
