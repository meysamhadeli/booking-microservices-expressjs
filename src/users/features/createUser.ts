import {IHandler, IRequest, mediatrJs} from "../../mediatr.js";
import {Role} from "../../enums/role";
import userValidation from "../../validations/user.validation";
import {dataSource} from "../../data/dataSource";
import {User} from "../../entities/user";
import {encryptPassword} from "../../utils/encryption";

export class CreateUser implements IRequest<CreateUserResult> {
  email: string;
  password: string;
  name: string;
  role: Role;

  constructor(request: Partial<CreateUser> = {}) {
    Object.assign(this, request);
  }
}

export interface CreateUserResult {
  id: number;
  email: string;
  name: string;
  isEmailVerified: boolean;
  role: Role;
  createdAt: Date;
  updatedAt?: Date;
}

export class CreateUserHandler implements IHandler<CreateUser, CreateUserResult> {
  async handle(request: CreateUser): Promise<CreateUserResult> {
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

    return await userRepository.save(user);
  }
}


const createUserHandler = new CreateUserHandler();
mediatrJs.registerHandler(CreateUser, createUserHandler);
