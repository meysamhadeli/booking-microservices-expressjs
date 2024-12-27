'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { httpStatus } = require('http-status');
class HttpClientException extends Error {
  statusCode;
  isOperational;
  constructor(message, statusCode = httpStatus.BAD_REQUEST, isOperational = true, stack = '') {
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
exports.default = HttpClientException;
//# sourceMappingURL=http-client.exception.js.map
