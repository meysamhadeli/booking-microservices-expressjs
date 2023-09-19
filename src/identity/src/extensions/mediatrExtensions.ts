import { mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { GenerateToken, GenerateTokenHandler } from '../auth/features/v1/generateToken';
import { ValidateToken, ValidateTokenHandler } from '../auth/features/v1/validateToken';
import { Login, LoginHandler } from '../auth/features/v1/login';
import { Logout, LogoutHandler } from '../auth/features/v1/logout';
import { RefreshToken, RefreshTokenHandler } from '../auth/features/v1/refreshToken';
import { CreateUser, CreateUserHandler } from '../user/features/v1/createUser';
import { DeleteUserById, DeleteUserByIdHandler } from '../user/features/v1/deleteUserById';
import { GetUserById, GetUserByIdHandler } from '../user/features/v1/getUserById';
import { GetUsers, GetUsersHandler } from '../user/features/v1/getUsers';
import { UpdateUser, UpdateUserHandler } from '../user/features/v1/updateUser';

export const registerMediatrHandlers = () => {
  mediatrJs.registerHandler(CreateUser, new CreateUserHandler());
  mediatrJs.registerHandler(DeleteUserById, new DeleteUserByIdHandler());
  mediatrJs.registerHandler(GetUserById, new GetUserByIdHandler());
  mediatrJs.registerHandler(GetUsers, new GetUsersHandler());
  mediatrJs.registerHandler(UpdateUser, new UpdateUserHandler());

  mediatrJs.registerHandler(GenerateToken, new GenerateTokenHandler());
  mediatrJs.registerHandler(ValidateToken, new ValidateTokenHandler());
  mediatrJs.registerHandler(Login, new LoginHandler());
  mediatrJs.registerHandler(Logout, new LogoutHandler());
  mediatrJs.registerHandler(RefreshToken, new RefreshTokenHandler());
};
