import { TokenType } from '../../enums/tokenType';
import { IHandler, IRequest, mediatrJs } from 'building-blocks/mediatr-js/mediatr.js';
import { Token } from '../../entities/token';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from 'building-blocks/config/config';
import notFoundException from 'building-blocks/types/exception/notFoundException';
import { AuthRepository } from '../../../data/repositories/authRepository';

export class ValidateToken implements IRequest<Token> {
  token: string;
  type: TokenType;

  constructor(request: Partial<ValidateToken> = {}) {
    Object.assign(this, request);
  }
}

const generateTokenValidations = {
  params: Joi.object().keys({
    userId: Joi.number().integer().required()
  })
};

const validateTokenValidations = Joi.object({
  token: Joi.string().required(),
  type: Joi.string().required().valid(TokenType.ACCESS, TokenType.REFRESH)
});

export class ValidateTokenHandler implements IHandler<ValidateToken, Token> {
  async handle(request: ValidateToken): Promise<Token> {
    await validateTokenValidations.validateAsync(request);

    const payload = jwt.verify(request.token, config.jwt.secret);
    const userId = Number(payload.sub);

    const authRepository = new AuthRepository();
    const tokenEntity = await authRepository.findTokenByUserId(
      request.token,
      request.type,
      userId,
      false
    );

    if (!tokenEntity) {
      throw new notFoundException('Token not found');
    }

    return tokenEntity;
  }
}
