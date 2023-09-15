import httpStatus from 'http-status';
import {authService, userService} from '../services';
import {Body, BodyProp, Controller, Post, Route, SuccessResponse} from "tsoa";
import {RegisterRequestDto} from "../users/dtos/registerRequestDto";
import {LoginRequestDto} from "../users/dtos/loginRequestDto";
import {AuthTokensResponse} from "../types/response";
import {Role} from "../users/enums/role";
import {User} from "../users/entities/user";

@Route('/auth')
export class AuthController extends Controller {
  @Post('v1/register')
  @SuccessResponse('201', 'CREATED')
  public async register(@Body() request: RegisterRequestDto): Promise<User> {
    const user = await userService.createUser({
      email: request.email,
      name: request.name,
      password: request.password,
      role: Role.USER
    });
    this.setStatus(httpStatus.CREATED);
    return user;
  }

  @Post('v1/login')
  @SuccessResponse('200', 'OK')
  public async login(@Body() request: LoginRequestDto): Promise<AuthTokensResponse> {
    const token = await authService.login({email: request.email, password: request.password});
    return token;
  }

  @Post('v1/logout')
  @SuccessResponse('204', 'NO_CONTENT')
  public async logout(@BodyProp() refreshToken: string): Promise<void> {
    await authService.logout(refreshToken);
    this.setStatus(httpStatus.NO_CONTENT);
  }

  @Post('v1/refreshToken')
  @SuccessResponse('200', 'OK')
  public async refreshToken(@BodyProp() refreshToken: string): Promise<AuthTokensResponse> {
    const token = await authService.refreshToken(refreshToken);
    return token;
  }

}
