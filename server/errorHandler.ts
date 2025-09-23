import { Request, Response, NextFunction } from 'express';

export interface AppError extends Error {
  statusCode?: number;
  isOperational?: boolean;
}

export class CustomError extends Error implements AppError {
  public statusCode: number;
  public isOperational: boolean;

  constructor(message: string, statusCode: number = 500, isOperational: boolean = true) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    
    Error.captureStackTrace(this, this.constructor);
  }
}

// Error handling middleware
export const errorHandler = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let { statusCode = 500, message } = error;

  // Log error for debugging
  console.error('Error occurred:', {
    message: error.message,
    stack: error.stack,
    url: req.url,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    timestamp: new Date().toISOString(),
  });

  // Handle specific error types
  if (error.name === 'ValidationError') {
    statusCode = 400;
    message = 'Validation failed';
  } else if (error.name === 'CastError') {
    statusCode = 400;
    message = 'Invalid data format';
  } else if (error.name === 'JsonWebTokenError') {
    statusCode = 401;
    message = 'Invalid token';
  } else if (error.name === 'TokenExpiredError') {
    statusCode = 401;
    message = 'Token expired';
  } else if (error.name === 'MulterError') {
    statusCode = 400;
    if (error.message.includes('File too large')) {
      message = 'File size too large';
    } else if (error.message.includes('Unexpected field')) {
      message = 'Unexpected file field';
    } else {
      message = 'File upload error';
    }
  }

  // Don't leak error details in production
  if (process.env.NODE_ENV === 'production' && statusCode === 500) {
    message = 'Internal server error';
  }

  // Send error response
  res.status(statusCode).json({
    error: message,
    ...(process.env.NODE_ENV === 'development' && {
      stack: error.stack,
      details: error.message,
    }),
  });
};

// 404 handler
export const notFoundHandler = (req: Request, res: Response, next: NextFunction) => {
  // Skip 404 handling for client-side routes (non-API routes)
  if (!req.originalUrl.startsWith('/api/')) {
    return next(); // Let the catch-all route handle it
  }
  const error = new CustomError(`Route ${req.originalUrl} not found`, 404);
  next(error);
};

// Async error wrapper
export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

// Database error handler
export const handleDatabaseError = (error: any): CustomError => {
  if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
    return new CustomError('Resource already exists', 409);
  } else if (error.code === 'SQLITE_CONSTRAINT_FOREIGNKEY') {
    return new CustomError('Referenced resource not found', 400);
  } else if (error.code === 'SQLITE_CONSTRAINT_NOTNULL') {
    return new CustomError('Required field is missing', 400);
  } else {
    return new CustomError('Database operation failed', 500);
  }
};

// File upload error handler
export const handleFileUploadError = (error: any): CustomError => {
  if (error.code === 'LIMIT_FILE_SIZE') {
    return new CustomError('File size too large', 413);
  } else if (error.code === 'LIMIT_FILE_COUNT') {
    return new CustomError('Too many files', 413);
  } else if (error.code === 'LIMIT_UNEXPECTED_FILE') {
    return new CustomError('Unexpected file field', 400);
  } else {
    return new CustomError('File upload failed', 400);
  }
};
