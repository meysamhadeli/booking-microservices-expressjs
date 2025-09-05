declare class UnauthorizedException extends Error {
    statusCode: number;
    isOperational: boolean;
    constructor(message: string | undefined, statusCode?: number, isOperational?: boolean, stack?: string);
}
export default UnauthorizedException;
