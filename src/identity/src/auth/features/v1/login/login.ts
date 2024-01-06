import { Body, Controller, Post, Route, SuccessResponse } from 'tsoa';
import Joi from 'joi';
import { AuthDto } from '../../../dtos/auth.dto';
import { password } from 'building-blocks/utils/validation';
import { isPasswordMatch } from 'building-blocks/utils/encryption';
import { inject, injectable } from 'tsyringe';
import ApplicationException from 'building-blocks/types/exception/application.exception';
import { IUserRepository } from '../../../../data/repositories/user.repository';
import { GenerateToken } from '../generate-token/generate-token';
import { IRequest, IRequestHandler, mediatrJs } from 'building-blocks/mediatr-js/mediatr-js';

export class Login implements IRequest<AuthDto> {
  email: string;
  password: string;

  constructor(request: Partial<Login> = {}) {
    Object.assign(this, request);
  }
}

export class LoginRequestDto {
  email: string;
  password: string;

  constructor(request: Partial<LoginRequestDto> = {}) {
    Object.assign(this, request);
  }
}

const loginValidations = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required().custom(password)
});

@Route('/api/v1/identity')
export class LoginController extends Controller {
  @Post('login')
  @SuccessResponse('200', 'OK')
  public async login(@Body() request: LoginRequestDto): Promise<AuthDto> {
    const result = await mediatrJs.send<AuthDto>(new Login(request));

    return result;
  }
}

@injectable()
export class LoginHandler implements IRequestHandler<Login, AuthDto> {
  constructor(@inject('IUserRepository') private userRepository: IUserRepository) {}
  async handle(request: Login): Promise<AuthDto> {
    await loginValidations.validateAsync(request);

    const user = await this.userRepository.findUserByEmail(request.email);

    if (!user || !(await isPasswordMatch(request.password, user.password as string))) {
      throw new ApplicationException('Incorrect email or password');
    }

    const token = await mediatrJs.send<AuthDto>(new GenerateToken({ userId: user.id }));

    return token;
  }
}
