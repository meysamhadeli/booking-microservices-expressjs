import userService from './user.service';
import {isPasswordMatch} from '../utils/encryption';
import {AuthTokensResponse} from '../types/response';
import NotFoundError from "../types/notFoundError";
import UnauthorizedError from "../types/unauthorizedError";
import {dataSource} from "../data/dataSource";
import {Token} from "../entities/token";
import {TokenType} from "../enums/tokenType";
import {User} from "../entities/user";
import moment from "moment/moment";
import config from "../config/config";
import jwt from "jsonwebtoken";
import notFoundError from "../types/notFoundError";
import authValidation from "../validations/auth.validation";
import {LoginDto} from "../dtos/loginDto";

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<Omit<User, 'password'>>}
 */
const login = async (loginDto: LoginDto
): Promise<AuthTokensResponse> => {
  await authValidation.login.validateAsync(loginDto);

  const user = await userService.getUserByEmail(loginDto.email);
  if (!user || !(await isPasswordMatch(loginDto.password, user.password as string))) {
    throw new UnauthorizedError('Incorrect email or password');
  }
  const token = await generateTokens(user.id);
  return token;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise<void>}
 */
const logout = async (refreshToken: string): Promise<void> => {

  await authValidation.logout.params.validateAsync(refreshToken);

  const tokenRepository = await dataSource.getRepository(Token);

  const token = await tokenRepository.findOneBy({
    token: refreshToken,
    type: TokenType.REFRESH
  });

  if (!token) {
    throw new NotFoundError('Refresh Token Not found');
  }

  await tokenRepository.remove(token);
};

/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<AuthTokensResponse>}
 */
const refreshToken = async (refreshToken: string): Promise<AuthTokensResponse> => {
  await authValidation.refreshToken.params.validateAsync(refreshToken);

  try {
    const refreshTokenData = await verifyToken(refreshToken, TokenType.REFRESH);
    const {userId} = refreshTokenData;

    const tokenRepository = dataSource.getRepository(Token);
    await tokenRepository.remove(refreshTokenData);

    return generateTokens(userId);
  } catch (error) {
    throw new UnauthorizedError('Please authenticate');
  }
};


/**
 * Generate auth tokens
 * @param {number} userId
 * @returns {Promise<AuthTokensResponse>}
 */
const generateTokens = async (userId: number): Promise<AuthTokensResponse> => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateJwtToken(userId, accessTokenExpires.unix(), TokenType.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateJwtToken(userId, refreshTokenExpires.unix(), TokenType.REFRESH);


  const tokenRepository = dataSource.getRepository(Token);

  const token = {
    createdAt: new Date(),
    type: TokenType.REFRESH,
    token: refreshToken,
    expires: refreshTokenExpires.toDate(),
    userId: userId,
    blacklisted: false
  };

  await tokenRepository.save(token);


  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate()
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate()
    }
  };
};


/**
 * Verify token and return token doc (or throw an error if it is not valid)
 * @param {string} token
 * @param {string} type
 * @returns {Promise<Token>}
 */
const verifyToken = async (token: string, type: TokenType): Promise<Token> => {
  const payload = jwt.verify(token, config.jwt.secret);
  const userId = Number(payload.sub);

  const tokenRepository = dataSource.getRepository(Token);
  const tokenData = await tokenRepository.findOneBy({
    token: token,
    type: type,
    userId: userId,
    blacklisted: false
  });


  if (!tokenData) {
    throw new notFoundError("Token not found");
  }
  return tokenData;
};

/**
 * Generate token
 * @param {number} userId
 * @param {number} expires
 * @param {string} type
 * @param {string} [secret]
 * @returns {string}
 */
const generateJwtToken = (
  userId: number,
  expires: number,
  type: TokenType,
  secret = config.jwt.secret
): string => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires,
    type
  };
  return jwt.sign(payload, secret);
};


export default {
  login,
  logout,
  refreshToken
};
