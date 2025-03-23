import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TreeEntity } from '../domain/tree.entity';
import { TreeMapper } from './mapper/tree.mapper';
import { Tree, TreeDocument } from './persistance/tree.schema';
import { RepositoryMongoose } from './repository-mongoose';
import { TreeRepository } from './trees.repository';

export class TreeRepositoryMongoose
  extends RepositoryMongoose<TreeEntity, Tree>
  implements TreeRepository
{
  constructor(
    @InjectModel(Tree.name) private readonly treeModel: Model<TreeDocument>,
    private readonly treeMapper: TreeMapper,
  ) {
    super(treeModel, treeMapper);
  }
}
