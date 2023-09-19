import {dataSource} from '../dataSource';
import {Token} from '../../auth/entities/token';
import {TokenType} from '../../auth/enums/tokenType';

export interface IAuthRepository {
  createToken(token: Token): Promise<void>;

  findToken(token: string, tokenType: TokenType): Promise<Token>;

  findTokenByUserId(
    token: string,
    tokenType: TokenType,
    userId: number,
    blacklisted: boolean
  ): Promise<Token>;

  removeToken(token: Token): Promise<Token>;
}

export class AuthRepository implements IAuthRepository {
  async createToken(token: Token): Promise<void> {
    const tokenRepository = dataSource.getRepository(Token);

    await tokenRepository.save(token);
  }

  async findToken(token: string, tokenType: TokenType): Promise<Token> {
    const tokenRepository = dataSource.getRepository(Token);

    return await tokenRepository.findOneBy({
      token: token,
      type: tokenType
    });
  }

  async findTokenByUserId(
    token: string,
    tokenType: TokenType,
    userId: number,
    blacklisted: boolean
  ): Promise<Token> {
    const tokenRepository = dataSource.getRepository(Token);

    return await tokenRepository.findOneBy({
      token: token,
      type: tokenType,
      userId: userId,
      blacklisted: blacklisted
    });
  }

  async removeToken(token: Token): Promise<Token> {
    const tokenRepository = dataSource.getRepository(Token);

    return await tokenRepository.remove(token);
  }
}
