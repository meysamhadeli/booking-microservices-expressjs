import httpStatus from "http-status";

class ConflictException extends Error {
  statusCode: number;
  isOperational: boolean;

  constructor(message: string | undefined, statusCode: number = httpStatus.CONFLICT, isOperational = true, stack = '') {
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

export default ConflictException;
