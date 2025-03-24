import { HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';

export class InternalServerErrorRpcException extends RpcException {
  constructor(message: string) {
    super({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      error: HttpStatus[HttpStatus.INTERNAL_SERVER_ERROR],
      message: message,
    });
  }
}
