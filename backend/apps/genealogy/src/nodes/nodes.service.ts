import { NodeEntity } from '@app/genealogy/core/domain/node.entity';
import { RelationEntity } from '@app/genealogy/core/domain/relation.entity';
import { NodeRepository } from '@app/genealogy/core/persistance/nodes.repository';
import { RelationsRepository } from '@app/genealogy/core/persistance/relations.repository';
import { TreeRepository } from '@app/genealogy/core/persistance/trees.repository';
import {
  EntityNotFoundException,
  InternalErrorRpcException,
  NotFoundRpcException,
} from '@app/shared';
import { Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { UUID } from 'crypto';

@Injectable()
export class NodesService {
  constructor(
    private readonly nodeRepository: NodeRepository,
    private readonly treeRepository: TreeRepository,
    private readonly relationRepository: RelationsRepository,
  ) {}

  async createNode(
    treeId: UUID,
    nodeRefId: UUID,
    type: string,
    name: string,
  ): Promise<UUID> {
    try {
      const tree = await this.treeRepository.findById(treeId);
      const node = NodeEntity.create({ name });
      tree.addNode(node);

      await this.nodeRepository.save(node);
      await this.treeRepository.save(tree);

      const relation = RelationEntity.create({
        souceNodeId: nodeRefId,
        targetNodeId: node.id,
        relationType: type,
        treeId: treeId,
      });

      await this.relationRepository.save(relation);

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
      const relations = await this.relationRepository.findDescendantsByNodeId(
        treeId,
        nodeId,
      );

      for (const relation of relations) {
        const descendant = relation.targetNodeId;
        tree.removeNode(descendant);
        await this.nodeRepository.delete(descendant);
        await this.relationRepository.deleteByNodeId(descendant);
      }

      tree.removeNode(nodeId);
      await this.nodeRepository.delete(nodeId);
      await this.treeRepository.save(tree);
      await this.relationRepository.deleteByNodeId(nodeId);
    } catch (error) {
      if (error instanceof EntityNotFoundException) {
        throw new NotFoundRpcException("The tree couldn't be found");
      }
      throw new InternalErrorRpcException("The node couldn't be deleted");
    }
  }

  async updateNode(treeId: UUID, nodeId: UUID, name?: string): Promise<void> {
    try {
      const tree = await this.treeRepository.findById(treeId);
      const node = tree.getNode(nodeId);
      if (!node) {
        throw new NotFoundRpcException("The node couldn't be found");
      }

      if (name) {
        node.name = name;
      }

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
