import { ParseUUIDPipe } from '@nestjs/common';
import { BadRequestRpcException } from '../exceptions/bad-request.exception';

export class RpcParseUUIDPipe extends ParseUUIDPipe {
  constructor() {
    super({ exceptionFactory: (error) => new BadRequestRpcException(error) });
  }
}
