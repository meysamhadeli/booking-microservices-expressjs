/// <reference types="node" />
import { IncomingHttpHeaders } from "http";
export declare class HttpContext {
    static request: Request;
    static response: Response;
    static headers: IncomingHttpHeaders;
}
export declare const httpContextMiddleware: (req: any, res: any, next: any) => void;
