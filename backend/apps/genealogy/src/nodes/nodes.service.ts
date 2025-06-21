import { CreateNodeDto, UpdateNodeDto } from '@app/contracts';
import {
  EntityNotFoundException,
  InternalErrorRpcException,
  NotFoundRpcException,
} from '@app/shared';
import { NodeEntity } from '@genealogy-ms/core/domain/node.entity';
import { RelationType } from '@genealogy-ms/core/domain/relation.enum';
import { NodeDomainMapper } from '@genealogy-ms/core/mapper/node.mapper';
import { NodeRepository } from '@genealogy-ms/core/persistance/nodes.repository';
import { TreeRepository } from '@genealogy-ms/core/persistance/trees.repository';
import { RelationsService } from '@genealogy-ms/relations/relations.service';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UUID } from 'crypto';
import { ConflictRpcException } from 'libs/shared/src/exceptions/conflict.exception';

@Injectable()
export class NodesService {
  constructor(
    private readonly nodeRepository: NodeRepository,
    private readonly treeRepository: TreeRepository,
    private readonly relationService: RelationsService,
  ) {}

  async createNode(
    treeId: UUID,
    nodeRefId: UUID,
    spouseId: UUID | undefined,
    type: RelationType,
    dto: CreateNodeDto,
  ): Promise<UUID> {
    try {
      if (type === RelationType.Parent) {
        const parents = await this.relationService.findParents(
          nodeRefId,
          treeId,
        );

        if (parents.length >= 2) {
          throw new ConflictRpcException(
            'A node can only have two parents. Please check the existing relations.',
          );
        }
      }

      const tree = await this.treeRepository.findById(treeId);
      const node = NodeDomainMapper.createDto2Domain(dto);
      tree.addNode(node);

      await this.nodeRepository.save(node);
      await this.treeRepository.save(tree);

      await this.relationService.createRelation(
        nodeRefId,
        node.id,
        spouseId,
        type,
        treeId,
      );

      return node.id;
    } catch (error) {
      if (error instanceof EntityNotFoundException) {
        throw new NotFoundRpcException("The tree couldn't be found");
      }
      throw new InternalErrorRpcException("The node couldn't be created");
    }
  }

  async findOneNode(treeId: UUID, nodeId: UUID): Promise<NodeEntity> {
    try {
      const tree = await this.treeRepository.findById(treeId);
      const node = tree.getNode(nodeId);
      if (!node) {
        throw new NotFoundRpcException("The node couldn't be found");
      }
      return node;
    } catch (error) {
      if (error instanceof RpcException) {
        throw error;
      }
      if (error instanceof EntityNotFoundException) {
        throw new NotFoundRpcException("The tree couldn't be found");
      }
      throw new InternalErrorRpcException("The node couldn't be fetched");
    }
  }

  async findAllNodes(treeId: UUID): Promise<NodeEntity[]> {
    try {
      const tree = await this.treeRepository.findById(treeId);
      const nodes = tree.getNodes();
      return nodes;
    } catch (error) {
      if (error instanceof EntityNotFoundException) {
        throw new NotFoundRpcException("The tree couldn't be found");
      }
      throw new InternalErrorRpcException("The nodes couldn't be fetched");
    }
  }

  async removeNode(treeId: UUID, nodeId: UUID): Promise<void> {
    try {
      const tree = await this.treeRepository.findById(treeId);
      if (tree.getNodes().length === 1) {
        throw new ConflictRpcException(
          'The last node in the tree cannot be deleted. Please delete the tree instead.',
        );
      }

      const relations = await this.relationService.findRelationsByNodeId(
        nodeId,
        treeId,
      );

      for (const relation of relations) {
        const descendant = relation.targetNodeId;
        tree.removeNode(descendant);
        await this.nodeRepository.delete(descendant);
        await this.relationService.removeRelation(descendant);
      }

      tree.removeNode(nodeId);
      await this.nodeRepository.delete(nodeId);
      await this.treeRepository.save(tree);
      await this.relationService.removeRelation(nodeId);
    } catch (error) {
      if (error instanceof EntityNotFoundException) {
        throw new NotFoundRpcException("The tree couldn't be found");
      }
      if (error instanceof RpcException) throw error;
      throw new InternalErrorRpcException("The node couldn't be deleted");
    }
  }

  async updateNode(
    treeId: UUID,
    nodeId: UUID,
    dto: UpdateNodeDto,
  ): Promise<void> {
    try {
      const tree = await this.treeRepository.findById(treeId);
      const node = tree.getNode(nodeId);
      if (!node) {
        throw new NotFoundRpcException("The node couldn't be found");
      }

      if (dto.birthDate) node.birthDate = dto.birthDate;
      if (dto.familyName) node.familyName = dto.familyName;
      if (dto.gender) node.gender = dto.gender;
      if (dto.givenName) node.givenName = dto.givenName;

      await this.nodeRepository.save(node);
    } catch (error) {
      if (error instanceof RpcException) throw error;
      if (error instanceof EntityNotFoundException) {
        throw new NotFoundRpcException("The tree couldn't be found");
      }
      throw new InternalErrorRpcException("The node couldn't be updated");
    }
  }
}
