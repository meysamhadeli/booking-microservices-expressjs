import * as express from 'express';
export declare const httpContext: {
    request: any;
};
export declare function expressAuthentication(request: express.Request, securityName: string, scopes?: string[]): Promise<any>;
