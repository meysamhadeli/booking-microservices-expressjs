import { TypeMapper } from 'ts-mapper';
import { User } from './entities/user';
import { UserDto } from './dtos/userDto';
import { Token } from './entities/token';
import { TokenDto } from './dtos/tokenDto';

export class Mapper extends TypeMapper {
  constructor() {
    super();
    this.config();
  }

  private config(): void {
    this.createMap<User, UserDto>()
      .map(
        (src) => src.name,
        (dest) => dest.name
      )
      .map(
        (src) => src.role,
        (dest) => dest.role
      )
      .map(
        (src) => src.id,
        (dest) => dest.id
      )
      .map(
        (src) => src.email,
        (dest) => dest.email
      )
      .map(
        (src) => src?.updatedAt,
        (dest) => dest?.updatedAt
      )
      .map(
        (src) => src.createdAt,
        (dest) => dest.createdAt
      )
      .map(
        (src) => src.isEmailVerified,
        (dest) => dest.isEmailVerified
      );

    this.createMap<Token, TokenDto>()
      .map(
        (src) => src.token,
        (dest) => dest.token
      )
      .map(
        (src) => src?.userId,
        (dest) => dest?.userId
      )
      .map(
        (src) => src.expires,
        (dest) => dest.expires
      );
  }
}

const mapper = new Mapper();

export default mapper;
