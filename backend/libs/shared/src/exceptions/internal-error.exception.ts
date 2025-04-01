import { RpcErrorCode } from '@genealogy/shared';
import { RpcException } from '@nestjs/microservices';

export class InternalErrorRpcException extends RpcException {
  constructor(message: string) {
    super({
      status: RpcErrorCode.INTERNAL_ERROR,
      message: message,
    });
  }
}
