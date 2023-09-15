import {IHandler, IRequest, mediatrJs} from "../../mediatr.js";
import {Role} from "../enums/role";
import {dataSource} from "../../data/dataSource";
import {User} from "../entities/user";
import {encryptPassword} from "../../utils/encryption";
import {UserDto} from "../dtos/userDto";
import mapper from "../mapping";
import {Body, Controller, Put, Query, Route, Security, SuccessResponse} from 'tsoa';
import httpStatus from 'http-status';
import Joi from "joi";
import NotFoundError from "../../types/notFoundError";
import {password} from "../../utils/validation";

export class UpdateUser implements IRequest<UserDto> {
  id: number;
  email: string;
  password: string;
  name: string;
  role: Role;

  constructor(request: Partial<UpdateUser> = {}) {
    Object.assign(this, request);
  }
}

export interface UpdateUserRequestDto {
  email: string;
  password: string;
  name: string;
  role: Role;
}

const updateUserValidations =
  Joi.object({
    email: Joi.string().required().email(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
    role: Joi.string().required().valid(Role.USER, Role.ADMIN)
  });

@Route('/identity')
export class UpdateUserController extends Controller {
  @Put('v1/update')
  @Security("jwt")
  @SuccessResponse('204', 'NO_CONTENT')
  public async updateUser(
    @Query() id: number,
    @Body() request: UpdateUserRequestDto
  ): Promise<UserDto> {

    const result = await mediatrJs.send<UserDto>(new UpdateUser({
      id: id,
      email: request.email,
      password: request.password,
      name: request.name,
      role: request.role
    }));

    this.setStatus(httpStatus.NO_CONTENT);
    return result;
  }
}

export class UpdateUserHandler implements IHandler<UpdateUser, UserDto> {
  async handle(request: UpdateUser): Promise<UserDto> {
    await updateUserValidations.validateAsync(request);

    const userRepository = dataSource.getRepository(User);

    const existUser = await userRepository.findOneBy({
      id: request.id
    });

    if (!existUser) {
      throw new NotFoundError('User not found');
    }

    const updatedUser = {
      email: request.email,
      name: request.name,
      role: request.role,
      password: await encryptPassword(request.password),
      isEmailVerified: false,
      updatedAt: new Date()
    };

    const userEntity = await userRepository.save(updatedUser);

    const result = mapper.map<User, UserDto>(userEntity, new UserDto());

    return result;
  }
}

const updateUserHandler = new UpdateUserHandler();
mediatrJs.registerHandler(UpdateUser, updateUserHandler);
