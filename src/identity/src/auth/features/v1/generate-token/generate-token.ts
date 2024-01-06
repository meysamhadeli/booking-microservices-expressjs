import moment from 'moment';
import { AuthDto } from '../../../dtos/auth.dto';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from 'building-blocks/config/config';
import { inject, injectable } from 'tsyringe';
import { TokenType } from '../../../enums/token-type.enum';
import { IAuthRepository } from '../../../../data/repositories/auth.repository';
import { Token } from '../../../entities/token.entity';
import { IRequest, IRequestHandler } from 'building-blocks/mediatr-js/mediatr-js';

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
export class GenerateTokenHandler implements IRequestHandler<GenerateToken, AuthDto> {
  constructor(@inject('IAuthRepository') private authRepository: IAuthRepository) {}

  async handle(command: GenerateToken): Promise<AuthDto> {
    await generateTokenValidations.params.validateAsync(command);

    const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
    const accessToken = generateJwtToken(
      command.userId,
      accessTokenExpires.unix(),
      TokenType.ACCESS
    );

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateJwtToken(
      command.userId,
      refreshTokenExpires.unix(),
      TokenType.REFRESH
    );

    await this.authRepository.createToken(
      new Token({
        token: accessToken,
        refreshToken: refreshToken,
        expires: accessTokenExpires.toDate(),
        type: TokenType.ACCESS,
        blacklisted: false,
        userId: command.userId
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
