'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { httpStatus } = require('http-status');
class ConflictException extends Error {
  statusCode;
  isOperational;
  constructor(message, statusCode = httpStatus.CONFLICT, isOperational = true, stack = '') {
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
exports.default = ConflictException;
//# sourceMappingURL=conflict.exception.js.map
