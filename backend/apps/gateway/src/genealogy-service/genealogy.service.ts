import {
  CreateRelatedNodeDto,
  CreateTreeDto,
  EXCHANGE_PATTERNS,
  GENEALOGY_CLIENT,
  GetNodeDto,
  GetNodesDto,
  GetTreeDto,
  GetTreesDto,
  NODES_PATTERNS,
  TREES_PATTERNS,
  UpdateNodeDto,
} from '@app/contracts';
import { RelationType } from '@genealogy-ms/core/domain/relation.enum';
import { CreateNodePayload } from '@genealogy-ms/nodes/dto/create-node.payload';
import { DeleteNodePayload } from '@genealogy-ms/nodes/dto/delete-node.payload';
import { GetNodePayload } from '@genealogy-ms/nodes/dto/get-node.payload';
import { GetNodesPayload } from '@genealogy-ms/nodes/dto/get-nodes.payload';
import { UpdateNodePayload } from '@genealogy-ms/nodes/dto/update-node.payload';
import { CreateTreePayload } from '@genealogy-ms/trees/dto/create-tree.payload';
import { DeleteTreePayload } from '@genealogy-ms/trees/dto/delete-tree.payload';
import { GetGenealogyPayload } from '@genealogy-ms/trees/dto/get-genealogy.payload';
import { GetTreePayload } from '@genealogy-ms/trees/dto/get-tree.payload';
import { GetTreesPayload } from '@genealogy-ms/trees/dto/get-trees.payload';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class GenealogyService {
  constructor(@Inject(GENEALOGY_CLIENT) private genealogyClient: ClientProxy) {}

  // -------------------- TREES --------------------
  async createTree(dto: CreateTreeDto, user: UUID): Promise<UUID> {
    return lastValueFrom(
      this.genealogyClient.send<UUID, CreateTreePayload>(
        TREES_PATTERNS.CREATE,
        { name: dto.name, owner: user },
      ),
    );
  }

  async getTree(id: UUID, user: UUID): Promise<GetTreeDto> {
    return lastValueFrom(
      this.genealogyClient.send<GetTreeDto, GetTreePayload>(
        TREES_PATTERNS.FIND_ONE,
        { treeId: id, owner: user },
      ),
    );
  }

  async getTreeGenealogy(id: UUID, user: UUID): Promise<object> {
    return lastValueFrom(
      this.genealogyClient.send<object, GetGenealogyPayload>(
        TREES_PATTERNS.GENEALOGY,
        {
          treeId: id,
          owner: user,
        },
      ),
    );
  }

  async getTrees(user: UUID): Promise<GetTreesDto> {
    return lastValueFrom(
      this.genealogyClient.send<GetTreesDto, GetTreesPayload>(
        TREES_PATTERNS.FIND_ALL,
        { owner: user },
      ),
    );
  }

  async deleteTree(id: UUID, user: UUID): Promise<void> {
    return lastValueFrom(
      this.genealogyClient.send<void, DeleteTreePayload>(
        TREES_PATTERNS.REMOVE,
        { treeId: id, owner: user },
      ),
    );
  }

  // -------------------- NODES --------------------
  async createNode(
    treeId: UUID,
    dto: CreateRelatedNodeDto,
    user: UUID,
  ): Promise<UUID> {
    return lastValueFrom(
      this.genealogyClient.send<UUID, CreateNodePayload>(
        NODES_PATTERNS.CREATE,
        {
          treeId,
          nodeRefId: dto.nodeId,
          spouseId: dto.spouseId,
          type: dto.relation as RelationType,
          dto: dto.nodeInfo,
          owner: user,
        },
      ),
    );
  }

  async getNode(treeId: UUID, nodeId: UUID, user: UUID): Promise<GetNodeDto> {
    return lastValueFrom(
      this.genealogyClient.send<GetNodeDto, GetNodePayload>(
        NODES_PATTERNS.FIND_ONE,
        {
          treeId,
          nodeId,
          owner: user,
        },
      ),
    );
  }

  async getNodes(treeId: UUID, user: UUID): Promise<GetNodesDto> {
    return lastValueFrom(
      this.genealogyClient.send<GetNodesDto, GetNodesPayload>(
        NODES_PATTERNS.FIND_ALL,
        {
          treeId,
          owner: user,
        },
      ),
    );
  }

  async deleteNode(treeId: UUID, nodeId: UUID, user: UUID): Promise<void> {
    await lastValueFrom(
      this.genealogyClient.send<void, DeleteNodePayload>(
        NODES_PATTERNS.REMOVE,
        {
          treeId,
          nodeId,
          owner: user,
        },
      ),
    );
  }

  async updateNode(
    treeId: UUID,
    nodeId: UUID,
    dto: UpdateNodeDto,
    user: UUID,
  ): Promise<void> {
    await lastValueFrom(
      this.genealogyClient.send<void, UpdateNodePayload>(
        NODES_PATTERNS.UPDATE,
        {
          treeId,
          nodeId,
          dto,
          owner: user,
        },
      ),
    );
  }

  // -------------------- IMPORT / EXPORT --------------------

  async exportTree(id: UUID): Promise<string> {
    return lastValueFrom(
      this.genealogyClient.send<UUID>(EXCHANGE_PATTERNS.EXPORT_GEDCOM, { id }),
    );
  }

  async importTree(gedcom: string): Promise<UUID> {
    return lastValueFrom(
      this.genealogyClient.send<UUID>(EXCHANGE_PATTERNS.IMPORT_GEDCOM, {
        gedcom,
      }),
    );
  }
}
