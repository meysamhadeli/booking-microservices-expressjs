"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("../config/config"));
const logger_1 = __importDefault(require("./logger"));
const logger_2 = __importDefault(require("./logger"));
// Define your Morgan token for the message
morgan_1.default.token('message', (req, res) => res.locals.errorMessage || '');
// Define the IP format function
const getIpFormat = () => (config_1.default.env === 'production' ? ':remote-addr - ' : '');
// Define success and error response formats
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;
// Create Morgan middleware for success and error logging
const successHandler = (0, morgan_1.default)(successResponseFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: { write: (message) => logger_2.default.info(message.trim()) }
});
const errorHandler = (0, morgan_1.default)(errorResponseFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: { write: (message) => logger_1.default.error(message.trim()) }
});
const morganMiddleware = (req, res, next) => {
    if (res.statusCode >= 400) {
        errorHandler(req, res, next);
    }
    else {
        successHandler(req, res, next);
    }
};
exports.morganMiddleware = morganMiddleware;
//# sourceMappingURL=morgan.js.map