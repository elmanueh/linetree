import { TreeEntity } from '@app/genealogy/core/domain/tree.entity';
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
      await this.treeRepository.delete(treeId);
    } catch (error) {
      if (error instanceof EntityNotFoundException) {
        throw new NotFoundRpcException("The tree couldn't be found");
      }
      throw new InternalErrorRpcException("The tree couldn't be deleted");
    }
  }
}
