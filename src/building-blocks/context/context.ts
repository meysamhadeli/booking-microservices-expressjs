import {IncomingHttpHeaders} from "http";

export class HttpContext {
  static request: Request;
  static response: Response;
  static headers: IncomingHttpHeaders;
}

export const httpContextMiddleware = (req: any, res: any, next: any) => {
  HttpContext.request = req;

  HttpContext.response = res;

  HttpContext.headers = req.headers;

  next();
};
