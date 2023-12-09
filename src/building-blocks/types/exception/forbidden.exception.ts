import httpStatus from 'http-status';

class ForbiddenException extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(
    message: string | undefined,
    statusCode: number = httpStatus.FORBIDDEN,
    isOperational = true,
    stack = ''
  ) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default ForbiddenException;
