import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class JsonToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: { status: string; message: string }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message = exception.message;
    const error = exception.status;
    const status =
      HttpStatus[error as keyof typeof HttpStatus] |
      HttpStatus.INTERNAL_SERVER_ERROR;

    response.status(status).json({ status, error, message });
  }
}
