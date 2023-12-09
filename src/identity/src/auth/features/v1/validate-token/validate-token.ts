import { IHandler, IRequest } from 'building-blocks/mediatr-js/mediatr.js';
import Joi from 'joi';
import jwt from 'jsonwebtoken';
import config from 'building-blocks/config/config';
import notFoundException from 'building-blocks/types/exception/not-found.exception';
import { inject, injectable } from 'tsyringe';
import {Token} from "../../../entities/token.entity";
import {TokenType} from "../../../enums/token-type.enum";
import {IAuthRepository} from "../../../../data/repositories/auth.repository";

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
