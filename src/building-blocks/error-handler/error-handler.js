"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const tsoa_1 = require("tsoa");
const joi_1 = require("joi");
const http_problem_details_1 = require("http-problem-details");
const application_exception_1 = __importDefault(require("../types/exception/application.exception"));
const application_exception_2 = __importDefault(require("../types/exception/application.exception"));
const unauthorized_exception_1 = __importDefault(require("../types/exception/unauthorized.exception"));
const forbidden_exception_1 = __importDefault(require("../types/exception/forbidden.exception"));
const not_found_exception_1 = __importDefault(require("../types/exception/not-found.exception"));
const conflict_exception_1 = __importDefault(require("../types/exception/conflict.exception"));
const logger_1 = require("../logging/logger");
const http_client_exception_1 = __importDefault(require("../types/exception/http-client.exception"));
const http_status_codes_1 = require("http-status-codes");
const errorHandler = (err, req, res, next) => {
    if (err instanceof tsoa_1.ValidateError) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new http_problem_details_1.ProblemDocument({
            type: application_exception_2.default.name,
            title: err.message,
            detail: err.stack,
            status: err.status
        }));
        logger_1.Logger.error(err);
        return next;
    }
    if (err instanceof application_exception_1.default) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new http_problem_details_1.ProblemDocument({
            type: application_exception_2.default.name,
            title: err.message,
            detail: err.stack,
            status: err.statusCode
        }));
        logger_1.Logger.error(err);
        return next;
    }
    if (err instanceof unauthorized_exception_1.default) {
        res.status(http_status_codes_1.StatusCodes.UNAUTHORIZED).json(new http_problem_details_1.ProblemDocument({
            type: unauthorized_exception_1.default.name,
            title: err.message,
            detail: err.stack,
            status: err.statusCode
        }));
        logger_1.Logger.error(err);
        return next;
    }
    if (err instanceof forbidden_exception_1.default) {
        res.status(http_status_codes_1.StatusCodes.FORBIDDEN).json(new http_problem_details_1.ProblemDocument({
            type: forbidden_exception_1.default.name,
            title: err.message,
            detail: err.stack,
            status: err.statusCode
        }));
        logger_1.Logger.error(err);
        return next;
    }
    if (err instanceof not_found_exception_1.default) {
        res.status(http_status_codes_1.StatusCodes.NOT_FOUND).json(new http_problem_details_1.ProblemDocument({
            type: not_found_exception_1.default.name,
            title: err.message,
            detail: err.stack,
            status: err.statusCode
        }));
        logger_1.Logger.error(err);
        return next;
    }
    if (err instanceof conflict_exception_1.default) {
        res.status(http_status_codes_1.StatusCodes.CONFLICT).json(new http_problem_details_1.ProblemDocument({
            type: conflict_exception_1.default.name,
            title: err.message,
            detail: err.stack,
            status: err.statusCode
        }));
        logger_1.Logger.error(err);
        return next;
    }
    if (err instanceof http_client_exception_1.default) {
        res.status(http_status_codes_1.StatusCodes.CONFLICT).json(new http_problem_details_1.ProblemDocument({
            type: http_client_exception_1.default.name,
            title: err.message,
            detail: err.stack,
            status: err.statusCode
        }));
        logger_1.Logger.error(err);
        return next;
    }
    if (err instanceof joi_1.ValidationError) {
        res.status(http_status_codes_1.StatusCodes.BAD_REQUEST).json(new http_problem_details_1.ProblemDocument({
            type: joi_1.ValidationError.name,
            title: err.message,
            detail: err.stack,
            status: http_status_codes_1.StatusCodes.BAD_REQUEST
        }));
        logger_1.Logger.error(err);
        return next;
    }
    res.status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR).json(new http_problem_details_1.ProblemDocument({
        type: 'INTERNAL_SERVER_ERROR',
        title: err.message,
        detail: err.stack,
        status: err.statusCode || 500
    }));
    logger_1.Logger.error(err);
};
exports.errorHandler = errorHandler;
//# sourceMappingURL=error-handler.js.map