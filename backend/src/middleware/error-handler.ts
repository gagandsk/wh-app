import { Request, Response, NextFunction } from 'express';
export class HttpError extends Error {
    status: number;
    constructor(message: string, status: number = 500) {
        super(message);
        this.status = status;
        Object.setPrototypeOf(this, HttpError.prototype); 
    }
}

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  
  let status = err.status || 500;
  let message = err.message || 'Error interno del servidor.';

  if (err.name === 'CastError') {
    status = 400;
    message = 'ID de recurso no válido.';
  }
  
  if (err.name === 'MongoServerError' && err.code === 11000) {
    status = 409;
    message = 'El correo electrónico ya está registrado.';
  }

  if (err instanceof HttpError) {
      status = err.status;
      message = err.message;
  }

  res.status(status).json({
    message: message,
    error: process.env.NODE_ENV === 'development' ? err.stack : undefined,
  });
};