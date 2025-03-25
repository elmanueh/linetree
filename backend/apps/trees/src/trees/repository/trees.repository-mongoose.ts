import { RepositoryMongoose } from '@genealogy/shared';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TreeEntity } from '../../core/domain/tree.entity';
import { TreeRepository } from '../../core/persistance/trees.repository';
import { TreeMapper } from './tree.mapper';
import { Tree, TreeDocument } from './tree.schema';

@Injectable()
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
