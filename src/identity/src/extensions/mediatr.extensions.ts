import { container } from 'tsyringe';
import { mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { Login, LoginHandler } from '../auth/features/v1/login/login';
import { Logout, LogoutHandler } from '../auth/features/v1/logout/logout';
import {DeleteUserById, DeleteUserByIdHandler} from "../user/features/v1/delete-user-by-id/delete-user-by-id";
import {CreateUser, CreateUserHandler} from "../user/features/v1/create-user/create-user";
import {GetUserById, GetUserByIdHandler} from "../user/features/v1/get-user-by-id/get-user-by-id";
import {GetUsers, GetUsersHandler} from "../user/features/v1/get-users/get-users";
import {GenerateToken, GenerateTokenHandler} from "../auth/features/v1/generate-token/generate-token";
import {UpdateUser, UpdateUserHandler} from "../user/features/v1/update-user/update-user";
import {ValidateToken, ValidateTokenHandler} from "../auth/features/v1/validate-token/validate-token";
import {RefreshToken, RefreshTokenHandler} from "../auth/features/v1/refresh-token/refresh-token";

export const registerMediatrHandlers = () => {
  mediatrJs.registerHandler(CreateUser, container.resolve(CreateUserHandler));
  mediatrJs.registerHandler(DeleteUserById, container.resolve(DeleteUserByIdHandler));
  mediatrJs.registerHandler(GetUserById, container.resolve(GetUserByIdHandler));
  mediatrJs.registerHandler(GetUsers, container.resolve(GetUsersHandler));
  mediatrJs.registerHandler(UpdateUser, container.resolve(UpdateUserHandler));
  mediatrJs.registerHandler(GenerateToken, container.resolve(GenerateTokenHandler));
  mediatrJs.registerHandler(ValidateToken, container.resolve(ValidateTokenHandler));
  mediatrJs.registerHandler(Login, container.resolve(LoginHandler));
  mediatrJs.registerHandler(Logout, container.resolve(LogoutHandler));
  mediatrJs.registerHandler(RefreshToken, container.resolve(RefreshTokenHandler));
};
