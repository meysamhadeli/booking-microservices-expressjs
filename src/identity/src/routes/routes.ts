/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import type { TsoaRoute } from '@tsoa/runtime';
import { fetchMiddlewares, ExpressTemplateService } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LoginController } from './../auth/features/v1/login/login';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LogoutController } from './../auth/features/v1/logout/logout';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DeleteUserByIdController } from './../user/features/v1/delete-user-by-id/delete-user-by-id';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { CreateUserController } from './../user/features/v1/create-user/create-user';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetUserByIdController } from './../user/features/v1/get-user-by-id/get-user-by-id';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { GetUsersController } from './../user/features/v1/get-users/get-users';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { UpdateUserController } from './../user/features/v1/update-user/update-user';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RefreshTokenController } from './../auth/features/v1/refresh-token/refresh-token';
import { expressAuthentication } from './../../../building-blocks/jwt/jwt';
// @ts-ignore - no great way to install types from subpackage
import type { Request as ExRequest, Response as ExResponse, RequestHandler, Router } from 'express';

const expressAuthenticationRecasted = expressAuthentication as (
  req: ExRequest,
  securityName: string,
  scopes?: string[],
  res?: ExResponse
) => Promise<any>;

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
  TokenDto: {
    dataType: 'refObject',
    properties: {
      token: { dataType: 'string', required: true },
      expires: { dataType: 'datetime', required: true },
      userId: { dataType: 'double' }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  AuthDto: {
    dataType: 'refObject',
    properties: {
      access: { ref: 'TokenDto', required: true },
      refresh: { ref: 'TokenDto' }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  LoginRequestDto: {
    dataType: 'refObject',
    properties: {
      email: { dataType: 'string', required: true },
      password: { dataType: 'string', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  Role: {
    dataType: 'refEnum',
    enums: [0, 1]
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UserDto: {
    dataType: 'refObject',
    properties: {
      id: { dataType: 'double', required: true },
      email: { dataType: 'string', required: true },
      name: { dataType: 'string', required: true },
      isEmailVerified: { dataType: 'boolean', required: true },
      role: { ref: 'Role', required: true },
      passportNumber: { dataType: 'string', required: true },
      createdAt: { dataType: 'datetime', required: true },
      updatedAt: { dataType: 'datetime' }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  CreateUserRequestDto: {
    dataType: 'refObject',
    properties: {
      email: { dataType: 'string', required: true },
      password: { dataType: 'string', required: true },
      name: { dataType: 'string', required: true },
      role: { ref: 'Role', required: true },
      passportNumber: { dataType: 'string', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  'PagedResult_UserDto-Array_': {
    dataType: 'refObject',
    properties: {
      result: {
        dataType: 'array',
        array: { dataType: 'refObject', ref: 'UserDto' },
        required: true
      },
      total: { dataType: 'double', required: true }
    },
    additionalProperties: false
  },
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  UpdateUserRequestDto: {
    dataType: 'refObject',
    properties: {
      email: { dataType: 'string', required: true },
      password: { dataType: 'string', required: true },
      name: { dataType: 'string', required: true },
      role: { ref: 'Role', required: true },
      passportNumber: { dataType: 'string', required: true }
    },
    additionalProperties: false
  }
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const templateService = new ExpressTemplateService(models, {
  noImplicitAdditionalProperties: 'throw-on-extras',
  bodyCoercion: true
});

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: Router) {
  // ###########################################################################################################
  //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
  //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
  // ###########################################################################################################

  const argsLoginController_login: Record<string, TsoaRoute.ParameterSchema> = {
    request: { in: 'body', name: 'request', required: true, ref: 'LoginRequestDto' }
  };
  app.post(
    '/api/v1/identity/login',
    ...fetchMiddlewares<RequestHandler>(LoginController),
    ...fetchMiddlewares<RequestHandler>(LoginController.prototype.login),

    async function LoginController_login(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsLoginController_login,
          request,
          response
        });

        const controller = new LoginController();

        await templateService.apiHandler({
          methodName: 'login',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsLogoutController_logout: Record<string, TsoaRoute.ParameterSchema> = {
    accessToken: { in: 'body-prop', name: 'accessToken', required: true, dataType: 'string' }
  };
  app.post(
    '/api/v1/identity/logout',
    ...fetchMiddlewares<RequestHandler>(LogoutController),
    ...fetchMiddlewares<RequestHandler>(LogoutController.prototype.logout),

    async function LogoutController_logout(request: ExRequest, response: ExResponse, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsLogoutController_logout,
          request,
          response
        });

        const controller = new LogoutController();

        await templateService.apiHandler({
          methodName: 'logout',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 204
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsDeleteUserByIdController_deleteUserById: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: 'query', name: 'id', required: true, dataType: 'double' }
  };
  app.delete(
    '/api/v1/user/delete',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(DeleteUserByIdController),
    ...fetchMiddlewares<RequestHandler>(DeleteUserByIdController.prototype.deleteUserById),

    async function DeleteUserByIdController_deleteUserById(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsDeleteUserByIdController_deleteUserById,
          request,
          response
        });

        const controller = new DeleteUserByIdController();

        await templateService.apiHandler({
          methodName: 'deleteUserById',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 204
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsCreateUserController_createUser: Record<string, TsoaRoute.ParameterSchema> = {
    request: { in: 'body', name: 'request', required: true, ref: 'CreateUserRequestDto' }
  };
  app.post(
    '/api/v1/user/create',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(CreateUserController),
    ...fetchMiddlewares<RequestHandler>(CreateUserController.prototype.createUser),

    async function CreateUserController_createUser(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsCreateUserController_createUser,
          request,
          response
        });

        const controller = new CreateUserController();

        await templateService.apiHandler({
          methodName: 'createUser',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 201
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsGetUserByIdController_getUserById: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: 'query', name: 'id', required: true, dataType: 'double' }
  };
  app.get(
    '/api/v1/user/get-by-id',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(GetUserByIdController),
    ...fetchMiddlewares<RequestHandler>(GetUserByIdController.prototype.getUserById),

    async function GetUserByIdController_getUserById(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsGetUserByIdController_getUserById,
          request,
          response
        });

        const controller = new GetUserByIdController();

        await templateService.apiHandler({
          methodName: 'getUserById',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsGetUsersController_getUsers: Record<string, TsoaRoute.ParameterSchema> = {
    pageSize: { default: 10, in: 'query', name: 'pageSize', dataType: 'double' },
    page: { default: 1, in: 'query', name: 'page', dataType: 'double' },
    order: {
      default: 'ASC',
      in: 'query',
      name: 'order',
      dataType: 'union',
      subSchemas: [
        { dataType: 'enum', enums: ['ASC'] },
        { dataType: 'enum', enums: ['DESC'] }
      ]
    },
    orderBy: { default: 'id', in: 'query', name: 'orderBy', dataType: 'string' },
    searchTerm: { in: 'query', name: 'searchTerm', dataType: 'string' }
  };
  app.get(
    '/api/v1/user/get',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(GetUsersController),
    ...fetchMiddlewares<RequestHandler>(GetUsersController.prototype.getUsers),

    async function GetUsersController_getUsers(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsGetUsersController_getUsers,
          request,
          response
        });

        const controller = new GetUsersController();

        await templateService.apiHandler({
          methodName: 'getUsers',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsUpdateUserController_updateUser: Record<string, TsoaRoute.ParameterSchema> = {
    id: { in: 'query', name: 'id', required: true, dataType: 'double' },
    request: { in: 'body', name: 'request', required: true, ref: 'UpdateUserRequestDto' }
  };
  app.put(
    '/api/v1/user/update',
    authenticateMiddleware([{ jwt: [] }]),
    ...fetchMiddlewares<RequestHandler>(UpdateUserController),
    ...fetchMiddlewares<RequestHandler>(UpdateUserController.prototype.updateUser),

    async function UpdateUserController_updateUser(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsUpdateUserController_updateUser,
          request,
          response
        });

        const controller = new UpdateUserController();

        await templateService.apiHandler({
          methodName: 'updateUser',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 204
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
  const argsRefreshTokenController_refreshToken: Record<string, TsoaRoute.ParameterSchema> = {
    refreshToken: { in: 'body-prop', name: 'refreshToken', required: true, dataType: 'string' }
  };
  app.post(
    '/api/v1/identity/refresh-token',
    ...fetchMiddlewares<RequestHandler>(RefreshTokenController),
    ...fetchMiddlewares<RequestHandler>(RefreshTokenController.prototype.refreshToken),

    async function RefreshTokenController_refreshToken(
      request: ExRequest,
      response: ExResponse,
      next: any
    ) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      let validatedArgs: any[] = [];
      try {
        validatedArgs = templateService.getValidatedArgs({
          args: argsRefreshTokenController_refreshToken,
          request,
          response
        });

        const controller = new RefreshTokenController();

        await templateService.apiHandler({
          methodName: 'refreshToken',
          controller,
          response,
          next,
          validatedArgs,
          successStatus: 200
        });
      } catch (err) {
        return next(err);
      }
    }
  );
  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

  function authenticateMiddleware(security: TsoaRoute.Security[] = []) {
    return async function runAuthenticationMiddleware(request: any, response: any, next: any) {
      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      // keep track of failed auth attempts so we can hand back the most
      // recent one.  This behavior was previously existing so preserving it
      // here
      const failedAttempts: any[] = [];
      const pushAndRethrow = (error: any) => {
        failedAttempts.push(error);
        throw error;
      };

      const secMethodOrPromises: Promise<any>[] = [];
      for (const secMethod of security) {
        if (Object.keys(secMethod).length > 1) {
          const secMethodAndPromises: Promise<any>[] = [];

          for (const name in secMethod) {
            secMethodAndPromises.push(
              expressAuthenticationRecasted(request, name, secMethod[name], response).catch(
                pushAndRethrow
              )
            );
          }

          // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

          secMethodOrPromises.push(
            Promise.all(secMethodAndPromises).then((users) => {
              return users[0];
            })
          );
        } else {
          for (const name in secMethod) {
            secMethodOrPromises.push(
              expressAuthenticationRecasted(request, name, secMethod[name], response).catch(
                pushAndRethrow
              )
            );
          }
        }
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

      try {
        request['user'] = await Promise.any(secMethodOrPromises);

        // Response was sent in middleware, abort
        if (response.writableEnded) {
          return;
        }

        next();
      } catch (err) {
        // Show most recent error as response
        const error = failedAttempts.pop();
        error.status = error.status || 401;

        // Response was sent in middleware, abort
        if (response.writableEnded) {
          return;
        }
        next(error);
      }

      // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    };
  }

  // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
