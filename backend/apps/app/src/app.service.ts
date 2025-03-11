import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class AppService {
  constructor(@Inject('USERS_CLIENT') private usersClient: ClientProxy) {}

  register(body: any) {
    return this.usersClient.send('users.create', body);
  }

  login(body: any) {
    return this.usersClient.send('users.login', body);
  }

  // ------------------ Users ------------------
  async getUser(id: string): Promise<any> {
    return await firstValueFrom(this.usersClient.send('users.findOne', id));
  }

  deleteUser(id: string) {
    return this.usersClient.send('users.remove', id);
  }
}
