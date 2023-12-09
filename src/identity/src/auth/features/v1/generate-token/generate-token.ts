import moment from 'moment';
import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import { AuthDto } from '../../../dtos/auth.dto';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from 'building-blocks/config/config';
import { inject, injectable } from 'tsyringe';
import {TokenType} from "../../../enums/token-type.enum";
import {IAuthRepository} from "../../../../data/repositories/auth.repository";
import {Token} from "../../../entities/token.entity";

export class GenerateToken implements IRequest<AuthDto> {
  userId: number;

  constructor(request: Partial<GenerateToken> = {}) {
    Object.assign(this, request);
  }
}

const generateTokenValidations = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required()
  })
};

const generateJwtToken = (
  userId: number,
  expires: number,
  type: TokenType,
  secret: string = config.jwt.secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires,
    type
  };
  return jwt.sign(payload, secret);
};

@injectable()
export class GenerateTokenHandler implements IHandler<GenerateToken, AuthDto> {
  constructor(@inject('IAuthRepository') private authRepository: IAuthRepository) {}

  async handle(request: GenerateToken): Promise<AuthDto> {
    await generateTokenValidations.params.validateAsync(request);

    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateJwtToken(
      request.userId,
      accessTokenExpires.unix(),
      TokenType.ACCESS
    );

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateJwtToken(
      request.userId,
      refreshTokenExpires.unix(),
      TokenType.REFRESH
    );

    await this.authRepository.createToken(
      new Token({
        token: refreshToken,
        expires: refreshTokenExpires.toDate(),
        type: TokenType.REFRESH,
        blacklisted: false,
        userId: request.userId
      })
    );

    const result = {
      access: {
        token: accessToken,
        expires: accessTokenExpires.toDate()
      },
      refresh: {
        token: refreshToken,
        expires: refreshTokenExpires.toDate()
      }
    };

    return new AuthDto(result);
  }
}
