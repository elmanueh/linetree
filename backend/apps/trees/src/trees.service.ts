import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Tree } from './schema/tree.schema';

@Injectable()
export class TreesService {
  constructor(@InjectModel(Tree.name) private treeModel: Model<Tree>) {}

  async create(tree: Tree) {
    const createdTree = new this.treeModel(tree);
    await createdTree.save();
  }

  async findAll() {
    return await this.treeModel.find();
  }

  async findOne(id: string) {
    const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    if (!objectId) throw new BadRequestException('The tree ID is not valid');

    const tree = await this.treeModel.findById(objectId);
    if (!tree)
      throw new NotFoundException('The tree with the given ID was not found');
    return tree;
  }

  async remove(id: string) {
    const objectId = Types.ObjectId.isValid(id) ? new Types.ObjectId(id) : null;
    if (!objectId) throw new BadRequestException('The tree ID is not valid');

    await this.treeModel.findByIdAndDelete(id);
  }
}
