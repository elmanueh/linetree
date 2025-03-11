import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TreesService {
  constructor(@Inject('TREES_CLIENT') private treesClient: ClientProxy) {}

  createTree(body: any) {
    return this.treesClient.send('trees.create', body);
  }

  async getTree(id: string): Promise<any> {
    return await firstValueFrom(this.treesClient.send('trees.findOne', { id }));
  }

  getTrees() {
    return this.treesClient.send('trees.findAll', {});
  }

  async deleteTree(id: string): Promise<any> {
    return await firstValueFrom(this.treesClient.send('trees.remove', { id }));
  }
}
