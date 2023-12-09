import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { BodyProp, Controller, Post, Route, SuccessResponse } from 'tsoa';
import Joi from 'joi';
import { AuthDto } from '../../../dtos/auth.dto';
import UnauthorizedException from 'building-blocks/types/exception/unauthorized.exception';
import { inject, injectable } from 'tsyringe';
import {IAuthRepository} from "../../../../data/repositories/auth.repository";
import {Token} from "../../../entities/token.entity";
import {ValidateToken} from "../validate-token/validate-token";
import {TokenType} from "../../../enums/token-type.enum";
import {GenerateToken} from "../generate-token/generate-token";

export class RefreshToken implements IRequest<RefreshToken> {
  refreshToken: string;

  constructor(request: Partial<RefreshToken> = {}) {
    Object.assign(this, request);
  }
}

const refreshTokenValidations = {
  params: Joi.object().keys({
    refreshToken: Joi.string().required()
  })
};

@Route('/identity')
export class RefreshTokenController extends Controller {
  @Post('v1/refreshToken')
  @SuccessResponse('200', 'OK')
  public async refreshToken(@BodyProp() refreshToken: string): Promise<AuthDto> {
    const result = await mediatrJs.send<AuthDto>(new RefreshToken({ refreshToken: refreshToken }));

    return result;
  }
}

@injectable()
export class RefreshTokenHandler implements IHandler<RefreshToken, AuthDto> {
  constructor(@inject('IAuthRepository') private authRepository: IAuthRepository) {}

  async handle(request: RefreshToken): Promise<AuthDto> {
    await refreshTokenValidations.params.validateAsync(request);

    try {
      const refreshTokenData = await mediatrJs.send<Token>(
        new ValidateToken({
          token: request.refreshToken,
          type: TokenType.REFRESH
        })
      );
      const { userId } = refreshTokenData;

      await this.authRepository.removeToken(refreshTokenData);

      const result = await mediatrJs.send<AuthDto>(new GenerateToken({ userId: userId }));

      return result;
    } catch (error) {
      throw new UnauthorizedException('Please authenticate');
    }
  }
}
