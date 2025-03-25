import {
  CreateNodeDto,
  GetNodeDto,
  GetNodesDto,
  NODES_PATTERNS,
} from '@genealogy/contracts';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class NodesService {
  constructor(@Inject('TREES_CLIENT') private treesClient: ClientProxy) {}

  async createNode(treeId: UUID, createNodeDto: CreateNodeDto) {
    return await firstValueFrom(
      this.treesClient.send<
        void,
        { treeId: UUID; createNodeDto: CreateNodeDto }
      >(NODES_PATTERNS.CREATE, { treeId, createNodeDto }),
    );
  }

  async getNode(treeId: UUID, id: UUID) {
    return await firstValueFrom(
      this.treesClient.send<GetNodeDto, { treeId: UUID; id: UUID }>(
        NODES_PATTERNS.FIND_ONE,
        {
          treeId,
          id,
        },
      ),
    );
  }

  getNodes(treeId: UUID) {
    return this.treesClient.send<GetNodesDto, UUID>(
      NODES_PATTERNS.FIND_ALL,
      treeId,
    );
  }

  deleteNode(treeId: UUID, id: UUID) {
    return this.treesClient.send<void, { treeId: UUID; id: UUID }>(
      NODES_PATTERNS.REMOVE,
      {
        treeId,
        id,
      },
    );
  }
}
