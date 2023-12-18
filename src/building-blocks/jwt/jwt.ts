import * as express from 'express';
import * as jwt from 'jsonwebtoken';
import config from '../config/config';
import { generateFakeJwt } from '../utils/encryption';
import UnauthorizedException from '../types/exception/unauthorized.exception';

export async function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === 'api_key') {
    let token;
    if (request.query && request.query.access_token) {
      token = request.query.access_token;
    }
  }

  if (securityName === 'jwt') {
    let token = request.body.token || request.query.token || request.headers['x-access-token'];

    if (config.env == 'test') {
      token = await generateFakeJwt();
      request.headers.authorization = 'Bearer' + ' ' + token;
    }

    const authorizationHeader = request.headers['authorization'];

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      token = authorizationHeader.split(' ')[1];
    } else {
      return Promise.reject(new UnauthorizedException('Unauthorized'));
    }

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new UnauthorizedException('Unauthorized'));
      }
      jwt.verify(token, config.jwt.secret, function (err: any, decoded: any) {
        if (err) {
          reject(new UnauthorizedException('Unauthorized'));
        } else {
          // Check if JWT contains all required scopes
          if (scopes != undefined) {
            for (const scope of scopes) {
              if (!decoded?.scopes?.includes(scope)) {
                reject(
                  new UnauthorizedException('Unauthorized: JWT does not contain required scope.')
                );
              }
            }
          }
          resolve(decoded);
        }
      });
    });
  }

  // If securityName is neither "api_key" nor "jwt", return a promise that rejects
  return Promise.reject(new UnauthorizedException('Unauthorized'));
}
