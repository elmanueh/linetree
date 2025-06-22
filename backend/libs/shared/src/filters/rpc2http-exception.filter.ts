import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class RpcJsonToHttpExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(RpcJsonToHttpExceptionFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    this.logger.error(`Exception caught: ${JSON.stringify(exception)}`);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response2 = exception.getResponse() as Record<string, any>;

      response.status(status).json({
        status,
        message: response2.message as string,
        error: response2.error as string,
      });

      return;
    }

    const exceptionObj = exception as Record<string, any>;
    const error = exceptionObj?.error as { status: string; message: string };

    const status = this.mapRpcStatus(error?.status);
    const message = error?.message || 'Unexpected microservice error';

    response.status(status).json({
      status,
      message,
      error: 'Microservice Error',
    });

    return;
  }

  private mapRpcStatus(rpcStatus: string): HttpStatus {
    switch (rpcStatus) {
      case 'BAD_REQUEST':
        return HttpStatus.BAD_REQUEST;
      case 'NOT_FOUND':
        return HttpStatus.NOT_FOUND;
      case 'CONFLICT':
        return HttpStatus.CONFLICT;
      case 'ILLEGAL_ARGUMENT':
        return HttpStatus.BAD_REQUEST;
      case 'UNAUTHORIZED':
        return HttpStatus.UNAUTHORIZED;
      case 'FORBIDDEN':
        return HttpStatus.FORBIDDEN;
      default:
        return HttpStatus.INTERNAL_SERVER_ERROR;
    }
  }
}
