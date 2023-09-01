import { ErrorRequestHandler } from 'express';
import ApiError from '../utils/ApiError';

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    // Handle known ApiError types
    res.status(err.statusCode).json({ error: err.message });

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
