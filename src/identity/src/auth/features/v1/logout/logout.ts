import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { BodyProp, Controller, Post, Route, SuccessResponse } from 'tsoa';
import Joi from 'joi';
import httpStatus from 'http-status';
import NotFoundException from 'building-blocks/types/exception/not-found.exception';
import { inject, injectable } from 'tsyringe';
import {IAuthRepository} from "../../../../data/repositories/auth.repository";
import {TokenType} from "../../../enums/token-type.enum";

export class Logout implements IRequest<number> {
  refreshToken: string;

  constructor(request: Partial<Logout> = {}) {
    Object.assign(this, request);
  }
}

const logoutValidations = {
  params: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

@Route('/identity')
export class LogoutController extends Controller {
  @Post('v1/logout')
  @SuccessResponse('204', 'NO_CONTENT')
  public async logout(@BodyProp() refreshToken: string): Promise<void> {
    await mediatrJs.send<number>(new Logout({ refreshToken: refreshToken }));

    this.setStatus(httpStatus.NO_CONTENT);
  }
}

@injectable()
export class LogoutHandler implements IHandler<Logout, number> {
  constructor(@inject('IAuthRepository') private authRepository: IAuthRepository) {}

  async handle(request: Logout): Promise<number> {
    await logoutValidations.params.validateAsync(request);

    const token = await this.authRepository.findToken(request.refreshToken, TokenType.REFRESH);

    if (!token) {
      throw new NotFoundException('Refresh Token Not found');
    }

    const tokenEntity = await this.authRepository.removeToken(token);

    return tokenEntity?.userId;
  }
}
