'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { httpStatus } = require('http-status');
class NotFoundException extends Error {
  statusCode;
  isOperational;
  constructor(message, statusCode = httpStatus.NOT_FOUND, isOperational = true, stack = '') {
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
exports.default = NotFoundException;
//# sourceMappingURL=not-found.exception.js.map
