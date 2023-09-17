import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { dataSource } from '../../data/dataSource';
import { BodyProp, Controller, Post, Route, SuccessResponse } from 'tsoa';
import Joi from 'joi';
import httpStatus from 'http-status';
import { Token } from '../entities/token';
import { TokenType } from '../enums/tokenType';
import NotFoundException from 'building-blocks/types/exception/notFoundException';

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

export class LogoutHandler implements IHandler<Logout, number> {
  async handle(request: Logout): Promise<number> {
    await logoutValidations.params.validateAsync(request);

    const tokenRepository = await dataSource.getRepository(Token);

    const token = await tokenRepository.findOneBy({
      token: request.refreshToken,
      type: TokenType.REFRESH
    });

    if (!token) {
      throw new NotFoundException('Refresh Token Not found');
    }

    const tokenEntity = await tokenRepository.remove(token);

    return tokenEntity?.userId;
  }
}

mediatrJs.registerHandler(Logout, new LogoutHandler());
