import {
  CreateNodeDto,
  CreateTreeDto,
  GENEALOGY_CLIENT,
  GetNodeDto,
  GetNodesDto,
  GetTreeDto,
  GetTreesDto,
  NODES_PATTERNS,
  TREES_PATTERNS,
} from '@app/contracts';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GenealogyService {
  constructor(@Inject(GENEALOGY_CLIENT) private genealogyClient: ClientProxy) {}

  // -------------------- TREES --------------------
  async createTree(dto: CreateTreeDto): Promise<UUID> {
    return lastValueFrom(
      this.genealogyClient.send<UUID>(TREES_PATTERNS.CREATE, dto),
    );
  }

  async getTree(id: UUID): Promise<GetTreeDto> {
    return lastValueFrom(
      this.genealogyClient.send<GetTreeDto>(TREES_PATTERNS.FIND_ONE, { id }),
    );
  }

  async getTrees(): Promise<GetTreesDto> {
    return lastValueFrom(
      this.genealogyClient.send<GetTreesDto>(TREES_PATTERNS.FIND_ALL, {}),
    );
  }

  async deleteTree(id: UUID): Promise<void> {
    return lastValueFrom(
      this.genealogyClient.send<void>(TREES_PATTERNS.REMOVE, { id }),
    );
  }

  // -------------------- NODES --------------------
  async createNode(treeId: UUID, dto: CreateNodeDto): Promise<UUID> {
    return lastValueFrom(
      this.genealogyClient.send<UUID>(NODES_PATTERNS.CREATE, { treeId, dto }),
    );
  }

  async getNode(treeId: UUID, nodeId: UUID): Promise<GetNodeDto> {
    return lastValueFrom(
      this.genealogyClient.send<GetNodeDto>(NODES_PATTERNS.FIND_ONE, {
        treeId,
        nodeId,
      }),
    );
  }

  async getNodes(treeId: UUID): Promise<GetNodesDto> {
    return lastValueFrom(
      this.genealogyClient.send<GetNodesDto>(NODES_PATTERNS.FIND_ALL, {
        treeId,
      }),
    );
  }

  async deleteNode(treeId: UUID, nodeId: UUID): Promise<void> {
    await lastValueFrom(
      this.genealogyClient.send<void>(NODES_PATTERNS.REMOVE, {
        treeId,
        nodeId,
      }),
    );
  }
}
