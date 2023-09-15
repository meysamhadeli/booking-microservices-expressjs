import {TokenType} from "../enums/tokenType";

export class TokenDto {
  token: string;
  expires: Date;
  userId?: number;

  constructor(request: Partial<TokenDto> = {}) {
    Object.assign(this, request);
  }
}

