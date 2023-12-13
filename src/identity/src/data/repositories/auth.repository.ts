import { Repository } from 'typeorm';
import { container } from 'tsyringe';
import { DbContext } from 'building-blocks/typeorm/db-context';
import {Token} from "../../auth/entities/token.entity";
import {TokenType} from "../../auth/enums/token-type.enum";

export interface IAuthRepository {
  createToken(token: Token): Promise<void>;

  findToken(token: string, tokenType: TokenType): Promise<Token>;

  findTokenByUserId(
    token: string,
    userId: number,
    blacklisted: boolean
  ): Promise<Token>;

  findRefreshTokenByUserId(
    refreshToken: string,
    userId: number,
    blacklisted: boolean
  ): Promise<Token>;

  removeToken(token: Token): Promise<Token>;
}

export class AuthRepository implements IAuthRepository {
  private ormRepository: Repository<Token>;

  constructor() {
    this.ormRepository = container.resolve(DbContext).connection.getRepository(Token);
  }

  async createToken(token: Token): Promise<void> {
    await this.ormRepository.save(token);
  }

  async findToken(token: string, tokenType: TokenType): Promise<Token> {
    return await this.ormRepository.findOneBy({
      token: token,
      type: tokenType
    });
  }

  async findTokenByUserId(
    token: string,
    userId: number,
    blacklisted: boolean
  ): Promise<Token> {
    return await this.ormRepository.findOneBy({
      token: token,
      userId: userId,
      blacklisted: blacklisted
    });
  }

  async findRefreshTokenByUserId(
    refreshToken: string,
    userId: number,
    blacklisted: boolean
  ): Promise<Token> {
    return await this.ormRepository.findOneBy({
      refreshToken: refreshToken,
      userId: userId,
      blacklisted: blacklisted
    });
  }

  async removeToken(token: Token): Promise<Token> {
    return await this.ormRepository.remove(token);
  }
}
