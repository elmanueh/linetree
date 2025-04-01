import { RpcErrorCode } from '@genealogy/shared';
import { RpcException } from '@nestjs/microservices';

export class NotFoundRpcException extends RpcException {
  constructor(message: string) {
    super({
      status: RpcErrorCode.NOT_FOUND,
      message: message,
    });
  }
}
