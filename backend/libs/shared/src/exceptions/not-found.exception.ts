import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class NotFoundRpcException extends RpcException {
  constructor(message: string) {
    super({
      status: HttpStatus.NOT_FOUND,
      error: HttpStatus[HttpStatus.NOT_FOUND],
      message: message,
    });
  }
}
