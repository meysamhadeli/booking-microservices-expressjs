import {IHandler, IRequest, mediatrJs} from "../../mediatr.js";
import {Role} from "../enums/role";
import userValidation from "../../validations/user.validation";
import {dataSource} from "../../data/dataSource";
import {User} from "../entities/user";
import {encryptPassword} from "../../utils/encryption";
import {UserDto} from "../dtos/userDto";
import mapping from "../mapping";
import mapper from "../mapping";
import {MappingPair} from "@dynamic-mapper/mapper";

export class CreateUser implements IRequest<UserDto> {
  email: string;
  password: string;
  name: string;
  role: Role;

  constructor(request: Partial<CreateUser> = {}) {
    Object.assign(this, request);
  }
}

export class CreateUserHandler implements IHandler<CreateUser, UserDto> {
  async handle(request: CreateUser): Promise<UserDto> {
    await userValidation.createUser.validateAsync(request);

    // if (await getUserByEmail(createUserDto.email)) {
    //   throw new ConflictError('Email already taken');
    // }

    const userRepository = dataSource.getRepository(User);

    const user = {
      createdAt: new Date(),
      email: request.email,
      name: request.name,
      role: request.role,
      password: await encryptPassword(request.password),
      isEmailVerified: false
    };

    const dto = mapping.mapper.map(mapping.userToUserDto, user);

    return await userRepository.save(user);
  }
}


const createUserHandler = new CreateUserHandler();
mediatrJs.registerHandler(CreateUser, createUserHandler);
