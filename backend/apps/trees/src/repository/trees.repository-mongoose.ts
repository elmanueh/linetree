import { RepositoryMongoose } from '@genealogy/shared';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TreeEntity } from '../domain/tree.entity';
import { TreeMapper } from './tree.mapper';
import { Tree, TreeDocument } from './tree.schema';
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
