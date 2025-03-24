import {
  CreateTreeDto,
  GetTreeDto,
  GetTreesDto,
  TREES_PATTERNS,
} from '@genealogy/contracts';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TreesService {
  constructor(@Inject('TREES_CLIENT') private treesClient: ClientProxy) {}

  createTree(createTreeDto: CreateTreeDto) {
    return this.treesClient.send<void, CreateTreeDto>(
      TREES_PATTERNS.CREATE,
      createTreeDto,
    );
  }

  async getTree(id: UUID) {
    return await firstValueFrom(
      this.treesClient.send<GetTreeDto, { id: UUID }>(TREES_PATTERNS.FIND_ONE, {
        id,
      }),
    );
  }

  getTrees() {
    return this.treesClient.send<GetTreesDto, object>(
      TREES_PATTERNS.FIND_ALL,
      {},
    );
  }

  deleteTree(id: UUID) {
    return this.treesClient.send<void, { id: UUID }>(TREES_PATTERNS.REMOVE, {
      id,
    });
  }
}
