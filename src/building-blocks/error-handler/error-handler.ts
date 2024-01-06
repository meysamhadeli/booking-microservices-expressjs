import { ErrorRequestHandler } from 'express';
import httpStatus from 'http-status';
import { ValidationError } from 'joi';
import { ProblemDocument } from 'http-problem-details';
import ApplicationException from '../types/exception/application.exception';
import applicationException from '../types/exception/application.exception';
import UnauthorizedException from '../types/exception/unauthorized.exception';
import ForbiddenException from '../types/exception/forbidden.exception';
import NotFoundException from '../types/exception/not-found.exception';
import ConflictException from '../types/exception/conflict.exception';
import { Logger } from '../logging/logger';
import HttpClientException from '../types/exception/http-client.exception';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApplicationException) {
    res.status(httpStatus.BAD_REQUEST).json(
      new ProblemDocument({
        type: applicationException.name,
        title: err.message,
        detail: err.stack,
        status: err.statusCode
      })
    );

    Logger.error(err);

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

    Logger.error(err);

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

    Logger.error(err);

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

    Logger.error(err);

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

    Logger.error(err);

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

    Logger.error(err);

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

    Logger.error(err);

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

  Logger.error(err);

  return next;
};
