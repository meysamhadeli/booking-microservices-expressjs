"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const notFoundError_1 = __importDefault(require("../types/notFoundError"));
const unauthorizedError_1 = __importDefault(require("../types/unauthorizedError"));
const applicationError_1 = __importDefault(require("../types/applicationError"));
const forbiddenError_1 = __importDefault(require("../types/forbiddenError"));
const conflictError_1 = __importDefault(require("../types/conflictError"));
const errorHandler = (err, req, res, next) => {
    if (err instanceof applicationError_1.default) {
        res.status(err.statusCode).json({ error: err.message });
        return next(err);
    }
    if (err instanceof unauthorizedError_1.default) {
        res.status(http_status_1.default.UNAUTHORIZED).json({ error: err.message });
        return next(err);
    }
    if (err instanceof forbiddenError_1.default) {
        res.status(http_status_1.default.FORBIDDEN).json({ error: err.message });
        return next(err);
    }
    if (err instanceof notFoundError_1.default) {
        res.status(http_status_1.default.NOT_FOUND).json({ error: err.message });
        return next(err);
    }
    if (err instanceof conflictError_1.default) {
        res.status(http_status_1.default.CONFLICT).json({ error: err.message });
        return next(err);
    }
    // Handle other unexpected errors
    const statusCode = err.statusCode || 500; // Default to 500 if statusCode is not set
    const errorMessage = err.message || 'Internal Server Error'; // Default message if not provided
    const stackTrace = err.stack || ''; // Stack trace, if available
    // Log the error for debugging purposes
    console.error(err);
    // Send a response with the extracted information
    res.status(statusCode).json({ error: errorMessage, stack: stackTrace });
    return next(err);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error.js.map