import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class BadRequestRpcException extends RpcException {
  constructor(message: string | string[]) {
    super({
      status: HttpStatus.BAD_REQUEST,
      error: HttpStatus[HttpStatus.BAD_REQUEST],
      message: message,
    });
  }
}
