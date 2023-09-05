import { ErrorRequestHandler } from 'express';
import httpStatus from "http-status";
import NotFoundError from "../types/notFoundError";
import UnauthorizedError from "../types/unauthorizedError";
import ApplicationError from "../types/applicationError";
import ForbiddenError from "../types/forbiddenError";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApplicationError) {
    res.status(err.statusCode).json({ error: err.message });

    return next(err);
  }

  if (err instanceof UnauthorizedError) {
    res.status(httpStatus.UNAUTHORIZED).json({ error: err.message });

    return next(err);
  }

  if (err instanceof ForbiddenError) {
    res.status(httpStatus.FORBIDDEN).json({ error: err.message });

    return next(err);
  }

  if (err instanceof NotFoundError) {
    res.status(httpStatus.NOT_FOUND).json({ error: err.message });

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
