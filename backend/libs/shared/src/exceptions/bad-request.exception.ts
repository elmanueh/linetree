import { RpcErrorCode } from '@app/shared';
import { RpcException } from '@nestjs/microservices';

export class BadRequestRpcException extends RpcException {
  constructor(message: string | string[]) {
    super({
      status: RpcErrorCode.BAD_REQUEST,
      message: message,
    });
  }
}
