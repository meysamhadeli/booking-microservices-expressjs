import { TokenType } from '../../enums/tokenType';
import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import { Token } from '../../entities/token';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from 'building-blocks/config/config';
import notFoundException from 'building-blocks/types/exception/notFoundException';
import { IAuthRepository } from '../../../data/repositories/authRepository';
import { inject, injectable } from 'tsyringe';

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

@injectable()
export class ValidateTokenHandler implements IHandler<ValidateToken, Token> {

  constructor(@inject('IAuthRepository') private authRepository: IAuthRepository) {
  }

  async handle(request: ValidateToken): Promise<Token> {
    await validateTokenValidations.validateAsync(request);

    const payload = jwt.verify(request.token, config.jwt.secret);
    const userId = Number(payload.sub);

    const tokenEntity = await this.authRepository.findTokenByUserId(
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
