import * as express from "express";
import * as jwt from "jsonwebtoken";
import config from "./src/config/config";
import UnauthorizedError from "./src/types/unauthorizedError";

export function expressAuthentication(
  request: express.Request,
  securityName: string,
  scopes?: string[]
): Promise<any> {
  if (securityName === "api_key") {
    let token;
    if (request.query && request.query.access_token) {
      token = request.query.access_token;
    }
  }

  if (securityName === "jwt") {
    let token =
      request.body.token ||
      request.query.token ||
      request.headers["x-access-token"];

    // Get the "Authorization" header from the request
    const authorizationHeader = request.headers['authorization'];

    if (authorizationHeader && authorizationHeader.startsWith('Bearer ')) {
      token = authorizationHeader.split(' ')[1];
    } else {
      throw new UnauthorizedError("Unauthorized");
    }

    return new Promise((resolve, reject) => {
      if (!token) {
        reject(new UnauthorizedError("Unauthorized"));
      }
      jwt.verify(token, config.jwt.secret, function (err: any, decoded: any) {
        if (err) {
          reject(new UnauthorizedError("Unauthorized"));
        } else {
          // Check if JWT contains all required scopes
          if (scopes != undefined) {
            for (let scope of scopes) {
              if (!decoded?.scopes?.includes(scope)) {
                reject(new UnauthorizedError("Unauthorized: JWT does not contain required scope."));
              }
            }
          }
          resolve(decoded);
        }
      });
    });
  }

  // If securityName is neither "api_key" nor "jwt", return a promise that rejects
  return Promise.reject(new UnauthorizedError("Unauthorized"));
}
