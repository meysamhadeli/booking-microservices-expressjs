'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const http_status_codes_1 = require('http-status-codes');
class ForbiddenException extends Error {
  statusCode;
  isOperational;
  constructor(
    message,
    statusCode = http_status_codes_1.StatusCodes.FORBIDDEN,
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
exports.default = ForbiddenException;
//# sourceMappingURL=forbidden.exception.js.map
