import {
  EntityNotFoundException,
  RepositoryException,
  RpcErrorCode,
} from '@app/shared';
import {
  BadRequestException,
  Catch,
  ForbiddenException,
  Logger,
  RpcExceptionFilter,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Observable, throwError } from 'rxjs';

@Catch()
export class RpcGlobalExceptionFilter implements RpcExceptionFilter<unknown> {
  private readonly logger = new Logger(RpcGlobalExceptionFilter.name);

  catch(exception: unknown): Observable<any> {
    this.logger.error(`Exception caught: ${JSON.stringify(exception)}`);

    if (exception instanceof RpcException) {
      return throwError(() => exception);
    }

    if (exception instanceof BadRequestException) {
      const res = exception.getResponse() as { message: string | string[] };
      return throwError(
        () =>
          new RpcException({
            status: RpcErrorCode.BAD_REQUEST,
            message: Array.isArray(res.message)
              ? res.message.join(', ')
              : res?.message,
          }),
      );
    }

    if (exception instanceof EntityNotFoundException) {
      return throwError(
        () =>
          new RpcException({
            status: RpcErrorCode.NOT_FOUND,
            message: exception.message,
          }),
      );
    }

    if (exception instanceof RepositoryException) {
      return throwError(
        () =>
          new RpcException({
            status: RpcErrorCode.INTERNAL_ERROR,
            message: exception.message,
          }),
      );
    }

    if (exception instanceof ForbiddenException) {
      return throwError(
        () =>
          new RpcException({
            status: RpcErrorCode.FORBIDDEN,
            message: exception.message,
          }),
      );
    }

    return throwError(
      () =>
        new RpcException({
          status: RpcErrorCode.INTERNAL_ERROR,
          message: 'Unexpected error occurred',
        }),
    );
  }
}
