import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { BodyProp, Controller, Post, Route, SuccessResponse } from 'tsoa';
import Joi from 'joi';
import httpStatus from 'http-status';
import NotFoundException from 'building-blocks/types/exception/not-found.exception';
import { inject, injectable } from 'tsyringe';
import { IAuthRepository } from '../../../../data/repositories/auth.repository';
import { TokenType } from '../../../enums/token-type.enum';

export class Logout implements IRequest<number> {
  accessToken: string;

  constructor(request: Partial<Logout> = {}) {
    Object.assign(this, request);
  }
}

const logoutValidations = {
  params: Joi.object().keys({
    accessToken: Joi.string().required()
  })
};

@Route('/api/v1/identity')
export class LogoutController extends Controller {
  @Post('logout')
  @SuccessResponse('204', 'NO_CONTENT')
  public async logout(@BodyProp() accessToken: string): Promise<void> {
    await mediatrJs.send<number>(new Logout({ accessToken: accessToken }));

    this.setStatus(httpStatus.NO_CONTENT);
  }
}

@injectable()
export class LogoutHandler implements IHandler<Logout, number> {
  constructor(@inject('IAuthRepository') private authRepository: IAuthRepository) {}

  async handle(command: Logout): Promise<number> {
    await logoutValidations.params.validateAsync(command);

    const token = await this.authRepository.findToken(command.accessToken, TokenType.ACCESS);

    if (!token) {
      throw new NotFoundException('Access Token Not found');
    }

    const tokenEntity = await this.authRepository.removeToken(token);

    return tokenEntity?.userId;
  }
}
