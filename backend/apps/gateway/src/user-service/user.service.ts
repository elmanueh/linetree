import { USER_CLIENT, USER_PATTERN } from '@app/contracts';
import { RpcError, RpcErrorCode } from '@app/shared';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateUserDto } from '@users-ms/dto/create-user.dto';
import { GetUserDto } from '@users-ms/dto/get-user.dto';
import { UUID } from 'crypto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(@Inject(USER_CLIENT) private readonly userClient: ClientProxy) {}

  async createUser(dto: CreateUserDto): Promise<UUID> {
    return lastValueFrom(this.userClient.send<UUID>(USER_PATTERN.CREATE, dto));
  }

  async getUser(id: UUID): Promise<GetUserDto> {
    return lastValueFrom(
      this.userClient.send<GetUserDto>(USER_PATTERN.FIND_ONE, { id }),
    );
  }

  async getUserByEmail(email: string): Promise<GetUserDto | null> {
    try {
      const user = await lastValueFrom(
        this.userClient.send<GetUserDto>(USER_PATTERN.FIND_ONE_BY_EMAIL, {
          email,
        }),
      );
      return user;
    } catch (error) {
      const errorRpc = error as RpcError;
      if (errorRpc.status === RpcErrorCode.NOT_FOUND) return null;
      throw error;
    }
  }

  async deleteUser(id: UUID): Promise<void> {
    return lastValueFrom(
      this.userClient.send<void>(USER_PATTERN.REMOVE, { id }),
    );
  }
}
