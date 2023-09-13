export interface TokenResponse {
  token: string;
  expires: Date;
}

export interface AuthTokensResponse {
  access: TokenResponse;
  refresh?: TokenResponse;
}

export class PagedResultResponse<T> {
  result: T;
  total: number;

  constructor(result: T, total: number){
    this.result = result;
    this.total = total;
  }
}
