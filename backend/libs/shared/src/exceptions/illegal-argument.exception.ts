import { RpcErrorCode } from '@app/shared';
import { RpcException } from '@nestjs/microservices';

export class IllegalArgumentRpcException extends RpcException {
  constructor(message: string | string[]) {
    super({
      status: RpcErrorCode.ILLEGAL_ARGUMENT,
      message: message,
    });
  }
}
