import { NodeEntity } from '@genealogy/core/domain/node.entity';
import { NodeRepository } from '@genealogy/core/persistance/nodes.repository';
import { TreeRepository } from '@genealogy/core/persistance/trees.repository';
import { InternalServerErrorRpcException } from '@genealogy/shared';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class NodesService {
  constructor(
    private readonly nodeRepository: NodeRepository,
    private readonly treeRepository: TreeRepository,
  ) {}

  async createNode(treeId: UUID, name: string): Promise<UUID> {
    const tree = await this.treeRepository.findById(treeId);
    if (!tree)
      throw new InternalServerErrorRpcException("The tree doesn't exist");

    const node = NodeEntity.create({ name });
    tree.addNode(node);
    await this.nodeRepository.save(node);
    await this.treeRepository.save(tree);

    return node.id;
  }

  async findOneNode(treeId: UUID, nodeId: UUID): Promise<NodeEntity> {
    try {
      const tree = await this.treeRepository.findById(treeId);
      if (!tree)
        throw new InternalServerErrorRpcException("The tree doesn't exist");

      const node = tree.getNode(nodeId);
      if (!node)
        throw new InternalServerErrorRpcException("The node doesn't exist");

      return node;
    } catch {
      throw new InternalServerErrorRpcException("The node couldn't be fetched");
    }
  }

  async findAllNodes(treeId: UUID): Promise<NodeEntity[]> {
    try {
      const tree = await this.treeRepository.findById(treeId);
      if (!tree)
        throw new InternalServerErrorRpcException("The tree doesn't exist");

      const nodes = tree.getNodes();
      return nodes;
    } catch {
      throw new InternalServerErrorRpcException(
        "The trees couldn't be fetched",
      );
    }
  }

  async removeNode(treeId: UUID, nodeId: UUID): Promise<void> {
    try {
      const tree = await this.treeRepository.findById(treeId);
      if (!tree)
        throw new InternalServerErrorRpcException("The tree doesn't exist");

      tree.removeNode(nodeId);
      return;
    } catch {
      throw new InternalServerErrorRpcException("The node couldn't be deleted");
    }
  }
}
