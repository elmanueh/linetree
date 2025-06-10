import { RpcErrorCode } from '@app/shared';
import { RpcException } from '@nestjs/microservices';

export class ConflictRpcException extends RpcException {
  constructor(message: string | string[]) {
    super({
      status: RpcErrorCode.CONFLICT,
      message: message,
    });
  }
}
