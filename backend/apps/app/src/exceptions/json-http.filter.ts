import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class JsonToHttpExceptionFilter implements ExceptionFilter {
  catch(exception: { message: string; status: number }, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    const message = exception.message;
    const status = exception.status;
    const error = HttpStatus[status];

    response.status(status).json({ status, error, message });
  }
}
