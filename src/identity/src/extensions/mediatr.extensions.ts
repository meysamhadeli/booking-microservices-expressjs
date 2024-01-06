import { container } from 'tsyringe';
import { Login, LoginHandler } from '../auth/features/v1/login/login';
import { Logout, LogoutHandler } from '../auth/features/v1/logout/logout';
import {
  DeleteUserById,
  DeleteUserByIdHandler
} from '../user/features/v1/delete-user-by-id/delete-user-by-id';
import { CreateUser, CreateUserHandler } from '../user/features/v1/create-user/create-user';
import { GetUserById, GetUserByIdHandler } from '../user/features/v1/get-user-by-id/get-user-by-id';
import { GetUsers, GetUsersHandler } from '../user/features/v1/get-users/get-users';
import {
  GenerateToken,
  GenerateTokenHandler
} from '../auth/features/v1/generate-token/generate-token';
import { UpdateUser, UpdateUserHandler } from '../user/features/v1/update-user/update-user';
import {
  ValidateToken,
  ValidateTokenHandler
} from '../auth/features/v1/validate-token/validate-token';
import { RefreshToken, RefreshTokenHandler } from '../auth/features/v1/refresh-token/refresh-token';
import { mediatrJs } from 'building-blocks/mediatr-js/mediatr-js';

export const registerMediatrHandlers = () => {
  mediatrJs.registerRequestHandler(new CreateUser(), container.resolve(CreateUserHandler));
  mediatrJs.registerRequestHandler(new DeleteUserById(), container.resolve(DeleteUserByIdHandler));
  mediatrJs.registerRequestHandler(new GetUserById(), container.resolve(GetUserByIdHandler));
  mediatrJs.registerRequestHandler(new GetUsers(), container.resolve(GetUsersHandler));
  mediatrJs.registerRequestHandler(new UpdateUser(), container.resolve(UpdateUserHandler));
  mediatrJs.registerRequestHandler(new GenerateToken(), container.resolve(GenerateTokenHandler));
  mediatrJs.registerRequestHandler(new ValidateToken(), container.resolve(ValidateTokenHandler));
  mediatrJs.registerRequestHandler(new Login(), container.resolve(LoginHandler));
  mediatrJs.registerRequestHandler(new Logout(), container.resolve(LogoutHandler));
  mediatrJs.registerRequestHandler(new RefreshToken(), container.resolve(RefreshTokenHandler));
};
