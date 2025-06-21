import { RpcErrorCode } from 'libs/shared/src/exceptions/rpc-error-code.enum';

export interface RpcError {
  status: RpcErrorCode;
  message: string | string[];
}
