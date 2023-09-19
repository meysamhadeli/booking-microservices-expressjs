import { TokenDto } from './tokenDto';

export class AuthDto {
  access: TokenDto;
  refresh?: TokenDto;

  constructor(request: Partial<AuthDto> = {}) {
    Object.assign(this, request);
  }
}
