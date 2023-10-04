"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const http_status_1 = __importDefault(require("http-status"));
const joi_1 = require("joi");
const http_problem_details_1 = require("http-problem-details");
const applicationException_1 = __importDefault(require("../types/exception/applicationException"));
const applicationException_2 = __importDefault(require("../types/exception/applicationException"));
const unauthorizedException_1 = __importDefault(require("../types/exception/unauthorizedException"));
const forbiddenException_1 = __importDefault(require("../types/exception/forbiddenException"));
const notFoundException_1 = __importDefault(require("../types/exception/notFoundException"));
const conflictException_1 = __importDefault(require("../types/exception/conflictException"));
const tsyringe_1 = require("tsyringe");
const logger_1 = require("../logging/logger");
const httpClientException_1 = __importDefault(require("../types/exception/httpClientException"));
const errorHandler = (err, req, res, next) => {
    const logger = tsyringe_1.container.resolve(logger_1.Logger);
    if (err instanceof applicationException_1.default) {
        res.status(http_status_1.default.BAD_REQUEST).json(new http_problem_details_1.ProblemDocument({
            type: applicationException_2.default.name,
            title: err.message,
            detail: err.stack,
            status: err.statusCode
        }));
        logger.error(err);
        return next;
    }
    if (err instanceof unauthorizedException_1.default) {
        res.status(http_status_1.default.UNAUTHORIZED).json(new http_problem_details_1.ProblemDocument({
            type: unauthorizedException_1.default.name,
            title: err.message,
            detail: err.stack,
            status: err.statusCode
        }));
        logger.error(err);
        return next;
    }
    if (err instanceof forbiddenException_1.default) {
        res.status(http_status_1.default.FORBIDDEN).json(new http_problem_details_1.ProblemDocument({
            type: forbiddenException_1.default.name,
            title: err.message,
            detail: err.stack,
            status: err.statusCode
        }));
        logger.error(err);
        return next;
    }
    if (err instanceof notFoundException_1.default) {
        res.status(http_status_1.default.NOT_FOUND).json(new http_problem_details_1.ProblemDocument({
            type: notFoundException_1.default.name,
            title: err.message,
            detail: err.stack,
            status: err.statusCode
        }));
        logger.error(err);
        return next;
    }
    if (err instanceof conflictException_1.default) {
        res.status(http_status_1.default.CONFLICT).json(new http_problem_details_1.ProblemDocument({
            type: conflictException_1.default.name,
            title: err.message,
            detail: err.stack,
            status: err.statusCode
        }));
        logger.error(err);
        return next;
    }
    if (err instanceof httpClientException_1.default) {
        res.status(http_status_1.default.CONFLICT).json(new http_problem_details_1.ProblemDocument({
            type: httpClientException_1.default.name,
            title: err.message,
            detail: err.stack,
            status: err.statusCode
        }));
        logger.error(err);
        return next;
    }
    if (err instanceof joi_1.ValidationError) {
        res.status(http_status_1.default.BAD_REQUEST).json(new http_problem_details_1.ProblemDocument({
            type: joi_1.ValidationError.name,
            title: err.message,
            detail: err.stack,
            status: http_status_1.default.BAD_REQUEST
        }));
        logger.error(err);
        return next;
    }
    res.status(http_status_1.default.INTERNAL_SERVER_ERROR).json(new http_problem_details_1.ProblemDocument({
        type: 'INTERNAL_SERVER_ERROR',
        title: err.message,
        detail: err.stack,
        status: err.statusCode || 500
    }));
    logger.error(err);
    return next;
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=errorHandler.js.map