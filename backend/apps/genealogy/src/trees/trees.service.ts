import { NodeEntity } from '@app/genealogy/core/domain/node.entity';
import { TreeEntity } from '@app/genealogy/core/domain/tree.entity';
import { NodeRepository } from '@app/genealogy/core/persistance/nodes.repository';
import { RelationsRepository } from '@app/genealogy/core/persistance/relations.repository';
import { TreeRepository } from '@app/genealogy/core/persistance/trees.repository';
import {
  EntityNotFoundException,
  InternalErrorRpcException,
  NotFoundRpcException,
} from '@app/shared';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class TreesService {
  constructor(
    private readonly treeRepository: TreeRepository,
    private readonly nodeRepository: NodeRepository,
    private readonly relationRepository: RelationsRepository,
  ) {}

  async createTree(name: string): Promise<UUID> {
    try {
      const node = NodeEntity.create({ name: 'test' });
      const tree = TreeEntity.create({ name, nodes: [node] });

      await this.treeRepository.save(tree);
      await this.nodeRepository.save(node);
      return tree.id;
    } catch {
      throw new InternalErrorRpcException("The tree couldn't be created");
    }
  }

  async findOneTree(treeId: UUID): Promise<TreeEntity> {
    try {
      const tree = await this.treeRepository.findById(treeId);
      return tree;
    } catch (error) {
      if (error instanceof EntityNotFoundException) {
        throw new NotFoundRpcException("The tree couldn't be found");
      }
      throw new InternalErrorRpcException("The tree couldn't be fetched");
    }
  }

  async findAllTrees(): Promise<TreeEntity[]> {
    try {
      const trees = await this.treeRepository.findAll();
      return trees;
    } catch {
      throw new InternalErrorRpcException("The trees couldn't be fetched");
    }
  }

  async removeTree(treeId: UUID): Promise<void> {
    try {
      const tree = await this.treeRepository.findById(treeId);
      await this.treeRepository.delete(treeId);

      const nodes = tree.getNodes();
      await Promise.all(
        nodes.map((node) => this.nodeRepository.delete(node.id)),
      );

      await this.relationRepository.deleteByTreeId(treeId);
    } catch (error) {
      if (error instanceof EntityNotFoundException) {
        throw new NotFoundRpcException("The tree couldn't be found");
      }
      throw new InternalErrorRpcException("The tree couldn't be deleted");
    }
  }

  async getGenealogy(treeId: UUID): Promise<object> {
    try {
      await this.treeRepository.findById(treeId);
      const jsonld = await this.relationRepository.findGenealogy(treeId);
      return jsonld;
    } catch (error) {
      if (error instanceof EntityNotFoundException) {
        throw new NotFoundRpcException("The tree couldn't be found");
      }
      throw new InternalErrorRpcException("The tree couldn't be fetched");
    }
  }
}
