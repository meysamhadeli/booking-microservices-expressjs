import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ValidationError } from 'joi';
import { ProblemDocument } from 'http-problem-details';
import ApplicationException from '../types/exception/applicationException';
import applicationException from '../types/exception/applicationException';
import UnauthorizedException from '../types/exception/unauthorizedException';
import ForbiddenException from '../types/exception/forbiddenException';
import NotFoundException from '../types/exception/notFoundException';
import ConflictException from '../types/exception/conflictException';
import { container } from 'tsyringe';
import { Logger } from '../logging/logger';
import HttpClientException from '../types/exception/httpClientException';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  const logger = container.resolve(Logger);

  if (err instanceof ApplicationException) {
    res.status(httpStatus.BAD_REQUEST).json(
      new ProblemDocument({
        type: applicationException.name,
        title: err.message,
        detail: err.stack,
        status: err.statusCode
      })
    );

    logger.error(err);

    return next;
  }

  if (err instanceof UnauthorizedException) {
    res.status(httpStatus.UNAUTHORIZED).json(
      new ProblemDocument({
        type: UnauthorizedException.name,
        title: err.message,
        detail: err.stack,
        status: err.statusCode
      })
    );

    logger.error(err);

    return next;
  }

  if (err instanceof ForbiddenException) {
    res.status(httpStatus.FORBIDDEN).json(
      new ProblemDocument({
        type: ForbiddenException.name,
        title: err.message,
        detail: err.stack,
        status: err.statusCode
      })
    );

    logger.error(err);

    return next;
  }

  if (err instanceof NotFoundException) {
    res.status(httpStatus.NOT_FOUND).json(
      new ProblemDocument({
        type: NotFoundException.name,
        title: err.message,
        detail: err.stack,
        status: err.statusCode
      })
    );

    logger.error(err);

    return next;
  }

  if (err instanceof ConflictException) {
    res.status(httpStatus.CONFLICT).json(
      new ProblemDocument({
        type: ConflictException.name,
        title: err.message,
        detail: err.stack,
        status: err.statusCode
      })
    );

    logger.error(err);

    return next;
  }

  if (err instanceof HttpClientException) {
    res.status(httpStatus.CONFLICT).json(
      new ProblemDocument({
        type: HttpClientException.name,
        title: err.message,
        detail: err.stack,
        status: err.statusCode
      })
    );

    logger.error(err);

    return next;
  }

  if (err instanceof ValidationError) {
    res.status(httpStatus.BAD_REQUEST).json(
      new ProblemDocument({
        type: ValidationError.name,
        title: err.message,
        detail: err.stack,
        status: httpStatus.BAD_REQUEST
      })
    );

    logger.error(err);

    return next;
  }

  res.status(httpStatus.INTERNAL_SERVER_ERROR).json(
    new ProblemDocument({
      type: 'INTERNAL_SERVER_ERROR',
      title: err.message,
      detail: err.stack,
      status: err.statusCode || 500
    })
  );

  logger.error(err);

  return next;
};
