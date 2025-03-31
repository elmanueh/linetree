import { TreeEntity } from '@genealogy/core/domain/tree.entity';
import { TreeRepository } from '@genealogy/core/persistance/trees.repository';
import { InternalServerErrorRpcException } from '@genealogy/shared';
import { Injectable } from '@nestjs/common';
import { UUID } from 'crypto';

@Injectable()
export class TreesService {
  constructor(private readonly treeRepository: TreeRepository) {}

  async createTree(name: string) {
    try {
      const tree = TreeEntity.create({
        name,
        nodes: [],
      });
      await this.treeRepository.save(tree);
      return tree.id;
    } catch {
      throw new InternalServerErrorRpcException("The tree couldn't be created");
    }
  }

  async findOneTree(id: UUID) {
    try {
      const tree = await this.treeRepository.findById(id);
      return tree;
    } catch {
      throw new InternalServerErrorRpcException("The tree couldn't be fetched");
    }
  }

  async findAllTrees() {
    try {
      const trees = await this.treeRepository.findAll();
      return trees;
    } catch {
      throw new InternalServerErrorRpcException(
        "The trees couldn't be fetched",
      );
    }
  }

  async removeTree(treeId: UUID) {
    try {
      await this.treeRepository.delete(treeId);
    } catch {
      throw new InternalServerErrorRpcException("The tree couldn't be deleted");
    }
  }
}
