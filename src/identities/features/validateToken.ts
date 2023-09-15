import config from "../../config/config";
import {dataSource} from "../../data/dataSource";
import {TokenType} from "../enums/tokenType";
import {IHandler, IRequest, mediatrJs} from "../../mediatr.js";
import {Token} from "../entities/token";
import Joi from "joi";
import {TokenDto} from "../dtos/tokenDto";
import jwt from "jsonwebtoken";
import notFoundError from "../../types/notFoundError";

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

const validateTokenValidations =
  Joi.object({
    token: Joi.string().required(),
    type: Joi.string().required().valid(TokenType.ACCESS, TokenType.REFRESH)
  });

export class ValidateTokenHandler implements IHandler<ValidateToken, Token> {
  async handle(request: ValidateToken): Promise<Token> {

    await validateTokenValidations.validateAsync(request);

    const payload = jwt.verify(request.token, config.jwt.secret);
    const userId = Number(payload.sub);

    const tokenRepository = dataSource.getRepository(Token);
    const tokenEntity = await tokenRepository.findOneBy({
      token: request.token,
      type: request.type,
      userId: userId,
      blacklisted: false
    });

    if (!tokenEntity) {
      throw new notFoundError("Token not found");
    }

    return tokenEntity;
  }
}

const validateTokenHandler = new ValidateTokenHandler();
mediatrJs.registerHandler(ValidateToken, validateTokenHandler);
