import { ValidateError } from 'tsoa';

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
import { StatusCodes } from 'http-status-codes';

export const errorHandler = (err, req, res, next) => {
  if (err instanceof ValidateError) {
    res.status(StatusCodes.BAD_REQUEST).json(
      new ProblemDocument({
        type: applicationException.name,
        title: err.message,
        detail: err.stack,
        status: err.status
      })
    );

    Logger.error(err);

    return next;
  }

  if (err instanceof ApplicationException) {
    res.status(StatusCodes.BAD_REQUEST).json(
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
    res.status(StatusCodes.UNAUTHORIZED).json(
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
    res.status(StatusCodes.FORBIDDEN).json(
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
    res.status(StatusCodes.NOT_FOUND).json(
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
    res.status(StatusCodes.CONFLICT).json(
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
    res.status(StatusCodes.CONFLICT).json(
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
    res.status(StatusCodes.BAD_REQUEST).json(
      new ProblemDocument({
        type: ValidationError.name,
        title: err.message,
        detail: err.stack,
        status: StatusCodes.BAD_REQUEST
      })
    );

    Logger.error(err);

    return next;
  }

  res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(
    new ProblemDocument({
      type: 'INTERNAL_SERVER_ERROR',
      title: err.message,
      detail: err.stack,
      status: err.statusCode || 500
    })
  );

  Logger.error(err);
};
