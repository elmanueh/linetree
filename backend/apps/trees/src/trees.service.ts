import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { isUUID } from 'class-validator';
import { Model } from 'mongoose';
import { BadRequestRpcException } from './exceptions/bad-request.exception';
import { InternalServerErrorRpcException } from './exceptions/internal-server-error.exception';
import { NotFoundRpcException } from './exceptions/not-found.exception';
import { Tree, TreeDocument } from './schema/tree.schema';

@Injectable()
export class TreesService {
  constructor(@InjectModel(Tree.name) private treeModel: Model<TreeDocument>) {}

  async createTree(treeName: string): Promise<string> {
    try {
      const tree = new this.treeModel({ name: treeName });
      await tree.save();
      return tree._id;
    } catch {
      throw new InternalServerErrorRpcException("The tree couldn't be created");
    }
  }

  async findOneTree(treeId: string): Promise<Tree> {
    if (!isUUID(treeId)) {
      throw new BadRequestRpcException('The tree ID is not valid');
    }

    const tree = await this.treeModel.findById(treeId);
    if (!tree) {
      throw new NotFoundRpcException(
        'The tree with the given ID was not found',
      );
    }

    return tree.toObject();
  }

  async findAllTrees(): Promise<Tree[]> {
    const trees = await this.treeModel.find();
    return trees.map((tree) => tree.toObject());
  }

  async removeTree(treeId: string): Promise<string> {
    if (!isUUID(treeId)) {
      throw new BadRequestRpcException('The tree ID is not valid');
    }

    try {
      await this.treeModel.findByIdAndDelete(treeId);
      return 'ok';
    } catch {
      throw new InternalServerErrorRpcException("The tree couldn't be deleted");
    }
  }
}
