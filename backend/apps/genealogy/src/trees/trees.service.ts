import { TreeEntity } from '@genealogy/core/domain/tree.entity';
import { TreeRepository } from '@genealogy/core/persistance/trees.repository';
import {
  EntityNotFoundException,
  InternalErrorRpcException,
  NotFoundRpcException,
} from '@genealogy/shared';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class TreesService {
  constructor(private readonly treeRepository: TreeRepository) {}

  async createTree(name: string): Promise<UUID> {
    try {
      const tree = TreeEntity.create({ name, nodes: [] });
      await this.treeRepository.save(tree);
      return tree.id;
    } catch {
      throw new InternalErrorRpcException("The tree couldn't be created");
    }
  }

  async findOneTree(id: UUID): Promise<TreeEntity> {
    try {
      const tree = await this.treeRepository.findById(id);
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
    } catch (error) {
      if (error instanceof EntityNotFoundException) {
        throw new NotFoundRpcException("The trees couldn't be found");
      }
      throw new InternalErrorRpcException("The trees couldn't be fetched");
    }
  }

  async removeTree(treeId: UUID): Promise<void> {
    try {
      await this.treeRepository.delete(treeId);
    } catch {
      throw new InternalErrorRpcException("The tree couldn't be deleted");
    }
  }
}
