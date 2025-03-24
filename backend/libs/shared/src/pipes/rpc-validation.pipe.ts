import { ValidationPipe, ValidationPipeOptions } from '@nestjs/common';
import { BadRequestRpcException } from '../exceptions/bad-request.exception';

export class RpcValidationPipe extends ValidationPipe {
  constructor(options?: ValidationPipeOptions) {
    super({
      ...options,
      exceptionFactory: (errors) => {
        const messages = errors
          .map((error) => Object.values(error.constraints || {}).join(', '))
          .filter((message) => message.length > 0);

        return new BadRequestRpcException(messages);
      },
    });
  }
}
