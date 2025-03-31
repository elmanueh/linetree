import { TreeEntity } from '@genealogy/core/domain/tree.entity';
import { TreeRepository } from '@genealogy/core/persistance/trees.repository';
import { RepositoryMongoose } from '@genealogy/shared';
import { TreePersistanceMapper } from '@genealogy/trees/repository/tree.mapper';
import { Tree, TreeDocument } from '@genealogy/trees/repository/tree.schema';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class TreeRepositoryMongoose
  extends RepositoryMongoose<TreeEntity, Tree>
  implements TreeRepository
{
  constructor(
    @InjectModel(Tree.name) private readonly treeModel: Model<TreeDocument>,
    private readonly treeMapper: TreePersistanceMapper,
  ) {
    super(treeModel, treeMapper);
  }
}
