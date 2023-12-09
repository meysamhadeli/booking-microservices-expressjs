"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.morganMiddleware = void 0;
const morgan_1 = __importDefault(require("morgan"));
const config_1 = __importDefault(require("../config/config"));
const tsyringe_1 = require("tsyringe");
const logger_1 = require("./logger");
morgan_1.default.token('message', (req, res) => res.locals.errorMessage || '');
const getIpFormat = () => (config_1.default.env === 'production' ? ':remote-addr - ' : '');
const successResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms`;
const errorResponseFormat = `${getIpFormat()}:method :url :status - :response-time ms - message: :message`;
const morganMiddleware = (req, res, next) => {
    const logger = tsyringe_1.container.resolve(logger_1.Logger);
    if (res.statusCode >= 400) {
        (0, morgan_1.default)(errorResponseFormat, {
            skip: (req, res) => res.statusCode < 400,
            stream: { write: (message) => logger.error(message.trim()) }
        });
        next();
    }
    else {
        (0, morgan_1.default)(successResponseFormat, {
            skip: (req, res) => res.statusCode >= 400,
            stream: { write: (message) => logger.info(message.trim()) }
        });
        next();
    }
};
exports.morganMiddleware = morganMiddleware;
//# sourceMappingURL=morgan.js.map