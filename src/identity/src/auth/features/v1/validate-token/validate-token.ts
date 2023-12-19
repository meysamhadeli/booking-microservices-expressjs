import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from 'building-blocks/config/config';
import { inject, injectable } from 'tsyringe';
import { Token } from '../../../entities/token.entity';
import { TokenType } from '../../../enums/token-type.enum';
import { IAuthRepository } from '../../../../data/repositories/auth.repository';
import NotFoundException from 'building-blocks/types/exception/not-found.exception';

export class ValidateToken implements IRequest<Token> {
  token: string;
  type: TokenType;

  constructor(request: Partial<ValidateToken> = {}) {
    Object.assign(this, request);
  }
}

const validateTokenValidations = Joi.object({
  token: Joi.string().required(),
  type: Joi.string().required().valid(TokenType.ACCESS, TokenType.REFRESH)
});

@injectable()
export class ValidateTokenHandler implements IHandler<ValidateToken, Token> {
  constructor(@inject('IAuthRepository') private authRepository: IAuthRepository) {}

  async handle(command: ValidateToken): Promise<Token> {
    await validateTokenValidations.validateAsync(command);

    const payload = jwt.verify(command.token, config.jwt.secret);
    const userId = Number(payload.sub);

    let token: Token = null;

    if (command.type == TokenType.REFRESH) {
      token = await this.authRepository.findRefreshTokenByUserId(command.token, userId, false);
    } else {
      token = await this.authRepository.findTokenByUserId(command.token, userId, false);
    }

    if (!token) {
      throw new NotFoundException('Token not found');
    }

    return token;
  }
}
