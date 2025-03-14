import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { UUID } from 'crypto';
import { Model } from 'mongoose';
import { InternalServerErrorRpcException } from './exceptions/internal-server-error.exception';
import { NotFoundRpcException } from './exceptions/not-found.exception';
import { Tree, TreeDocument } from './schema/tree.schema';

@Injectable()
export class TreesService {
  constructor(@InjectModel(Tree.name) private treeModel: Model<TreeDocument>) {}

  async createTree(treeName: string) {
    try {
      const tree = new this.treeModel({ name: treeName });
      await tree.save();
      return tree._id;
    } catch {
      throw new InternalServerErrorRpcException("The tree couldn't be created");
    }
  }

  async findOneTree(treeId: UUID) {
    const tree = await this.treeModel.findById(treeId);
    if (!tree) {
      throw new NotFoundRpcException(
        'The tree with the given ID was not found',
      );
    }

    return tree.toObject();
  }

  async findAllTrees() {
    try {
      const trees = await this.treeModel.find();
      return trees.map((tree) => tree.toObject());
    } catch {
      throw new InternalServerErrorRpcException(
        "The trees couldn't be fetched",
      );
    }
  }

  async removeTree(treeId: UUID) {
    try {
      await this.treeModel.findByIdAndDelete(treeId);
    } catch {
      throw new InternalServerErrorRpcException("The tree couldn't be deleted");
    }
  }
}
