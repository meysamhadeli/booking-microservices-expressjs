import { dataSource } from '../dataSource';
import { Token } from '../../auth/entities/token';
import { TokenType } from '../../auth/enums/tokenType';
import { Repository } from 'typeorm';

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
  private ormRepository: Repository<Token>;

  constructor() {
    this.ormRepository = dataSource.getRepository(Token);
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
    tokenType: TokenType,
    userId: number,
    blacklisted: boolean
  ): Promise<Token> {
    return await this.ormRepository.findOneBy({
      token: token,
      type: tokenType,
      userId: userId,
      blacklisted: blacklisted
    });
  }

  async removeToken(token: Token): Promise<Token> {
    return await this.ormRepository.remove(token);
  }
}
